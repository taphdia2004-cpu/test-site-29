# Plan de site web optimisé pour les conversions
## Restaurant Teranga — Dakar, Sénégal

**Client type :** restaurant indépendant, Dakar (Almadies), cuisine sénégalaise, terrasse vue mer
**Audience :** tout public (résidents, familles, expatriés, touristes, entreprises)
**Objectif principal :** **réservations de tables** (et secondairement : devis de privatisation)
**Objectif secondaire :** faire connaître la carte pour augmenter le ticket moyen

> Ce document est le plan stratégique. Il est **déjà mis en œuvre** dans le site codé de ce dépôt :
> chaque page décrite ci-dessous correspond à un fichier réel (`public/*.html`). Le tableau de
> correspondance se trouve à la section 13.

---

## 1. Résumé exécutif — le plan en une page

Un site de restaurant ne sert pas à « avoir une belle vitrine ». Il sert à faire asseoir des gens
à table. Trois décisions structurent tout le reste :

| Décision | Pourquoi |
|---|---|
| **Une seule action principale : « Réserver une table »** | Un visiteur qui a deux objectifs n'en réalise aucun. Le bouton de réservation est présent 7 fois sur l'accueil, dans le menu, dans le pied de page et en barre fixe sur mobile. |
| **Des preuves visuelles et chiffrées avant l'argumentaire** | À Dakar comme ailleurs, le visiteur juge en 5 secondes : photos réelles, note Google, nombre d'avis, prix affichés, distance. |
| **WhatsApp + formulaire court, jamais l'un sans l'autre** | Beaucoup de clients ne réservent pas par formulaire : ils écrivent. Proposer les deux double le nombre de conversions, surtout sur mobile. |

**Le parcours que tout le site doit rendre évident :**

> Découverte (Google / Instagram / bouche-à-oreille) → **Je vois que c'est beau et que d'autres ont aimé** → **Je vois les prix et l'adresse** → **Je choisis une date et une heure en 30 secondes** → **J'ai une preuve écrite que c'est noté** → **J'arrive à table** → **Je laisse un avis** → **Je reviens et j'en parle.**

---

## 2. Objectifs mesurables (KPI)

| Indicateur | Où on le lit | Départ estimé | Objectif à 90 jours |
|---|---|---|---|
| Taux de conversion visiteur → demande de réservation | GA4 : `reservation_envoyee` / vues d'accueil | inconnu (à mesurer) | **≥ 3,5 %** |
| Taux de démarrage de formulaire | GA4 : `debut_formulaire_reservation` | — | **≥ 12 %** des visiteurs de `/reservation.html` |
| Taux d'abandon du formulaire | `reservation_envoyee` / `debut_formulaire_*` | — | **≥ 70 % de réussite** (donc < 30 % d'abandon) |
| Clics « Appeler » et « WhatsApp » | GA4 : `clic_telephone`, `clic_whatsapp` | — | **≥ 8 %** des visiteurs mobiles |
| Demandes de devis événement | GA4 : `envoi_devis` | — | **≥ 4 par mois** |
| Avis Google | Fiche Google Business Profile | 1 247 avis | **+ 25 avis/mois** (demander systématiquement à la fin du repas) |

**Le principe de gestion :** on ne regarde pas « le nombre de visites ». On regarde le **nombre de
demandes de réservation** et le **taux de conversion**. Une baisse de trafic avec une hausse du taux
de conversion est une bonne nouvelle.

---

## 3. Audience cible et objections à lever

« Tout le monde » n'est pas une audience : c'est une contrainte de simplicité. On écrit donc pour
quatre profils qui poussent la porte pour des raisons différentes. Le site doit répondre aux quatre
sans se contredire.

| Profil | Ce qu'il cherche | Son objection principale | Ce qui le rassure |
|---|---|---|---|
| **Résident dakarois / habitué** (30–50 ans) | Le meilleur plat, la terrasse, une soirée simple entre amis | « Est-ce que je vais trouver de la place un vendredi soir ? » | Réservation garantie en ligne, horaires exacts, prix nets sans surprise |
| **Famille avec enfants** | Un lieu confortable, un menu enfant, la sécurité | « Est-ce que c'est adapté aux enfants et sans porc ? » | Menu junior affiché, chaise haute, plats halal, espace enfants, parking |
| **Expatrié / touriste** (mobile, à Dakar quelques jours) | Une expérience authentique, fiable, près de l'hôtel | « Est-ce un piège à touristes ? Comment on y va ? » | Avis Google, histoire de la cheffe, itinéraire Google Maps, moyen de paiement, prix |
| **Entreprise / organisateur d'événement** | Un déjeuner rapide ou un lieu pour 20 à 120 invités | « Est-ce sérieux, prévisible, facturable ? » | Devis sous 24 h, dégustation offerte, facture avec NINEA, service en 35 min |

**La règle d'écriture qui en découle :** chaque page répond d'abord à *une* objection, avec une
preuve concrète (chiffre, photo, avis, délai), jamais avec un adjectif (« convivial », « délicieux »).

---

## 4. Les pages essentielles (et pourquoi elles existent)

6 pages suffisent. Chaque page a **un objectif et un seul**, et son appel à l'action principal.

| # | Page | Objectif | Éléments de conversion obligatoires | CTA principal |
|---|---|---|---|---|
| 1 | **Accueil** `/index.html` | Faire comprendre la promesse en 5 secondes et envoyer vers la réservation | Grande photo de la terrasse + titre clair · note Google et nombre d'avis · 4 preuves (délai de confirmation, produits locaux, paiement, familles) · 3 raisons de venir · 4 plats signature avec prix · avis clients · aperçu événements · FAQ · bandeau final de réservation | **Réserver une table** |
| 2 | **Menu** `/menu.html` | Créer le désir et lever la peur de l'addition | Photos des plats signature · prix en F CFA nets, service compris · badges (halal, végétarien, sans gluten, poisson du jour) · formules datées (déjeuner, brunch) · allergènes · bouton d'impression PDF | **Réserver une table** |
| 3 | **Réservation** `/reservation.html` | Convertir : c'est la page la plus importante du site | Formulaire court (date, heure, couverts, nom, téléphone) · créneaux réels selon le service · emplacement souhaité · delai de réponse annoncé (2 h) · « aucun prépaiement » · « annulation gratuite » · rappel des horaires · parcours « et ensuite ? » en 3 étapes · téléphone et WhatsApp en secours | **Envoyer ma demande** |
| 4 | **Confirmation** `/confirmation.html` | Supprimer l'angoisse post-envoi et préparer la visite | Numéro de référence · récapitulatif complet · ce qui se passe maintenant (étapes datées) · bouton « ajouter à mon agenda » (.ics) · WhatsApp avec la référence · itinéraire · lien vers la carte | **Ajouter à mon agenda / WhatsApp** |
| 5 | **Événements** `/evenements.html` | Capter la demande à forte valeur (mariages, entreprises) | 3 formules avec prix de départ · capacités de chaque espace · déroulé en 4 étapes · avis de clients événementiels · formulaire de devis avec budget indicatif · FAQ (acompte, annulation, apport de boissons) | **Demander un devis** |
| 6 | **Contact & accès** `/contact.html` | Répondre aux questions pratiques et récupérer les derniers hésitants | Adresse exacte + itinéraire Google Maps · horaires jour par jour · téléphone et WhatsApp cliquables · parkings, transport, accessibilité · formulaire de contact par sujet · FAQ | **Appeler / Réserver** |

**Pages d'appui (secondaires, mais utiles) :**

- **Notre histoire** `/notre-histoire.html` — construit la confiance et le lien affectif (cheffe,
  producteurs, chronologie, engagements). Elle vend sans vendre. Très utile pour les touristes et
  la presse.
- **Page 404** — transforme une erreur en invitation : « cette page n'est plus au menu » + boutons
  vers la carte et la réservation.
- **Mentions légales / confidentialité** — obligatoires dès qu'un formulaire collecte des données.

**Ce qu'on ne fait PAS au démarrage (et c'est volontaire) :** blog, espace client, galerie de 200
photos, carte interactive maison, programme de fidélité. Chacun demande du temps de maintenance et
n'apporte aucune réservation les 6 premiers mois.

---

## 5. Structure du site et navigation

### 5.1 Arborescence (profondeur maximale : 2 clics)

```
ACCUEIL (promesse + réservation)
│
├── MENU                          → désir + prix
│     ├── incontournables, entrées, plats mijotés
│     ├── grillades, végétarien, desserts, boissons
│     └── formules (déjeuner / brunch)
│
├── RÉSERVER                      → ★ l'action principale
│     └── (envoi) → CONFIRMATION  → récap + agenda + itinéraire
│
├── ÉVÉNEMENTS & GROUPES          → devis (2ᵉ source de revenus)
│     ├── formules (fête / mariage / entreprise)
│     ├── déroulé en 4 étapes
│     └── formulaire de devis
│
├── NOTRE HISTOIRE                → confiance
│
└── CONTACT & ACCÈS               → questions pratiques
      ├── adresse, horaires, moyens de paiement
      ├── carte + comment venir
      └── formulaire de contact
```

### 5.2 Règles de navigation (appliquées dans le code)

1. **Menu principal à 5 entrées maximum**, dans l'ordre du parcours : Accueil · Menu · Événements ·
   Notre histoire · Contact. « Réservation » n'est pas dans la liste : c'est un **bouton**, pas un lien.
2. **Le bouton « Réserver » est toujours visible** (en-tête collant sur ordinateur, barre fixe en bas
   sur mobile avec « Appeler » à côté).
3. **Téléphone cliquable dans l'en-tête** : sur mobile, un client pressé appelle, il ne lit pas.
4. **Trois façons d'atteindre la réservation depuis n'importe où** : en-tête, contenu, pied de page.
5. **Pas de menu déroulant à sous-niveaux** : coûteux à maintenir, souvent ignoré.
6. **Fil d'Ariane** sur les pages intérieures (« Accueil › Menu ») pour situer le visiteur.
7. **Pied de page utile** : horaires jour par jour, téléphone, WhatsApp, e-mail, adresse, inscription
   aux nouveautés — c'est la zone que les visiteurs utilisent pour *vérifier*, pas pour explorer.

---

## 6. Anatomie d'une page qui convertit (modèle réutilisable)

L'accueil déroule ces 9 blocs **dans cet ordre précis** — c'est la colonne vertébrale du site :

| Bloc | Ce qu'il fait | Exemple appliqué |
|---|---|---|
| 1. Promesse visuelle + titre | Répond à « où suis-je, qu'est-ce que c'est ? » en 5 s | Photo terrasse au coucher du soleil + « La *teranga* s'invite à table, face à l'océan » |
| 2. Preuve immédiate | Donne le droit de continuer | « 4,8/5 · 1 247 avis Google · Ouvert aujourd'hui · Aucun prépaiement » |
| 3. Double CTA | Laisse choisir le rythme du visiteur | « Réserver une table » (principal) + « Découvrir le menu » (secondaire) |
| 4. Rassurance en 4 points | Lève les 4 objections les plus fréquentes | Confirmation en 2 h · produit du jour · Wave/OM/carte · familles & groupes |
| 5. Différenciation | Justifie le choix plutôt qu'un concurrent | Goût authentique (3 h de cuisson) · terrasse océan · prix nets |
| 6. Désir (plats + prix) | Fait saliver et montre que c'est accessible | 4 plats signature photographiés avec prix en F CFA |
| 7. Offre datée | Crée une raison de venir *maintenant* | Formule déjeuner 8 900 F, lundi au vendredi 12h–14h30 |
| 8. Preuve sociale + offre secondaire | Rassure, puis élargit | 3 avis clients + bloc « privatisez pour vos grands moments » |
| 9. Dernier appel + FAQ | Rattrape les hésitants, répond aux freins restants | « Il reste quelques créneaux ce soir » + 5 questions/réponses |

**Tout appel à l'action suit la même règle :** un verbe à la première personne, un bénéfice, et
l'absence de risque. « Réserver ma table » plutôt que « Envoyer ».

---

## 7. Parcours utilisateur principal (première visite → action finale)

Le tableau ci-dessous est **la chaîne de cohérence** : chaque étape indique l'émotion du visiteur,
son doute, et l'élément du site qui y répond. Si un élément manque, le parcours casse.

| # | Étape du parcours | Où il se trouve | Ce qu'il pense | Réponse apportée par le site |
|---|---|---|---|---|
| 1 | Il cherche « restaurant poisson Dakar » ou voit une story Instagram | Google / Maps / Instagram | « Est-ce que ça vaut le détour ? » | Titre et description clairs, photo forte, note Google visible, page rapide à charger |
| 2 | Il arrive sur l'accueil | Accueil, 5 premières secondes | « C'est quel genre d'endroit, et pour quel budget ? » | Grande photo de la terrasse, titre, note et nombre d'avis, preuve « aucun prépaiement » |
| 3 | Il descend, il hésite encore | Blocs 4 à 6 | « Et si c'était un piège à touristes ? Et si c'était trop cher ? » | 4 preuves concrètes, plats signature avec prix réels, avis clients nommés, origine des produits |
| 4 | Il veut savoir ce qu'il mangera | `/menu.html` | « Est-ce que je vais trouver quelque chose que j'aime ? » | Photos, descriptions courtes, badges (halal, végétarien), formules, prix nets |
| 5 | Il décide de réserver | Bouton « Réserver » (visible partout) | « Est-ce que c'est long, est-ce que je dois payer ? » | Bouton dès l'en-tête, page dédiée rassurante : 30 secondes, zéro paiement |
| 6 | Il remplit le formulaire | `/reservation.html` | « Combien de champs ? Et si le créneau n'existe pas ? » | 5 champs utiles seulement, heures réelles proposées, préférences (terrasse/salle), demandes particulières |
| 7 | Il hésite une dernière fois | Colonne de rassurance à droite du formulaire | « Et si personne ne me répond ? » | Étapes « ce qui se passe ensuite » datées, délai de 2 h, téléphone et WhatsApp juste à côté |
| 8 | Il envoie | Soumission | « Est-ce que ça a marché ? » | Message de succès explicite + **page de confirmation** : référence, récapitulatif, agenda, itinéraire |
| 9 | Il attend la confirmation | WhatsApp / e-mail | « C'est confirmé ou pas ? » | Message-type de l'équipe en moins de 2 h, avec table, heure et emplacement *(voir `docs/01-textes-et-messages.md`)* |
| 10 | Il vient, il mange | Sur place | « C'était à la hauteur ? » | Accueil correct, table prête (30 min de tolérance annoncée) |
| 11 | Fin du repas | Sur place | « J'en parle à qui ? » | Demande d'avis Google au moment de l'addition, QR code sur l'addition (boucle de réputation) |
| 12 | Il revient / il recommande | Fiche Google, WhatsApp | « Comment je réserve la prochaine fois ? » | Site enregistré, inscriptions aux nouveautés, fiche Google reliée au site |

**Boucle vertueuse :** plus d'avis → meilleur classement Google local → plus de visites → plus de
réservations. Le site est le point de départ de cette boucle, pas la fin.

### 7.1 Parcours secondaires (à ne pas négliger)

| Parcours | Point d'entrée | Particularité | Sortie |
|---|---|---|---|
| **Le pressé (mobile)** | Google Maps, appel direct | Veut réserver en 60 secondes | Barre fixe en bas : « Appeler » + « Réserver » |
| **L'organisateur d'événement** | Recherche « mariage Dakar terrasse » | Cycle long, besoin de réassurance écrite | `/evenements.html` → formulaire de devis → dégustation (page pensée pour ça) |
| **Le touriste en séjour court** | Instagram, TripAdvisor | Cherche à se rassurer sur l'accès et le paiement | `/contact.html` (itinéraire, moyens de paiement) → réservation |
| **Le groupe spontané** | WhatsApp | Demande « une table pour 8 ce soir » | Bouton WhatsApp pré-rempli avec le message et le nombre de personnes |

---

## 8. Éléments de conversion : la liste opérationnelle

### 8.1 Éléments de confiance (à afficher, sans exception)
- Note et **nombre** d'avis (jamais une note seule), avis signés avec initiale et source.
- **Délai de réponse** annoncé (« moins de 2 h ») plutôt que « nous vous répondrons rapidement ».
- **Absence de risque** : aucun prépaiement, annulation gratuite jusqu'à 3 h avant, table gardée
  30 minutes.
- **Prix affichés en F CFA, nets, service compris** — la transparence est un argument commercial au
  Sénégal comme ailleurs.
- **Moyens de paiement** (Wave, Orange Money, carte, espèces) : lève une objection réelle avant même
  qu'elle soit formulée.
- Photos **réelles** (terrasse, plats, équipe). Une banque d'images se repère et détruit la confiance.
- Adresse, horaires jour par jour, parking, itinérairecliquable.

### 8.2 Éléments d'urgence et de désir (à utiliser avec parcimonie)
- « La terrasse est complète presque tous les soirs entre 20h et 22h » (véridique et efficace).
- « Il reste quelques créneaux ce soir » sur le bandeau final.
- Offre limitée dans le temps : formule déjeuner en semaine, brunch du dimanche.
- Afficher les **créneaux réellement disponibles** dans le formulaire (l'API le fait) : l'utilisateur
  voit l'urgence sans qu'on la lui raconte.

### 8.3 Réduction de la friction (chaque champ évité = des réservations gagnées)
- 5 champs obligatoires : date, heure, couverts, nom, téléphone. **L'e-mail est facultatif.**
- Sélecteur de date avec **dates passées désactivées** et créneaux passés masqués.
- Pré-remplissage des coordonnées si le visiteur revient (mémorisation locale).
- Liens directs pré-remplis : `/reservation.html?personnes=4&service=soir` — utilisés par les boutons
  « Réserver le déjeuner », « Réserver le brunch », « Réserver pour un groupe ».
- Message d'erreur humain, sous le champ concerné, qui dit quoi faire (« Numéro invalide. Exemple :
  77 123 45 67 »).
- En cas d'échec technique : le formulaire ne laisse **jamais** le client sans solution — téléphone
  et WhatsApp s'affichent immédiatement.

---

## 9. Mesure : ce qu'on suit et comment

Événements poussés dans le `dataLayer` (prêts pour Google Tag Manager, voir `docs/02-mesure-kpi.md`) :

| Événement | Quand | Utilité |
|---|---|---|
| `vue_page` | chaque page | base de calcul des taux |
| `cta_entete`, `cta_hero_principal`, `cta_final_reserver`… | clic sur un CTA | savoir **quel** bouton convertit |
| `clique_telephone`, `clic_whatsapp` | clic sur appel/WhatsApp | mesurer les réservations hors formulaire |
| `debut_formulaire_reservation` | première saisie | haut de l'entonnoir |
| `envoi_formulaire_reservation` | clic sur envoyer | bas de l'entonnoir |
| `reservation_envoyee` | réponse API positive | **l'objectif** |
| `erreur_formulaire_reservation` / `echec_reservation` | validation ou serveur | diagnostiquer les abandons |
| `vue_confirmation` | page de confirmation | vérifie le suivi de bout en bout |
| `clic_itineraire`, `clic_ajouter_calendrier` | après réservation | intention réelle de venir |

**Rituel hebdomadaire (15 minutes) :** nombre de demandes, taux de conversion, bouton le plus
utilisé, horaires les plus demandés, avis reçus. Une décision par semaine, pas dix.

---

## 10. Feuille de route réaliste (90 jours)

| Période | Actions | Résultat attendu |
|---|---|---|
| **Semaines 1–2** | Mise en ligne du site · fiche Google Business Profile complète et reliée au site · photos réelles (15 minimum) · demande d'avis systématique à la fin du repas | Premières réservations tracées ; note Google alimentée |
| **Semaines 3–6** | Branchement de la confirmation WhatsApp automatique (Make/Zapier + Twilio ou WhatsApp Business) · installation de GA4 + GTM · QR code « laisser un avis » sur l'addition | Temps de réponse < 2 h tenu sans effort ; données fiables |
| **Semaines 7–12** | 6 publications Instagram réutilisant les photos du site · campagne Google Ads locale « restaurant Almadies » avec petit budget · relance des clients événementiels | +30 % de demandes ; 3 à 5 devis événement par mois |
| **En continu** | 1 plat photo par mois · 1 avis demandé par service · mise à jour des prix et formules | Le site reste crédible : c'est ce qui fait convertir |

---

## 11. Erreurs à éviter (les plus fréquentes chez les restaurants)

1. **Pas de prix** : le visiteur qui ne sait pas s'il peut se le permettre part chez le concurrent.
2. **Formulaire de 12 champs** : chaque champ obligatoire supplémentaire coûte des réservations.
3. **Aucun engagement de délai** : « nous vous recontacterons » ne rassure personne.
4. **Photos de banque d'images** : le client qui arrive et trouve autre chose ne revient pas et le dit.
5. **Réservation uniquement par téléphone** : la moitié de l'audience ne téléphone plus.
6. **Site uniquement en français, sans penser au mobile** : au Sénégal, la majorité du trafic est
   mobile et en 4G. Le site doit peser moins de 2 Mo et convertir au pouce.
7. **Absence de page événements** : un mariage vaut 60 à 120 couverts — c'est le plus gros panier
   du restaurant, et il se décide en ligne.
8. **Ne jamais demander d'avis** : la réputation est le premier canal d'acquisition d'un restaurant
   local, et elle s'entretient.
9. **Oublier l'après-envoi** : sans page de confirmation ni message de suivi, le client doute, appelle
   pour vérifier, et parfois annule par inquiétude.
10. **Modifier le site sans mesurer** : on ne saura jamais si la refonte a aidé.

---

## 12. Ce qui rend ce site cohérent plutôt que décousu

Trois fils rouges traversent toutes les pages :

- **Le même visage** : mêmes couleurs (teal profond + terracotta), même typographie, même ton —
  direct, chaleureux, jamais commercial. Une seule phrase de promesse, répétée partout : *« la
  teranga s'invite à table, face à l'océan »*.
- **La même promesse de service** : réservation en 30 secondes · confirmation en 2 h · aucun
  prépaiement · annulation gratuite. Cette phrase apparaît sur l'accueil, la page de réservation, la
  confirmation et la FAQ. C'est la répétition qui crée la confiance.
- **Le même appel à l'action** : « Réserver une table » (ou « Réserver ma table ») — même verbe,
  même couleur terracotta partout. Le visiteur n'a jamais à apprendre un nouveau bouton.

---

## 13. Correspondance plan ↔ code livré

| Élément du plan | Fichier livré |
|---|---|
| Accueil (9 blocs du parcours) | `public/index.html` |
| Menu & prix | `public/menu.html` |
| Réservation (cœur de la conversion) | `public/reservation.html` |
| Confirmation + agenda `.ics` | `public/confirmation.html` |
| Événements & devis | `public/evenements.html` |
| Contact & accès | `public/contact.html` |
| Notre histoire | `public/notre-histoire.html` |
| Page 404 utile | `public/404.html` |
| Design system (couleurs, typo, boutons, formulaires) | `public/assets/css/styles.css` |
| Comportements (validation, créneaux, analytics, menus) | `public/assets/js/site.js` |
| API réservation / devis / contact / newsletter / créneaux | `server.js` |
| Données de référence (horaires, créneaux, capacités) | `data/config-restaurant.json` |
| Mesure, messages WhatsApp, checklists | `docs/01-textes-et-messages.md`, `docs/02-mesure-kpi.md`, `docs/03-checklist-contenu.md`, `docs/04-checklist-lancement.md` |

**Pour personnaliser le site :** ouvrez `public/assets/js/site.js` → objet `CONFIG` (téléphone,
WhatsApp, e-mail, horaires des services) et `data/config-restaurant.json` (horaires, capacité,
menus). Aucune autre connaissance technique n'est nécessaire.

---

## 14. En une phrase (pour décider vite)

> Un site de restaurant convertit quand il **prouve** (photos réelles, avis, prix nets), **rassure**
> (délai de réponse, zéro prépaiement, annulation libre) et **facilite** (30 secondes, deux façons de
> réserver, une confirmation écrite). Tout le reste — design, animations, blog — est du confort.
