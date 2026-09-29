#!/usr/bin/env node
/**
 * ============================================================================
 *  RESTAURANT TERANGA — DAKAR  |  serveur de démonstration
 * ============================================================================
 *  Rôle : servir le site statique (dossier public/) + exposer les petites API
 *         qui font fonctionner les formulaires (réservation, devis, contact,
 *         newsletter) et la disponibilité des créneaux.
 *
 *  Aucune dépendance externe : `node server.js` suffit.
 *  Les demandes reçues sont ajoutées dans data/*.jsonl (une ligne = une demande).
 *
 *  Variables d'environnement optionnelles :
 *    PORT                  port d'écoute (défaut 3000)
 *    TERANGA_WEBHOOK_URL   URL appelée à chaque nouvelle demande
 *                          (Make.com, Zapier, n8n, Twilio WhatsApp…)
 *    TERANGA_WEBHOOK_TOKEN jeton envoyé dans l'en-tête Authorization
 * ============================================================================
 */
'use strict';

const http = require('http');
const fs   = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT      = Number(process.env.PORT || 3000);
const HOST      = process.env.HOST || '0.0.0.0';
const PUBLIC    = path.join(__dirname, 'public');
const DATA_DIR  = path.join(__dirname, 'data');
const MAX_BODY  = 64 * 1024;            // 64 Ko : largement suffisant
const SLOTS_MAX = 40;                   // couverts max par créneau (démo)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jsonl':'text/plain; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.jpg':  'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon',
  '.woff2':'font/woff2', '.txt': 'text/plain; charset=utf-8',
  '.xml':  'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json'
};

/* --------------------------------------------------------------------------
   Utilitaires
   -------------------------------------------------------------------------- */
const ensureData = () => { if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true }); };

function appendJsonl(file, record) {
  ensureData();
  fs.appendFileSync(path.join(DATA_DIR, file), JSON.stringify(record) + '\n', 'utf8');
}

function readJsonl(file) {
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(p)) return [];
  return fs.readFileSync(p, 'utf8').split('\n').filter(Boolean).map(line => {
    try { return JSON.parse(line); } catch (e) { return null; }
  }).filter(Boolean);
}

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', c => {
      size += c.length;
      if (size > MAX_BODY) { reject(new Error('Corps de requête trop volumineux')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) return resolve({});
      try { resolve(JSON.parse(raw)); } catch (e) { reject(new Error('JSON invalide')); }
    });
    req.on('error', reject);
  });
}

/* Nettoyage minimal : on ne stocke jamais de balises HTML envoyées par un visiteur */
const clean = (v, max = 300) => String(v == null ? '' : v).replace(/[<>]/g, '').trim().slice(0, max);

/* Téléphone : 9 chiffres commençant par 7 (mobile) ou 3 (fixe), avec ou sans indicatif 221.
   Ex. acceptés : 77 123 45 67 · 771234567 · +221 33 800 00 00 · 00221771234567 */
const isTel  = v => /^(?:221)?[37]\d{8}$/.test(String(v).replace(/\D/g, ''));
const isMail = v => !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isDate = v => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));

function reference() {
  const y = new Date().getFullYear().toString().slice(-2);
  return 'TER-' + y + '-' + crypto.randomInt(1000, 9999);
}

/* Limitation simple : 8 envois par adresse IP et par heure */
const hits = new Map();
function rateLimited(ip, max = 8, windowMs = 3600 * 1000) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter(t => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > max;
}

/* Copie de la demande vers un outil d'automatisation (WhatsApp, CRM, e-mail…) */
async function forward(record) {
  const url = process.env.TERANGA_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: Object.assign(
        { 'Content-Type': 'application/json' },
        process.env.TERANGA_WEBHOOK_TOKEN ? { Authorization: 'Bearer ' + process.env.TERANGA_WEBHOOK_TOKEN } : {}
      ),
      body: JSON.stringify(record)
    });
  } catch (err) {
    console.error('[webhook] échec de l’envoi :', err.message);
  }
}

/* --------------------------------------------------------------------------
   API
   -------------------------------------------------------------------------- */
async function handleReservation(req, res, ip) {
  if (rateLimited(ip)) return json(res, 429, { ok: false, message: 'Trop de demandes envoyées. Merci de nous appeler directement.' });
  const body = await readBody(req);

  const errors = [];
  const date = clean(body.date, 10), heure = clean(body.heure, 5);
  if (!isDate(date)) errors.push('date');
  if (!/^\d{2}:\d{2}$/.test(heure)) errors.push('heure');
  const personnes = Number(body.personnes);
  if (!Number.isInteger(personnes) || personnes < 1 || personnes > 60) errors.push('personnes');
  const nom = clean(body.nom, 120);
  if (nom.length < 2) errors.push('nom');
  const telephone = clean(body.telephone, 25);
  if (!isTel(telephone)) errors.push('telephone');
  const email = clean(body.email, 160);
  if (!isMail(email)) errors.push('email');
  if (!body.consentement) errors.push('consentement');
  if (errors.length) return json(res, 422, { ok: false, message: 'Certains champs sont invalides.', champs: errors });

  // Disponibilité du créneau (démo : 40 couverts par créneau)
  const dejaReserve = readJsonl('reservations.jsonl')
    .filter(r => r.date === date && r.heure === heure)
    .reduce((sum, r) => sum + (Number(r.personnes) || 0), 0);
  if (dejaReserve + personnes > SLOTS_MAX) {
    return json(res, 409, {
      ok: false,
      message: 'Ce créneau est complet. Nous pouvons vous proposer un autre horaire ou vous inscrire sur la liste d’attente — appelez-nous au +221 33 800 00 00.'
    });
  }

  const record = {
    reference: reference(),
    type: 'reservation',
    date, heure, personnes,
    service: clean(body.service, 12) || (Number(heure.slice(0, 2)) < 16 ? 'midi' : 'soir'),
    occasion: clean(body.occasion, 40) || null,
    emplacement: clean(body.emplacement, 30) || 'peu importe',
    nom, telephone, email: email || null,
    demandes: clean(body.demandes, 800) || null,
    consentement: true,
    recu_le: new Date().toISOString(),
    page_source: clean(body.page_source, 200),
    referent: clean(body.referent, 200),
    statut: 'a_confirmer',
    ip_hash: crypto.createHash('sha256').update(ip).digest('hex').slice(0, 12)
  };

  appendJsonl('reservations.jsonl', record);
  await forward(record);
  console.log(`[réservation] ${record.reference} — ${date} ${heure} — ${personnes} pers. — ${nom} (${telephone})`);

  return json(res, 201, {
    ok: true,
    message: 'Demande enregistrée. Confirmation par WhatsApp ou e-mail en moins de 2 heures.',
    reservation: { reference: record.reference, date: record.date, heure: record.heure, personnes: record.personnes, statut: record.statut }
  });
}

async function handleDevis(req, res, ip) {
  if (rateLimited(ip, 6)) return json(res, 429, { ok: false, message: 'Trop de demandes. Merci de nous appeler.' });
  const body = await readBody(req);
  const errors = [];
  const type = clean(body.type, 40);
  if (!type) errors.push('type');
  const invites = Number(body.invites);
  if (!Number.isInteger(invites) || invites < 1 || invites > 500) errors.push('invites');
  const nom = clean(body.nom, 120);
  if (nom.length < 2) errors.push('nom');
  const telephone = clean(body.telephone, 25);
  if (!isTel(telephone)) errors.push('telephone');
  const email = clean(body.email, 160);
  if (!isMail(email)) errors.push('email');
  if (!body.consentement) errors.push('consentement');
  if (errors.length) return json(res, 422, { ok: false, message: 'Certains champs sont invalides.', champs: errors });

  const record = {
    reference: 'EVT-' + crypto.randomInt(1000, 9999),
    type_evenement: 'devis', categorie: type, invites,
    date_souhaitee: isDate(clean(body.date, 10)) ? clean(body.date, 10) : null,
    budget: clean(body.budget, 30) || null,
    nom, telephone, email: email || null,
    message: clean(body.message, 1500) || null,
    consentement: true,
    recu_le: new Date().toISOString(),
    page_source: clean(body.page_source, 200),
    statut: 'nouveau'
  };

  appendJsonl('devis.jsonl', record);
  await forward(record);
  console.log(`[devis] ${record.reference} — ${type} — ${invites} invités — ${nom} (${telephone})`);

  return json(res, 201, { ok: true, message: 'Demande de devis reçue. Réponse sous 24 h ouvrées.', devis: { reference: record.reference } });
}

async function handleContact(req, res, ip) {
  if (rateLimited(ip, 10)) return json(res, 429, { ok: false, message: 'Trop de messages. Merci de nous appeler.' });
  const body = await readBody(req);
  const errors = [];
  const nom = clean(body.nom, 120);
  if (nom.length < 2) errors.push('nom');
  const email = clean(body.email, 160);
  if (!isMail(email) || !email) errors.push('email');
  const sujet = clean(body.sujet, 40);
  if (!sujet) errors.push('sujet');
  const message = clean(body.message, 1500);
  if (message.length < 5) errors.push('message');
  if (!body.consentement) errors.push('consentement');
  if (errors.length) return json(res, 422, { ok: false, message: 'Certains champs sont invalides.', champs: errors });

  const record = {
    reference: 'MSG-' + crypto.randomInt(1000, 9999),
    type: 'contact', sujet, nom, email,
    telephone: clean(body.telephone, 25) || null,
    message,
    consentement: true,
    recu_le: new Date().toISOString(),
    page_source: clean(body.page_source, 200),
    statut: 'nouveau'
  };
  appendJsonl('messages.jsonl', record);
  await forward(record);
  console.log(`[contact] ${record.reference} — ${sujet} — ${nom} <${email}>`);
  return json(res, 201, { ok: true, message: 'Message reçu. Réponse sous 4 heures ouvrées.' });
}

async function handleNewsletter(req, res, ip) {
  if (rateLimited(ip, 10)) return json(res, 429, { ok: false, message: 'Trop d’inscriptions depuis cette connexion.' });
  const body = await readBody(req);
  const email = clean(body.email, 160);
  if (!isMail(email) || !email) return json(res, 422, { ok: false, message: 'Adresse e-mail invalide.' });

  const record = { type: 'newsletter', email, recu_le: new Date().toISOString(), page_source: clean(body.page_source, 200), statut: 'actif' };
  appendJsonl('newsletter.jsonl', record);
  await forward(record);
  console.log(`[newsletter] inscription : ${email}`);
  return json(res, 201, { ok: true, message: 'Inscription confirmée. Un e-mail par mois, pas plus.' });
}

/* GET /api/disponibilites?date=2026-10-05 — places restantes par créneau */
function handleDisponibilites(res, url) {
  const date = url.searchParams.get('date') || '';
  if (!isDate(date)) return json(res, 400, { ok: false, message: 'Paramètre "date" attendu au format AAAA-MM-JJ.' });
  const creneaux = {
    midi: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30'],
    soir: ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']
  };
  const prises = readJsonl('reservations.jsonl').filter(r => r.date === date);
  const resultat = {};
  Object.entries(creneaux).forEach(([service, heures]) => {
    resultat[service] = heures.map(h => {
      const occupes = prises.filter(r => r.heure === h).reduce((s, r) => s + (Number(r.personnes) || 0), 0);
      return { heure: h, places_restantes: Math.max(0, SLOTS_MAX - occupes), complet: occupes >= SLOTS_MAX };
    });
  });
  json(res, 200, { ok: true, date, capacite_par_creneau: SLOTS_MAX, creneaux: resultat });
}

/* --------------------------------------------------------------------------
   Serveur de fichiers statiques
   -------------------------------------------------------------------------- */
function sendFile(res, filePath, status = 200) {
  fs.readFile(filePath, (err, buf) => {
    if (err) { res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Erreur serveur'); return; }
    const ext = path.extname(filePath).toLowerCase();
    const isAsset = /\.(jpg|jpeg|png|webp|svg|woff2|css|js)$/.test(ext);
    res.writeHead(status, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': buf.length,
      'Cache-Control': isAsset ? 'public, max-age=604800' : 'public, max-age=0, must-revalidate'
    });
    res.end(buf);
  });
}

function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname);
  if (rel.endsWith('/')) rel += 'index.html';
  const filePath = path.normalize(path.join(PUBLIC, rel));

  // Empêche toute sortie du dossier public (path traversal)
  if (!filePath.startsWith(PUBLIC)) { res.writeHead(403); res.end('Interdit'); return; }

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) return sendFile(res, filePath);
    if (!err && stat.isDirectory()) return sendFile(res, path.join(filePath, 'index.html'));
    sendFile(res, path.join(PUBLIC, '404.html'), 404);
  });
}

/* --------------------------------------------------------------------------
   Point d'entrée
   -------------------------------------------------------------------------- */
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://' + (req.headers.host || 'localhost'));
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'inconnu';

  // En-têtes de sécurité de base, appliqués à toutes les réponses
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  try {
    if (url.pathname.startsWith('/api/')) {
      if (req.method === 'GET' && url.pathname === '/api/health') {
        return json(res, 200, { ok: true, service: 'teranga-dakar', heure: new Date().toISOString() });
      }
      if (req.method === 'GET' && url.pathname === '/api/disponibilites') {
        return handleDisponibilites(res, url);
      }
      if (req.method === 'POST' && url.pathname === '/api/reservation')  return await handleReservation(req, res, ip);
      if (req.method === 'POST' && url.pathname === '/api/devis')        return await handleDevis(req, res, ip);
      if (req.method === 'POST' && url.pathname === '/api/contact')      return await handleContact(req, res, ip);
      if (req.method === 'POST' && url.pathname === '/api/newsletter')   return await handleNewsletter(req, res, ip);
      return json(res, 404, { ok: false, message: 'Point d’API inconnu.' });
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Méthode non autorisée');
    }
    serveStatic(req, res, url.pathname);
  } catch (err) {
    console.error('[erreur]', err);
    json(res, 400, { ok: false, message: err.message || 'Requête invalide.' });
  }
});

ensureData();
server.listen(PORT, HOST, () => {
  console.log('──────────────────────────────────────────────────────────────');
  console.log('  Restaurant Teranga — Dakar');
  console.log('  Site en ligne sur http://localhost:' + PORT);
  console.log('  Demandes enregistrées dans ./data/ (réservations, devis…)');
  console.log('  Webhook : ' + (process.env.TERANGA_WEBHOOK_URL ? 'activé' : 'non configuré (optionnel)'));
  console.log('──────────────────────────────────────────────────────────────');
});
