/* ==========================================================================
   RESTAURANT TERANGA — DAKAR
   site.js — comportements du site (aucune dépendance externe)
   1. Suivi analytique   2. En-tête & navigation   3. Révélations au scroll
   4. Menu (filtres)     5. Formulaire de réservation   6. Formulaires courts
   7. Détails pratiques (date, créneaux, pré-remplissage)
   ========================================================================== */
(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     0. CONFIGURATION — le seul endroit à modifier pour adapter le site
     ---------------------------------------------------------------------- */
  const CONFIG = {
    restaurant: 'Restaurant Teranga',
    telephone: '+221 33 800 00 00',
    whatsapp: '221770000000',       // format international sans "+"
    email: 'reservation@teranga-dakar.sn',
    capaciteMaxEnLigne: 20,         // au-delà => événement privé
    services: {
      midi: { label: 'Déjeuner',      heures: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30'] },
      soir: { label: 'Dîner',         heures: ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'] }
    }
  };
  window.TERANGA_CONFIG = CONFIG;

  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.prototype.slice.call((ctx || document).querySelectorAll(sel));

  /* ----------------------------------------------------------------------
     1. SUIVI ANALYTIQUE (simple et prêt pour GA4 / GTM / Meta Pixel)
     Chaque clic important pousse un événement dans window.dataLayer :
     il suffit ensuite de brancher Google Tag Manager pour tout mesurer.
     ---------------------------------------------------------------------- */
  window.dataLayer = window.dataLayer || [];
  function track(event, data) {
    const payload = Object.assign({ event: event, page: location.pathname }, data || {});
    window.dataLayer.push(payload);
    if (window.console && console.debug) console.debug('[analytics]', payload);
  }
  window.trackTeranga = track;

  function initTracking() {
    // Tout élément [data-track] remonte son événement
    document.addEventListener('click', function (e) {
      const el = e.target.closest('[data-track]');
      if (!el) return;
      track(el.getAttribute('data-track'), {
        libelle: (el.getAttribute('data-track-label') || el.textContent || '').trim().slice(0, 60),
        destination: el.getAttribute('href') || null
      });
    });
    track('vue_page', { titre: document.title });
  }

  /* ----------------------------------------------------------------------
     2. EN-TÊTE & NAVIGATION
     ---------------------------------------------------------------------- */
  function initHeader() {
    const header = $('.site-header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const burger = $('.burger');
    if (burger) {
      burger.addEventListener('click', function () {
        const open = document.body.classList.toggle('nav-open');
        burger.setAttribute('aria-expanded', String(open));
        if (open) track('ouverture_menu_mobile');
      });
      // Fermer le tiroir au clic sur un lien
      $$('.mobile-drawer a').forEach(a => a.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
      }));
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { document.body.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); }
      });
    }

    // Souligne le lien actif
    const here = location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    $$('.nav a, .mobile-drawer a.dl').forEach(a => {
      const target = new URL(a.getAttribute('href'), location.href).pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
      if (target === here) a.setAttribute('aria-current', 'page');
    });
  }

  /* ----------------------------------------------------------------------
     3. RÉVÉLATIONS AU SCROLL (micro-animations, désactivées si non désiré)
     ---------------------------------------------------------------------- */
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) { items.forEach(i => i.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(i => io.observe(i));
  }

  /* ----------------------------------------------------------------------
     4. FILTRES DU MENU
     ---------------------------------------------------------------------- */
  function initMenuFilters() {
    const nav = $('.menu-nav');
    if (!nav) return;
    const links = $$('a', nav);
    const groups = $$('.menu-group');
    if ('IntersectionObserver' in window && groups.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      groups.forEach(g => io.observe(g));
    }
  }

  /* ----------------------------------------------------------------------
     5. FORMULAIRE DE RÉSERVATION — le cœur de la conversion
     ---------------------------------------------------------------------- */
  const REGEX = {
    // Téléphone sénégalais : 9 chiffres (7X mobile ou 3X fixe), indicatif 221 facultatif
    tel: /^(?:221)?[37]\d{8}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  };
  // On tolère les espaces, points et tirets dans le numéro saisi
  const telValide = v => REGEX.tel.test(String(v).replace(/\D/g, ''));

  function setTodayMinimum(input) {
    if (!input) return;
    const now = new Date();
    // Décalage horaire local sûr (évite le décalage UTC)
    const iso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    input.min = iso;
    if (!input.value) input.value = iso;
    input.max = new Date(now.getTime() + 180 * 86400000 - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }

  function fillTimeSlots(select, serviceKey) {
    if (!select) return;
    const service = CONFIG.services[serviceKey];
    const current = select.value;
    const isToday = $('#resa-date') && $('#resa-date').value === new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes() + 60; // + 1 h de délai minimum
    select.innerHTML = '<option value="">Choisir une heure…</option>';
    service.heures.forEach(h => {
      const [hh, mm] = h.split(':').map(Number);
      if (isToday && (hh * 60 + mm) < nowMinutes) return; // créneau déjà passé
      const opt = document.createElement('option');
      opt.value = h;
      opt.textContent = h.replace(':', 'h') + (mm === 0 ? '' : '');
      select.appendChild(opt);
    });
    if (current && $$('option', select).some(o => o.value === current)) select.value = current;
    const empty = select.options.length === 1;
    $('#time-hint') && ($('#time-hint').textContent = empty
      ? 'Plus de créneau en ligne pour ce service aujourd’hui — appelez-nous, nous débloquons souvent une table.'
      : 'Créneaux de ' + service.heures[0] + ' à ' + service.heures[service.heures.length - 1] + '.');
  }

  function showFieldError(input, message) {
    const field = input.closest('.field');
    if (!field) return;
    field.classList.add('has-error');
    const msg = $('.error-msg', field);
    if (msg && message) msg.textContent = message;
  }
  function clearFieldError(input) {
    const field = input.closest('.field');
    if (field) field.classList.remove('has-error');
  }

  function validateReservation(form) {
    let firstInvalid = null;
    const require = (name, test, message) => {
      const input = form.elements[name];
      if (!input) return;
      const value = (input.value || '').trim();
      const ok = typeof test === 'function' ? test(value) : (test ? !!value : true);
      if (!ok) { showFieldError(input, message); if (!firstInvalid) firstInvalid = input; }
      else clearFieldError(input);
    };

    require('date', v => !!v, 'Merci d’indiquer une date.');
    require('heure', v => !!v, 'Merci de choisir une heure.');
    require('personnes', v => v && +v >= 1, 'Indiquez le nombre de personnes.');
    require('nom', v => v.length >= 2, 'Merci d’indiquer votre nom.');
    require('telephone', v => telValide(v), 'Numéro invalide. Exemple : 77 123 45 67');
    require('email', v => !v || REGEX.email.test(v), 'Adresse e-mail invalide.');

    const consent = form.elements['consentement'];
    if (consent && !consent.checked) {
      showFieldError(consent, 'Merci d’accepter d’être recontacté.');
      if (!firstInvalid) firstInvalid = consent;
    }

    const personnes = form.elements['personnes'];
    if (personnes && +personnes.value > CONFIG.capaciteMaxEnLigne) {
      showFieldError(personnes, 'Au-delà de ' + CONFIG.capaciteMaxEnLigne + ' personnes, parlons privatisation : voir la page Événements.');
      if (!firstInvalid) firstInvalid = personnes;
    }
    return firstInvalid;
  }

  function collectReservation(form) {
    const data = {};
    new FormData(form).forEach((value, key) => { data[key] = typeof value === 'string' ? value.trim() : value; });
    data.recu_le = new Date().toISOString();
    data.page_source = location.pathname + location.search;
    data.referent = document.referrer || 'direct';
    return data;
  }

  function formatDateFr(iso) {
    if (!iso) return '';
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  function initReservationForm() {
    const form = $('#form-reservation');
    if (!form) return;

    const dateInput = form.elements['date'];
    const serviceInputs = $$('input[name="service"]', form);
    const timeSelect = form.elements['heure'];
    const guestsSelect = form.elements['personnes'];

    setTodayMinimum(dateInput);
    if (dateInput) {
      dateInput.addEventListener('change', () => {
        const day = new Date(dateInput.value + 'T12:00:00').getDay();
        fillTimeSlots(timeSelect, $('input[name="service"]:checked') ? $('input[name="service"]:checked').value : 'soir');
        if (day === 0 && $('#brunch-hint')) { $('#brunch-hint').style.display = 'block'; } else if ($('#brunch-hint')) { $('#brunch-hint').style.display = 'none'; }
      });
    }
    serviceInputs.forEach(r => r.addEventListener('change', () => fillTimeSlots(timeSelect, r.value)));
    fillTimeSlots(timeSelect, (serviceInputs.find(r => r.checked) || {}).value || 'soir');

    // Pré-remplissage : le visiteur revient, on ne lui fait pas tout retaper
    try {
      const saved = JSON.parse(localStorage.getItem('teranga_visiteur') || 'null');
      if (saved) {
        if (saved.nom && !form.elements['nom'].value) form.elements['nom'].value = saved.nom;
        if (saved.telephone && !form.elements['telephone'].value) form.elements['telephone'].value = saved.telephone;
        if (saved.email && !form.elements['email'].value) form.elements['email'].value = saved.email;
      }
    } catch (err) { /* stockage indisponible : sans conséquence */ }

    // L'événement le plus utile à mesurer : le début de saisie
    let started = false;
    form.addEventListener('input', function () {
      if (!started) { started = true; track('debut_formulaire_reservation'); }
    }, { once: false });

    // Nettoyage des erreurs à la saisie
    $$('input, select, textarea', form).forEach(el => {
      el.addEventListener('input', () => clearFieldError(el));
      el.addEventListener('change', () => clearFieldError(el));
    });

    // URL pré-remplie : /reservation.html?personnes=4&service=soir&date=2026-05-02&occasion=anniversaire
    const params = new URLSearchParams(location.search);
    ['personnes', 'date', 'occasion', 'service'].forEach(key => {
      const value = params.get(key);
      if (!value) return;
      const el = form.elements[key];
      if (!el) return;
      if (el.type === 'radio') { const r = form.querySelector('input[name="' + key + '"][value="' + CSS.escape(value) + '"]'); if (r) r.checked = true; }
      else if (el.type === 'checkbox') { el.checked = true; }
      else if (el.tagName === 'SELECT' || el.tagName === 'INPUT') { el.value = value; }
    });
    fillTimeSlots(timeSelect, (form.querySelector('input[name="service"]:checked') || {}).value || 'soir');
    if (dateInput && dateInput.value) dateInput.dispatchEvent(new Event('change'));

    const alertBox = $('#resa-alert');
    const feedback = $('#resa-feedback');
    const submitBtn = $('#resa-submit');

    const setLoading = (loading) => {
      if (submitBtn) {
        submitBtn.disabled = loading;
        submitBtn.dataset.label = submitBtn.dataset.label || submitBtn.innerHTML;
        submitBtn.innerHTML = loading ? 'Envoi en cours…' : submitBtn.dataset.label;
      }
    };
    const showAlert = (type, html) => {
      if (!alertBox) return;
      alertBox.className = 'alert is-visible alert-' + type;
      alertBox.innerHTML = html;
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const invalid = validateReservation(form);
      if (invalid) {
        invalid.focus();
        showAlert('error', '<div><strong>Il manque une information.</strong>Les champs en rouge ci-dessus ont besoin d’être corrigés.</div>');
        track('erreur_formulaire_reservation', { champ: invalid.name });
        return;
      }
      const data = collectReservation(form);
      setLoading(true);
      track('envoi_formulaire_reservation', { personnes: data.personnes, service: data.service, occasion: data.occasion });

      try {
        const res = await fetch('/api/reservation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const payload = await res.json().catch(() => ({}));
        if (!res.ok || payload.ok === false) throw new Error(payload.message || 'Erreur serveur');

        const reference = payload.reservation && payload.reservation.reference ? payload.reservation.reference : 'TER-0000';
        data.reference = reference;
        try {
          localStorage.setItem('teranga_derniere_reservation', JSON.stringify(data));
          localStorage.setItem('teranga_visiteur', JSON.stringify({ nom: data.nom, telephone: data.telephone, email: data.email }));
        } catch (err) { /* ignore */ }

        track('reservation_envoyee', { reference: reference, personnes: data.personnes });
        window.location.href = '/confirmation.html?ref=' + encodeURIComponent(reference) + '&n=' + encodeURIComponent(data.nom) + '&d=' + encodeURIComponent(data.date) + '&h=' + encodeURIComponent(data.heure) + '&p=' + encodeURIComponent(data.personnes);
      } catch (err) {
        setLoading(false);
        track('echec_reservation');
        showAlert('error',
          '<div><strong>Nous n’avons pas pu enregistrer la demande.</strong>' +
          'Votre table n’est pas encore réservée. Appelez-nous au <a href="tel:' + CONFIG.telephone.replace(/\s/g, '') + '"><strong>' + CONFIG.telephone + '</strong></a> ' +
          'ou écrivez-nous sur <a href="https://wa.me/' + CONFIG.whatsapp + '" target="_blank" rel="noopener"><strong>WhatsApp</strong></a> : nous confirmons en 2 minutes.</div>');
        if (feedback) feedback.classList.add('is-visible');
      }
    });
  }

  /* ----------------------------------------------------------------------
     6. FORMULAIRES COURTS (devis événement, newsletter, contact)
     Ce sont des points de capture : on collecte sans jamais bloquer.
     ---------------------------------------------------------------------- */
  function handleShortForm(selector, endpoint, resetOnSuccess) {
    const form = $(selector);
    if (!form) return;
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      // Validation native navigateur
      if (form.checkValidity && !form.checkValidity()) { form.reportValidity(); return; }
      const data = {};
      new FormData(form).forEach((v, k) => { data[k] = typeof v === 'string' ? v.trim() : v; });
      data.recu_le = new Date().toISOString();
      data.page_source = location.pathname;

      const btn = $('[type="submit"]', form);
      const original = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.innerHTML = 'Envoi…'; }
      track('envoi_' + endpoint.replace('/api/', ''));

      const ok = (form.dataset.success || '#form-success');
      const ko = (form.dataset.error || '#form-error');
      const box = $(ok), boxKo = $(ko);

      try {
        const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error('server');
        if (box) { box.classList.add('is-visible'); box.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        if (resetOnSuccess) form.reset();
        track('succes_' + endpoint.replace('/api/', ''));
      } catch (err) {
        if (boxKo) { boxKo.classList.add('is-visible'); boxKo.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = original; }
      }
    });
  }

  /* ----------------------------------------------------------------------
     7. DÉTAILS PRATIQUES
     ---------------------------------------------------------------------- */
  function initMisc() {
    // Marque la ligne du jour dans le tableau des horaires
    const row = $('.hours-table tr[data-day="' + new Date().getDay() + '"]');
    if (row) row.classList.add('today');

    // Bandeau hors-ligne
    const sync = () => document.body.classList.toggle('is-offline', !navigator.onLine);
    window.addEventListener('online', sync); window.addEventListener('offline', sync); sync();

    // Numéro de téléphone / WhatsApp partout où c'est demandé
    $$('[data-tel]').forEach(el => { el.setAttribute('href', 'tel:' + CONFIG.telephone.replace(/\s|-/g, '')); });
    $$('[data-wa]').forEach(el => {
      const msg = el.getAttribute('data-wa-msg') || 'Bonjour, je souhaite réserver une table au ' + CONFIG.restaurant + '.';
      el.setAttribute('href', 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(msg));
      el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener');
    });

    // Année dans le pied de page
    $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

    // Impression / enregistrement PDF de la carte
    $$('[data-print]').forEach(el => el.addEventListener('click', () => window.print()));
  }

  /* ----------------------------------------------------------------------
     DÉMARRAGE
     ---------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initTracking();
    initHeader();
    initReveal();
    initMenuFilters();
    initReservationForm();
    initMisc();
    handleShortForm('#form-devis', '/api/devis', true);
    handleShortForm('#form-newsletter', '/api/newsletter', true);
    handleShortForm('#form-contact', '/api/contact', true);
  });

  /* Page de confirmation : affiche le récapitulatif + lien calendrier */
  window.TerangaRecap = { formatDateFr: formatDateFr, config: CONFIG };
})();
