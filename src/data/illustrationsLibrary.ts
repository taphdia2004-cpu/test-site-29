export interface EditorialIllustrationItem {
  id: string;
  label: string;
  category:
    | 'Croissance & Business'
    | 'Focus & Temps'
    | 'Créativité & Idées'
    | 'Équilibre & Mindset'
    | 'Tech, IA & Réseaux'
    | 'Argent & Psychologie';
}

export const ILLUSTRATION_CATALOG: EditorialIllustrationItem[] = [
  // 1-24
  { id: 'stairway-sun', label: 'Ascension & Soleil', category: 'Croissance & Business' },
  { id: 'creative-desk', label: 'Carnet & Café', category: 'Créativité & Idées' },
  { id: 'hands-spark', label: 'Mains & Inspiration', category: 'Créativité & Idées' },
  { id: 'hourglass-bloom', label: 'Sablier Florissant', category: 'Focus & Temps' },
  { id: 'mobile-balance', label: 'Mobile d’Équilibre', category: 'Équilibre & Mindset' },
  { id: 'compass-plane', label: 'Boussole & Envol', category: 'Croissance & Business' },
  { id: 'greek-column', label: 'Pilier Classique', category: 'Équilibre & Mindset' },
  { id: 'chess-strategy', label: 'Échecs & Stratégie', category: 'Croissance & Business' },
  { id: 'telescope-stars', label: 'Vision & Constellations', category: 'Focus & Temps' },
  { id: 'scale-justice', label: 'Balance 80/20', category: 'Argent & Psychologie' },
  { id: 'keyhole-portal', label: 'Portail & Clé', category: 'Créativité & Idées' },
  { id: 'lotus-mind', label: 'Clarté Mentale', category: 'Équilibre & Mindset' },
  { id: 'rocket-orbit', label: 'Courbe Exponentielle', category: 'Croissance & Business' },
  { id: 'book-fountain', label: 'Livres & Savoir', category: 'Créativité & Idées' },
  { id: 'magnet-attraction', label: 'Aimant à Clients', category: 'Argent & Psychologie' },
  { id: 'mountain-flag', label: 'Sommet & Objectif', category: 'Focus & Temps' },
  { id: 'puzzle-harmony', label: 'Système & Harmonie', category: 'Équilibre & Mindset' },
  { id: 'lighthouse-beam', label: 'Phare & Direction', category: 'Focus & Temps' },
  { id: 'vintage-camera', label: 'Œil & Cadrage', category: 'Créativité & Idées' },
  { id: 'hourglass-orbit', label: 'Cycle & Discipline', category: 'Focus & Temps' },
  { id: 'bridge-chasm', label: 'Pont Avant / Après', category: 'Croissance & Business' },
  { id: 'trophy-laurel', label: 'Lauriers & Excellence', category: 'Argent & Psychologie' },
  { id: 'network-nodes', label: 'Effet Réseau & IA', category: 'Tech, IA & Réseaux' },
  { id: 'feather-ink', label: 'Plume & Copywriting', category: 'Créativité & Idées' },

  // 25-48 NEW ILLUSTRATIONS
  { id: 'brain-synapse', label: 'Cerveau & Neurosciences', category: 'Tech, IA & Réseaux' },
  { id: 'diamond-prism', label: 'Diamant de Valeur', category: 'Argent & Psychologie' },
  { id: 'target-arrow', label: 'Flèche au Cœur', category: 'Croissance & Business' },
  { id: 'hourglass-wings', label: 'Temps Volant', category: 'Focus & Temps' },
  { id: 'crown-minimal', label: 'Couronne Leader', category: 'Argent & Psychologie' },
  { id: 'shield-trust', label: 'Bouclier Confiance', category: 'Argent & Psychologie' },
  { id: 'megaphone-waves', label: 'Porte-Voix Viral', category: 'Tech, IA & Réseaux' },
  { id: 'dna-evolution', label: 'ADN & Mutation', category: 'Équilibre & Mindset' },
  { id: 'seedling-tree', label: 'Graine & Croissance', category: 'Équilibre & Mindset' },
  { id: 'mirror-portal', label: 'Miroir & Vérité', category: 'Équilibre & Mindset' },
  { id: 'anchor-depth', label: 'Ancre & Stabilité', category: 'Focus & Temps' },
  { id: 'lightning-bolt', label: 'Éclair & Déclic', category: 'Tech, IA & Réseaux' },
  { id: 'infinity-loop', label: 'Boucle Perpétuelle', category: 'Tech, IA & Réseaux' },
  { id: 'eye-vision', label: 'Œil de Lucidité', category: 'Argent & Psychologie' },
  { id: 'lock-unlocked', label: 'Cadenas Débloqué', category: 'Argent & Psychologie' },
  { id: 'globe-meridian', label: 'Sphère & Monde', category: 'Tech, IA & Réseaux' },
  { id: 'vinyl-rhythm', label: 'Vinyle & Flow', category: 'Créativité & Idées' },
  { id: 'origami-bird', label: 'Oiseau Origami', category: 'Créativité & Idées' },
  { id: 'arch-window', label: 'Fenêtre Ouverte', category: 'Équilibre & Mindset' },
  { id: 'potion-alchemy', label: 'Formule & Alchimie', category: 'Tech, IA & Réseaux' },
  { id: 'steps-pyramid', label: 'Pyramide Priorités', category: 'Croissance & Business' },
  { id: 'handshake-deal', label: 'Alliance & Closing', category: 'Argent & Psychologie' },
  { id: 'battery-full', label: 'Énergie 100%', category: 'Focus & Temps' },
  { id: 'star-compass', label: 'Étoile Polaire', category: 'Focus & Temps' },
];

export function getIllustrationSvg(
  id: string,
  ink: string,
  accent: string,
  accentSoft: string
): string {
  const wrap = (inner: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 340" width="100%" height="100%" fill="none">${inner}</svg>`;

  switch (id) {
    case 'stairway-sun':
      return wrap(`
        <circle cx="345" cy="115" r="82" fill="${accentSoft}" />
        <path d="M295 190 V110 A50 50 0 0 1 395 110 V190" fill="${accentSoft}" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="345" cy="112" r="24" fill="${accent}" />
        <g stroke="${accent}" stroke-width="2" stroke-linecap="round">
          <line x1="345" y1="32" x2="345" y2="50"/>
          <line x1="275" y1="62" x2="290" y2="75"/>
          <line x1="415" y1="62" x2="400" y2="75"/>
          <line x1="255" y1="112" x2="275" y2="112"/>
          <line x1="435" y1="112" x2="415" y2="112"/>
        </g>
        <path d="M110 295 L295 190 L395 190 L210 295 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
        <g stroke="${ink}" stroke-width="2.2">
          <path d="M130 284 H230 M150 272 H250 M170 260 H270 M190 248 H290 M210 236 H310 M230 224 H330 M250 212 H350 M270 200 H370"/>
        </g>
        <path d="M210 295 L395 190 V295 Z" fill="${accent}" fill-opacity="0.88" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
        <line x1="100" y1="265" x2="285" y2="160" stroke="${ink}" stroke-width="2" />
      `);

    case 'creative-desk':
      return wrap(`
        <ellipse cx="260" cy="180" rx="195" ry="115" fill="${accentSoft}" fill-opacity="0.65"/>
        <g transform="translate(75, 95) rotate(-8)">
          <path d="M10 20 Q95 5 180 20 L180 155 Q95 140 10 155 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
          <path d="M95 13 V148" stroke="${ink}" stroke-width="2"/>
          <rect x="24" y="34" width="52" height="44" fill="${accentSoft}" stroke="${ink}" stroke-width="1.8"/>
          <circle cx="50" cy="56" r="11" fill="${accent}"/>
          <line x1="24" y1="94" x2="80" y2="94" stroke="${ink}" stroke-width="2" stroke-linecap="round"/>
          <line x1="24" y1="108" x2="72" y2="108" stroke="${ink}" stroke-width="2" stroke-linecap="round"/>
          <line x1="112" y1="38" x2="164" y2="38" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="112" y1="56" x2="164" y2="56" stroke="${ink}" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="112" y1="72" x2="156" y2="72" stroke="${ink}" stroke-width="1.8" stroke-linecap="round"/>
        </g>
        <g transform="translate(285, 130)">
          <path d="M55 22 H72 A18 18 0 0 1 72 58 H52" fill="none" stroke="${ink}" stroke-width="2.5"/>
          <path d="M0 10 H60 L52 68 A22 22 0 0 1 8 68 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
          <path d="M6 48 Q30 56 54 48 L51 66 A20 20 0 0 1 9 66 Z" fill="${accent}"/>
          <ellipse cx="30" cy="10" rx="30" ry="9" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
          <ellipse cx="30" cy="11" rx="23" ry="5.5" fill="${ink}"/>
        </g>
        <g transform="translate(365, 70)">
          <path d="M5 195 Q35 120 25 25" stroke="${ink}" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M26 140 Q58 130 65 105 Q38 110 26 140 Z" fill="${accent}" stroke="${ink}" stroke-width="2"/>
          <path d="M24 105 Q-8 90 -12 64 Q16 74 24 105 Z" fill="${accentSoft}" stroke="${ink}" stroke-width="2"/>
          <path d="M27 72 Q56 58 60 32 Q34 42 27 72 Z" fill="${accent}" stroke="${ink}" stroke-width="2"/>
        </g>
      `);

    case 'hands-spark':
      return wrap(`
        <circle cx="260" cy="145" r="92" fill="${accentSoft}" />
        <path d="M260 42 L267 82 L307 89 L267 96 L260 136 L253 96 L213 89 L253 82 Z" fill="${accent}" stroke="${ink}" stroke-width="2"/>
        <path d="M260 210 V115" stroke="${ink}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M260 175 Q230 160 225 135 Q252 142 260 175 Z" fill="${accent}" stroke="${ink}" stroke-width="2"/>
        <path d="M260 162 Q290 147 295 122 Q268 129 260 162 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2"/>
        <path d="M145 300 C165 250 175 225 172 195 C170 165 162 125 182 105 C192 95 204 108 202 128 C200 150 205 178 228 198 C242 210 245 232 232 265" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M375 300 C355 250 345 225 348 195 C350 165 358 125 338 105 C328 95 316 108 318 128 C320 150 315 178 292 198 C278 210 275 232 288 265" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5" stroke-linecap="round"/>
      `);

    case 'hourglass-bloom':
      return wrap(`
        <circle cx="260" cy="170" r="115" fill="${accentSoft}" fill-opacity="0.6"/>
        <rect x="175" y="42" width="170" height="14" rx="7" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <rect x="175" y="284" width="170" height="14" rx="7" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <line x1="192" y1="56" x2="192" y2="284" stroke="${ink}" stroke-width="2.5"/>
        <line x1="328" y1="56" x2="328" y2="284" stroke="${ink}" stroke-width="2.5"/>
        <path d="M204 56 C204 125 248 148 256 170 C248 192 204 215 204 284 H316 C316 215 272 192 264 170 C272 148 316 125 316 56 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <path d="M216 104 Q260 114 304 104 C296 135 268 152 260 168 C252 152 224 135 216 104 Z" fill="${accent}"/>
        <path d="M212 284 Q260 252 308 284 Z" fill="${accent}"/>
        <circle cx="260" cy="212" r="18" fill="${accent}" stroke="${ink}" stroke-width="2"/>
        <circle cx="260" cy="212" r="6" fill="${ink}"/>
        <path d="M260 230 V268" stroke="${ink}" stroke-width="2.5"/>
      `);

    case 'mobile-balance':
      return wrap(`
        <line x1="260" y1="20" x2="260" y2="78" stroke="${ink}" stroke-width="2.4"/>
        <circle cx="260" cy="82" r="5" fill="#FFFFFF" stroke="${ink}" stroke-width="2.2"/>
        <path d="M165 112 L260 82 L355 112" stroke="${ink}" stroke-width="2.4" stroke-linecap="round"/>
        <line x1="165" y1="112" x2="165" y2="148" stroke="${ink}" stroke-width="2.2"/>
        <path d="M115 168 L165 148 L215 168" stroke="${ink}" stroke-width="2.2"/>
        <line x1="115" y1="168" x2="115" y2="210" stroke="${ink}" stroke-width="2"/>
        <circle cx="115" cy="242" r="36" fill="${accent}" stroke="${ink}" stroke-width="2.4"/>
        <line x1="215" y1="168" x2="215" y2="255" stroke="${ink}" stroke-width="2"/>
        <circle cx="215" cy="274" r="19" fill="${ink}"/>
        <line x1="355" y1="112" x2="355" y2="145" stroke="${ink}" stroke-width="2.2"/>
        <path d="M300 145 H410" stroke="${ink}" stroke-width="2.2"/>
        <line x1="300" y1="145" x2="300" y2="180" stroke="${ink}" stroke-width="2"/>
        <path d="M276 232 V202 A24 24 0 0 1 324 202 V232 H308 V202 A8 8 0 0 0 292 202 V232 Z" fill="${accent}" stroke="${ink}" stroke-width="2.2"/>
        <line x1="410" y1="145" x2="410" y2="176" stroke="${ink}" stroke-width="2"/>
        <circle cx="410" cy="196" r="18" fill="${accentSoft}" stroke="${ink}" stroke-width="6"/>
        <path d="M410 235 C388 255 388 285 410 308 C432 285 432 255 410 235 Z" fill="${accent}" stroke="${ink}" stroke-width="2.2"/>
      `);

    case 'compass-plane':
      return wrap(`
        <circle cx="395" cy="95" r="58" fill="${accentSoft}"/>
        <circle cx="395" cy="95" r="38" fill="${accent}"/>
        <g stroke="${ink}" stroke-width="2.5" stroke-linejoin="round">
          <polygon points="375,102 225,148 265,172" fill="#FFFFFF"/>
          <polygon points="375,102 265,172 276,204" fill="${accentSoft}"/>
          <polygon points="375,102 265,172 315,192" fill="#FFFFFF"/>
        </g>
        <g transform="translate(145, 235)">
          <circle cx="0" cy="0" r="56" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
          <circle cx="0" cy="0" r="44" fill="none" stroke="${ink}" stroke-width="1.6"/>
          <polygon points="26,-26 -6,-6 6,6" fill="${accent}" stroke="${ink}" stroke-width="2"/>
          <polygon points="-26,26 -6,-6 6,6" fill="#FFFFFF" stroke="${ink}" stroke-width="2"/>
        </g>
      `);

    case 'greek-column':
      return wrap(`
        <circle cx="260" cy="155" r="105" fill="${accentSoft}"/>
        <ellipse cx="260" cy="145" rx="145" ry="42" stroke="${accent}" stroke-width="2" stroke-dasharray="6 4" transform="rotate(-14 260 145)"/>
        <rect x="180" y="72" width="160" height="16" rx="4" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="192" cy="98" r="14" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="328" cy="98" r="14" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
        <rect x="208" y="106" width="104" height="168" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <line x1="234" y1="116" x2="234" y2="264" stroke="${ink}" stroke-width="2"/>
        <line x1="260" y1="116" x2="260" y2="264" stroke="${ink}" stroke-width="2"/>
        <line x1="286" y1="116" x2="286" y2="264" stroke="${ink}" stroke-width="2"/>
        <rect x="192" y="274" width="136" height="18" rx="3" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
      `);

    case 'chess-strategy':
      return wrap(`
        <circle cx="260" cy="155" r="100" fill="${accentSoft}"/>
        <polygon points="160,230 360,230 420,295 100,295" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <line x1="260" y1="230" x2="260" y2="295" stroke="${ink}" stroke-width="1.8"/>
        <line x1="132" y1="260" x2="388" y2="260" stroke="${ink}" stroke-width="1.8"/>
        <path d="M260 54 V78 M248 66 H272" stroke="${accent}" stroke-width="3.5" stroke-linecap="round"/>
        <polygon points="234,98 286,98 276,122 244,122" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
        <path d="M242 122 L230 226 H290 L278 122 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <rect x="220" y="226" width="80" height="14" rx="6" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
      `);

    case 'telescope-stars':
      return wrap(`
        <circle cx="350" cy="105" r="70" fill="${accentSoft}"/>
        <path d="M365 65 A42 42 0 1 0 405 130 A32 32 0 1 1 365 65 Z" fill="${accent}" stroke="${ink}" stroke-width="2.2"/>
        <g transform="translate(225, 195) rotate(-26)">
          <polygon points="-75,-12 65,-22 65,22 -75,12" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
          <rect x="52" y="-24" width="22" height="48" rx="4" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
        </g>
        <line x1="225" y1="205" x2="175" y2="295" stroke="${ink}" stroke-width="2.8" stroke-linecap="round"/>
        <line x1="225" y1="205" x2="225" y2="295" stroke="${ink}" stroke-width="2.8" stroke-linecap="round"/>
        <line x1="225" y1="205" x2="275" y2="295" stroke="${ink}" stroke-width="2.8" stroke-linecap="round"/>
      `);

    case 'scale-justice':
      return wrap(`
        <circle cx="260" cy="165" r="98" fill="${accentSoft}"/>
        <line x1="260" y1="55" x2="260" y2="285" stroke="${ink}" stroke-width="3"/>
        <rect x="205" y="285" width="110" height="14" rx="6" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="260" cy="92" r="10" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
        <line x1="130" y1="115" x2="390" y2="75" stroke="${ink}" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M95 195 H165 A35 22 0 0 1 95 195 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4"/>
        <polygon points="130,152 148,174 130,194 112,174" fill="${accent}" stroke="${ink}" stroke-width="2.2"/>
        <path d="M355 155 H425 A35 22 0 0 1 355 155 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4"/>
        <circle cx="390" cy="136" r="18" fill="${ink}"/>
      `);

    case 'keyhole-portal':
      return wrap(`
        <path d="M185 290 V135 A75 75 0 0 1 335 135 V290 Z" fill="${accentSoft}" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="260" cy="138" r="38" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <polygon points="242,168 278,168 292,265 228,265" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="260" cy="138" r="20" fill="${accent}"/>
      `);

    case 'lotus-mind':
      return wrap(`
        <circle cx="260" cy="165" r="88" fill="${accentSoft}"/>
        <path d="M260 82 C230 125 230 175 260 215 C290 175 290 125 260 82 Z" fill="${accent}" stroke="${ink}" stroke-width="2.4"/>
        <path d="M260 215 C210 195 182 155 192 115 C225 130 245 165 260 215 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4"/>
        <path d="M260 215 C310 195 338 155 328 115 C295 130 275 165 260 215 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4"/>
        <ellipse cx="260" cy="248" rx="95" ry="14" fill="none" stroke="${ink}" stroke-width="2"/>
      `);

    case 'rocket-orbit':
      return wrap(`
        <rect x="95" y="55" width="330" height="230" rx="16" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4"/>
        <rect x="165" y="210" width="32" height="40" fill="${accentSoft}" stroke="${ink}" stroke-width="2"/>
        <rect x="220" y="182" width="32" height="68" fill="${accentSoft}" stroke="${ink}" stroke-width="2"/>
        <rect x="275" y="142" width="32" height="108" fill="${accentSoft}" stroke="${ink}" stroke-width="2"/>
        <rect x="330" y="92" width="32" height="158" fill="${accent}" stroke="${ink}" stroke-width="2"/>
        <path d="M150 228 Q245 215 346 76" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="346" cy="76" r="9" fill="${accent}" stroke="#FFFFFF" stroke-width="2.5"/>
      `);

    case 'book-fountain':
      return wrap(`
        <circle cx="260" cy="165" r="102" fill="${accentSoft}"/>
        <rect x="145" y="238" width="230" height="32" rx="6" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <rect x="162" y="204" width="196" height="34" rx="6" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
        <rect x="178" y="172" width="164" height="32" rx="6" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <path d="M175 155 Q218 135 260 155 Q302 135 345 155 L345 110 Q302 90 260 110 Q218 90 175 110 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="260" cy="64" r="14" fill="${accent}"/>
      `);

    case 'magnet-attraction':
      return wrap(`
        <circle cx="260" cy="170" r="105" fill="${accentSoft}"/>
        <path d="M185 110 V195 A75 75 0 0 0 335 195 V110 H295 V195 A35 35 0 0 1 225 195 V110 Z" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
        <rect x="185" y="92" width="40" height="24" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <rect x="295" y="92" width="40" height="24" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="260" cy="52" r="12" fill="${accent}" stroke="${ink}" stroke-width="2"/>
      `);

    case 'mountain-flag':
      return wrap(`
        <circle cx="330" cy="95" r="46" fill="${accent}"/>
        <polygon points="85,285 225,95 365,285" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="215,285 335,135 445,285" fill="${accentSoft}" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
        <line x1="225" y1="95" x2="225" y2="42" stroke="${ink}" stroke-width="2.5"/>
        <polygon points="225,42 275,56 225,70" fill="${accent}" stroke="${ink}" stroke-width="2"/>
      `);

    case 'puzzle-harmony':
      return wrap(`
        <circle cx="220" cy="170" r="82" fill="${accent}" fill-opacity="0.85" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="305" cy="170" r="82" fill="${accentSoft}" fill-opacity="0.85" stroke="${ink}" stroke-width="2.5"/>
        <path d="M262 100 A82 82 0 0 1 262 240 A82 82 0 0 1 262 100 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="262" cy="170" r="14" fill="${accent}" stroke="${ink}" stroke-width="2.2"/>
      `);

    case 'lighthouse-beam':
      return wrap(`
        <polygon points="215,98 455,35 455,165" fill="${accentSoft}"/>
        <polygon points="215,98 455,68 455,132" fill="${accent}" fill-opacity="0.45"/>
        <polygon points="175,285 192,115 228,115 245,285" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <polygon points="184,195 236,195 240,235 180,235" fill="${accent}" stroke="${ink}" stroke-width="2.2"/>
        <rect x="194" y="82" width="32" height="33" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <polygon points="186,82 210,56 234,82" fill="${ink}"/>
      `);

    case 'vintage-camera':
      return wrap(`
        <circle cx="260" cy="170" r="105" fill="${accentSoft}"/>
        <rect x="145" y="105" width="230" height="145" rx="18" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <rect x="175" y="85" width="52" height="20" rx="5" fill="${accent}" stroke="${ink}" stroke-width="2.2"/>
        <circle cx="260" cy="178" r="52" fill="${accentSoft}" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="260" cy="178" r="32" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
      `);

    case 'hourglass-orbit':
      return wrap(`
        <circle cx="260" cy="170" r="105" fill="none" stroke="${ink}" stroke-width="2" stroke-dasharray="6 5"/>
        <circle cx="260" cy="170" r="65" fill="${accentSoft}" stroke="${ink}" stroke-width="2.2"/>
        <circle cx="260" cy="170" r="24" fill="${accent}" stroke="${ink}" stroke-width="2.2"/>
        <circle cx="260" cy="65" r="14" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4"/>
        <circle cx="260" cy="275" r="14" fill="${ink}"/>
      `);

    case 'bridge-chasm':
      return wrap(`
        <circle cx="260" cy="135" r="62" fill="${accentSoft}"/>
        <circle cx="260" cy="135" r="28" fill="${accent}"/>
        <polygon points="60,205 175,205 155,295 60,295" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <polygon points="345,205 460,205 460,295 365,295" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <path d="M145 205 H375" stroke="${ink}" stroke-width="4"/>
        <path d="M168 255 Q260 155 352 255" fill="none" stroke="${accent}" stroke-width="3.5"/>
      `);

    case 'trophy-laurel':
      return wrap(`
        <circle cx="260" cy="165" r="98" fill="${accentSoft}"/>
        <path d="M205 95 H315 C315 165 282 192 260 202 C238 192 205 165 205 95 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <path d="M215 122 H305 C300 162 278 184 260 194 C242 184 220 162 215 122 Z" fill="${accent}"/>
        <line x1="260" y1="202" x2="260" y2="255" stroke="${ink}" stroke-width="3"/>
        <rect x="215" y="255" width="90" height="16" rx="6" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
      `);

    case 'network-nodes':
      return wrap(`
        <circle cx="260" cy="170" r="95" fill="${accentSoft}"/>
        <g stroke="${ink}" stroke-width="2.2">
          <line x1="260" y1="170" x2="150" y2="95"/>
          <line x1="260" y1="170" x2="375" y2="95"/>
          <line x1="260" y1="170" x2="140" y2="235"/>
          <line x1="260" y1="170" x2="380" y2="235"/>
        </g>
        <circle cx="260" cy="170" r="32" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="150" cy="95" r="18" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4"/>
        <circle cx="375" cy="95" r="18" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4"/>
        <circle cx="140" cy="235" r="18" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4"/>
        <circle cx="380" cy="235" r="18" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4"/>
      `);

    case 'brain-synapse':
      return wrap(`
        <circle cx="260" cy="170" r="105" fill="${accentSoft}"/>
        <path d="M256 90 C210 85 170 115 175 160 C160 185 180 235 225 240 C245 242 256 230 256 210 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <path d="M264 90 C310 85 350 115 345 160 C360 185 340 235 295 240 C275 242 264 230 264 210 Z" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="215" cy="145" r="8" fill="${accent}"/>
        <circle cx="210" cy="190" r="8" fill="${ink}"/>
        <circle cx="305" cy="145" r="8" fill="#FFFFFF"/>
        <circle cx="310" cy="190" r="8" fill="#FFFFFF"/>
        <line x1="215" y1="145" x2="210" y2="190" stroke="${ink}" stroke-width="2"/>
        <line x1="305" y1="145" x2="310" y2="190" stroke="#FFFFFF" stroke-width="2"/>
      `);

    case 'diamond-prism':
      return wrap(`
        <circle cx="260" cy="170" r="105" fill="${accentSoft}"/>
        <polygon points="195,95 325,95 370,148 260,275 150,148" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="225,148 295,148 260,275" fill="${accent}" stroke="${ink}" stroke-width="2.2" stroke-linejoin="round"/>
        <line x1="150" y1="148" x2="370" y2="148" stroke="${ink}" stroke-width="2.2"/>
        <line x1="195" y1="95" x2="225" y2="148" stroke="${ink}" stroke-width="2"/>
        <line x1="325" y1="95" x2="295" y2="148" stroke="${ink}" stroke-width="2"/>
      `);

    case 'target-arrow':
      return wrap(`
        <circle cx="260" cy="175" r="102" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="260" cy="175" r="70" fill="${accentSoft}" stroke="${ink}" stroke-width="2.2"/>
        <circle cx="260" cy="175" r="36" fill="${accent}" stroke="${ink}" stroke-width="2.2"/>
        <line x1="395" y1="55" x2="262" y2="173" stroke="${ink}" stroke-width="3.5" stroke-linecap="round"/>
        <polygon points="260,175 284,166 272,152" fill="${ink}"/>
        <polygon points="375,72 405,45 415,62 388,86" fill="${accent}" stroke="${ink}" stroke-width="2"/>
      `);

    case 'hourglass-wings':
      return wrap(`
        <circle cx="260" cy="170" r="95" fill="${accentSoft}"/>
        <path d="M195 165 C135 120 110 145 135 185 C115 205 145 225 195 195 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4"/>
        <path d="M325 165 C385 120 410 145 385 185 C405 205 375 225 325 195 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4"/>
        <circle cx="260" cy="170" r="56" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="260" cy="170" r="44" fill="${accent}" fill-opacity="0.2"/>
        <line x1="260" y1="170" x2="260" y2="136" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
        <line x1="260" y1="170" x2="288" y2="170" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
      `);

    case 'crown-minimal':
      return wrap(`
        <circle cx="260" cy="170" r="102" fill="${accentSoft}"/>
        <polygon points="155,235 140,125 215,175 260,105 305,175 380,125 365,235" fill="${accent}" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
        <rect x="155" y="235" width="210" height="22" rx="6" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="140" cy="115" r="8" fill="#FFFFFF" stroke="${ink}" stroke-width="2.2"/>
        <circle cx="260" cy="95" r="10" fill="#FFFFFF" stroke="${ink}" stroke-width="2.2"/>
        <circle cx="380" cy="115" r="8" fill="#FFFFFF" stroke="${ink}" stroke-width="2.2"/>
      `);

    case 'shield-trust':
      return wrap(`
        <circle cx="260" cy="170" r="102" fill="${accentSoft}"/>
        <path d="M260 65 L355 102 V175 C355 235 310 272 260 292 C210 272 165 235 165 175 V102 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M260 88 L332 116 V172 C332 218 298 248 260 265 V88 Z" fill="${accent}"/>
        <polyline points="222,175 250,202 302,148" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      `);

    case 'megaphone-waves':
      return wrap(`
        <circle cx="250" cy="170" r="102" fill="${accentSoft}"/>
        <polygon points="155,155 305,95 305,235 155,185" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
        <rect x="125" y="150" width="30" height="40" rx="6" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
        <path d="M165 188 L182 245 H208 L195 196" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
        <path d="M338 128 Q365 165 338 202" fill="none" stroke="${accent}" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M365 105 Q405 165 365 225" fill="none" stroke="${ink}" stroke-width="2.5" stroke-linecap="round"/>
      `);

    case 'dna-evolution':
      return wrap(`
        <circle cx="260" cy="170" r="102" fill="${accentSoft}"/>
        <path d="M195 65 C195 135 325 135 325 205 C325 255 225 275 195 285" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
        <path d="M325 65 C325 135 195 135 195 205 C195 255 295 275 325 285" fill="none" stroke="${accent}" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="205" y1="92" x2="315" y2="92" stroke="${ink}" stroke-width="2"/>
        <line x1="215" y1="170" x2="305" y2="170" stroke="${ink}" stroke-width="2"/>
        <line x1="205" y1="235" x2="315" y2="235" stroke="${ink}" stroke-width="2"/>
      `);

    case 'seedling-tree':
      return wrap(`
        <circle cx="260" cy="165" r="100" fill="${accentSoft}"/>
        <path d="M165 275 Q260 250 355 275" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="260" y1="264" x2="260" y2="120" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
        <path d="M260 205 C210 200 190 165 215 140 C245 145 260 175 260 205 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4"/>
        <path d="M260 180 C310 175 330 140 305 115 C275 120 260 150 260 180 Z" fill="${accent}" stroke="${ink}" stroke-width="2.4"/>
        <circle cx="260" cy="88" r="22" fill="${accent}" stroke="${ink}" stroke-width="2.4"/>
      `);

    case 'mirror-portal':
      return wrap(`
        <ellipse cx="260" cy="170" rx="82" ry="118" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <ellipse cx="260" cy="170" rx="66" ry="102" fill="${accentSoft}" stroke="${accent}" stroke-width="2"/>
        <circle cx="260" cy="130" r="24" fill="${accent}"/>
        <line x1="225" y1="215" x2="285" y2="155" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
      `);

    case 'anchor-depth':
      return wrap(`
        <circle cx="260" cy="170" r="102" fill="${accentSoft}"/>
        <circle cx="260" cy="82" r="16" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <line x1="260" y1="98" x2="260" y2="265" stroke="${ink}" stroke-width="3.2"/>
        <line x1="215" y1="135" x2="305" y2="135" stroke="${accent}" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M175 205 C175 255 220 272 260 272 C300 272 345 255 345 205" fill="none" stroke="${ink}" stroke-width="3.2" stroke-linecap="round"/>
        <polygon points="175,195 162,218 188,218" fill="${accent}" stroke="${ink}" stroke-width="2"/>
        <polygon points="345,195 332,218 358,218" fill="${accent}" stroke="${ink}" stroke-width="2"/>
      `);

    case 'lightning-bolt':
      return wrap(`
        <circle cx="260" cy="170" r="105" fill="${accentSoft}"/>
        <polygon points="285,48 175,182 252,182 225,292 345,152 268,152" fill="${accent}" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
      `);

    case 'infinity-loop':
      return wrap(`
        <circle cx="260" cy="170" r="102" fill="${accentSoft}"/>
        <path d="M260 170 C225 115 140 115 140 170 C140 225 225 225 260 170 C295 115 380 115 380 170 C380 225 295 225 260 170 Z" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>
        <path d="M260 170 C225 115 140 115 140 170 C140 225 225 225 260 170 C295 115 380 115 380 170 C380 225 295 225 260 170 Z" fill="none" stroke="${ink}" stroke-width="2.5"/>
      `);

    case 'eye-vision':
      return wrap(`
        <circle cx="260" cy="170" r="105" fill="${accentSoft}"/>
        <path d="M115 170 Q260 75 405 170 Q260 265 115 170 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
        <circle cx="260" cy="170" r="46" fill="${accent}" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="260" cy="170" r="18" fill="${ink}"/>
        <circle cx="274" cy="156" r="7" fill="#FFFFFF"/>
      `);

    case 'lock-unlocked':
      return wrap(`
        <circle cx="260" cy="175" r="100" fill="${accentSoft}"/>
        <path d="M215 145 V100 A45 45 0 0 1 305 90" fill="none" stroke="${ink}" stroke-width="3.5" stroke-linecap="round"/>
        <rect x="185" y="145" width="150" height="125" rx="16" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="260" cy="195" r="16" fill="${accent}" stroke="${ink}" stroke-width="2.2"/>
        <polygon points="254,208 266,208 270,242 250,242" fill="${accent}" stroke="${ink}" stroke-width="2"/>
      `);

    case 'globe-meridian':
      return wrap(`
        <circle cx="260" cy="170" r="102" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <ellipse cx="260" cy="170" rx="52" ry="102" fill="${accentSoft}" stroke="${ink}" stroke-width="2.2"/>
        <line x1="158" y1="170" x2="362" y2="170" stroke="${accent}" stroke-width="2.5"/>
        <line x1="172" y1="122" x2="348" y2="122" stroke="${ink}" stroke-width="1.8"/>
        <line x1="172" y1="218" x2="348" y2="218" stroke="${ink}" stroke-width="1.8"/>
        <line x1="260" y1="68" x2="260" y2="272" stroke="${ink}" stroke-width="2"/>
      `);

    case 'vinyl-rhythm':
      return wrap(`
        <circle cx="260" cy="170" r="105" fill="${ink}"/>
        <circle cx="260" cy="170" r="82" fill="none" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="1.5"/>
        <circle cx="260" cy="170" r="62" fill="none" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="1.5"/>
        <circle cx="260" cy="170" r="38" fill="${accent}" stroke="#FFFFFF" stroke-width="2"/>
        <circle cx="260" cy="170" r="10" fill="#FFFFFF"/>
      `);

    case 'origami-bird':
      return wrap(`
        <circle cx="260" cy="170" r="100" fill="${accentSoft}"/>
        <polygon points="145,195 245,125 275,195" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4" stroke-linejoin="round"/>
        <polygon points="245,125 345,75 275,195" fill="${accent}" stroke="${ink}" stroke-width="2.4" stroke-linejoin="round"/>
        <polygon points="275,195 365,165 325,245" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4" stroke-linejoin="round"/>
        <polygon points="145,195 195,160 115,155" fill="${accent}" stroke="${ink}" stroke-width="2.4" stroke-linejoin="round"/>
      `);

    case 'arch-window':
      return wrap(`
        <path d="M175 285 V135 A85 85 0 0 1 345 135 V285 Z" fill="${accentSoft}" stroke="${ink}" stroke-width="2.5"/>
        <circle cx="285" cy="125" r="26" fill="${accent}"/>
        <path d="M175 245 Q235 210 345 250 L345 285 H175 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.2"/>
        <line x1="260" y1="50" x2="260" y2="285" stroke="${ink}" stroke-width="2"/>
        <line x1="175" y1="165" x2="345" y2="165" stroke="${ink}" stroke-width="2"/>
      `);

    case 'potion-alchemy':
      return wrap(`
        <circle cx="260" cy="175" r="100" fill="${accentSoft}"/>
        <rect x="238" y="65" width="44" height="16" rx="4" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4"/>
        <path d="M245 81 V125 L180 245 A24 24 0 0 0 202 280 H318 A24 24 0 0 0 340 245 L275 125 V81 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M202 205 Q260 220 318 205 L336 245 A18 18 0 0 1 318 272 H202 A18 18 0 0 1 184 245 Z" fill="${accent}"/>
        <circle cx="245" cy="182" r="7" fill="${accent}"/>
        <circle cx="272" cy="160" r="5" fill="${accent}"/>
      `);

    case 'steps-pyramid':
      return wrap(`
        <circle cx="260" cy="170" r="105" fill="${accentSoft}"/>
        <polygon points="260,65 320,145 200,145" fill="${accent}" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="195,155 325,155 355,210 165,210" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="160,220 360,220 390,275 130,275" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round"/>
      `);

    case 'handshake-deal':
      return wrap(`
        <circle cx="260" cy="170" r="102" fill="${accentSoft}"/>
        <rect x="135" y="135" width="125" height="65" rx="32" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5" transform="rotate(15 195 165)"/>
        <rect x="260" y="135" width="125" height="65" rx="32" fill="${accent}" stroke="${ink}" stroke-width="2.5" transform="rotate(-15 325 165)"/>
        <circle cx="260" cy="95" r="14" fill="${accent}"/>
      `);

    case 'battery-full':
      return wrap(`
        <circle cx="260" cy="170" r="102" fill="${accentSoft}"/>
        <rect x="145" y="115" width="215" height="110" rx="18" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
        <rect x="360" y="148" width="18" height="44" rx="5" fill="${ink}"/>
        <rect x="162" y="132" width="54" height="76" rx="8" fill="${accent}"/>
        <rect x="226" y="132" width="54" height="76" rx="8" fill="${accent}"/>
        <rect x="290" y="132" width="54" height="76" rx="8" fill="${accent}"/>
      `);

    case 'star-compass':
      return wrap(`
        <circle cx="260" cy="170" r="102" fill="${accentSoft}"/>
        <polygon points="260,50 284,146 380,170 284,194 260,290 236,194 140,170 236,146" fill="${accent}" stroke="${ink}" stroke-width="2.4" stroke-linejoin="round"/>
        <circle cx="260" cy="170" r="18" fill="#FFFFFF" stroke="${ink}" stroke-width="2.4"/>
      `);

    case 'feather-ink':
    default:
      return wrap(`
        <circle cx="260" cy="168" r="98" fill="${accentSoft}"/>
        <path d="M120 265 Q195 235 235 265 T365 250" fill="none" stroke="${accent}" stroke-width="3.5" stroke-linecap="round"/>
        <g transform="translate(260, 165) rotate(-32)">
          <path d="M0 95 C-42 35 -45 -55 0 -105 C45 -55 42 35 0 95 Z" fill="#FFFFFF" stroke="${ink}" stroke-width="2.5"/>
          <path d="M0 45 C-28 10 -30 -45 0 -85 C30 -45 28 10 0 45 Z" fill="${accent}"/>
          <line x1="0" y1="-105" x2="0" y2="122" stroke="${ink}" stroke-width="2.8" stroke-linecap="round"/>
        </g>
      `);
  }
}

export function getIllustrationDataUri(
  id: string,
  ink: string,
  accent: string,
  accentSoft: string
): string {
  const svg = getIllustrationSvg(id, ink, accent, accentSoft);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
