# 04 — Checklist de mise en ligne

À dérouler dans l'ordre, la veille et le jour de la mise en ligne. Cochez tout : chaque case oubliée
coûte des réservations invisibles.

---

## 1. Contenu (la veille)

- [ ] Toutes les photos réelles remplacent les visuels de démonstration (`public/assets/img/`).
- [ ] Chaque image a un texte alternatif qui décrit ce qu'on voit.
- [ ] Nom, adresse, téléphone, WhatsApp et e-mails sont les bons **partout** (rechercher « Teranga »,
      « +221 », « teranga-dakar.sn » — les coordonnées fictives doivent disparaître).
- [ ] Les prix du menu sont à jour et nets (service compris).
- [ ] Les horaires sont exacts pour les 7 jours, y compris les jours fériés à venir.
- [ ] Les avis affichés sont réels et autorisés.
- [ ] Les liens du pied de page fonctionnent (Mentions légales / Confidentialité : créer ces pages
      ou retirer les liens).
- [ ] Le numéro WhatsApp dans `CONFIG` (fichier `public/assets/js/site.js`) est au format
      international sans `+` : `221XXXXXXXXX`.

## 2. Fonctionnel (le jour J — 20 minutes)

- [ ] **Test de réservation complet** : date de demain, 20h, 4 personnes → la demande apparaît dans
      `data/reservations.jsonl` et la page de confirmation s'affiche avec une référence.
- [ ] **Test téléphone invalide** : saisir `123` → message d'erreur clair affiché sous le champ.
- [ ] **Test créneau complet** : remplir le même créneau jusqu'à 40 couverts → message « créneau
      complet » convivial, avec alternative.
- [ ] **Test sur mobile réel** (et non seulement en réduisant la fenêtre) : barre fixe Appeler /
      Réserver visible, formulaire en une colonne, clavier numérique pour le téléphone.
- [ ] **Test WhatsApp** : le lien ouvre bien WhatsApp avec le message pré-rempli.
- [ ] **Test impression de la carte** : le bouton « Imprimer la carte (PDF) » génère bien un
      document propre (enregistrer en PDF depuis la boîte d'impression).
- [ ] **Test page 404** : ouvrir une URL inexistante → la page 404 s'affiche avec les bons liens.
- [ ] Vérifier que le site fonctionne sans JavaScript pour l'essentiel : les textes, la carte et les
      numéros de téléphone restent lisibles (seuls les formulaires dépendent du JS).

## 3. Technique

- [ ] **HTTPS actif** : le cadenas doit apparaître sur la page de réservation, sinon les visiteurs
      hésitent à laisser leur numéro.
- [ ] **Domaine** : `https://www.teranga-dakar.sn` (ou le domaine réel) renvoie vers le site, et
      `http://` redirige vers `https://`.
- [ ] **Balises mises à jour** : remplacer le domaine de démonstration dans les balises
      `canonical`, `og:url`, `sitemap.xml` et `robots.txt`.
- [ ] **Search Console** : propriété vérifiée, `sitemap.xml` envoyé, aucune erreur de couverture.
- [ ] **Vitesse** : viser moins de 2 secondes au premier affichage sur 4G. Compresser les images,
      garder le cache navigateur actif (le serveur l'active déjà : 7 jours sur les images).
- [ ] **Notifications** : le webhook (`TERANGA_WEBHOOK_URL`) envoie bien un message à l'équipe à
      chaque demande ; tester avec une fausse réservation.
- [ ] **Sauvegarde** : `data/*.jsonl` copié chaque jour (cron ou sauvegarde de l'hébergeur).
      Exemple de tâche quotidienne :
      `0 4 * * * tar czf /sauvegardes/teranga-$(date +\%F).tgz /chemin/data`
- [ ] **Redémarrage automatique** : si le serveur tombe, il doit redémarrer seul (`pm2`, `systemd`
      ou l'option de redémarrage de l'hébergeur).

## 4. Données personnelles (obligation légale)

- [ ] Mention d'information sur les formulaires (déjà présente : « vos coordonnées servent
      uniquement à cette réservation ») — à compléter par une page **Politique de confidentialité**.
- [ ] Durée de conservation fixée (12 mois suffisent) et procédure d'effacement sur demande.
- [ ] Accès aux fichiers `data/` limité aux personnes concernées.
- [ ] Pas de revente ni de partage des coordonnées à des tiers (c'est écrit sur le site : il faut
      que ce soit vrai).

## 5. Référencement local (le vrai moteur d'un restaurant)

- [ ] **Fiche Google Business Profile** complète : catégorie principale « Restaurant sénégalais »,
      catégories secondaires, horaires, téléphone, site, 20+ photos, zone desservie.
- [ ] Nom de la fiche **identique** à celui du site (pas de mots-clés ajoutés : sanctionnable).
- [ ] Publications Google régulières (une par mois minimum : nouveau plat, événement).
- [ ] **Demande d'avis systématique** à la fin du repas (QR code ou message le lendemain).
- [ ] Cohérence NAP (Nom–Adresse–Téléphone) sur Google, TripAdvisor, Facebook, Instagram, annuaires.
- [ ] Réponse à **100 %** des avis, en moins de 48 h.

## 6. Après la mise en ligne — les 7 premiers jours

- [ ] Relire chaque page sur un vrai téléphone, en marchant, en plein soleil (test de lisibilité).
- [ ] Faire tester le site par 3 personnes qui ne le connaissent pas et noter les 3 hésitations.
- [ ] Envoyer une réservation de test soi-même, puis la supprimer de `data/reservations.jsonl`.
- [ ] Vérifier dans GA4 que `reservation_envoyee` remonte bien comme conversion.
- [ ] Appeler un client un jour après sa réservation pour vérifier que la confirmation est bien
      arrivée (et ajuster le message-type si besoin).

## 7. En cas de pépin (les 5 dépannages courants)

| Symptôme | Cause probable | Solution |
|---|---|---|
| « L'envoi a échoué » sur le formulaire | serveur arrêté ou API inaccessible | relancer `node server.js`, vérifier les logs (`[erreur]`) |
| Aucune notification reçue à l'équipe | webhook mal configuré | vérifier `TERANGA_WEBHOOK_URL` et tester le scénario Make/Zapier |
| Le formulaire dit « créneau complet » à tort | données de test oubliées dans `data/reservations.jsonl` | supprimer les lignes de test |
| Le numéro WhatsApp ne s'ouvre pas | format incorrect | dans `CONFIG`, écrire `221XXXXXXXXX` (pas de `+`, pas d'espaces) |
| Les images ne changent pas après remplacement | cache navigateur | vider le cache ou ajouter `?v=2` au nom du fichier |
