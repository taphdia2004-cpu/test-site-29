export type PlatformFormatId =
  | 'tiktok-9-16'
  | 'instagram-4-5'
  | 'instagram-3-4'
  | 'instagram-1-1';

export type EditorialThemeId =
  | 'kinfolk-linen'
  | 'vogue-ivory'
  | 'monocle-paper'
  | 'matcha-oat'
  | 'terracotta-sand'
  | 'atelier-blanc'
  | 'galerie-cobalt'
  | 'bordeaux-editorial'
  | 'lavender-silk'
  | 'emerald-luxury'
  | 'cyber-noir-violet'
  | 'nexora-noir-lime'
  | 'motyv-noir-red'
  | 'midnight-royal';

export type VisualStyleId =
  | 'skale-pinned-notes'
  | 'simplist-highlight'
  | 'shodwe-brush'
  | 'grow-corporate-blue'
  | 'neon-purple-agency'
  | 'red-black-scribble'
  | 'data-charts-glass'
  | 'designmates-giant-num'
  | 'nexora-acid-lime'
  | 'netroots-crumpled-pills'
  | 'editorial-luxury'
  | 'modern-bento'
  | 'swiss-poster'
  | 'gallery-arch'
  | 'bold-highlight'
  | 'newspaper-gazette'
  | 'polaroid-atelier'
  | 'brutalist-neo'
  | 'japanese-zen'
  | 'luxury-monogram'
  | 'split-magazine'
  | 'notebook-paper';

export type CarouselTypeId =
  | 'auto-smart'
  | 'framework-system'
  | 'myth-buster'
  | 'stats-proof'
  | 'before-after'
  | 'story-pov'
  | 'secret-list';

export type FontPairingId =
  | 'instrument-jakarta'
  | 'anton-jakarta'
  | 'bebas-space'
  | 'oswald-dmsans'
  | 'playfair-dmsans'
  | 'bodoni-inter'
  | 'cormorant-jakarta'
  | 'fraunces-space'
  | 'syne-space'
  | 'prata-dmsans'
  | 'marcellus-jakarta'
  | 'baskerville-jakarta'
  | 'spectral-space'
  | 'lora-dmsans'
  | 'outfit-space';

export type FrameStyleId =
  | 'magazine-border'
  | 'minimal-hairline'
  | 'arch-editorial'
  | 'clean-canvas';

export type SlideLayoutType =
  | 'cover-editorial'
  | 'numbered-insight'
  | 'big-stat'
  | 'comparison-split'
  | 'quote-manifesto'
  | 'checklist-card'
  | 'cta-outro';

export type CopywritingFrameworkId =
  | 'aida-editorial'
  | 'pas-viral'
  | 'contrarian-truth'
  | 'step-by-step'
  | 'story-transformation';

export interface PlatformFormatSpec {
  id: PlatformFormatId;
  name: string;
  platform: 'TikTok' | 'Instagram' | 'TikTok & Instagram';
  width: number;
  height: number;
  aspectRatio: string;
  badge: string;
  description: string;
  safeZone: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    warningNote: string;
  };
}

export interface EditorialTheme {
  id: EditorialThemeId;
  name: string;
  subtitle: string;
  bgPrimary: string;
  bgSecondary: string;
  ink: string;
  inkMuted: string;
  accent: string;
  accentSoft: string;
  border: string;
}

export interface FontPairing {
  id: FontPairingId;
  name: string;
  vibe: string;
  headingFamily: string;
  bodyFamily: string;
  monoFamily: string;
  headingWeight: number;
  headingStyle?: 'normal' | 'italic';
}

export interface SlideItem {
  id: string;
  layout: SlideLayoutType;
  kicker?: string;
  stepNumber?: string;
  title: string;
  highlightWord?: string;
  subtitle?: string;
  body: string;
  bulletPoints?: string[];
  statValue?: string;
  statLabel?: string;
  comparisonLeftTitle?: string;
  comparisonLeftText?: string;
  comparisonRightTitle?: string;
  comparisonRightText?: string;
  footnote?: string;
  swipePrompt?: string;
  illustrationId?: string;
  imageUrl?: string;
  customAccent?: string;
}

export interface CarouselProject {
  id: string;
  title: string;
  topic: string;
  targetAudience: string;
  formatId: PlatformFormatId;
  themeId: EditorialThemeId;
  visualStyle?: VisualStyleId;
  carouselType?: CarouselTypeId;
  customAccentColor?: string;
  customBgColor?: string;
  fontPairingId: FontPairingId;
  frameStyle: FrameStyleId;
  frameworkId: CopywritingFrameworkId;
  authorName: string;
  authorHandle: string;
  authorRole: string;
  showGrain: boolean;
  showSwipeIndicator: boolean;
  showSlideNumbers: boolean;
  respectSafeZones: boolean;
  slides: SlideItem[];
  caption: string;
  hashtags: string[];
  recommendedAudio: string;
  aiDecisionSummary?: {
    detectedNiche: string;
    chosenTypeLabel: string;
    chosenStyleLabel: string;
    hookStrategy: string;
  };
}
