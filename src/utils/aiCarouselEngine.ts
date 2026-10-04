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
  recommendedVisualStyle: VisualStyleId;
  sampleTopic: string;
}

export const CAROUSEL_TYPES: CarouselTypeSpec[] = [
  {
    id: 'auto-smart',
    name: '✨ Création guidée',
    badge: 'Recommandé',
    description: 'Le studio propose un angle, construit une progression claire et associe des illustrations pertinentes.',
    recommendedVisualStyle: 'studio-grid-system',
    sampleTopic: 'Comment créer un contenu qui attire des clients',
  },
  {
    id: 'framework-system',
    name: '📐 Méthode pas à pas',
    badge: 'À enregistrer',
    description: 'Transforme un sujet en étapes simples avec un récapitulatif pratique.',
    recommendedVisualStyle: 'studio-grid-system',
    sampleTopic: 'Une méthode simple pour mieux organiser sa semaine',
  },
  {
    id: 'myth-buster',
    name: '⚡ Mythe & réalité',
    badge: 'Contraste',
    description: 'Présente une idée reçue, nuance le point de vue et explique quoi faire à la place.',
    recommendedVisualStyle: 'kinetic-type',
    sampleTopic: 'Mythe ou réalité : faut-il publier tous les jours ?',
  },
  {
    id: 'stats-proof',
    name: '📊 Données & preuves',
    badge: 'À vérifier',
    description: 'Structure des preuves et des indicateurs sans inventer de chiffres : ajoute les sources avant publication.',
    recommendedVisualStyle: 'dashboard-analytics',
    sampleTopic: 'Les indicateurs à suivre pour améliorer son contenu',
  },
  {
    id: 'before-after',
    name: '🔄 Avant / après',
    badge: 'Transformation',
    description: 'Rend visible le changement entre une situation de départ et une nouvelle approche.',
    recommendedVisualStyle: 'paper-collage',
    sampleTopic: 'Avant / après : simplifier sa stratégie de contenu',
  },
  {
    id: 'story-pov',
    name: '📖 Récit & déclic',
    badge: 'Storytelling',
    description: 'Un récit court, un obstacle clair et une leçon concrète à retenir.',
    recommendedVisualStyle: 'story-frames',
    sampleTopic: 'Le déclic qui m’a aidé à mieux gérer mon temps',
  },
  {
    id: 'secret-list',
    name: '🗝️ Liste de conseils',
    badge: 'Curiosité',
    description: 'Une sélection de pistes utiles avec une promesse précise et une conclusion mémorisable.',
    recommendedVisualStyle: 'aurora-glass',
    sampleTopic: 'Les habitudes qui rendent une routine plus efficace',
  },
  {
    id: 'diagnostic-audit',
    name: '🩺 Auto-diagnostic express',
    badge: 'Interactif',
    description: 'Aide le lecteur à repérer son principal blocage, puis lui donne une première action.',
    recommendedVisualStyle: 'dashboard-analytics',
    sampleTopic: 'Audit express de sa présence sur Instagram',
  },
  {
    id: 'seven-day-plan',
    name: '🗓️ Plan d’action sur 7 jours',
    badge: 'Challenge',
    description: 'Un défi progressif : une action simple par jour et un bilan final.',
    recommendedVisualStyle: 'story-frames',
    sampleTopic: '7 jours pour construire une routine de création de contenu',
  },
  {
    id: 'case-study',
    name: '🔎 Étude de cas',
    badge: 'Décomposition',
    description: 'Décompose le contexte, le choix stratégique, les preuves et les enseignements à réutiliser.',
    recommendedVisualStyle: 'dashboard-analytics',
    sampleTopic: 'Étude de cas : lancer une offre avec une petite audience',
  },
  {
    id: 'resource-kit',
    name: '🧰 Kit pratique à sauvegarder',
    badge: 'Ressource',
    description: 'Fournit une checklist, un mini-plan et des consignes directement réutilisables.',
    recommendedVisualStyle: 'studio-grid-system',
    sampleTopic: 'Kit de lancement pour son premier carrousel Instagram',
  },
  {
    id: 'decision-path',
    name: '🧭 Guide de décision',
    badge: 'Choisir sa voie',
    description: 'Un arbre de décision simple qui guide vers l’option adaptée à la situation.',
    recommendedVisualStyle: 'aurora-glass',
    sampleTopic: 'Comment choisir le bon format de contenu pour son objectif',
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
    description: 'Bleu royal et gris clair, cartes analytiques et graphiques décoratifs à compléter avec des données sourcées',
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
    description: 'Anneaux et graphiques décoratifs, avec un emplacement visible pour ajouter des données vérifiées',
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
  {
    id: 'aurora-glass',
    name: '🌌 Verre Aurora',
    badge: 'Nouveau · Premium',
    description: 'Cartes translucides, halos lumineux maîtrisés et détails fins, entièrement recolorables.',
  },
  {
    id: 'kinetic-type',
    name: '🔠 Typographie Cinétique',
    badge: 'Nouveau · Impact',
    description: 'Titres éditoriaux XXL, numéros de chapitre et accent typographique énergique.',
  },
  {
    id: 'paper-collage',
    name: '🧩 Collage Papier',
    badge: 'Nouveau · Créatif',
    description: 'Plans superposés, rubans colorés et illustration façon moodboard éditorial.',
  },
  {
    id: 'dashboard-analytics',
    name: '📈 Dashboard Analytics',
    badge: 'Nouveau · Pro',
    description: 'Cartes de données et structure nette ; les indicateurs restent à compléter avec des sources vérifiées.',
  },
  {
    id: 'studio-grid-system',
    name: '📐 Grille Studio Pro',
    badge: 'Nouveau · Swiss',
    description: 'Grille de mise en page précise, repères éditoriaux et alignements professionnels.',
  },
  {
    id: 'story-frames',
    name: '🎞️ Récit en Séquences',
    badge: 'Nouveau · Story',
    description: 'Repères de progression, chapitres et rythme visuel pour raconter une transformation.',
  },
];

export function matchIllustrationToText(text: string, fallbackIndex = 0): string {
  const lower = text.toLowerCase();

  const rules: { keywords: string[]; id: string }[] = [
    { keywords: ['cerveau', 'neuro', 'synapse', 'cognitif', 'mental', 'dopamine', 'penser'], id: 'brain-synapse' },
    { keywords: ['temps', 'seconde', 'minute', 'sablier', 'chrono', 'tard'], id: 'hourglass-bloom' },
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
    { keywords: ['compar', 'avant', 'après', 'erreur', 'équilibre'], id: 'scale-justice' },
    { keywords: ['stratégie', 'échec', 'positionnement', 'gagner', 'concurrent', 'plan'], id: 'chess-strategy' },
    { keywords: ['secret', 'clé', 'porte', 'accéder', 'caché'], id: 'keyhole-portal' },
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
  mythTitle: string;
  mythWrong: string;
  mythRight: string;
  step1Title: string;
  step1Subtitle: string;
  checklistTitle: string;
  checklistItems: string[];
  quoteText: string;
  captionNote?: string;
}

const NICHE_DATABASE: NicheKnowledge[] = [
  {
    keywords: ['procrastination', 'concentration', 'focus', 'productivité', 'temps', 'organisation', 'travail', 'habitude', 'discipline', 'routine'],
    recommendedTheme: 'kinfolk-linen',
    recommendedStyle: 'shodwe-brush',
    recommendedFont: 'outfit-space',
    mythTitle: 'La fausse solution vs *une approche plus réaliste*',
    mythWrong: 'Multiplier les outils et remplir sa journée sans choisir la prochaine priorité.',
    mythRight: 'Définir une action claire, réduire les distractions et prévoir un moment adapté pour commencer.',
    step1Title: 'Rends la première action *facile à commencer*.',
    step1Subtitle: 'Découpe la tâche jusqu’à ce que le premier geste soit évident. Observe ce qui te bloque et ajuste ton environnement.',
    checklistTitle: 'Un protocole simple pour *passer à l’action*',
    checklistItems: [
      'Nommer la prochaine action avec un verbe concret',
      'Éloigner les distractions pendant le créneau choisi',
      'Noter ce qui a aidé avant de recommencer',
    ],
    quoteText: '« Quand la prochaine action est claire, il devient plus facile de s’y mettre. »',
  },
  {
    keywords: ['ia', 'intelligence artificielle', 'chatgpt', 'automatisation', 'tech', 'outil', 'prompt', 'claude', 'futur'],
    recommendedTheme: 'galerie-cobalt',
    recommendedStyle: 'nexora-acid-lime',
    recommendedFont: 'anton-jakarta',
    mythTitle: 'Prompt vague vs *brief contextualisé*',
    mythWrong: 'Demander un texte générique sans préciser le public, l’objectif ni le ton.',
    mythRight: 'Fournir le contexte, son angle, un exemple de style et les limites à respecter.',
    step1Title: 'Structure ta consigne avec *Rôle, Contexte, Exemple, Contraintes*.',
    step1Subtitle: 'Décris le rôle attendu, apporte le contexte, montre un exemple et précise les limites. Relis la sortie : un texte généré n’est pas une source.',
    checklistTitle: 'Les bons réflexes pour *utiliser une IA*',
    checklistItems: [
      'Formuler le public, le besoin et le résultat attendu',
      'Ajouter un exemple fidèle à ta voix',
      'Vérifier les faits et retirer les éléments inventés',
    ],
    quoteText: '« Un bon résultat commence par une consigne claire et se termine par une relecture humaine. »',
  },
  {
    keywords: ['argent', 'finance', 'investir', 'investissement', 'bourse', 'épargne', 'liberté financière', 'richesse', 'budget', 'crypto', 'immobilier'],
    recommendedTheme: 'emerald-luxury',
    recommendedStyle: 'simplist-highlight',
    recommendedFont: 'playfair-dmsans',
    mythTitle: 'Le bon moment vs *un plan adapté à sa situation*',
    mythWrong: 'Décider sur une promesse de rendement ou une tendance isolée.',
    mythRight: 'Clarifier ses objectifs, ses contraintes et son horizon avant d’étudier les options.',
    step1Title: 'Commence par clarifier *ton budget et ton objectif*.',
    step1Subtitle: 'Distingue les dépenses nécessaires, les priorités et les sommes que tu peux réellement engager. Compare les risques, les frais et les sources avant toute décision.',
    checklistTitle: 'Des repères pour *évaluer une décision financière*',
    checklistItems: [
      'Écrire ses objectifs et l’horizon envisagé',
      'Comprendre les risques et les frais de chaque option',
      'Vérifier les sources et se méfier des promesses garanties',
    ],
    quoteText: '« Une décision financière mérite du contexte, des sources et une vraie compréhension des risques. »',
    captionNote: 'Contenu éducatif général : ce carrousel ne constitue pas un conseil financier personnalisé.',
  },
  {
    keywords: ['vente', 'vendre', 'business', 'client', 'marketing', 'offre', 'entrepreneur', 'freelance', 'e-commerce', 'marque', 'prix', 'copywriting', 'site', 'confiance'],
    recommendedTheme: 'kinfolk-linen',
    recommendedStyle: 'skale-pinned-notes',
    recommendedFont: 'outfit-space',
    mythTitle: 'Parler des fonctionnalités vs *montrer la valeur*',
    mythWrong: 'Lister les caractéristiques sans les relier aux besoins du public.',
    mythRight: 'Expliquer à qui l’offre s’adresse, quel problème elle traite et quelles sont ses limites.',
    step1Title: 'Ancre ton message dans *le problème de ton public*.',
    step1Subtitle: 'Décris une situation concrète et l’approche proposée. Présente des résultats vérifiables sans promettre un résultat garanti.',
    checklistTitle: 'Les repères d’une *offre plus claire*',
    checklistItems: [
      'Préciser à qui l’offre convient — et à qui elle ne convient pas',
      'Montrer ce qui est inclus avec un exemple vérifiable',
      'Présenter une prochaine étape claire, sans pression',
    ],
    quoteText: '« La valeur d’une offre devient plus claire quand ses bénéfices et ses limites sont expliqués. »',
  },
  {
    keywords: ['sommeil', 'dormir', 'santé', 'sport', 'fitness', 'perdre du poids', 'énergie', 'nutrition', 'corps', 'fatigue', 'forme'],
    recommendedTheme: 'emerald-luxury',
    recommendedStyle: 'data-charts-glass',
    recommendedFont: 'cormorant-jakarta',
    mythTitle: 'Solution miracle vs *habitudes adaptées*',
    mythWrong: 'Suivre une règle universelle trouvée en ligne sans vérifier si elle convient.',
    mythRight: 'Observer ses habitudes, avancer progressivement et demander conseil en cas de doute.',
    step1Title: 'Commence par un changement *adapté à ton quotidien*.',
    step1Subtitle: 'Choisis une habitude soutenable et observe comment tu te sens. Les besoins varient : pour un symptôme ou une question médicale, consulte un professionnel qualifié.',
    checklistTitle: 'Des habitudes à adapter à *ta situation*',
    checklistItems: [
      'Choisir un rythme de repos qui te convient',
      'Privilégier une activité et une alimentation adaptées à tes besoins',
      'Demander un avis professionnel si un symptôme persiste',
    ],
    quoteText: '« Les conseils de bien-être gagnent à être adaptés à la personne et à son contexte. »',
    captionNote: 'Contenu éducatif général, non médical. Pour un diagnostic ou un traitement, consulte un professionnel de santé.',
  },
  {
    keywords: ['tiktok', 'instagram', 'contenu', 'carrousel', 'créateur', 'abonné', 'vue', 'algorithme', 'réseaux sociaux', 'viral', 'hook', 'ui', 'design'],
    recommendedTheme: 'lavender-silk',
    recommendedStyle: 'designmates-giant-num',
    recommendedFont: 'fraunces-space',
    mythTitle: 'Publier sans intention vs *concevoir pour le lecteur*',
    mythWrong: 'Surcharger la couverture ou promettre un résultat spectaculaire sans preuve.',
    mythRight: 'Ouvrir avec une promesse claire, développer une idée par slide et terminer par une action utile.',
    step1Title: 'Construis une progression qui donne envie de *continuer à lire*.',
    step1Subtitle: 'La couverture annonce le bénéfice, les slides suivantes le développent et la fin aide le lecteur à appliquer l’idée.',
    checklistTitle: 'Une checklist éditoriale pour *un carrousel lisible*',
    checklistItems: [
      'Un hook fidèle au contenu',
      'Une idée principale par slide',
      'Une conclusion pertinente plutôt qu’une promesse de portée',
    ],
    quoteText: '« Crée une ressource claire, utile et assez honnête pour mériter d’être partagée. »',
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
    if (lower.includes('7 jours') || lower.includes('sept jours') || lower.includes('challenge')) {
      activeType = 'seven-day-plan';
    } else if (lower.includes('audit') || lower.includes('diagnostic') || lower.includes('évaluer')) {
      activeType = 'diagnostic-audit';
    } else if (lower.includes('étude de cas') || lower.includes('cas client') || lower.includes('case study')) {
      activeType = 'case-study';
    } else if (lower.includes('kit') || lower.includes('modèle') || lower.includes('template') || lower.includes('checklist')) {
      activeType = 'resource-kit';
    } else if (lower.includes('choisir') || lower.includes('quelle option') || lower.includes('décider')) {
      activeType = 'decision-path';
    } else if (lower.includes('mythe') || lower.includes('faux') || lower.includes('idée reçue')) {
      activeType = 'myth-buster';
    } else if (lower.includes('chiffre') || lower.includes('étude') || lower.includes('stat') || lower.includes('preuve')) {
      activeType = 'stats-proof';
    } else if (lower.includes('avant') || lower.includes('après') || lower.includes('transformation')) {
      activeType = 'before-after';
    } else if (lower.includes('histoire') || lower.includes('déclic') || lower.includes('récit')) {
      activeType = 'story-pov';
    } else if (lower.includes('secret') || lower.includes('conseil') || lower.includes('astuce')) {
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
      coverTitle = `Sur *${cleanTopic.toLowerCase()}*, une idée reçue mérite d’être vérifiée.`;
      coverSubtitle = 'Voici comment distinguer le raccourci séduisant de la méthode réellement adaptée.';
      hookStrategy = 'Contraste nuancé, sans chiffre non sourcé';
      break;
    case 'stats-proof':
      coverKicker = 'DONNÉES & PREUVES';
      coverTitle = `Les indicateurs qui comptent vraiment en *${cleanTopic.toLowerCase()}*.`;
      coverSubtitle = 'Un cadre clair pour séparer les signaux utiles des chiffres décoratifs. Ajoute tes sources avant publication.';
      hookStrategy = 'Preuve vérifiable et contexte avant le chiffre';
      break;
    case 'before-after':
      coverKicker = 'TRANSFORMATION';
      coverTitle = `*${cleanTopic}* : comment passer d’amateur à référence sans s’épuiser.`;
      coverSubtitle = 'Le comparatif complet entre l’ancienne méthode et la nouvelle approche.';
      hookStrategy = 'Contraste Avant / Après immédiat';
      break;
    case 'story-pov':
      coverKicker = 'RÉCIT & DÉCLIC';
      coverTitle = `Le moment où *${cleanTopic.toLowerCase()}* devient plus simple à comprendre.`;
      coverSubtitle = 'Un obstacle, une prise de recul et une leçon concrète à illustrer avec ta propre expérience.';
      hookStrategy = 'Storytelling guidé, à ancrer dans une expérience réelle';
      break;
    case 'secret-list':
      coverKicker = 'CONSEILS À GARDER';
      coverTitle = `Des pistes concrètes pour progresser en *${cleanTopic.toLowerCase()}*.`;
      coverSubtitle = 'Une sélection à parcourir, adapter à ta situation et enregistrer pour plus tard.';
      hookStrategy = 'Curiosité utile et promesse précise';
      break;
    case 'diagnostic-audit':
      coverKicker = 'AUTO-DIAGNOSTIC EXPRESS';
      coverTitle = `Où en es-tu vraiment avec *${cleanTopic.toLowerCase()}* ?`;
      coverSubtitle = 'Fais le point en quelques questions, identifie ton frein principal et choisis une action.';
      hookStrategy = 'Question de diagnostic orientée vers une action';
      break;
    case 'seven-day-plan':
      coverKicker = 'CHALLENGE · 7 JOURS';
      coverTitle = `7 jours pour passer de *l’intention à l’habitude* en ${cleanTopic.toLowerCase()}.`;
      coverSubtitle = 'Une petite action par jour, un rythme réaliste et un bilan pour continuer.';
      hookStrategy = 'Engagement progressif et résultat contrôlable';
      break;
    case 'case-study':
      coverKicker = 'ÉTUDE DE CAS · DÉCOMPOSITION';
      coverTitle = `Comment aborder *${cleanTopic.toLowerCase()}* sans confondre récit et preuve.`;
      coverSubtitle = 'Contexte, décision, méthode et éléments à documenter — sans inventer de résultats.';
      hookStrategy = 'Curiosité narrative, puis preuves contextualisées';
      break;
    case 'resource-kit':
      coverKicker = 'KIT PRATIQUE À SAUVEGARDER';
      coverTitle = `Le kit de départ pour *${cleanTopic.toLowerCase()}* — prêt à adapter.`;
      coverSubtitle = 'Une mini-méthode, une checklist et des actions concrètes à réutiliser.';
      hookStrategy = 'Utilité immédiate et promesse de ressource';
      break;
    case 'decision-path':
      coverKicker = 'GUIDE DE DÉCISION';
      coverTitle = `Quel chemin choisir pour *${cleanTopic.toLowerCase()}* ?`;
      coverSubtitle = 'Quelques questions simples pour clarifier ta situation et décider de la prochaine étape.';
      hookStrategy = 'Question de choix et réduction de l’incertitude';
      break;
    case 'framework-system':
    default:
      coverKicker = 'SYSTÈME & MÉTHODE';
      coverTitle = `La méthode pour progresser en *${cleanTopic.toLowerCase()}*, étape par étape.`;
      coverSubtitle = 'Un parcours court : comprendre, agir, vérifier et garder les étapes utiles.';
      hookStrategy = 'Promesse de système clair et actionnable';
      break;
  }

  const slide1Text = `${coverTitle} ${rawTopic}`;
  const slide2Title =
    activeType === 'stats-proof'
      ? `Une preuve utile commence par une question précise sur *${cleanTopic.toLowerCase()}*.`
      : `Le levier à comprendre en premier pour progresser en *${cleanTopic.toLowerCase()}*.`;
  const slide2Subtitle =
    activeType === 'stats-proof'
      ? params.webSnippet || 'Ajoute une donnée vérifiable, sa source, sa période et son contexte avant publication.'
      : params.webSnippet || `Commence par observer la situation actuelle, puis choisis un indicateur ou un signe concret pour suivre ton progrès.`;

  const slide3Title =
    activeType === 'stats-proof'
      ? 'Indicateur de vanité vs *signal utile*'
      : matchedNiche?.mythTitle || 'Approche habituelle vs *méthode plus claire*';
  const slide3Left =
    activeType === 'stats-proof'
      ? 'Un chiffre isolé, sans objectif, source ni période de comparaison.'
      : matchedNiche?.mythWrong || `Improviser sur ${cleanTopic.toLowerCase()} sans définir le résultat attendu.`;
  const slide3Right =
    activeType === 'stats-proof'
      ? 'Une mesure définie, reliée à une décision et accompagnée de son contexte.'
      : matchedNiche?.mythRight || 'Choisir une action simple, la suivre et l’ajuster selon les retours.';

  const slide4Title =
    activeType === 'stats-proof'
      ? 'Donne au lecteur les éléments pour *interpréter la preuve*.'
      : matchedNiche?.step1Title || `Le premier geste concret pour avancer sur *${cleanTopic.toLowerCase()}*.`;
  const slide4Subtitle =
    activeType === 'stats-proof'
      ? 'Précise la source, la date, l’échantillon et ce que le résultat permet — ou ne permet pas — de conclure.'
      : matchedNiche?.step1Subtitle || 'Décris une action observable, son déclencheur et le prochain signe de progrès à surveiller.';

  const slide5Title =
    activeType === 'stats-proof'
      ? 'La checklist d’une preuve *crédible et réutilisable*'
      : matchedNiche?.checklistTitle || `Les gestes à retenir pour *${cleanTopic.toLowerCase()}*`;
  const slide5Bullets =
    activeType === 'stats-proof'
      ? ['Citer une source primaire et une date', 'Donner le contexte et la méthode de mesure', 'Séparer le fait observé de ton interprétation']
      : matchedNiche?.checklistItems || [
          `Définir un objectif simple pour ${cleanTopic.toLowerCase()}`,
          'Remplacer l’improvisation par une action répétable',
          'Observer le résultat et ajuster la prochaine étape',
        ];

  const slide6Quote =
    activeType === 'stats-proof'
      ? 'Une donnée n’explique rien seule : le contexte lui donne son sens.'
      : matchedNiche?.quoteText || `« Pour progresser en ${cleanTopic.toLowerCase()}, rends la prochaine étape assez claire pour pouvoir la refaire. »`;

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
      kicker: activeType === 'stats-proof' ? '01 — LA PREUVE' : '01 — LE PRINCIPE',
      title: slide2Title,
      subtitle: slide2Subtitle,
      statValue: activeType === 'stats-proof' ? 'SOURCE' : '01',
      statLabel: activeType === 'stats-proof'
        ? 'Ajoute une source vérifiable, une date et le contexte de la mesure.'
        : slide2Subtitle,
      body: '',
      illustrationId: matchIllustrationToText(slide2Title, 1),
      swipePrompt: 'L’erreur à éviter →',
    },
    {
      id: `ai-s3-${Date.now()}`,
      layout: 'comparison-split',
      kicker: '02 — LE VRAI DÉCLIC',
      title: slide3Title,
      subtitle: '',
      body: '',
      comparisonLeftTitle: 'Réflexe courant',
      comparisonLeftText: slide3Left,
      comparisonRightTitle: 'Approche à tester',
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

  let finalSlides: SlideItem[] = rawSlides;
  const createdAt = Date.now();

  if (activeType === 'diagnostic-audit') {
    finalSlides = [
      rawSlides[0],
      {
        ...rawSlides[1],
        id: `ai-audit-${createdAt}-1`,
        layout: 'numbered-insight',
        kicker: '01 — CLARIFIE TON OBJECTIF',
        title: `Quel résultat veux-tu améliorer en *${cleanTopic.toLowerCase()}* ?`,
        subtitle: 'Formule-le en une phrase observable : qu’est-ce qui devrait être différent ?',
        statValue: undefined,
        statLabel: undefined,
        illustrationId: 'target-arrow',
      },
      {
        ...rawSlides[2],
        id: `ai-audit-${createdAt}-2`,
        title: 'Sépare le symptôme de *la cause*',
        comparisonLeftTitle: 'Ce que tu vois',
        comparisonLeftText: `Décris le blocage visible dans ${cleanTopic.toLowerCase()}.`,
        comparisonRightTitle: 'Ce qui le provoque',
        comparisonRightText: 'Repère l’habitude, l’étape ou la contrainte qui revient le plus souvent.',
        illustrationId: 'scale-justice',
      },
      {
        ...rawSlides[3],
        id: `ai-audit-${createdAt}-3`,
        kicker: '03 — TROUVE LE FREIN',
        title: 'Choisis le point de friction que tu peux vraiment *influencer*.',
        subtitle: 'Commence par le problème le plus concret, pas par une refonte totale.',
        illustrationId: 'compass-plane',
      },
      {
        ...rawSlides[4],
        id: `ai-audit-${createdAt}-4`,
        kicker: '04 — TON AUTO-AUDIT',
        title: 'Quatre questions pour passer à l’action',
        bulletPoints: [
          'Mon objectif est-il clairement formulé ?',
          'Quelle étape me ralentit le plus souvent ?',
          'Quel petit test puis-je faire cette semaine ?',
          'Quel signal me dira si le test aide vraiment ?',
        ],
        illustrationId: 'brain-synapse',
      },
      {
        ...rawSlides[5],
        id: `ai-audit-${createdAt}-5`,
        title: 'Une friction repérée. Une action à tester.',
        subtitle: 'Enregistre cet audit, applique un changement simple et reviens comparer ton point de départ.',
        illustrationId: 'trophy-laurel',
      },
    ];
  } else if (activeType === 'seven-day-plan') {
    const days = [
      ['Définis un objectif réaliste.', 'Écris ce que tu veux améliorer et comment tu le constateras.'],
      ['Observe ton point de départ.', 'Note ce que tu fais aujourd’hui, sans chercher à tout changer.'],
      ['Choisis une seule priorité.', 'Écarte les tâches secondaires et garde l’action la plus utile.'],
      ['Prépare ton environnement.', 'Rends l’action facile à commencer : matériel, créneau et rappel.'],
      ['Répète et ajuste.', 'Teste la même action, puis note ce qui aide ou bloque.'],
      ['Demande un retour ciblé.', 'Fais relire ton résultat par une personne qui connaît le sujet.'],
      ['Fais le bilan et choisis la suite.', 'Garde ce qui a fonctionné, ajuste le reste et planifie ton prochain cycle.'],
    ];
    finalSlides = [
      rawSlides[0],
      ...days.map(([title, subtitle], index): SlideItem => ({
        id: `ai-seven-day-${createdAt}-${index + 1}`,
        layout: index === days.length - 1 ? 'cta-outro' : 'numbered-insight',
        kicker: `JOUR ${String(index + 1).padStart(2, '0')} / 07`,
        title: `Jour ${index + 1} — ${title}`,
        subtitle: index === days.length - 1
          ? `${subtitle} Enregistre le plan pour le refaire à ton rythme.`
          : subtitle,
        body: '',
        illustrationId: matchIllustrationToText(`${title} ${subtitle}`, index + 1),
        swipePrompt: index === days.length - 1 ? 'Garder le plan 📌' : 'Jour suivant →',
      })),
    ];
  } else if (activeType === 'stats-proof') {
    finalSlides = [
      { ...rawSlides[0] },
      {
        ...rawSlides[1],
        id: `ai-proof-${createdAt}-1`,
        statValue: 'KPI',
        statLabel: 'Ajoute une source vérifiable, une date et le contexte de la mesure.',
        subtitle: params.webSnippet || 'Une preuve utile répond à une question précise et vérifiable.',
        illustrationId: 'network-nodes',
      },
      { ...rawSlides[2], id: `ai-proof-${createdAt}-2` },
      { ...rawSlides[3], id: `ai-proof-${createdAt}-3` },
      { ...rawSlides[4], id: `ai-proof-${createdAt}-4` },
      { ...rawSlides[5], id: `ai-proof-${createdAt}-5` },
    ];
  } else if (activeType === 'case-study') {
    finalSlides = [
      rawSlides[0],
      {
        ...rawSlides[1],
        id: `ai-case-${createdAt}-1`,
        layout: 'numbered-insight',
        kicker: '01 — CONTEXTE À RENSEIGNER',
        title: 'Le point de départ : *qui, quoi, quand ?*',
        subtitle: 'Décris la situation initiale avec les faits dont tu disposes. Ne transforme pas une hypothèse en témoignage.',
        statValue: undefined,
        statLabel: undefined,
        illustrationId: 'compass-plane',
      },
      {
        ...rawSlides[2],
        id: `ai-case-${createdAt}-2`,
        title: 'La décision qui change la méthode',
        comparisonLeftTitle: 'Avant',
        comparisonLeftText: 'Quelle approche était utilisée et où se situait sa limite ?',
        comparisonRightTitle: 'Choix retenu',
        comparisonRightText: 'Quelle action a été choisie, et pourquoi était-elle adaptée au contexte ?',
      },
      {
        ...rawSlides[3],
        id: `ai-case-${createdAt}-3`,
        kicker: '03 — DÉROULÉ',
        title: `Comment la méthode a été appliquée à *${cleanTopic.toLowerCase()}*.`,
        subtitle: 'Décris les étapes dans l’ordre, avec les contraintes et décisions importantes.',
        illustrationId: 'steps-pyramid',
      },
      {
        ...rawSlides[4],
        id: `ai-case-${createdAt}-4`,
        kicker: '04 — PREUVES À AJOUTER',
        title: 'Documente le résultat avant de conclure',
        bulletPoints: [
          'Indicateur de départ et période observée',
          'Résultat obtenu, source et date de vérification',
          'Limites de l’exemple et conditions de reproductibilité',
        ],
        illustrationId: 'brain-synapse',
      },
      {
        ...rawSlides[5],
        id: `ai-case-${createdAt}-5`,
        title: 'La leçon utile — sans surpromesse.',
        subtitle: 'Présente ce qui est réutilisable, ce qui dépend du contexte et la prochaine étape à tester.',
      },
    ];
  } else if (activeType === 'resource-kit') {
    finalSlides = [
      rawSlides[0],
      {
        ...rawSlides[1],
        id: `ai-kit-${createdAt}-1`,
        layout: 'numbered-insight',
        kicker: '01 — LE BRIEF',
        title: 'Définis le résultat avant de commencer.',
        subtitle: `Pour ${cleanTopic.toLowerCase()}, écris l’objectif, la personne visée et le prochain geste attendu.`,
        statValue: undefined,
        statLabel: undefined,
        illustrationId: 'target-arrow',
      },
      {
        ...rawSlides[3],
        id: `ai-kit-${createdAt}-2`,
        kicker: '02 — LA STRUCTURE',
        title: 'Une progression facile à suivre.',
        subtitle: 'Accroche → idée utile → exemple → action → récapitulatif à sauvegarder.',
        illustrationId: 'steps-pyramid',
      },
      {
        ...rawSlides[4],
        id: `ai-kit-${createdAt}-3`,
        kicker: '03 — CHECKLIST',
        title: 'Vérifie chaque slide avant publication',
        bulletPoints: [
          'Une seule idée principale par slide',
          'Un exemple concret ou une illustration pertinente',
          'Texte lisible dans la zone de sécurité',
          'Une action simple à la fin du carrousel',
        ],
        illustrationId: 'creative-desk',
      },
      {
        ...rawSlides[3],
        id: `ai-kit-${createdAt}-4`,
        kicker: '04 — À RÉUTILISER',
        title: 'Garde une version de ce mini-plan.',
        subtitle: 'Remplace les exemples par tes mots, tes visuels et tes données vérifiées.',
        illustrationId: 'book-fountain',
      },
      {
        ...rawSlides[5],
        id: `ai-kit-${createdAt}-5`,
        title: 'Enregistre le kit. Puis passe à la création.',
        subtitle: 'Tu peux reprendre cette structure pour ton prochain carrousel.',
      },
    ];
  } else if (activeType === 'decision-path') {
    finalSlides = [
      rawSlides[0],
      {
        ...rawSlides[1],
        id: `ai-path-${createdAt}-1`,
        layout: 'numbered-insight',
        kicker: '01 — QUESTION DE DÉPART',
        title: `Quel est ton objectif prioritaire avec *${cleanTopic.toLowerCase()}* ?`,
        subtitle: 'Choisis une seule priorité avant de comparer les options.',
        statValue: undefined,
        statLabel: undefined,
        illustrationId: 'compass-plane',
      },
      {
        ...rawSlides[2],
        id: `ai-path-${createdAt}-2`,
        title: 'As-tu déjà une base à améliorer ?',
        comparisonLeftTitle: 'Pas encore',
        comparisonLeftText: 'Commence par une version simple, un public précis et un test limité.',
        comparisonRightTitle: 'Oui, déjà',
        comparisonRightText: 'Analyse le retour le plus utile et améliore une seule étape.',
        illustrationId: 'scale-justice',
      },
      {
        ...rawSlides[3],
        id: `ai-path-${createdAt}-3`,
        kicker: '03 — SI TU DÉBUTES',
        title: 'Réduis le choix à une *première action*.',
        subtitle: 'Prends l’option la plus facile à tester cette semaine et observe le résultat.',
        illustrationId: 'steps-pyramid',
      },
      {
        ...rawSlides[3],
        id: `ai-path-${createdAt}-4`,
        kicker: '04 — SI TU AS DÉJÀ TESTÉ',
        title: 'Garde le signal utile. Retire le reste.',
        subtitle: 'Compare avec ton objectif, puis modifie une variable à la fois.',
        illustrationId: 'target-arrow',
      },
      {
        ...rawSlides[5],
        id: `ai-path-${createdAt}-5`,
        title: 'Choisis une voie. Teste-la. Réévalue.',
        subtitle: 'Enregistre ce guide et reviens-y après ton prochain test.',
      },
    ];
  }

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
  finalSlides.forEach((sl, idx) => {
    if (sl.illustrationId && usedIds.has(sl.illustrationId)) {
      const replacement =
        fallbacks.find((f) => !usedIds.has(f)) || fallbacks[idx % fallbacks.length];
      sl.illustrationId = replacement;
    }
    if (sl.illustrationId) usedIds.add(sl.illustrationId);
  });

  const typeObj =
    CAROUSEL_TYPES.find((t) => t.id === activeType) || CAROUSEL_TYPES[1];
  const chosenStyle =
    params.visualStyle ||
    matchedNiche?.recommendedStyle ||
    typeObj.recommendedVisualStyle ||
    'studio-grid-system';
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
    slides: finalSlides,
    caption: `${coverTitle.replace(/\*/g, '')}\n\n${coverSubtitle}\n\nDans ce carrousel sur ${cleanTopic.toLowerCase()} :\n01. ${slide2Title.replace(/\*/g, '')}\n02. ${slide3Title.replace(/\*/g, '')}\n03. ${slide4Title.replace(/\*/g, '')}\n04. ${slide5Title.replace(/\*/g, '')}\n\n📌 Enregistre ce post en favoris pour y revenir plus tard.${matchedNiche?.captionNote ? `\n\n${matchedNiche.captionNote}` : ''}`,
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
