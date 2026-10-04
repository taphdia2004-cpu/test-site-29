import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  Download,
  Image as ImageIcon,
  LayoutGrid,
  Palette,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  Trash2,
  Type,
  Wand2,
} from 'lucide-react';
import {
  CarouselProject,
  CarouselTypeId,
  EditorialThemeId,
  FontPairingId,
  SlideItem,
  SlideLayoutType,
  VisualStyleId,
} from './types/carousel';
import {
  EDITORIAL_THEMES,
  FONT_PAIRINGS,
  PLATFORM_FORMATS,
  PRESET_CAROUSELS,
} from './data/knowledgeBase';
import {
  getIllustrationSvg,
  ILLUSTRATION_CATALOG,
} from './data/illustrationsLibrary';
import {
  CAROUSEL_TYPES,
  matchIllustrationToText,
  VISUAL_STYLES,
  buildSmartAICarousel,
} from './utils/aiCarouselEngine';
import { SlideCanvas } from './components/SlideCanvas';
import {
  downloadAllSlidesZip,
  downloadSingleSlidePng,
} from './utils/exportImages';

const ACCENT_SWATCHES = [
  '#BE4B2A',
  '#158050',
  '#005CE6',
  '#6D4AFF',
  '#DC2626',
  '#F28C28',
  '#0284C7',
  '#84CC16',
];

const ILLUSTRATION_CATEGORIES = [
  'Toutes',
  'Croissance & Business',
  'Focus & Temps',
  'Créativité & Idées',
  'Équilibre & Mindset',
  'Tech, IA & Réseaux',
  'Argent & Psychologie',
] as const;

type StudioTab = 'design' | 'content' | 'illustrations';

const QUICK_IDEAS = [
  'Créer du contenu qui attire des clients',
  'Vaincre la procrastination',
  'Utiliser l’IA pour gagner du temps',
];

export function App() {
  const [project, setProject] = useState<CarouselProject>(() => PRESET_CAROUSELS[0]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [topicInput, setTopicInput] = useState('');
  const [carouselType, setCarouselType] = useState<CarouselTypeId>('auto-smart');
  const [activeTab, setActiveTab] = useState<StudioTab>('design');
  const [illustrationCategory, setIllustrationCategory] = useState<string>('Toutes');
  const [illustrationSearch, setIllustrationSearch] = useState('');
  const [viewportWidth, setViewportWidth] = useState(1440);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState('');
  const [captionCopied, setCaptionCopied] = useState(false);

  useEffect(() => {
    const updateViewport = () => setViewportWidth(window.innerWidth);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const format =
    PLATFORM_FORMATS.find((item) => item.id === project.formatId) ||
    PLATFORM_FORMATS[0];
  const theme =
    EDITORIAL_THEMES.find((item) => item.id === project.themeId) ||
    EDITORIAL_THEMES[0];
  const fontPairing =
    FONT_PAIRINGS.find((item) => item.id === project.fontPairingId) ||
    FONT_PAIRINGS[0];
  const visualStyle: VisualStyleId = project.visualStyle || 'skale-pinned-notes';
  const styleInfo = VISUAL_STYLES.find((item) => item.id === visualStyle) || VISUAL_STYLES[0];
  const activeAccent = project.customAccentColor || theme.accent;
  const activeBackground = project.customBgColor || theme.bgPrimary;
  const currentSlide = project.slides[activeSlideIndex] || project.slides[0];

  const previewWidth = Math.min(
    viewportWidth < 1280 ? viewportWidth * 0.8 : viewportWidth * 0.56,
    650
  );
  const previewScale = Math.min(
    0.56,
    previewWidth / format.width,
    720 / format.height
  );
  const thumbnailScale = Math.min(
    0.14,
    230 / format.height,
    132 / format.width
  );

  const filteredIllustrations = useMemo(() => {
    const query = illustrationSearch.trim().toLocaleLowerCase('fr');
    return ILLUSTRATION_CATALOG.filter((item) => {
      const categoryMatches =
        illustrationCategory === 'Toutes' || item.category === illustrationCategory;
      const queryMatches =
        !query ||
        item.label.toLocaleLowerCase('fr').includes(query) ||
        item.category.toLocaleLowerCase('fr').includes(query);
      return categoryMatches && queryMatches;
    });
  }, [illustrationCategory, illustrationSearch]);

  const updateProject = (patch: Partial<CarouselProject>) => {
    setProject((previous) => ({ ...previous, ...patch }));
  };

  const updateActiveSlide = (patch: Partial<SlideItem>) => {
    setProject((previous) => ({
      ...previous,
      slides: previous.slides.map((slide, index) =>
        index === activeSlideIndex ? { ...slide, ...patch } : slide
      ),
    }));
  };

  const fetchResearchSnippet = async (query: string) => {
    let snippet = '';

    try {
      const response = await fetch(`/api/ai-research?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        if (typeof data?.snippet === 'string') snippet = data.snippet;
      }
    } catch {
      // Continue with the public research fallback below.
    }

    if (!snippet) {
      try {
        const url = new URL('https://fr.wikipedia.org/w/api.php');
        url.searchParams.set('action', 'query');
        url.searchParams.set('list', 'search');
        url.searchParams.set('srsearch', query);
        url.searchParams.set('utf8', '1');
        url.searchParams.set('format', 'json');
        url.searchParams.set('srlimit', '2');
        url.searchParams.set('origin', '*');
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          snippet = data?.query?.search?.[0]?.snippet
            ?.replace(/<[^>]+>/g, '')
            .trim() || '';
        }
      } catch {
        // The built-in content engine still works without web research.
      }
    }

    return snippet;
  };

  const runAIGeneration = async (
    requestedTopic: string,
    requestedType: CarouselTypeId = carouselType
  ) => {
    const cleanTopic = requestedTopic.trim();
    if (!cleanTopic || isGenerating) return;

    setTopicInput(cleanTopic);
    setIsGenerating(true);
    try {
      const webSnippet = await fetchResearchSnippet(cleanTopic);
      const generated = buildSmartAICarousel({
        topic: cleanTopic,
        carouselType: requestedType,
        visualStyle,
        formatId: project.formatId,
        themeId: project.themeId,
        fontPairingId: project.fontPairingId,
        authorHandle: project.authorHandle,
        customAccentColor: project.customAccentColor,
        webSnippet,
      });

      setProject({
        ...generated,
        visualStyle,
        customAccentColor: project.customAccentColor,
        customBgColor: project.customBgColor,
      });
      setActiveSlideIndex(0);
      setActiveTab('design');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void runAIGeneration(topicInput);
  };

  const handleAutoIllustrations = () => {
    const used = new Set<string>();
    const slides = project.slides.map((slide, index) => {
      let illustrationId = matchIllustrationToText(
        `${slide.title} ${slide.subtitle || ''} ${(slide.bulletPoints || []).join(' ')}`,
        index
      );
      if (used.has(illustrationId)) {
        const alternative = ILLUSTRATION_CATALOG.find((item) => !used.has(item.id));
        if (alternative) illustrationId = alternative.id;
      }
      used.add(illustrationId);
      return { ...slide, illustrationId };
    });
    updateProject({ slides });
  };

  const handleAddSlide = () => {
    const newIndex = activeSlideIndex + 1;
    const newSlide: SlideItem = {
      id: `slide-${Date.now()}`,
      layout: 'numbered-insight',
      kicker: 'NOUVELLE IDÉE',
      title: 'Une idée *simple et directe* à retenir.',
      subtitle: 'Explique ici comment l’appliquer dès aujourd’hui.',
      body: '',
      illustrationId: ILLUSTRATION_CATALOG[project.slides.length % ILLUSTRATION_CATALOG.length].id,
      swipePrompt: 'Continuer →',
    };
    const slides = [...project.slides];
    slides.splice(newIndex, 0, newSlide);
    updateProject({ slides });
    setActiveSlideIndex(newIndex);
    setActiveTab('content');
  };

  const handleDeleteSlide = (indexToDelete: number) => {
    if (project.slides.length <= 2) return;
    const slides = project.slides.filter((_, index) => index !== indexToDelete);
    updateProject({ slides });
    setActiveSlideIndex((previous) =>
      indexToDelete < previous ? previous - 1 : Math.min(previous, slides.length - 1)
    );
  };

  const handleDownloadCurrent = async () => {
    if (!currentSlide) return;
    setIsExporting(true);
    try {
      await downloadSingleSlidePng(
        project,
        currentSlide,
        activeSlideIndex,
        theme,
        format
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadAll = async () => {
    setIsExporting(true);
    try {
      await downloadAllSlidesZip(project, theme, format, (current, total) => {
        setExportProgress(`${current}/${total}`);
      });
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  const handleCopyCaption = async () => {
    const text = `${project.caption}\n\n${project.hashtags.join(' ')}`;
    try {
      await navigator.clipboard.writeText(text);
      setCaptionCopied(true);
      window.setTimeout(() => setCaptionCopied(false), 1800);
    } catch {
      setCaptionCopied(false);
    }
  };

  const handlePaletteSelect = (themeId: EditorialThemeId, accent: string) => {
    updateProject({
      themeId,
      customAccentColor: accent,
      customBgColor: undefined,
    });
  };

  const handleResetColors = () => {
    updateProject({
      themeId: EDITORIAL_THEMES[0].id,
      customAccentColor: undefined,
      customBgColor: undefined,
    });
  };

  const tabs: { id: StudioTab; label: string; icon: React.ReactNode }[] = [
    { id: 'design', label: 'Design', icon: <Palette className="h-4 w-4" /> },
    { id: 'content', label: 'Texte', icon: <Type className="h-4 w-4" /> },
    { id: 'illustrations', label: 'Illustrations', icon: <ImageIcon className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#211E1A]">
      <header className="sticky top-0 z-30 border-b border-[#E8E2D8] bg-[#FBFAF7]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-sm"
              style={{ backgroundColor: activeAccent }}
            >
              A
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-bold tracking-tight">Atelier Carrousel</h1>
              <p className="text-[11px] text-[#777168]">TikTok & Instagram · création simplifiée</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <label className="relative">
              <span className="sr-only">Format du carrousel</span>
              <select
                value={project.formatId}
                onChange={(event) => updateProject({ formatId: event.target.value as CarouselProject['formatId'] })}
                className="h-10 max-w-[190px] appearance-none rounded-xl border border-[#E3DDD2] bg-white py-2 pl-3 pr-9 text-xs font-semibold text-[#29251F] outline-none transition focus:border-[#AFA79B]"
              >
                {PLATFORM_FORMATS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} · {item.aspectRatio}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#777168]" />
            </label>
            <button
              onClick={() => void handleDownloadAll()}
              disabled={isExporting}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#211E1A] px-3.5 text-xs font-semibold text-white transition hover:bg-[#413A33] disabled:cursor-wait disabled:opacity-60 sm:px-4"
            >
              <Download className="h-4 w-4" />
              <span>{isExporting ? `Export ${exportProgress}` : 'Exporter le carrousel'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1480px] space-y-5 px-4 py-5 sm:px-6 sm:py-7">
        <section className="rounded-[26px] border border-[#E6DFD4] bg-[#FBFAF7] p-4 shadow-[0_10px_36px_-28px_rgba(49,39,24,0.25)] sm:p-6">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B8174]">Ton studio créatif</p>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Une idée suffit.</h2>
              <p className="mt-1 text-sm text-[#70695F]">L’IA prépare le texte, la structure et les illustrations.</p>
            </div>
            <span className="hidden text-xs text-[#8B8174] sm:block">22 styles · 48 illustrations · PNG</span>
          </div>

          <form onSubmit={handleGenerateSubmit} className="flex flex-col gap-2.5 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Wand2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#81766A]" />
              <input
                required
                value={topicInput}
                onChange={(event) => setTopicInput(event.target.value)}
                placeholder="Ex. Comment trouver ses premiers clients grâce à Instagram…"
                className="h-12 w-full rounded-xl border border-[#E3DDD2] bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-[#A49C91] focus:border-[#81766A] focus:ring-2 focus:ring-[#81766A]/10"
              />
            </div>
            <label className="relative lg:w-[250px]">
              <span className="sr-only">Type de carrousel</span>
              <select
                value={carouselType}
                onChange={(event) => setCarouselType(event.target.value as CarouselTypeId)}
                className="h-12 w-full appearance-none rounded-xl border border-[#E3DDD2] bg-white px-3.5 pr-9 text-xs font-semibold outline-none transition focus:border-[#81766A]"
              >
                {CAROUSEL_TYPES.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#777168]" />
            </label>
            <button
              type="submit"
              disabled={isGenerating || !topicInput.trim()}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 disabled:cursor-wait disabled:opacity-60"
              style={{ backgroundColor: activeAccent }}
            >
              <Sparkles className="h-4 w-4" />
              {isGenerating ? 'Création en cours…' : 'Créer mon carrousel'}
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[11px] text-[#8B8174]">Idées :</span>
            {QUICK_IDEAS.map((idea) => (
              <button
                key={idea}
                type="button"
                onClick={() => void runAIGeneration(idea)}
                disabled={isGenerating}
                className="rounded-full border border-[#E8E2D8] bg-[#F6F3ED] px-3 py-1.5 text-[11px] font-medium text-[#5F584F] transition hover:border-[#C9BFB1] hover:bg-white disabled:opacity-50"
              >
                {idea}
              </button>
            ))}
          </div>
        </section>

        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.9fr)]">
          <section className="min-w-0 space-y-4">
            <div className="overflow-hidden rounded-[26px] border border-[#E6DFD4] bg-[#FBFAF7] shadow-[0_10px_36px_-28px_rgba(49,39,24,0.25)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEE9E1] px-4 py-3.5 sm:px-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8B8174]">Aperçu du carrousel</p>
                  <p className="mt-0.5 text-sm font-semibold">Slide {activeSlideIndex + 1} <span className="font-normal text-[#8B8174]">sur {project.slides.length}</span></p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveSlideIndex((index) => Math.max(0, index - 1))}
                    disabled={activeSlideIndex === 0}
                    aria-label="Slide précédente"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E6DFD4] bg-white text-[#5F584F] transition hover:bg-[#F6F3ED] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSlideIndex((index) => Math.min(project.slides.length - 1, index + 1))}
                    disabled={activeSlideIndex === project.slides.length - 1}
                    aria-label="Slide suivante"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E6DFD4] bg-white text-[#5F584F] transition hover:bg-[#F6F3ED] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDownloadCurrent()}
                    disabled={isExporting}
                    className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#E6DFD4] bg-white px-3 text-xs font-semibold transition hover:bg-[#F6F3ED] disabled:opacity-50"
                  >
                    <Download className="h-3.5 w-3.5" />
                    PNG
                  </button>
                </div>
              </div>

              <div className="flex min-h-[390px] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_#ffffff_0%,_#f5f1e9_76%)] px-3 py-6 sm:min-h-[540px] sm:py-8">
                {currentSlide ? (
                  <SlideCanvas
                    slide={currentSlide}
                    slideIndex={activeSlideIndex}
                    totalSlides={project.slides.length}
                    project={project}
                    format={format}
                    theme={theme}
                    fontPairing={fontPairing}
                    scale={previewScale}
                  />
                ) : (
                  <div className="text-sm text-[#81766A]">Ajoute une slide pour commencer.</div>
                )}
              </div>

              <div className="border-t border-[#EEE9E1] px-4 py-4 sm:px-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-[#655E55]">Tes slides</p>
                  <button
                    type="button"
                    onClick={handleAddSlide}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition hover:bg-[#F1ECE3]"
                    style={{ color: activeAccent }}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Ajouter une slide
                  </button>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {project.slides.map((slide, index) => (
                    <div key={slide.id} className="group relative shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveSlideIndex(index)}
                        aria-label={`Afficher la slide ${index + 1}`}
                        className={`rounded-[15px] p-1.5 transition ${
                          index === activeSlideIndex
                            ? 'bg-white ring-2 ring-[#29251F] shadow-sm'
                            : 'bg-transparent hover:bg-white/70'
                        }`}
                      >
                        <SlideCanvas
                          slide={slide}
                          slideIndex={index}
                          totalSlides={project.slides.length}
                          project={project}
                          format={format}
                          theme={theme}
                          fontPairing={fontPairing}
                          scale={thumbnailScale}
                        />
                      </button>
                      <div className="mt-1 flex items-center justify-between px-1">
                        <span className="text-[10px] font-semibold text-[#736B61]">{String(index + 1).padStart(2, '0')}</span>
                        {project.slides.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteSlide(index)}
                            aria-label={`Supprimer la slide ${index + 1}`}
                            className="rounded p-0.5 text-[#9A9185] opacity-0 transition hover:text-red-600 group-hover:opacity-100 focus:opacity-100"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <section className="rounded-[22px] border border-[#E6DFD4] bg-[#FBFAF7] p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8B8174]">Prêt à publier</p>
                  <h3 className="mt-1 text-sm font-semibold">Légende TikTok & Instagram</h3>
                </div>
                <button
                  type="button"
                  onClick={() => void handleCopyCaption()}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#E6DFD4] bg-white px-3 py-2 text-xs font-semibold transition hover:bg-[#F6F3ED]"
                >
                  {captionCopied ? <Check className="h-3.5 w-3.5 text-emerald-700" /> : <Copy className="h-3.5 w-3.5" />}
                  {captionCopied ? 'Copié' : 'Copier'}
                </button>
              </div>
              <p className="mt-3 line-clamp-3 whitespace-pre-line text-xs leading-relaxed text-[#625B52]">{project.caption}</p>
              {project.hashtags.length > 0 && (
                <p className="mt-2 line-clamp-1 text-[11px] text-[#8B8174]">{project.hashtags.join(' ')}</p>
              )}
            </section>
          </section>

          <aside className="overflow-hidden rounded-[26px] border border-[#E6DFD4] bg-[#FBFAF7] shadow-[0_10px_36px_-28px_rgba(49,39,24,0.25)] xl:sticky xl:top-[88px]">
            <div className="border-b border-[#EEE9E1] px-4 pb-3 pt-4 sm:px-5">
              <p className="text-sm font-semibold">Personnaliser</p>
              <p className="mt-0.5 text-xs text-[#81766A]">Modifie seulement ce dont tu as besoin.</p>
              <div className="mt-4 grid grid-cols-3 gap-1 rounded-xl bg-[#F1ECE3] p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[11px] font-semibold transition sm:text-xs ${
                      activeTab === tab.id
                        ? 'bg-white text-[#29251F] shadow-sm'
                        : 'text-[#82796E] hover:text-[#39342E]'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="max-h-[calc(100vh-190px)] min-h-[350px] overflow-y-auto p-4 sm:p-5">
              {activeTab === 'design' && (
                <div className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">Style du carrousel</label>
                    <select
                      value={visualStyle}
                      onChange={(event) => updateProject({ visualStyle: event.target.value as VisualStyleId })}
                      className="h-11 w-full rounded-xl border border-[#E3DDD2] bg-white px-3 text-xs font-medium outline-none focus:border-[#81766A]"
                    >
                      {VISUAL_STYLES.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-[#81766A]">{styleInfo.description}</p>
                  </div>

                  <div className="border-t border-[#EEE9E1] pt-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold">Couleurs du design</p>
                        <p className="mt-0.5 text-[11px] text-[#81766A]">Toutes les couleurs sont modifiables.</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleResetColors}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#81766A] transition hover:text-[#29251F]"
                        title="Réinitialiser les couleurs"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Réinitialiser
                      </button>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-[#EEE9E1] bg-white p-3.5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-semibold">Couleur principale</p>
                          <p className="text-[10px] text-[#8B8174]">Accents, mots-clés, illustrations</p>
                        </div>
                        <label className="flex h-9 items-center gap-2 rounded-lg border border-[#E8E2D8] px-2">
                          <input
                            type="color"
                            value={activeAccent}
                            onChange={(event) => updateProject({ customAccentColor: event.target.value })}
                            aria-label="Choisir la couleur principale"
                            className="h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
                          />
                          <span className="font-mono text-[10px] uppercase text-[#6D665D]">{activeAccent}</span>
                        </label>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {ACCENT_SWATCHES.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => updateProject({ customAccentColor: color })}
                            aria-label={`Accent ${color}`}
                            title={color}
                            className={`h-6 w-6 rounded-full border-2 transition hover:scale-110 ${activeAccent.toLowerCase() === color.toLowerCase() ? 'border-[#211E1A] ring-2 ring-[#211E1A]/10' : 'border-white shadow-sm'}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      <div className="border-t border-[#F0ECE6] pt-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-semibold">Couleur du fond</p>
                            <p className="text-[10px] text-[#8B8174]">Auto ou couleur personnalisée</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateProject({ customBgColor: undefined })}
                              className={`rounded-lg border px-2 py-1.5 text-[10px] font-semibold transition ${!project.customBgColor ? 'border-[#29251F] bg-[#29251F] text-white' : 'border-[#E8E2D8] bg-white text-[#6D665D] hover:bg-[#F6F3ED]'}`}
                            >
                              Auto
                            </button>
                            <label className="flex h-9 items-center rounded-lg border border-[#E8E2D8] px-2">
                              <input
                                type="color"
                                value={activeBackground}
                                onChange={(event) => updateProject({ customBgColor: event.target.value })}
                                aria-label="Choisir la couleur de fond"
                                className="h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#EEE9E1] pt-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold">Palettes prêtes à l’emploi</p>
                        <p className="mt-0.5 text-[11px] text-[#81766A]">14 ambiances, un clic</p>
                      </div>
                      <LayoutGrid className="h-4 w-4 text-[#A19688]" />
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {EDITORIAL_THEMES.map((item) => {
                        const selected =
                          project.themeId === item.id &&
                          activeAccent.toLowerCase() === item.accent.toLowerCase() &&
                          !project.customBgColor;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handlePaletteSelect(item.id as EditorialThemeId, item.accent)}
                            title={`${item.name} — ${item.subtitle}`}
                            aria-label={`Palette ${item.name}`}
                            className={`relative flex h-9 items-center justify-center rounded-lg border transition hover:-translate-y-0.5 ${selected ? 'border-[#29251F] ring-2 ring-[#29251F]/15' : 'border-[#E7E1D8]'}`}
                            style={{ backgroundColor: item.bgPrimary }}
                          >
                            <span className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ backgroundColor: item.accent }} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-[#EEE9E1] pt-4">
                    <label className="mb-1.5 block text-xs font-semibold">Police d’écriture</label>
                    <select
                      value={project.fontPairingId}
                      onChange={(event) => updateProject({ fontPairingId: event.target.value as FontPairingId })}
                      className="h-11 w-full rounded-xl border border-[#E3DDD2] bg-white px-3 text-xs outline-none focus:border-[#81766A]"
                    >
                      {FONT_PAIRINGS.map((item) => (
                        <option key={item.id} value={item.id}>{item.name} · {item.vibe}</option>
                      ))}
                    </select>
                    <p className="mt-1.5 text-[11px] text-[#81766A]">Aperçu : <span style={{ fontFamily: fontPairing.headingFamily }} className="font-semibold text-[#29251F]">Un titre qui accroche</span></p>
                  </div>
                </div>
              )}

              {activeTab === 'content' && currentSlide && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">Mise en page de la slide</label>
                    <select
                      value={currentSlide.layout}
                      onChange={(event) => updateActiveSlide({ layout: event.target.value as SlideLayoutType })}
                      className="h-11 w-full rounded-xl border border-[#E3DDD2] bg-white px-3 text-xs outline-none focus:border-[#81766A]"
                    >
                      <option value="cover-editorial">Couverture</option>
                      <option value="numbered-insight">Idée clé</option>
                      <option value="big-stat">Chiffre clé</option>
                      <option value="comparison-split">Comparaison</option>
                      <option value="quote-manifesto">Citation</option>
                      <option value="checklist-card">Checklist</option>
                      <option value="cta-outro">Conclusion</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">Petit titre</label>
                    <input
                      value={currentSlide.kicker || ''}
                      onChange={(event) => updateActiveSlide({ kicker: event.target.value })}
                      placeholder="Ex. 01 — LE DÉCLIC"
                      className="h-10 w-full rounded-xl border border-[#E3DDD2] bg-white px-3 text-xs outline-none focus:border-[#81766A]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">Titre principal</label>
                    <textarea
                      rows={4}
                      value={currentSlide.title}
                      onChange={(event) => updateActiveSlide({ title: event.target.value })}
                      className="w-full resize-y rounded-xl border border-[#E3DDD2] bg-white px-3 py-2.5 text-xs leading-relaxed outline-none focus:border-[#81766A]"
                    />
                    <p className="mt-1 text-[10px] text-[#8B8174]">Entoure un mot d’astérisques pour le mettre en valeur : *mot*</p>
                  </div>

                  {currentSlide.layout === 'big-stat' && (
                    <div className="space-y-3 rounded-xl bg-[#F5F1E9] p-3">
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold">Chiffre clé</label>
                        <input
                          value={currentSlide.statValue || ''}
                          onChange={(event) => updateActiveSlide({ statValue: event.target.value })}
                          className="h-10 w-full rounded-lg border border-[#E3DDD2] bg-white px-3 text-xs outline-none focus:border-[#81766A]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold">Explication</label>
                        <textarea
                          rows={2}
                          value={currentSlide.statLabel || ''}
                          onChange={(event) => updateActiveSlide({ statLabel: event.target.value })}
                          className="w-full rounded-lg border border-[#E3DDD2] bg-white px-3 py-2 text-xs outline-none focus:border-[#81766A]"
                        />
                      </div>
                    </div>
                  )}

                  {currentSlide.layout === 'comparison-split' ? (
                    <div className="space-y-3 rounded-xl bg-[#F5F1E9] p-3">
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold">À éviter</label>
                        <textarea
                          rows={3}
                          value={currentSlide.comparisonLeftText || ''}
                          onChange={(event) => updateActiveSlide({ comparisonLeftText: event.target.value })}
                          className="w-full rounded-lg border border-[#E3DDD2] bg-white px-3 py-2 text-xs outline-none focus:border-[#81766A]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold">À adopter</label>
                        <textarea
                          rows={3}
                          value={currentSlide.comparisonRightText || ''}
                          onChange={(event) => updateActiveSlide({ comparisonRightText: event.target.value })}
                          className="w-full rounded-lg border border-[#E3DDD2] bg-white px-3 py-2 text-xs outline-none focus:border-[#81766A]"
                        />
                      </div>
                    </div>
                  ) : currentSlide.layout === 'checklist-card' ? (
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold">Checklist (une ligne par point)</label>
                      <textarea
                        rows={5}
                        value={(currentSlide.bulletPoints || []).join('\n')}
                        onChange={(event) => updateActiveSlide({ bulletPoints: event.target.value.split('\n') })}
                        className="w-full rounded-xl border border-[#E3DDD2] bg-white px-3 py-2.5 text-xs leading-relaxed outline-none focus:border-[#81766A]"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold">Phrase d’explication</label>
                      <textarea
                        rows={3}
                        value={currentSlide.subtitle || ''}
                        onChange={(event) => updateActiveSlide({ subtitle: event.target.value })}
                        className="w-full rounded-xl border border-[#E3DDD2] bg-white px-3 py-2.5 text-xs leading-relaxed outline-none focus:border-[#81766A]"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 border-t border-[#EEE9E1] pt-4">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold">Signature</label>
                      <input
                        value={project.authorHandle}
                        onChange={(event) => updateProject({ authorHandle: event.target.value })}
                        className="h-10 w-full rounded-xl border border-[#E3DDD2] bg-white px-3 text-xs outline-none focus:border-[#81766A]"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold">Invite à swiper</label>
                      <input
                        value={currentSlide.swipePrompt || ''}
                        onChange={(event) => updateActiveSlide({ swipePrompt: event.target.value })}
                        className="h-10 w-full rounded-xl border border-[#E3DDD2] bg-white px-3 text-xs outline-none focus:border-[#81766A]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'illustrations' && currentSlide && (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold">Illustration de la slide {activeSlideIndex + 1}</p>
                      <p className="mt-1 text-[11px] text-[#81766A]">Couleurs synchronisées avec ton design.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAutoIllustrations}
                      title="Choisir automatiquement une illustration adaptée à chaque slide"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition hover:bg-[#F1ECE3]"
                      style={{ color: activeAccent }}
                    >
                      <Wand2 className="h-3.5 w-3.5" />
                      Auto
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <label className="relative min-w-0 flex-1">
                      <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9A9185]" />
                      <input
                        value={illustrationSearch}
                        onChange={(event) => setIllustrationSearch(event.target.value)}
                        placeholder="Rechercher une illustration…"
                        className="h-10 w-full rounded-xl border border-[#E3DDD2] bg-white pl-9 pr-3 text-xs outline-none focus:border-[#81766A]"
                      />
                    </label>
                    <select
                      value={illustrationCategory}
                      onChange={(event) => setIllustrationCategory(event.target.value)}
                      className="h-10 max-w-[150px] rounded-xl border border-[#E3DDD2] bg-white px-2 text-[10px] outline-none focus:border-[#81766A]"
                    >
                      {ILLUSTRATION_CATEGORIES.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {filteredIllustrations.map((item) => {
                      const selected = currentSlide.illustrationId === item.id;
                      const previewSvg = getIllustrationSvg(
                        item.id,
                        theme.ink,
                        activeAccent,
                        theme.accentSoft
                      );
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => updateActiveSlide({ illustrationId: item.id })}
                          title={`${item.label} · ${item.category}`}
                          className={`rounded-xl border p-2 text-left transition hover:-translate-y-0.5 hover:bg-white ${selected ? 'border-[#29251F] bg-white ring-2 ring-[#29251F]/10' : 'border-[#EEE9E1] bg-[#F8F6F1]'}`}
                        >
                          <div className="mx-auto aspect-[1.35] w-full max-w-[90px]" dangerouslySetInnerHTML={{ __html: previewSvg }} />
                          <span className="mt-1 block truncate text-center text-[9px] font-medium text-[#5F584F]">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => updateActiveSlide({ illustrationId: 'none' })}
                    className="w-full rounded-xl border border-dashed border-[#D9D1C5] px-3 py-2 text-xs font-medium text-[#81766A] transition hover:border-[#AFA79B] hover:bg-white"
                  >
                    Retirer l’illustration de cette slide
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>

        <footer className="pb-2 text-center text-[10px] text-[#978E83]">
          Créé pour des carrousels TikTok Photo Mode & Instagram · Images haute résolution prêtes à exporter
        </footer>
      </main>
    </div>
  );
}

export default App;
