# 03 — Checklist du contenu à collecter

Le site est livré avec des visuels et des textes de démonstration. Cette checklist liste **tout ce
qu'il faut rassembler** pour que le site devienne celui du vrai restaurant. Comptez une demi-journée
de collecte et une journée de remplacement.

> Règle d'or : les visiteurs pardonnent une mise en page imparfaite, jamais une promesse fausse.

---

## 1. Informations administratives (à remplir avant toute mise en ligne)

| À collecter | Pourquoi | Où c'est utilisé |
|---|---|---|
| Nom exact du restaurant (et orthographe officielle) | cohérence Google/Instagram | partout |
| Adresse complète + point de repère (« en face de… ») | les clients se repèrent au repère, pas au numéro | contact, pied de page, Google |
| Coordonnées GPS | fiche Google, itinéraire | `data/config-restaurant.json` |
| Téléphone fixe + numéro WhatsApp | 2 canaux, le WhatsApp convertit le plus | en-tête, barre mobile, formulaires |
| E-mail de réservation et e-mail événements | éviter qu'un devis se perde | pied de page, contact |
| Horaires exacts par jour + heure de dernière commande | première question posée | contact, réservation, pied de page |
| Moyens de paiement acceptés | objection fréquente | contact, accueil |
| NINEA / registre de commerce | facturation entreprise, mentions légales | devis, factures |
| Nombre de couverts par espace (terrasse / salle / salon) | fixe la capacité et le formulaire | événements, réservation |
| Nombre de places de parking et service voiturier | argument concret aux Almadies | contact, accueil |
| Prix nets de chaque plat et boisson | évite une objection majeure | menu |

---

## 2. Photos (15 minimum) — la priorité absolue

Une seule séance photo bien faite vaut mieux qu'un an de publications. Idéalement entre 18h et 20h
pour la lumière dorée.

### 2.1 Formats et nommage (le site lit ces noms de fichiers)

| Fichier attendu | Sujet | Format recommandé |
|---|---|---|
| `hero.jpg` | Terrasse au coucher du soleil, tables dressées, océan visible | 1800 × 1200 px (paysage large) |
| `thieboudienne.jpg` | Le plat signature, vu de dessus, assiette sombre | 1200 × 900 px |
| `poisson-braise.jpg` | Poisson braisé entier + accompagnement | 1200 × 900 px |
| `yassa.jpg` | Yassa (plat mijoté), bol ou assiette creuse | 1200 × 900 px |
| `brochettes.jpg` | Grillades au feu de bois, fumée visible | 1200 × 900 px |
| `ambiance.jpg` | Salle intérieure, lumière chaude, décoration | 1200 × 900 px |
| `chef.jpg` | Portrait de la cheffe en cuisine (ou de l'équipe) | 1200 × 900 px (ou portrait) |
| `evenement.jpg` | Grande table dressée pour une réception | 900 × 1200 px (portrait) |
| `bissap.jpg` | Boissons maison : bissap, bouye, gingembre | 1200 × 900 px |

**Conseils techniques**
- Compresser à **moins de 300 Ko** par image (JPEG qualité 80). Un site lourd est un site quitté.
- Pas de flash direct, pas de photo au téléphone prise à contre-jour.
- Un plat = une photo, cadrage serré, assiette propre, pas de main floue, pas de table encombrée.
- Éviter les photos verticales pour les plats (elles s'affichent mal dans la grille).

### 2.2 Textes alternatifs (`alt`)
Pour chaque image, décrire **ce que l'on voit**, en français :
`alt="Thieboudienne au poisson, riz rouge et légumes, servi sur une assiette en céramique"`.
C'est bon pour l'accessibilité, le référencement Google Images et le client qui a une connexion
lente.

---

## 3. Contenu de la carte (30 minutes, très rentable)

Pour chaque plat, préparer :

1. **Nom du plat** tel qu'il est écrit sur la carte papier.
2. **Description en une phrase** : ingrédients principaux + cuisson + origine locale.
   Ex. : « Riz mijoté à la tomate fraîche, poisson entier farci au rof, carotte, chou et manioc. »
3. **Prix en F CFA, net, service compris.**
4. **Badges applicables** : végétarien, vegan, sans gluten, halal/sans porc, épicé, poisson du jour,
   sur commande (délai).
5. **Contraintes** : allergènes présents (arachide, poisson, crustacés, gluten), plats sur commande
   48 h à l'avance.

**Formules à afficher** (elles augmentent le ticket moyen) : formule déjeuner en semaine, brunch du
dimanche, menu enfant, menu groupe.

**À vérifier une dernière fois avant publication :** le prix affiché sur le site doit être celui de
l'addition. Un écart de 500 F coûte une étoile dans un avis.

---

## 4. Preuves de confiance

| À collecter | Détail |
|---|---|
| **Note et nombre d'avis Google** | chiffre exact, à mettre à jour chaque mois (accueil, en-tête de la page réservation) |
| **3 avis clients** | copiés-coller depuis Google/TripAdvisor, avec prénom + initiale, mois et source. Demander l'autorisation écrite. |
| **Note TripAdvisor / Facebook** | utile si favorable |
| **Distinctions, presse, concours** | guide, championnat, article — bannière discrète |
| **Histoire de la maison** | date d'ouverture, origine de la cheffe, quartier, 3 à 5 dates clés |
| **Engagements vérifiables** | nombre de producteurs partenaires, tonnes de nourriture sauvées, ancienneté de l'équipe |
| **Capacités événementielles** | maximas par espace, exemples d'événements réalisés |

> Toute affirmation doit être vraie et vérifiable. « Le meilleur » ne se vérifie pas ;
> « 1 247 avis à 4,8/5 » se vérifie.

---

## 5. Textes à valider par le propriétaire

| Bloc | Où | Longueur |
|---|---|---|
| Slogan (une phrase qui résume la promesse) | accueil | 8–12 mots |
| Titre du haut de page | accueil | 6–10 mots |
| Sous-titre de promesse | accueil | 25–35 mots |
| Trois raisons de venir (argument + preuve) | accueil | 30–40 mots chacune |
| Anneau de rassurance (4 points) | accueil | 10–15 mots chacun |
| Histoire de la maison | notre histoire | 250–350 mots |
| Paragraphe « l'ambiance » | accueil | 60–80 mots |
| Engagements (4) | notre histoire | 20–30 mots chacun |
| Formules événements (3) | événements | 12–15 mots de description + inclus |
| FAQ (4 à 6 questions par page) | toutes | réponses de 30–50 mots |

---

## 6. Compte à ouvrir / mettre à jour (indispensable, gratuit)

- [ ] **Google Business Profile** : catégorie « Restaurant sénégalais », horaires, téléphone, photos
      (20 minimum), lien vers le site, bouton de réservation.
- [ ] **Google Search Console** : vérifier le domaine, envoyer `sitemap.xml`.
- [ ] **TripAdvisor** : cohérence du nom, des horaires et des prix avec le site.
- [ ] **Instagram / Facebook** : lien vers le site en bio, pas vers un annuaire.
- [ ] **WhatsApp Business** : description, horaires, message d'absence pour la nuit, catalogue de
      menus.
- [ ] **Page Facebook** : horaires à jour (les clients appellent quand ce n'est pas le cas).

---

## 7. Erreurs de contenu à ne pas commettre

1. Garder des photos de démonstration en production : ça se voit immédiatement.
2. Écrire « ambiance conviviale » au lieu de décrire ce qu'on voit et entend.
3. Oublier de mettre à jour les horaires pendant les fêtes (Ramadan, Tabaski, Nouvel An) : c'est la
   première cause d'avis négatif évitable.
4. Mettre un menu en PDF non lisible sur mobile plutôt que du texte HTML.
5. Publier des avis sans autorisation ou inventés : risque juridique et perte de confiance.
6. Annoncer de la livraison ou des services qui n'existent pas.
