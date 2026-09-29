# Restaurant Teranga — Dakar
### Site multipage optimisé pour les conversions + API de réservation (sans dépendance)

Ce dépôt contient **le plan stratégique** et **le site web complet** du Restaurant Teranga (cuisine
sénégalaise, Almadies, Dakar). Objectif unique : transformer un visiteur en **réservation de table**,
et secondairement en **demande de devis** pour les événements privés.

- 📋 **Le plan de site complet (à lire en premier) : [`PLAN.md`](PLAN.md)**
- 🌐 **Le site : `public/`** (6 pages + confirmation + 404, en HTML/CSS/JS natifs)
- ⚙️ **Le serveur et les API : `server.js`** (Node.js, aucune dépendance à installer)

---

## 1. Démarrage en 30 secondes

```bash
node server.js
# → Site en ligne sur http://localhost:3000
```

Aucun `npm install` n'est nécessaire : le projet n'utilise **aucune dépendance externe**.
Node.js 18 ou plus est requis (présent par défaut sur la plupart des machines).

| Commande | Rôle |
|---|---|
| `npm start` | Démarre le site sur le port 3000 |
| `PORT=8080 npm start` | Démarre sur un autre port |
| `npm run check` | Vérifie la syntaxe du serveur |

Le site fonctionne également **sans serveur** (ouvrir `public/index.html`) : seuls les formulaires
ont besoin du serveur pour enregistrer les demandes.

---

## 2. Le parcours de conversion, page par page

| Page | Fichier | Rôle dans le parcours | CTA principal |
|---|---|---|---|
| Accueil | `public/index.html` | Promesse, preuves, désir, dernier appel | Réserver une table |
| Menu | `public/menu.html` | Désir + prix transparents + formules | Réserver une table |
| Réservation | `public/reservation.html` | **Le cœur : convertir** | Envoyer ma demande |
| Confirmation | `public/confirmation.html` | Rassurer après l'envoi + préparer la visite | Ajouter à mon agenda |
| Événements | `public/evenements.html` | Capter les gros paniers (mariages, entreprises) | Demander un devis |
| Contact | `public/contact.html` | Lever les derniers freins pratiques | Appeler / Réserver |
| Notre histoire | `public/notre-histoire.html` | Construire la confiance | Réserver une table |
| 404 | `public/404.html` | Récupérer une erreur | Réserver / Voir la carte |

Chaque page contient : en-tête collant avec bouton « Réserver », barre d'action fixe sur mobile
(Appeler + Réserver), pied de page complet (horaires, coordonnées, adresse) et appels à l'action
mesurés par le suivi analytique.

---

## 3. Structure du dépôt

```
.
├── PLAN.md                     ← le plan stratégique (livrable principal)
├── README.md                   ← ce fichier
├── server.js                   ← serveur statique + API (0 dépendance)
├── package.json
├── data/
│   └── config-restaurant.json  ← horaires, créneaux, capacités, formules (source unique)
│   └── *.jsonl                 ← demandes reçues (non versionnées, .gitignore)
├── docs/
│   ├── 01-textes-et-messages.md    ← messages WhatsApp/e-mail prêts à copier
│   ├── 02-mesure-kpi.md            ← GA4/GTM, événements suivis, tableau de bord
│   ├── 03-checklist-contenu.md     ← photos, textes et informations à collecter
│   └── 04-checklist-lancement.md   ← mise en ligne, SEO local, sauvegardes
└── public/
    ├── index.html · menu.html · reservation.html · confirmation.html
    ├── evenements.html · contact.html · notre-histoire.html · 404.html
    ├── robots.txt · sitemap.xml
    └── assets/
        ├── css/styles.css      ← design system commenté (1 seul fichier)
        ├── js/site.js          ← validation, créneaux, analytics, navigation
        └── img/*.jpg           ← visuels (photos à remplacer par les vraies)
```

---

## 4. Personnaliser le site

### 4.1 Coordonnées, téléphone, WhatsApp (1 fichier)
Ouvrez `public/assets/js/site.js`, tout est en haut du fichier dans l'objet `CONFIG` :

```js
const CONFIG = {
  restaurant: 'Restaurant Teranga',
  telephone: '+221 33 800 00 00',   // utilisé par tous les boutons [data-tel]
  whatsapp: '221770000000',          // format international, sans "+", sans espaces
  email: 'reservation@teranga-dakar.sn',
  capaciteMaxEnLigne: 20,            // au-delà : orientation vers la page Événements
  services: { midi: { heures: [...] }, soir: { heures: [...] } }
};
```

### 4.2 Horaires, capacité, formules, prix
`data/config-restaurant.json` est la **source de référence** (documentation et serveur).
Pour les afficher dynamiquement plus tard, un simple `fetch('/data/config-restaurant.json')` suffit.

### 4.3 Couleurs et typographie
`public/assets/css/styles.css`, bloc `:root` en haut : `--teal` (couleur de confiance),
`--terra` (couleur d'action — c'est celle des boutons de réservation), `--cream`, `--ochre`.

### 4.4 Photos
Remplacez les fichiers de `public/assets/img/` en conservant **les mêmes noms** : `hero.jpg`,
`thieboudienne.jpg`, `poisson-braise.jpg`, `yassa.jpg`, `brochettes.jpg`, `ambiance.jpg`,
`chef.jpg`, `evenement.jpg`, `bissap.jpg`.
Conseils : JPEG qualité 80, largeur 1600 px pour `hero.jpg`, 1200 px pour les autres, et **moins de
300 Ko par image**. Pensez à mettre à jour les textes alternatifs (`alt=""`) avec vos vrais plats.

### 4.5 Textes
Tous les textes sont directement dans les fichiers HTML. Les blocs de copy sont identifiés par des
commentaires (`<!-- ============ 3. CE QUI NOUS REND DIFFÉRENTS ============ -->`) pour les retrouver
facilement. L'annexe `docs/01-textes-et-messages.md` contient les variantes et les messages d'équipe.

---

## 5. L'API (ce qui enregistre réellement les réservations)

| Méthode | Route | Rôle |
|---|---|---|
| `POST` | `/api/reservation` | Enregistre une demande de table, contrôle la disponibilité, génère une référence `TER-26-XXXX` |
| `POST` | `/api/devis` | Demande de devis événement (référence `EVT-XXXX`) |
| `POST` | `/api/contact` | Message via le formulaire de contact (`MSG-XXXX`) |
| `POST` | `/api/newsletter` | Inscription aux nouveautés |
| `GET` | `/api/disponibilites?date=2026-10-05` | Places restantes par créneau (40 couverts/créneau en démo) |
| `GET` | `/api/health` | Vérification de bon fonctionnement |

**Exemple :**

```bash
curl -X POST http://localhost:3000/api/reservation \
  -H 'Content-Type: application/json' \
  -d '{"date":"2026-10-05","heure":"20:00","personnes":4,"nom":"Awa Ndiaye",
       "telephone":"77 123 45 67","email":"awa@exemple.com",
       "service":"soir","emplacement":"terrasse","consentement":true}'
```

Les demandes sont ajoutées ligne par ligne dans `data/reservations.jsonl`, `data/devis.jsonl`,
`data/messages.jsonl`, `data/newsletter.jsonl` (fichiers non versionnés dans Git : ce sont des
données clients).

**Sécurité incluse :** validation stricte des champs côté serveur (téléphone sénégalais, e-mail,
date), nettoyage des balises HTML, limitation à 8 envois par heure et par adresse IP, en-têtes de
sécurité (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`),
protection contre la traversée de répertoire.

### 5.1 Recevoir les demandes sur WhatsApp ou par e-mail en temps réel

Le serveur peut transmettre chaque demande à un outil d'automatisation (Make.com, Zapier, n8n) qui
enverra ensuite un message WhatsApp Business ou un e-mail à l'équipe :

```bash
TERANGA_WEBHOOK_URL="https://hook.eu2.make.com/xxxxxxx" \
TERANGA_WEBHOOK_TOKEN="mon-jeton-secret" \
node server.js
```

Le webhook reçoit le JSON complet de la demande (`reference`, `date`, `heure`, `personnes`, `nom`,
`telephone`, `demandes`…). Voir le scénario conseillé dans `docs/02-mesure-kpi.md`.

---

## 6. Mise en ligne

**Option A — hébergement statique (le plus simple, gratuit)**
Netlify, Vercel ou Cloudflare Pages : glissez le dossier `public/`. Les pages s'affichent
immédiatement. Les formulaires, eux, ont besoin des API : sur Netlify, créez
`netlify/functions/reservation.js` en réutilisant la logique de `server.js` (ou utilisez un service de
formulaires).

**Option B — petit serveur (recommandé, tout fonctionne d'un coup)**
Un VPS à partir de 5 €/mois, ou Render/Railway/Fly.io :
```bash
node server.js        # derrière Nginx ou Caddy avec HTTPS
```
Pensez à faire une sauvegarde quotidienne de `data/*.jsonl` (voir `docs/04-checklist-lancement.md`).

**Domaine et HTTPS :** indispensable. Un site de restaurant sans cadenas sur une page de formulaire
perd de la confiance — et du référencement.

---

## 7. Qualité et bonnes pratiques intégrées

- **Mobile d'abord** : barre d'action fixe (Appeler/Réserver), menu tiroir, formulaire en une colonne,
  cibles tactiles de 48 px.
- **Accessibilité** : contrastes vérifiés, focus visible, `aria-label` sur les liens iconiques,
  formulaires labellisés, `aria-live` sur les messages d'erreur, respect de
  `prefers-reduced-motion`.
- **Performance** : zéro dépendance JS, un seul fichier CSS, images compressées et `loading="lazy"`
  hors écran, polices Google avec `preconnect`.
- **SEO local** : titres et descriptions uniques par page, données structurées `Restaurant` et `Menu`
  (JSON-LD), `sitemap.xml`, `robots.txt`, fil d'Ariane, contenu réellement utile.
- **Mesure** : chaque bouton important est tracé (`data-track`), prêt pour Google Tag Manager.

---

## 8. Personnaliser pour un autre restaurant

Ce site est un modèle réutilisable. Pour un autre établissement, il suffit de :

1. Remplacer les 9 photos dans `public/assets/img/`.
2. Adapter le nom, le slogan, les coordonnées dans les 8 fichiers HTML (rechercher-remplacer
   « Teranga »).
3. Mettre à jour `CONFIG` dans `site.js` et `data/config-restaurant.json`.
4. Réécrire les plats, les prix et les avis dans `menu.html` et `index.html`.
5. Changer les couleurs dans le bloc `:root` de `styles.css` (2 variables suffisent :
   `--teal` et `--terra`).

---

## 9. Licence et avertissement

Projet de démonstration : le restaurant, les avis, les prix et les coordonnées sont fictifs et
doivent être remplacés par les informations réelles avant toute mise en ligne publique.
Code fourni sous licence MIT (voir `package.json`).
