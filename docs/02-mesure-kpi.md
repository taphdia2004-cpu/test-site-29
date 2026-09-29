# 02 — Mesure : événements suivis, KPI et tableau de bord

Sans mesure, on ne sait pas si le site apporte des réservations. Ce document explique quoi brancher
(15 minutes de configuration) et quoi regarder chaque semaine (15 minutes de lecture).

---

## 1. Ce qui est déjà prêt dans le code

Le site pousse déjà chaque action importante dans le `dataLayer` (standard Google Tag Manager) :

```js
window.dataLayer.push({ event: 'cta_entete', page: '/index.html', libelle: 'Réserver', destination: '/reservation.html' });
```

Vous n'avez donc **rien à coder** : il suffit de déclarer ces événements dans Google Tag Manager.

### 1.1 Liste complète des événements

| Événement | Déclenché quand | À quoi il sert |
|---|---|---|
| `vue_page` | à chaque chargement de page | taux de conversion par page |
| `cta_entete` | clic sur « Réserver » dans l'en-tête | savoir si l'en-tête collant travaille |
| `cta_hero_principal` | clic sur le bouton principal de l'accueil | efficacité du haut de page |
| `cta_apercu_menu`, `cta_ambiance_reserver`, `cta_evenements`… | clics internes | parcours réel des visiteurs |
| `cta_barre_mobile` | barre fixe mobile (Appeler / Réserver) | poids du format mobile |
| `clic_telephone` | clic sur un numéro | réservations hors formulaire |
| `clic_whatsapp` | clic sur un lien WhatsApp | idem, canal souvent majoritaire |
| `clic_itineraire` | clic « Google Maps » | intention réelle de venir |
| `debut_formulaire_reservation` | première saisie dans le formulaire | haut de l'entonnoir |
| `envoi_formulaire_reservation` | clic sur « Envoyer ma demande » | bas de l'entonnoir |
| `reservation_envoyee` | réponse positive de l'API | **🎯 l'objectif principal** |
| `erreur_formulaire_reservation` | validation échouée (champ indiqué) | corriger ce qui bloque |
| `echec_reservation` | erreur technique | détecter une panne immédiatement |
| `vue_confirmation` | arrivée sur la page de confirmation | vérifier la chaîne complète |
| `clic_ajouter_calendrier` | clic « Ajouter à mon agenda » | signal fort d'intention |
| `envoi_devis`, `succes_devis` | demande de devis événement | 2ᵉ source de revenus |
| `envoi_contact`, `envoi_newsletter` | formulaires secondaires | base de contacts |

> Pour ajouter un suivi sur un nouveau bouton, il suffit d'écrire dans le HTML :
> `data-track="mon_evenement" data-track-label="libellé"`. Aucun code JavaScript à modifier.

---

## 2. Installation de Google Analytics 4 + Tag Manager (15 minutes)

1. **Créer une propriété GA4** (analytics.google.com) et récupérer l'identifiant `G-XXXXXXX`.
2. **Créer un conteneur GTM** (tagmanager.google.com) et coller son code dans le `<head>` de chaque
   page du site (ou dans un fichier `public/assets/js/analytics.js` chargé sur les 8 pages).
3. Dans GTM, créer **une variable** :
   - `dataLayer` de type « Variable de couche de données » → nom : `event`.
4. Créer **un déclencheur personnalisé** « Événement personnalisé » avec le nom exact d'un événement
   (par exemple `reservation_envoyee`), puis une balise **GA4 – Événement** qui l'envoie.
   Répétez pour les 6 événements prioritaires :
   `vue_page`, `clic_telephone`, `clic_whatsapp`, `debut_formulaire_reservation`,
   `envoi_formulaire_reservation`, `reservation_envoyee`.
5. Dans GA4 → **Administration → Événements → Marquer comme conversion** :
   - `reservation_envoyee` (conversion principale)
   - `succes_devis` (conversion secondaire)
   - `clic_whatsapp` et `clic_telephone` (conversions « contact », très parlantes pour un restaurant)
6. **Tester** : GTM → Aperçu, puis envoyer une réservation de test. Vous devez voir la séquence
   `debut_formulaire_reservation` → `envoi_formulaire_reservation` → `reservation_envoyee` →
   `vue_confirmation`.

### 2.1 Suivi facultatif mais utile
- **Meta Pixel / Instagram** : installer le pixel et envoyer l'événement `Lead` sur
  `reservation_envoyee`. Vous pourrez ensuite recibler ceux qui ont regardé le menu sans réserver.
- **Google Business Profile** : ajouter le lien du site (et non la page Facebook) et activer le
  bouton « Réserver » s'il accepte une URL.

---

## 3. Recevoir une notification à chaque demande (temps réel)

Deux solutions, au choix :

**A. Webhook intégré au serveur (recommandé)**
```bash
TERANGA_WEBHOOK_URL="https://hook.eu2.make.com/xxxxxxx" node server.js
```
Chaque demande part en JSON vers Make.com / Zapier / n8n, où vous pouvez :
- envoyer un message **WhatsApp Business** à l'équipe (« Nouvelle demande : 4 personnes, samedi 20h ») ;
- créer une ligne dans **Google Sheets** (base de suivi des réservations) ;
- envoyer un **e-mail** de notification à la personne de service.

**Exemple de scénario Make.com en 4 modules :**
`Webhook (réception)` → `Filtre (type = reservation)` → `Google Sheets (ajouter une ligne)` →
`WhatsApp Business / E-mail (notifier l'équipe)` → `Réponse HTTP 200`.

**B. Simple lecture des fichiers**
`data/reservations.jsonl` (une ligne = une demande). Un tableur peut l'ouvrir ou le script suivant
affiche les dernières demandes :
```bash
tail -n 20 data/reservations.jsonl
```

⚠️ **Attention aux données personnelles :** ces fichiers contiennent noms et téléphones. Ils ne sont
pas versionnés dans Git, mais il faut les sauvegarder **chiffrés** et les effacer après la période
légale de conservation (12 mois suffisent pour un restaurant).

---

## 4. Tableau de bord hebdomadaire (modèle)

À remplir chaque lundi matin. Une seule page, cinq chiffres, une décision.

| Semaine du | Visiteurs | Demandes de réservation | Taux de conversion | Clics WhatsApp/téléphone | Devis événement | Avis Google reçus | Décision de la semaine |
|---|---|---|---|---|---|---|---|
| 05/10 | | | | | | | |
| 12/10 | | | | | | | |
| 19/10 | | | | | | | |

**Objectifs de référence :**

| Indicateur | Seuil de vigilance | Objectif |
|---|---|---|
| Taux de conversion global | < 1,5 % | ≥ 3,5 % |
| Début de formulaire → envoi | < 50 % | ≥ 70 % |
| Clics WhatsApp + téléphone (part des visiteurs mobiles) | < 4 % | ≥ 8 % |
| Délai moyen de confirmation réel | > 4 h | < 2 h |
| Nouveaux avis Google / mois | < 10 | ≥ 25 |

---

## 5. Les 5 diagnostics à faire quand « ça ne convertit pas »

1. **Beaucoup de visites, peu de clics sur Réserver** → le haut de page ne convainc pas : changez la
   photo et le titre, vérifiez que la note Google et les prix sont visibles sans scroller.
2. **Beaucoup de clics, peu de démarrages de formulaire** → la page de réservation fait peur :
   raccourcissez-la, rassurez davantage (délai, zéro prépaiement, annulation).
3. **Beaucoup de démarrages, peu d'envois** → un champ bloque. Regardez `erreur_formulaire_*` : le
   champ indiqué est le coupable (souvent le téléphone ou la date).
4. **Des envois mais peu de confirmations** → problème humain, pas technique : mettez en place la
   notification temps réel et un message-type (voir `01-textes-et-messages.md`).
5. **Beaucoup de WhatsApp, peu de réservations** → c'est normal : comptez ces conversations comme des
   réservations. Demandez à l'équipe de noter chaque conversation aboutie dans le tableau — sinon
   vous sous-estimerez la performance du site.

---

## 6. Rituel mensuel (30 minutes)

- Relire les 3 pages les plus visitées et corriger une phrase faible.
- Remplacer une photo par une meilleure.
- Mettre à jour les prix et les formules si besoin (des prix faux font fuir).
- Regarder les 3 dernières réponses aux avis et vérifier qu'elles sont personnalisées.
- Vérifier que le formulaire fonctionne toujours : envoyer une réservation de test, puis la supprimer
  de `data/reservations.jsonl`.
