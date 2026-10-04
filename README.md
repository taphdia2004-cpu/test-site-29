# Atelier Carrousel IA

Studio web en français pour créer, personnaliser et exporter des carrousels TikTok Photo Mode et Instagram en PNG.

## Utilisation locale

Prérequis : Node.js 20 ou supérieur.

```bash
npm install
npm run build
node server.mjs
```

Ouvrir ensuite <http://localhost:5173>. Garder le terminal ouvert pendant l'utilisation. Les exports PNG/ZIP sont téléchargés par le navigateur.

Pour le développement : `npm run dev`.

## Publication web

Le workflow GitHub Actions `.github/workflows/deploy-pages.yml` publie l'application sur GitHub Pages à chaque push sur la branche Arena. Après activation de GitHub Pages pour le dépôt, l'adresse attendue est : <https://taphdia2004-cpu.github.io/test-site-29/>.
