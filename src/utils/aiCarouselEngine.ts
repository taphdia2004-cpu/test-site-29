import {
  CarouselProject,
  CarouselTypeId,
  EditorialThemeId,
  FontPairingId,
  PlatformFormatId,
  SlideItem,
  VisualStyleId,
} from '../types/carousel';

export interface CarouselTypeSpec {
  id: CarouselTypeId;
  name: string;
  badge: string;
  description: string;
}

export const CAROUSEL_TYPES: CarouselTypeSpec[] = [
  {
    id: 'auto-smart',
    name: '✨ Choix IA Automatique',
    badge: 'Recommandé',
    description: 'L’IA analyse ton idée et choisit le meilleur angle, les phrases et les illustrations.',
  },
  {
    id: 'framework-system',
    name: '📐 Système & Méthode',
    badge: '+340% Saves',
    description: 'Un plan d’action étape par étape avec une fiche mémo finale.',
  },
  {
    id: 'myth-buster',
    name: '⚡ Mythe vs Réalité',
    badge: 'Contre-Intuitif',
    description: 'Détruit une croyance populaire dès la Slide 1 (« Tout ce qu’on t’a dit est faux »).',
  },
  {
    id: 'stats-proof',
    name: '📊 Chiffres & Preuves',
    badge: 'Autorité',
    description: 'Appuie chaque argument sur des statistiques et lois chiffrées.',
  },
  {
    id: 'before-after',
    name: '🔄 Avant / Après',
    badge: 'Transformation',
    description: 'Compare l’ancienne méthode épuisante avec la nouvelle méthode intelligente.',
  },
  {
    id: 'story-pov',
    name: '📖 Storytelling',
    badge: 'TikTok Photo',
    description: 'Raconte un déclic vécu et les leçons concrètes qui en découlent.',
  },
  {
    id: 'secret-list',
    name: '🗝️ Liste Secrète',
    badge: 'Curiosité',
    description: 'Révèle des règles cachées que 99% des gens découvrent trop tard.',
  },
];

export interface VisualStyleSpec {
  id: VisualStyleId;
  name: string;
  badge?: string;
  description: string;
}

export const VISUAL_STYLES: VisualStyleSpec[] = [
  // 10 NOUVEAUX DESIGNS INSPIRÉS DES IMAGES DE L'UTILISATEUR
  {
    id: 'skale-pinned-notes',
    name: '📌 Notes Épinglées 3D',
    badge: 'Nouveau · Skale',
    description: 'Cartes blanches inclinées avec punaise 3D réaliste, numéro manuscrit et fil pointillé',
  },
  {
    id: 'simplist-highlight',
    name: '🟩 Surlignage & Bandeau',
    badge: 'Nouveau · Simplist',
    description: 'Fond crème, mots surlignés plein bloc, bandeau coloré et bouton pilule',
  },
  {
    id: 'shodwe-brush',
    name: '🖌️ Pinceau & Flèche',
    badge: 'Nouveau · Shodwe',
    description: 'Pli de livre, badge numéro peint au pinceau orange, flèche manuscrite et cercles',
  },
  {
    id: 'grow-corporate-blue',
    name: '📁 Corporate Bleu & Dossier',
    badge: 'Nouveau · Grow',
    description: 'Alterne Bleu Royal et Gris clair, camembert +7%, carte dossier bleue et avis client',
  },
  {
    id: 'neon-purple-agency',
    name: '🟣 Dark Cyber Violet',
    badge: 'Nouveau · Agency',
    description: 'Fond noir quadrillé, titres condensés Blanc & Violet Néon, cercles et icônes',
  },
  {
    id: 'red-black-scribble',
    name: '🔴 Rouge & Noir Griffonné',
    badge: 'Nouveau · Motyv',
    description: 'Alterne Rouge vif et Noir, cercle tracé au feutre rouge, encadré ! et chevrons >>>>',
  },
  {
    id: 'data-charts-glass',
    name: '📊 Infographie & Graphiques',
    badge: 'Nouveau · Charts',
    description: 'Anneaux 50% / 78%, graphiques en barres et courbes dégradées + numéro géant',
  },
  {
    id: 'designmates-giant-num',
    name: '🔢 Numéro Géant & UI',
    badge: 'Nouveau · UI/UX',
    description: 'Chiffre géant pastel en haut à droite, mini-cartes ❌/✅ et barre Instagram ♡ 💬 ⌲',
  },
  {
    id: 'nexora-acid-lime',
    name: '🟢 Néon Lime & Contraste',
    badge: 'Nouveau · Nexora',
    description: 'Alterne Noir carbone et Crème, titres majuscules Vert Acide et bouton rond ➔',
  },
  {
    id: 'netroots-crumpled-pills',
    name: '🔵 Papier Froissé & Pilules',
    badge: 'Nouveau · Netroots',
    description: 'Alterne Bleu électrique et Papier froissé, titres géants et pilules empilées en bas',
  },
  // 12 DESIGNS ÉDITORIAUX EXISTANTS
  {
    id: 'editorial-luxury',
    name: '✦ Magazine Éditorial',
    description: 'Double cadre fin, étoiles ✦ et élégance presse (Kinfolk / New Yorker)',
  },
  {
    id: 'modern-bento',
    name: '▢ Bento & Cartes',
    description: 'Illustration dans une carte blanche arrondie et badges modernes',
  },
  {
    id: 'swiss-poster',
    name: '┼ Grille Suisse',
    description: 'Lignes architecturales apparentes et rigueur géométrique',
  },
  {
    id: 'gallery-arch',
    name: '∩ Arche Galerie',
    description: 'Grande arche de musée arrondie en haut et alignement centré',
  },
  {
    id: 'bold-highlight',
    name: '▬ Impact Créateur',
    description: 'Bandeau supérieur coloré et mots surlignés plein bloc',
  },
  {
    id: 'newspaper-gazette',
    name: '📰 Journal & Gazette',
    description: 'Style presse prestigieuse (Le Monde / NYT) avec double filet d’édition',
  },
  {
    id: 'polaroid-atelier',
    name: '🖼️ Tirage Polaroïd',
    description: 'Illustration présentée comme un tirage d’art encadré avec scotch minimaliste',
  },
  {
    id: 'brutalist-neo',
    name: '⬛ Néo-Brutaliste Chic',
    description: 'Bordures franches noires et ombre graphique décalée ultra-tendance',
  },
  {
    id: 'japanese-zen',
    name: '◯ Zen Japonais',
    description: 'Disque solaire doux en filigrane et minimalisme contemplatif Wabi-Sabi',
  },
  {
    id: 'luxury-monogram',
    name: '◇ Haute Couture',
    description: 'Cadre de maison de luxe à coins ciselés et ornements précieux',
  },
  {
    id: 'split-magazine',
    name: '▌ Bandeau Latéral',
    description: 'Bande latérale gauche colorée avec structure éditoriale asymétrique',
  },
  {
    id: 'notebook-paper',
    name: '📓 Carnet de Penseur',
    description: 'Lignes de carnet subtiles et marge éditoriale rouge/accent',
  },
];

export function matchIllustrationToText(text: string, fallbackIndex = 0): string {
  const lower = text.toLowerCase();

  const rules: { keywords: string[]; id: string }[] = [
    { keywords: ['cerveau', 'neuro', 'synapse', 'cognitif', 'mental', 'dopamine', 'penser'], id: 'brain-synapse' },
    { keywords: ['temps', '2,8', 'seconde', 'minute', 'sablier', 'chrono', 'tard'], id: 'hourglass-bloom' },
    { keywords: ['urgent', 'vite', 'voler', 'gagner du temps', 'accélérer', 'heures'], id: 'hourglass-wings' },
    { keywords: ['routine', 'habitude', 'cycle', 'rythme', 'quotidien', 'discipline', 'constance', 'régularité'], id: 'hourglass-orbit' },
    { keywords: ['calme', 'méditation', 'stress', 'respirer', 'paix', 'sérénité'], id: 'lotus-mind' },
    { keywords: ['sommeil', 'dormir', 'énergie', 'batterie', 'fatigue', 'repos', 'récupération', 'vitalité'], id: 'battery-full' },
    { keywords: ['argent', 'revenu', 'euro', '€', 'croissance', 'explose', 'investissement', 'bourse', 'profit'], id: 'rocket-orbit' },
    { keywords: ['valeur', 'prix', 'cher', 'luxe', 'diamant', 'offre', 'qualité', 'premium'], id: 'diamond-prism' },
    { keywords: ['client', 'accord', 'vendre', 'vente', 'closing', 'partenaire', 'contrat', 'confiance'], id: 'handshake-deal' },
    { keywords: ['sécurité', 'protéger', 'garantie', 'risque', 'bouclier'], id: 'shield-trust' },
    { keywords: ['leader', 'roi', 'numéro 1', 'autorité', 'statut', 'couronne', 'expert'], id: 'crown-minimal' },
    { keywords: ['cible', 'précis', 'flèche', 'viser', 'exact'], id: 'target-arrow' },
    { keywords: ['80/20', '80%', '20%', 'compar', 'avant', 'après', 'erreur', 'équilibre'], id: 'scale-justice' },
    { keywords: ['stratégie', 'échec', 'positionnement', 'gagner', 'concurrent', 'plan'], id: 'chess-strategy' },
    { keywords: ['secret', 'clé', 'porte', 'accéder', 'caché', '99%'], id: 'keyhole-portal' },
    { keywords: ['débloquer', 'cadenas', 'libérer', 'ouvrir', 'solution'], id: 'lock-unlocked' },
    { keywords: ['objectif', 'sommet', 'montagne', 'réussir', 'ambition', 'défi'], id: 'mountain-flag' },
    { keywords: ['direction', 'boussole', 'chemin', 'partir', 'lancer', 'démarrer'], id: 'compass-plane' },
    { keywords: ['étoile', 'polaire', 'mission', 'guide', 'cap'], id: 'star-compass' },
    { keywords: ['écrire', 'texte', 'copywriting', 'hook', 'mot', 'script'], id: 'feather-ink' },
    { keywords: ['parler', 'voix', 'annonce', 'message', 'porte-voix', 'audience'], id: 'megaphone-waves' },
    { keywords: ['idée', 'inspiration', 'créer', 'créatif', 'main', 'étincelle'], id: 'hands-spark' },
    { keywords: ['déclic', 'éclair', 'choc', 'instantané', 'puissance'], id: 'lightning-bolt' },
    { keywords: ['apprendre', 'livre', 'étude', 'savoir', 'connaissance', 'école', 'lire'], id: 'book-fountain' },
    { keywords: ['attirer', 'aimant', 'abonné', 'communauté', 'magnétique'], id: 'magnet-attraction' },
    { keywords: ['réseau', 'viral', 'algorithme', 'ia', 'intelligence artificielle', 'tech', 'digital'], id: 'network-nodes' },
    { keywords: ['système', 'infini', 'automatique', 'automatiser', 'boucle'], id: 'infinity-loop' },
    { keywords: ['formule', 'alchimie', 'méthode', 'science', 'dosage'], id: 'potion-alchemy' },
    { keywords: ['vision', 'futur', 'loin', 'observer', 'analyser', 'tendance', '2026'], id: 'telescope-stars' },
    { keywords: ['regard', 'voir', 'lucidité', 'attention', 'œil'], id: 'eye-vision' },
    { keywords: ['bruit', 'phare', 'lumière', 'repère'], id: 'lighthouse-beam' },
    { keywords: ['photo', 'image', 'visuel', 'instagram', 'tiktok', 'design'], id: 'vintage-camera' },
    { keywords: ['musique', 'son', 'audio', 'vinyle', 'flow'], id: 'vinyl-rhythm' },
    { keywords: ['fondation', 'pilier', 'base', 'solide', 'architecture'], id: 'greek-column' },
    { keywords: ['priorité', 'pyramide', 'hiérarchie', 'étape'], id: 'steps-pyramid' },
    { keywords: ['pont', 'passer', 'transformation', 'transition', 'changer'], id: 'bridge-chasm' },
    { keywords: ['adn', 'identité', 'profond', 'mutation'], id: 'dna-evolution' },
    { keywords: ['graine', 'arbre', 'patience', 'cultiver', 'grandir'], id: 'seedling-tree' },
    { keywords: ['miroir', 'soi', 'vérité', 'introspection'], id: 'mirror-portal' },
    { keywords: ['ancre', 'stabilité', 'ancrer'], id: 'anchor-depth' },
    { keywords: ['monde', 'global', 'internet', 'liberté'], id: 'globe-meridian' },
    { keywords: ['origami', 'léger', 'japon', 'pli'], id: 'origami-bird' },
    { keywords: ['fenêtre', 'ouverture', 'perspective'], id: 'arch-window' },
    { keywords: ['harmonie', 'ensemble', 'combiner', 'puzzle'], id: 'puzzle-harmony' },
    { keywords: ['excellence', 'meilleur', 'récompense', 'favoris', 'enregistre', 'laurier'], id: 'trophy-laurel' },
    { keywords: ['carnet', 'bureau', 'travail', 'note', 'café', 'atelier'], id: 'creative-desk' },
    { keywords: ['minimalisme', 'simple', 'simplicité', 'alléger'], id: 'mobile-balance' },
  ];

  for (const rule of rules) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.id;
    }
  }

  const rotation = [
    'stairway-sun',
    'brain-synapse',
    'diamond-prism',
    'hourglass-bloom',
    'compass-plane',
    'scale-justice',
    'lightning-bolt',
    'trophy-laurel',
  ];
  return rotation[fallbackIndex % rotation.length];
}

interface NicheKnowledge {
  keywords: string[];
  recommendedTheme: EditorialThemeId;
  recommendedStyle: VisualStyleId;
  recommendedFont: FontPairingId;
  statValue: string;
  statLabel: string;
  statTitle: string;
  statSubtitle: string;
  mythTitle: string;
  mythWrong: string;
  mythRight: string;
  step1Title: string;
  step1Subtitle: string;
  checklistTitle: string;
  checklistItems: string[];
  quoteText: string;
}

const NICHE_DATABASE: NicheKnowledge[] = [
  {
    keywords: ['procrastination', 'concentration', 'focus', 'productivité', 'temps', 'organisation', 'travail', 'habitude', 'discipline', 'routine'],
    recommendedTheme: 'kinfolk-linen',
    recommendedStyle: 'shodwe-brush',
    recommendedFont: 'outfit-space',
    statValue: '23 min',
    statLabel: 'C’est le temps exact qu’il faut à ton cerveau pour se reconcentrer après une seule notification (Étude UC Irvine).',
    statTitle: 'Tu ne manques pas de volonté. Tu manques de *clarté énergétique*.',
    statSubtitle: 'La procrastination n’est jamais de la paresse : c’est une réponse du cerveau face à une tâche trop floue.',
    mythTitle: 'L’erreur qui détruit *90% de tes journées*',
    mythWrong: 'Faire une liste de 15 tâches le matin et répondre aux messages dès le réveil.',
    mythRight: 'Verrouiller 1 seule priorité critique la veille au soir et travailler 90 min en mode avion.',
    step1Title: 'La Règle des *2 Minutes* pour briser l’inertie.',
    step1Subtitle: 'Ne cherche pas à terminer le projet : oblige-toi seulement à travailler dessus pendant 120 secondes. Le mouvement crée la motivation.',
    checklistTitle: 'Le protocole *anti-procrastination* en 3 points',
    checklistItems: [
      'Découper tout objectif intimidant en *une sous-action de 5 minutes*',
      'Laisser son téléphone *dans une autre pièce* pendant le premier bloc de travail',
      'Définir son *objectif n°1 du lendemain* avant de fermer son ordinateur le soir',
    ],
    quoteText: '« L’amateur attend d’être inspiré pour agir. Le professionnel agit et laisse *l’action créer l’inspiration*. »',
  },
  {
    keywords: ['ia', 'intelligence artificielle', 'chatgpt', 'automatisation', 'tech', 'outil', 'prompt', 'claude', 'futur'],
    recommendedTheme: 'galerie-cobalt',
    recommendedStyle: 'nexora-acid-lime',
    recommendedFont: 'anton-jakarta',
    statValue: '4,2 h',
    statLabel: 'Gagnées chaque jour par les indépendants qui délèguent leurs tâches répétitives à des systèmes IA structurés.',
    statTitle: 'L’IA ne va pas te remplacer. Mais quelqu’un qui *maîtrise les systèmes IA* le fera.',
    statSubtitle: 'En 2026, utiliser l’IA comme un simple moteur de recherche revient à utiliser une Formule 1 pour aller chercher le pain.',
    mythTitle: 'Prompt Amateur vs *Architecture IA*',
    mythWrong: 'Taper une phrase vague (« Écris-moi un post ») et obtenir un texte robotique sans âme.',
    mythRight: 'Donner un Rôle, un Contexte précis, 3 Exemples de ton style et des Contraintes strictes.',
    step1Title: 'La formule *R.C.E.C* pour des résultats parfaits.',
    step1Subtitle: 'Rôle + Contexte + Exemple + Contrainte : ces 4 briques transforment n’importe quel modèle IA en expert senior à ton service.',
    checklistTitle: 'Les *3 réflexes IA* à adopter dès aujourd’hui',
    checklistItems: [
      'Créer une *bibliothèque de tes meilleurs prompts* au lieu de repartir de zéro',
      'Toujours fournir *ton propre angle et ton expérience* avant de générer',
      'Interdire les mots génériques et imposer un *style direct et incarné*',
    ],
    quoteText: '« L’intelligence artificielle amplifie la clarté de ta pensée. Si ta pensée est floue, *le résultat sera flou*. »',
  },
  {
    keywords: ['argent', 'finance', 'investir', 'investissement', 'bourse', 'épargne', 'liberté financière', 'richesse', 'budget', 'crypto', 'immobilier'],
    recommendedTheme: 'emerald-luxury',
    recommendedStyle: 'simplist-highlight',
    recommendedFont: 'playfair-dmsans',
    statValue: '8ème',
    statLabel: 'Merveille du monde selon Einstein : les intérêts composés transforment la régularité modeste en patrimoine massif.',
    statTitle: 'Ce n’est pas combien tu gagnes qui compte, mais *combien tu fais travailler*.',
    statSubtitle: 'La vraie richesse est silencieuse : elle se construit par des systèmes automatiques, pas par des coups de chance.',
    mythTitle: 'Le piège de l’épargnant vs *L’Investisseur*',
    mythWrong: 'Attendre ce qu’il reste à la fin du mois pour épargner et chercher le coup de poker parfait.',
    mythRight: 'Se payer en premier le 1er du mois (15% à 20% automatisés) sur des actifs diversifiés à long terme.',
    step1Title: 'Automatise ton *taux d’investissement* dès le jour de paie.',
    step1Subtitle: 'Si tu ne vois pas l’argent sur ton compte courant, tu ne le dépenses pas. L’automatisation bat la discipline.',
    checklistTitle: 'Les *3 règles d’or* d’une finance saine',
    checklistItems: [
      'Bâtir un *matelas de sécurité de 3 à 6 mois* avant toute prise de risque',
      'Investir à *date fixe chaque mois* (DCA) sans regarder les émotions du marché',
      'Éviter l’inflation du style de vie quand *tes revenus augmentent*',
    ],
    quoteText: '« La liberté financière, c’est quand tes actifs génèrent plus que *le coût de ta vie idéale*. »',
  },
  {
    keywords: ['vente', 'vendre', 'business', 'client', 'marketing', 'offre', 'entrepreneur', 'freelance', 'e-commerce', 'marque', 'prix', 'copywriting', 'site', 'confiance'],
    recommendedTheme: 'kinfolk-linen',
    recommendedStyle: 'skale-pinned-notes',
    recommendedFont: 'outfit-space',
    statValue: '85%',
    statLabel: 'Des décisions d’achat sont prises par l’émotion en moins de 5 secondes, puis justifiées par la logique.',
    statTitle: 'Les gens n’achètent jamais ton produit. Ils achètent *leur propre transformation*.',
    statSubtitle: 'Arrête de lister tes fonctionnalités techniques : parle du problème brûlant que tu résous dans leur vie.',
    mythTitle: 'Vendeur insistant vs *Offre Irrésistible*',
    mythWrong: 'Baisser ses prix pour convaincre et parler uniquement de soi et de sa méthode.',
    mythRight: 'Quantifier le coût du problème, prouver le résultat rapide et réduire le risque à zéro.',
    step1Title: 'Vends la *destination*, pas les caractéristiques de l’avion.',
    step1Subtitle: 'Ton client veut savoir à quelle vitesse il atteindra son résultat et quel obstacle tu vas lui éviter.',
    checklistTitle: 'Les *3 piliers* d’une offre de haute valeur',
    checklistItems: [
      'Promettre un *résultat tangible et mesurable* dans un délai clair',
      'Apporter une *preuve visuelle ou chiffrée* dès les premières secondes',
      'Supprimer la friction avec une *garantie et une étape simple*',
    ],
    quoteText: '« Le prix n’est un problème que lorsque *la valeur perçue* n’est pas assez claire. »',
  },
  {
    keywords: ['sommeil', 'dormir', 'santé', 'sport', 'fitness', 'perdre du poids', 'énergie', 'nutrition', 'corps', 'fatigue', 'forme'],
    recommendedTheme: 'emerald-luxury',
    recommendedStyle: 'data-charts-glass',
    recommendedFont: 'cormorant-jakarta',
    statValue: '90 min',
    statLabel: 'La durée d’un cycle complet de récupération profonde : la qualité de tes nuits dicte 100% de ton énergie du lendemain.',
    statTitle: 'Ton énergie est ton *actif le plus précieux*. Arrête de la brûler par les deux bouts.',
    statSubtitle: 'Aucun café ni aucune technique de productivité ne peut compenser une biologie épuisée.',
    mythTitle: 'Régime extrême vs *Biologie Durable*',
    mythWrong: 'Tout changer du jour au lendemain pendant 10 jours puis abandonner par épuisement.',
    mythRight: 'Ancrer 3 micro-habitudes physiologiques simples qui tiennent toute l’année sans frustration.',
    step1Title: 'La règle du *Soleil Matinal* et du repos profond.',
    step1Subtitle: '10 minutes de lumière naturelle au réveil règlent ton horloge biologique et préparent ton sommeil 14 heures plus tard.',
    checklistTitle: 'Les *3 habitudes vitales* à ancrer dès ce soir',
    checklistItems: [
      'Couper les écrans lumineux *60 minutes avant de dormir*',
      'Marcher *8 000 à 10 000 pas par jour* pour activer la récupération',
      'Garder des *horaires de lever réguliers* (à 30 minutes près)',
    ],
    quoteText: '« Prends soin de ta biologie en premier : c’est le seul endroit où *tu dois vivre toute ta vie*. »',
  },
  {
    keywords: ['tiktok', 'instagram', 'contenu', 'carrousel', 'créateur', 'abonné', 'vue', 'algorithme', 'réseaux sociaux', 'viral', 'hook', 'ui', 'design'],
    recommendedTheme: 'lavender-silk',
    recommendedStyle: 'designmates-giant-num',
    recommendedFont: 'fraunces-space',
    statValue: '2,8 sec',
    statLabel: 'Le temps exact dont dispose ta première slide pour stopper le pouce avant que l’utilisateur ne continue de scroller.',
    statTitle: 'L’algorithme ne récompense pas les plus beaux comptes. Il récompense *la rétention et les Saves*.',
    statSubtitle: 'En 2026 sur TikTok Photo Mode et Instagram, les enregistrements (Saves) et les partages en DM sont les signaux rois.',
    mythTitle: 'Poster pour poster vs *Créer pour les Favoris*',
    mythWrong: 'Écrire des titres vagues (« 5 astuces business ») sur des visuels surchargés de texte.',
    mythRight: 'Ouvrir une boucle de curiosité en Slide 1 et offrir une fiche mémo sauvegardable en fin de post.',
    step1Title: 'Ta Slide 1 attire le regard, ta *Slide 2 verrouille le swipe*.',
    step1Subtitle: '80% de la bataille se joue sur tes deux premières images : enchaîne une promesse forte avec un chiffre ou un constat choc.',
    checklistTitle: 'L’anatomie d’un *post viral* en 3 règles',
    checklistItems: [
      'Un Hook de couverture en *moins de 9 mots* qui casse une croyance',
      'Une alternance entre *Chiffre choc, Avant/Après et Illustration*',
      'Un appel à l’action tourné vers *l’enregistrement en favoris*',
    ],
    quoteText: '« Ne crée pas du contenu pour remplir le fil d’actualité. Crée des ressources qu’on a *peur de perdre si on ne les enregistre pas*. »',
  },
];

export function buildSmartAICarousel(params: {
  topic: string;
  carouselType: CarouselTypeId;
  visualStyle: VisualStyleId;
  formatId: PlatformFormatId;
  themeId: EditorialThemeId;
  fontPairingId: FontPairingId;
  authorHandle?: string;
  customAccentColor?: string;
  webSnippet?: string;
}): CarouselProject {
  const rawTopic = params.topic.trim() || 'La psychologie du succès';
  const cleanTopic = rawTopic.charAt(0).toUpperCase() + rawTopic.slice(1);
  const lower = rawTopic.toLowerCase();

  const matchedNiche = NICHE_DATABASE.find((n) =>
    n.keywords.some((kw) => lower.includes(kw))
  );

  let activeType: CarouselTypeId = params.carouselType;
  if (activeType === 'auto-smart') {
    if (lower.includes('erreur') || lower.includes('mythe') || lower.includes('faux') || lower.includes('arrête')) {
      activeType = 'myth-buster';
    } else if (lower.includes('chiffre') || lower.includes('étude') || lower.includes('stat') || lower.includes('analys')) {
      activeType = 'stats-proof';
    } else if (lower.includes('avant') || lower.includes('après') || lower.includes('passer de') || lower.includes('transform')) {
      activeType = 'before-after';
    } else if (lower.includes('histoire') || lower.includes('comment j') || lower.includes('mon ') || lower.includes('déclic')) {
      activeType = 'story-pov';
    } else if (lower.includes('secret') || lower.includes('outil') || lower.includes('astuce') || lower.includes('personne')) {
      activeType = 'secret-list';
    } else {
      activeType = 'framework-system';
    }
  }

  let coverKicker = 'ÉDITION SPÉCIALE';
  let coverTitle = '';
  let coverSubtitle = '';
  let hookStrategy = '';

  switch (activeType) {
    case 'myth-buster':
      coverKicker = 'MYTHE VS RÉALITÉ';
      coverTitle = `Tout ce qu’on t’a dit sur *${cleanTopic.toLowerCase()}* est faux. Voici la réalité.`;
      coverSubtitle = 'Pourquoi 95% des gens appliquent la mauvaise méthode — et par quoi la remplacer.';
      hookStrategy = 'Dissonance cognitive (Mythe vs Réalité)';
      break;
    case 'stats-proof':
      coverKicker = 'ÉTUDE & CHIFFRES CLÉS';
      coverTitle = `J’ai analysé ce qui marche vraiment en *${cleanTopic.toLowerCase()}*. Voici les preuves.`;
      coverSubtitle = 'Les chiffres, les lois invisibles et le protocole exact en 6 slides.';
      hookStrategy = 'Autorité par la donnée chiffrée';
      break;
    case 'before-after':
      coverKicker = 'TRANSFORMATION';
      coverTitle = `*${cleanTopic}* : comment passer d’amateur à référence sans s’épuiser.`;
      coverSubtitle = 'Le comparatif complet entre l’ancienne méthode et la nouvelle approche.';
      hookStrategy = 'Contraste Avant / Après immédiat';
      break;
    case 'story-pov':
      coverKicker = 'RÉCIT & DÉCLIC';
      coverTitle = `Ce simple déclic sur *${cleanTopic.toLowerCase()}* a changé tous mes résultats.`;
      coverSubtitle = 'L’erreur qui me bloquait au départ et les 3 règles qui ont tout débloqué.';
      hookStrategy = 'Storytelling immersif & empathie';
      break;
    case 'secret-list':
      coverKicker = 'LES SECRETS BIEN GARDÉS';
      coverTitle = `Les 5 règles sur *${cleanTopic.toLowerCase()}* que 99% des gens découvrent trop tard.`;
      coverSubtitle = 'Enregistre ce carrousel avant de scroller : chaque slide est une pépite.';
      hookStrategy = 'Curiosity Gap & Exclusivité';
      break;
    case 'framework-system':
    default:
      coverKicker = 'SYSTÈME & MÉTHODE';
      coverTitle = `La méthode complète pour maîtriser *${cleanTopic.toLowerCase()}* étape par étape.`;
      coverSubtitle = 'Condensé en 6 slides illustrées simples, concrètes et prêtes à appliquer.';
      hookStrategy = 'Promesse de système sauvegardable (Aimant à Saves)';
      break;
  }

  const slide1Text = `${coverTitle} ${rawTopic}`;
  const slide2Title = matchedNiche
    ? matchedNiche.statTitle
    : `En *${cleanTopic.toLowerCase()}*, un seul levier concentre l’essentiel de l’impact.`;
  const slide2Subtitle = matchedNiche
    ? matchedNiche.statSubtitle
    : params.webSnippet ||
      `Ceux qui obtiennent des résultats exceptionnels sur ${cleanTopic.toLowerCase()} ne travaillent pas plus : ils verrouillent les bonnes fondations dès le départ.`;

  const slide3Title = matchedNiche
    ? matchedNiche.mythTitle
    : `L’erreur classique vs *La méthode gagnante*`;
  const slide3Left = matchedNiche
    ? matchedNiche.mythWrong
    : `Improviser au jour le jour sur ${cleanTopic.toLowerCase()} en copiant les méthodes compliquées de tout le monde.`;
  const slide3Right = matchedNiche
    ? matchedNiche.mythRight
    : `Appliquer un système épuré en 3 étapes, mesurable et régulier chaque semaine.`;

  const slide4Title = matchedNiche
    ? matchedNiche.step1Title
    : `Élimine 80% du bruit pour *tripler ta vitesse* sur ${cleanTopic.toLowerCase()}.`;
  const slide4Subtitle = matchedNiche
    ? matchedNiche.step1Subtitle
    : `La simplicité est le raccourci ultime : concentre toute ton attention sur l’action qui produit un résultat visible dès les premières 48 heures.`;

  const slide5Title = matchedNiche
    ? matchedNiche.checklistTitle
    : `Les *3 règles d’or* à enregistrer sur ${cleanTopic.toLowerCase()}`;
  const slide5Bullets = matchedNiche
    ? matchedNiche.checklistItems
    : [
        `Fixer *un seul objectif mesurable* avant chaque session dédiée à ${cleanTopic.toLowerCase()}`,
        `Remplacer l’improvisation par *un rituel simple et répétable*`,
        `Analyser ce qui a donné *le plus de résultats* tous les 7 jours`,
      ];

  const slide6Quote = matchedNiche
    ? matchedNiche.quoteText
    : `« En *${cleanTopic.toLowerCase()}*, la constance dans la simplicité bat toujours l’intensité dans la complexité. »`;

  const rawSlides: SlideItem[] = [
    {
      id: `ai-s1-${Date.now()}`,
      layout: 'cover-editorial',
      kicker: coverKicker,
      title: coverTitle,
      subtitle: coverSubtitle,
      body: '',
      illustrationId: matchIllustrationToText(slide1Text, 0),
      swipePrompt: 'Découvrir →',
    },
    {
      id: `ai-s2-${Date.now()}`,
      layout: 'big-stat',
      kicker: '01 — LE CONSTAT CHIFFRÉ',
      title: slide2Title,
      subtitle: slide2Subtitle,
      statValue: matchedNiche ? matchedNiche.statValue : '80/20',
      statLabel: matchedNiche
        ? matchedNiche.statLabel
        : `80% des résultats en ${cleanTopic.toLowerCase()} viennent de 20% d’actions clés bien ciblées.`,
      body: '',
      illustrationId: matchIllustrationToText(slide2Title + ' ' + (matchedNiche?.statLabel || ''), 1),
      swipePrompt: 'L’erreur à éviter →',
    },
    {
      id: `ai-s3-${Date.now()}`,
      layout: 'comparison-split',
      kicker: '02 — LE VRAI DÉCLIC',
      title: slide3Title,
      subtitle: '',
      body: '',
      comparisonLeftTitle: 'Ce que 90% font',
      comparisonLeftText: slide3Left,
      comparisonRightTitle: 'Ce qui marche vraiment',
      comparisonRightText: slide3Right,
      illustrationId: 'scale-justice',
      swipePrompt: 'La méthode →',
    },
    {
      id: `ai-s4-${Date.now()}`,
      layout: 'numbered-insight',
      kicker: '03 — LE LEVIER PRIORITAIRE',
      title: slide4Title,
      subtitle: slide4Subtitle,
      body: '',
      illustrationId: matchIllustrationToText(slide4Title + ' ' + slide4Subtitle, 2),
      swipePrompt: 'La fiche mémo →',
    },
    {
      id: `ai-s5-${Date.now()}`,
      layout: 'checklist-card',
      kicker: '04 — FICHE MÉMO À GARDER',
      title: slide5Title,
      subtitle: '',
      body: '',
      bulletPoints: slide5Bullets,
      illustrationId: matchIllustrationToText(slide5Title + ' ' + slide5Bullets.join(' '), 4),
      swipePrompt: 'Conclusion →',
    },
    {
      id: `ai-s6-${Date.now()}`,
      layout: 'cta-outro',
      kicker: '05 — À RETENIR',
      title: `${slide6Quote}`,
      subtitle: `📌 Enregistre ce post en favoris pour l’avoir sous les yeux et partage-le en story !`,
      body: '',
      illustrationId: 'trophy-laurel',
      swipePrompt: 'Enregistrer 📌',
    },
  ];

  const usedIds = new Set<string>();
  const fallbacks = [
    'stairway-sun',
    'brain-synapse',
    'diamond-prism',
    'hourglass-bloom',
    'compass-plane',
    'lightning-bolt',
    'lotus-mind',
    'hands-spark',
  ];
  rawSlides.forEach((sl, idx) => {
    if (sl.illustrationId && usedIds.has(sl.illustrationId)) {
      const replacement =
        fallbacks.find((f) => !usedIds.has(f)) || fallbacks[idx % fallbacks.length];
      sl.illustrationId = replacement;
    }
    if (sl.illustrationId) usedIds.add(sl.illustrationId);
  });

  const typeObj =
    CAROUSEL_TYPES.find((t) => t.id === activeType) || CAROUSEL_TYPES[1];
  const chosenStyle = params.visualStyle || matchedNiche?.recommendedStyle || 'skale-pinned-notes';
  const styleObj =
    VISUAL_STYLES.find((s) => s.id === chosenStyle) || VISUAL_STYLES[0];

  return {
    id: `ai-carousel-${Date.now()}`,
    title: cleanTopic,
    topic: cleanTopic,
    targetAudience: 'Créateurs & Entrepreneurs',
    formatId: params.formatId,
    themeId: matchedNiche?.recommendedTheme || params.themeId,
    visualStyle: chosenStyle,
    carouselType: activeType,
    customAccentColor: params.customAccentColor,
    fontPairingId: matchedNiche?.recommendedFont || params.fontPairingId,
    frameStyle: 'magazine-border',
    frameworkId: 'pas-viral',
    authorName: 'Atelier',
    authorHandle: params.authorHandle || '@atelier.carrousel',
    authorRole: '',
    showGrain: false,
    showSwipeIndicator: true,
    showSlideNumbers: true,
    respectSafeZones: true,
    slides: rawSlides,
    caption: `${coverTitle.replace(/\*/g, '')}\n\n${coverSubtitle}\n\nDans ce carrousel sur ${cleanTopic.toLowerCase()} :\n01. ${slide2Title.replace(/\*/g, '')}\n02. ${slide3Title.replace(/\*/g, '')}\n03. ${slide4Title.replace(/\*/g, '')}\n04. ${slide5Title.replace(/\*/g, '')}\n\n📌 Enregistre ce post en favoris pour y revenir plus tard !`,
    hashtags: [
      `#${cleanTopic.toLowerCase().replace(/[^a-z0-9]/gi, '').slice(0, 16) || 'carrousel'}`,
      '#carrousel',
      '#tiktokphotomode',
      '#instagram',
      '#conseils',
    ],
    recommendedAudio: 'Piano lo-fi / Instrumental esthétique',
    aiDecisionSummary: {
      detectedNiche: matchedNiche ? 'Expertise Spécialisée détectée' : 'Analyse Sémantique Sur-Mesure',
      chosenTypeLabel: typeObj.name,
      chosenStyleLabel: styleObj.name,
      hookStrategy,
    },
  };
}
