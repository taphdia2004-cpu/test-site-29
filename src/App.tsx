import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  Plus,
  Trash2,
  Check,
  Copy,
  Wand2,
  Palette,
  Type,
  LayoutGrid,
  Image as ImageIcon,
  Shuffle,
  RotateCcw,
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
  PLATFORM_FORMATS,
  EDITORIAL_THEMES,
  FONT_PAIRINGS,
  PRESET_CAROUSELS,
} from './data/knowledgeBase';
import {
  ILLUSTRATION_CATALOG,
  getIllustrationSvg,
} from './data/illustrationsLibrary';
import {
  CAROUSEL_TYPES,
  VISUAL_STYLES,
  buildSmartAICarousel,
  matchIllustrationToText,
} from './utils/aiCarouselEngine';
import { SlideCanvas } from './components/SlideCanvas';
import {
  downloadSingleSlidePng,
  downloadAllSlidesZip,
} from './utils/exportImages';

const CATEGORIES = [
  'Toutes',
  'Croissance & Business',
  'Focus & Temps',
  'Créativité & Idées',
  'Équilibre & Mindset',
  'Tech, IA & Réseaux',
  'Argent & Psychologie',
] as const;

const QUICK_IDEA_CHIPS = [
  'Vaincre la procrastination et doubler son focus',
  'Gagner du temps et des clients grâce à l’IA',
  'La psychologie des prix pour vendre plus',
  'Investir intelligemment quand on débute',
  'Optimiser son sommeil et son énergie',
  'Créer du contenu viral sur TikTok & Instagram',
];

const ACCENT_SWATCHES = [
  { hex: '#FF5A26', name: 'Orange Vif' },
  { hex: '#158050', name: 'Vert Émeraude' },
  { hex: '#005CE6', name: 'Bleu Électrique' },
  { hex: '#A855F7', name: 'Violet Néon' },
  { hex: '#DC2626', name: 'Rouge Écarlate' },
  { hex: '#F28C28', name: 'Ambre Pinceau' },
  { hex: '#0284C7', name: 'Cyan Infographie' },
  { hex: '#6D4AFF', name: 'Indigo UI' },
  { hex: '#84CC16', name: 'Vert Lime' },
  { hex: '#DB2777', name: 'Rose Magenta' },
  { hex: '#BE4B2A', name: 'Terracotta' },
  { hex: '#8C6239', name: 'Or Bronze' },
];

const BG_SWATCHES = [
  { hex: '#FFFFFF', name: 'Blanc Pur' },
  { hex: '#F7F3EB', name: 'Lin Crème' },
  { hex: '#F3F1E7', name: 'Ivoire Doux' },
  { hex: '#F0F6FF', name: 'Bleu Glace' },
  { hex: '#F5F3FF', name: 'Lavande Pâle' },
  { hex: '#FDF2F8', name: 'Rose Poudré' },
  { hex: '#0B0910', name: 'Noir Cyber' },
  { hex: '#0E1311', name: 'Noir Carbone' },
  { hex: '#071E4A', name: 'Bleu Nuit' },
  { hex: '#1F1216', name: 'Bordeaux Nuit' },
];

export function App() {
  const [project, setProject] = useState<CarouselProject>(PRESET_CAROUSELS[0]);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [topicInput, setTopicInput] = useState<string>('');
  const [selectedCarouselType, setSelectedCarouselType] =
    useState<CarouselTypeId>('auto-smart');
  const [illCategory, setIllCategory] = useState<string>('Toutes');
  const [illSearch, setIllSearch] = useState<string>('');
  const [rightTab, setRightTab] = useState<
    'designs' | 'fonts' | 'illustrations' | 'slide'
  >('designs');
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<string>('');
  const [copiedCaption, setCopiedCaption] = useState<boolean>(false);

  const currentFormat =
    PLATFORM_FORMATS.find((f) => f.id === project.formatId) ||
    PLATFORM_FORMATS[0];
  const baseTheme =
    EDITORIAL_THEMES.find((t) => t.id === project.themeId) ||
    EDITORIAL_THEMES[0];
  const currentFonts =
    FONT_PAIRINGS.find((f) => f.id === project.fontPairingId) ||
    FONT_PAIRINGS[0];
  const currentSlide = project.slides[activeSlideIndex] || project.slides[0];
  const activeVisualStyle: VisualStyleId =
    project.visualStyle || 'skale-pinned-notes';
  const activeAccent = project.customAccentColor || baseTheme.accent;
  const activeBg = project.customBgColor || baseTheme.bgPrimary;

  const cardScale =
    currentFormat.height === 1920
      ? 0.23
      : currentFormat.height === 1440
      ? 0.28
      : currentFormat.height === 1350
      ? 0.29
      : 0.33;

  const updateProject = (patch: Partial<CarouselProject>) => {
    setProject((prev) => ({ ...prev, ...patch }));
  };

  const updateActiveSlide = (patch: Partial<SlideItem>) => {
    setProject((prev) => {
      const nextSlides = prev.slides.map((s, idx) =>
        idx === activeSlideIndex ? { ...s, ...patch } : s
      );
      return { ...prev, slides: nextSlides };
    });
  };

  const runAIGeneration = async (
    ideaText: string,
    typeOverride?: CarouselTypeId
  ) => {
    const cleanIdea = ideaText.trim();
    if (!cleanIdea) return;

    setIsGeneratingAI(true);
    let webSnippet = '';
    try {
      const res = await fetch(
        `/api/ai-research?q=${encodeURIComponent(cleanIdea)}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data?.snippet && data.snippet.length > 30) {
          webSnippet = data.snippet;
        }
      }
    } catch {
      // The local research endpoint is optional; try a public source next.
    }

    // Static hosting (such as GitHub Pages) has no Node API route. Query
    // Wikipedia directly as a lightweight research fallback, then continue
    // with the built-in semantic engine if the browser/network blocks it.
    if (!webSnippet) {
      try {
        const researchUrl = new URL('https://fr.wikipedia.org/w/api.php');
        researchUrl.searchParams.set('action', 'query');
        researchUrl.searchParams.set('list', 'search');
        researchUrl.searchParams.set('srsearch', cleanIdea);
        researchUrl.searchParams.set('utf8', '1');
        researchUrl.searchParams.set('format', 'json');
        researchUrl.searchParams.set('srlimit', '2');
        researchUrl.searchParams.set('origin', '*');
        const response = await fetch(researchUrl);
        if (response.ok) {
          const data = await response.json();
          const snippet = data?.query?.search?.[0]?.snippet
            ?.replace(/<[^>]+>/g, '')
            .trim();
          if (snippet && snippet.length > 30) webSnippet = snippet;
        }
      } catch {
        // Keep using the built-in semantic generator when web research is unavailable.
      }
    }

    const generated = buildSmartAICarousel({
      topic: cleanIdea,
      carouselType: typeOverride || selectedCarouselType,
      visualStyle: activeVisualStyle,
      formatId: project.formatId,
      themeId: project.themeId,
      fontPairingId: project.fontPairingId,
      authorHandle: project.authorHandle,
      customAccentColor: project.customAccentColor,
      webSnippet,
    });

    // Preserve user's chosen custom colors & style so their color choice always stays active
    setProject({
      ...generated,
      visualStyle: activeVisualStyle,
      customAccentColor: project.customAccentColor,
      customBgColor: project.customBgColor,
    });
    setActiveSlideIndex(0);
    setIsGeneratingAI(false);
  };

  const handleGenerateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicInput.trim()) return;
    runAIGeneration(topicInput);
  };

  const handleAutoMatchAllIllustrations = () => {
    const used = new Set<string>();
    const updatedSlides = project.slides.map((s, i) => {
      const matched = matchIllustrationToText(
        `${s.title} ${s.subtitle || ''} ${(s.bulletPoints || []).join(' ')}`,
        i
      );
      let finalId = matched;
      if (used.has(finalId)) {
        const alt = ILLUSTRATION_CATALOG.find((item) => !used.has(item.id));
        if (alt) finalId = alt.id;
      }
      used.add(finalId);
      return { ...s, illustrationId: finalId };
    });
    updateProject({ slides: updatedSlides });
  };

  const handleAddSlide = () => {
    const newSlide: SlideItem = {
      id: `s-${Date.now()}`,
      layout: 'numbered-insight',
      kicker: `0${project.slides.length} — POINT CLÉ`,
      title: 'Une idée *simple et directe* qui change tout.',
      subtitle:
        'Explique en une phrase courte comment appliquer ce conseil dès aujourd’hui.',
      body: '',
      illustrationId:
        ILLUSTRATION_CATALOG[
          project.slides.length % ILLUSTRATION_CATALOG.length
        ].id,
      swipePrompt: 'Continuer →',
    };
    const nextSlides = [...project.slides];
    nextSlides.splice(activeSlideIndex + 1, 0, newSlide);
    updateProject({ slides: nextSlides });
    setActiveSlideIndex(activeSlideIndex + 1);
  };

  const handleDeleteSlide = (idx: number) => {
    if (project.slides.length <= 2) return;
    const nextSlides = project.slides.filter((_, i) => i !== idx);
    updateProject({ slides: nextSlides });
    setActiveSlideIndex(
      Math.max(0, Math.min(activeSlideIndex, nextSlides.length - 1))
    );
  };

  const handleExportCurrentPng = async () => {
    setIsExporting(true);
    setExportProgress('PNG...');
    try {
      await downloadSingleSlidePng(
        project,
        currentSlide,
        activeSlideIndex,
        baseTheme,
        currentFormat
      );
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  const handleExportAllZip = async () => {
    setIsExporting(true);
    try {
      await downloadAllSlidesZip(
        project,
        baseTheme,
        currentFormat,
        (cur, tot) => setExportProgress(`${cur}/${tot} PNG`)
      );
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  const handleCopyCaption = () => {
    const text = `${project.caption}\n\n${project.hashtags.join(' ')}`;
    navigator.clipboard.writeText(text);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const filteredIllustrations = ILLUSTRATION_CATALOG.filter((item) => {
    const matchCat = illCategory === 'Toutes' || item.category === illCategory;
    const matchQuery =
      !illSearch.trim() ||
      item.name.toLowerCase().includes(illSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(illSearch.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#181512] flex flex-col">
      {/* TOP HEADER BAR */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur border-b border-[#E5DEC9] px-5 py-3">
        <div className="max-w-[1640px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-serif italic text-lg shadow-sm"
              style={{ backgroundColor: activeAccent }}
            >
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-sm tracking-tight text-[#181512]">
                  Atelier Carrousel IA
                </h1>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#EFECE4] text-[#6E675F]">
                  22 Designs · Couleurs 100% Personnalisables · 48 Illustrations
                </span>
              </div>
              <p className="text-xs text-[#6E675F]">
                Change librement la couleur de tous les designs, styles, fonds et illustrations
              </p>
            </div>
          </div>

          {/* Format Selector */}
          <div className="flex items-center bg-[#EFECE4] p-1 rounded-xl">
            {PLATFORM_FORMATS.map((fmt) => {
              const active = fmt.id === project.formatId;
              return (
                <button
                  key={fmt.id}
                  onClick={() => updateProject({ formatId: fmt.id })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'bg-white text-[#181512] shadow-sm'
                      : 'text-[#6E675F] hover:text-[#181512]'
                  }`}
                >
                  {fmt.name}{' '}
                  <span className="opacity-60">({fmt.aspectRatio})</span>
                </button>
              );
            })}
          </div>

          {/* Export Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCurrentPng}
              disabled={isExporting}
              className="px-3.5 py-2 rounded-xl border border-[#DCD4C4] bg-white hover:bg-[#F5F2EB] text-xs font-medium text-[#181512] flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Slide {activeSlideIndex + 1} (PNG)</span>
            </button>

            <button
              onClick={handleExportAllZip}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-2 shadow-sm hover:opacity-95 transition"
              style={{ backgroundColor: '#181512' }}
            >
              <Download className="w-4 h-4" />
              <span>
                {isExporting
                  ? `Export ${exportProgress}`
                  : `Télécharger tout (${project.slides.length} PNG)`}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* AI COMMAND BAR */}
      <section className="bg-[#FAF8F5] border-b border-[#E5DEC9] px-5 py-3.5">
        <div className="max-w-[1640px] mx-auto flex flex-col gap-2.5">
          <form
            onSubmit={handleGenerateSubmit}
            className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5"
          >
            <div className="relative flex-1">
              <Wand2
                className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: activeAccent }}
              />
              <input
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="Écris simplement ton idée (ex: La psychologie des prix, Vaincre la procrastination, Gagner des clients avec l'IA...)"
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-[#DCD4C4] text-sm text-[#181512] placeholder-[#8E867B] focus:outline-none focus:border-[#181512] shadow-sm"
              />
            </div>

            <select
              value={selectedCarouselType}
              onChange={(e) => {
                const newType = e.target.value as CarouselTypeId;
                setSelectedCarouselType(newType);
                runAIGeneration(topicInput || project.topic, newType);
              }}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD4C4] text-xs font-medium text-[#181512] focus:outline-none cursor-pointer"
            >
              {CAROUSEL_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.badge})
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={isGeneratingAI}
              className="px-5 py-2.5 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition shrink-0"
              style={{ backgroundColor: '#181512' }}
            >
              <Sparkles className="w-4 h-4 text-[#F3B34C]" />
              <span>
                {isGeneratingAI
                  ? 'Rédaction & Illustrations IA...'
                  : 'L’IA crée tout le carrousel'}
              </span>
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-medium text-[#6E675F] mr-1">
                Idées rapides :
              </span>
              {QUICK_IDEA_CHIPS.map((idea) => (
                <button
                  key={idea}
                  type="button"
                  onClick={() => {
                    setTopicInput(idea);
                    runAIGeneration(idea);
                  }}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-[#EFECE4] hover:bg-[#E4DFD3] text-[#181512] transition"
                >
                  {idea}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 max-w-[1640px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-5">
        {/* LEFT COLUMN (7/12): QUICK STYLE & COLOR BAR + STORYBOARD */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* BARRE DIRECTE DE STYLE & DE COULEURS POUR TOUS LES DESIGNS */}
          <div className="bg-[#FAF8F5] border border-[#E5DEC9] rounded-2xl p-3.5 flex flex-col gap-3">
            {/* Row 1: 22 Styles */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E675F]">
                  1. Choisir le Design du Carrousel (22 Styles) :
                </span>
                <button
                  onClick={handleAutoMatchAllIllustrations}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-[#EFECE4] hover:bg-[#E4DFD3] text-[#181512] font-medium flex items-center gap-1 transition"
                >
                  <Shuffle className="w-3 h-3" />
                  <span>Illustrations auto IA</span>
                </button>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {VISUAL_STYLES.map((st) => {
                  const active = activeVisualStyle === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => updateProject({ visualStyle: st.id })}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                        active
                          ? 'bg-[#181512] text-white shadow-sm'
                          : 'bg-white border border-[#E5DEC9] text-[#181512] hover:bg-[#EFECE4]'
                      }`}
                    >
                      {st.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 2: Instant Color Picker for ALL 22 Designs (Accent + Background) */}
            <div className="pt-2.5 border-t border-[#E5DEC9] flex flex-wrap items-center justify-between gap-4">
              {/* Accent Color Swatches */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#181512]">
                  2. Couleur du Design :
                </span>
                {ACCENT_SWATCHES.map((sw) => {
                  const isSel =
                    activeAccent.toLowerCase() === sw.hex.toLowerCase();
                  return (
                    <button
                      key={sw.hex}
                      onClick={() =>
                        updateProject({ customAccentColor: sw.hex })
                      }
                      title={sw.name}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        isSel
                          ? 'scale-125 border-[#181512] shadow-md'
                          : 'border-white shadow-sm hover:scale-110'
                      }`}
                      style={{ backgroundColor: sw.hex }}
                    />
                  );
                })}
                <label
                  className="px-2 py-1 rounded-lg bg-white border border-[#DCD4C4] text-[11px] font-semibold cursor-pointer flex items-center gap-1.5 hover:bg-[#EFECE4]"
                  title="Choisir n'importe quelle couleur"
                >
                  <input
                    type="color"
                    value={activeAccent}
                    onChange={(e) =>
                      updateProject({ customAccentColor: e.target.value })
                    }
                    className="w-4 h-4 border-0 bg-transparent cursor-pointer"
                  />
                  <span>Autre</span>
                </label>
              </div>

              {/* Background Color Swatches */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#181512] mr-1">
                  3. Fond :
                </span>
                <button
                  onClick={() => updateProject({ customBgColor: undefined })}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold border transition ${
                    !project.customBgColor
                      ? 'bg-[#181512] text-white border-[#181512]'
                      : 'bg-white text-[#6E675F] border-[#DCD4C4] hover:text-[#181512]'
                  }`}
                  title="Laisser le style gérer l'alternance des fonds automatiquement"
                >
                  Auto
                </button>
                {BG_SWATCHES.slice(0, 7).map((sw) => {
                  const isSel =
                    project.customBgColor?.toLowerCase() ===
                    sw.hex.toLowerCase();
                  return (
                    <button
                      key={sw.hex}
                      onClick={() => updateProject({ customBgColor: sw.hex })}
                      title={`Fond ${sw.name}`}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        isSel
                          ? 'scale-125 border-[#181512] shadow-md'
                          : 'border-[#DCD4C4] shadow-sm hover:scale-110'
                      }`}
                      style={{ backgroundColor: sw.hex }}
                    />
                  );
                })}
                <label
                  className="px-2 py-1 rounded-lg bg-white border border-[#DCD4C4] text-[11px] font-semibold cursor-pointer flex items-center gap-1 hover:bg-[#EFECE4]"
                  title="Choisir n'importe quelle couleur de fond"
                >
                  <input
                    type="color"
                    value={activeBg}
                    onChange={(e) =>
                      updateProject({ customBgColor: e.target.value })
                    }
                    className="w-4 h-4 border-0 bg-transparent cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Storyboard Header */}
          <div className="flex items-center justify-between bg-[#FAF8F5] border border-[#E5DEC9] rounded-2xl px-4 py-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
              Aperçu Storyboard ({project.slides.length} slides)
            </span>

            <button
              onClick={handleAddSlide}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#181512] text-white font-medium flex items-center gap-1.5 hover:opacity-90 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter une slide</span>
            </button>
          </div>

          {/* Horizontal Scrollable Storyboard of All Slides */}
          <div className="bg-[#FAF8F5] border border-[#E5DEC9] rounded-2xl p-5 overflow-x-auto">
            <div className="flex items-start gap-5 min-w-max pb-2">
              {project.slides.map((s, idx) => {
                const isSelected = idx === activeSlideIndex;
                return (
                  <div
                    key={s.id}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`group flex flex-col items-center cursor-pointer transition-all ${
                      isSelected
                        ? 'scale-[1.01]'
                        : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-2xl transition-all ${
                        isSelected
                          ? 'ring-2 ring-[#181512] bg-white shadow-md'
                          : 'hover:bg-white/60'
                      }`}
                    >
                      <SlideCanvas
                        slide={s}
                        slideIndex={idx}
                        totalSlides={project.slides.length}
                        project={project}
                        format={currentFormat}
                        theme={baseTheme}
                        fontPairing={currentFonts}
                        scale={cardScale}
                      />
                    </div>

                    <div className="mt-2 flex items-center justify-between w-full px-2">
                      <span
                        className={`text-xs font-semibold ${
                          isSelected ? 'text-[#181512]' : 'text-[#6E675F]'
                        }`}
                      >
                        Slide {idx + 1}
                      </span>
                      {project.slides.length > 2 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSlide(idx);
                          }}
                          className="opacity-0 group-hover:opacity-100 text-[#8E867B] hover:text-red-600 p-1 transition"
                          title="Supprimer cette slide"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Caption & Hashtags Box */}
          <div className="bg-[#FAF8F5] border border-[#E5DEC9] rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6E675F]">
                Légende TikTok & Instagram prête à publier
              </span>
              <button
                onClick={handleCopyCaption}
                className="text-xs px-3 py-1 rounded-lg bg-[#EFECE4] hover:bg-[#E4DFD3] text-[#181512] font-medium flex items-center gap-1.5 transition"
              >
                {copiedCaption ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-700" />
                    <span>Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier la légende</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-[#4A443E] whitespace-pre-line leading-relaxed line-clamp-3">
              {project.caption}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN (5/12): 4 SIMPLE TABS */}
        <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E5DEC9] rounded-2xl flex flex-col overflow-hidden">
          {/* Tab Switcher */}
          <div className="grid grid-cols-4 border-b border-[#E5DEC9] bg-[#EFECE4]/60 p-1.5 gap-1">
            <button
              onClick={() => setRightTab('designs')}
              className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                rightTab === 'designs'
                  ? 'bg-white text-[#181512] shadow-sm'
                  : 'text-[#6E675F] hover:text-[#181512]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Designs & Couleurs</span>
            </button>

            <button
              onClick={() => setRightTab('fonts')}
              className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                rightTab === 'fonts'
                  ? 'bg-white text-[#181512] shadow-sm'
                  : 'text-[#6E675F] hover:text-[#181512]'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>15 Polices</span>
            </button>

            <button
              onClick={() => setRightTab('illustrations')}
              className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                rightTab === 'illustrations'
                  ? 'bg-white text-[#181512] shadow-sm'
                  : 'text-[#6E675F] hover:text-[#181512]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>48 Illustr.</span>
            </button>

            <button
              onClick={() => setRightTab('slide')}
              className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                rightTab === 'slide'
                  ? 'bg-white text-[#181512] shadow-sm'
                  : 'text-[#6E675F] hover:text-[#181512]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Texte Slide {activeSlideIndex + 1}</span>
            </button>
          </div>

          {/* TAB 1: 22 DESIGNS DE CARROUSEL & TOUTES LES COULEURS */}
          {rightTab === 'designs' && (
            <div className="p-5 flex flex-col gap-5 overflow-y-auto max-h-[780px]">
              {/* Custom Color Controls at the very top of the tab */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] flex flex-col gap-3.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#181512]">
                    🎨 Personnaliser les Couleurs du Style Actif
                  </span>
                  {(project.customAccentColor || project.customBgColor) && (
                    <button
                      onClick={() =>
                        updateProject({
                          customAccentColor: undefined,
                          customBgColor: undefined,
                        })
                      }
                      className="text-[11px] text-[#6E675F] hover:text-[#181512] flex items-center gap-1 underline"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Réinitialiser</span>
                    </button>
                  )}
                </div>

                {/* Couleur Principale / Accent */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-[#4A443E]">
                      Couleur Principale (Punaises, Bandeaux, Graphiques, Illustrations, Mots-clés)
                    </span>
                    <input
                      type="color"
                      value={activeAccent}
                      onChange={(e) =>
                        updateProject({ customAccentColor: e.target.value })
                      }
                      className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {ACCENT_SWATCHES.map((sw) => (
                      <button
                        key={sw.hex}
                        onClick={() =>
                          updateProject({ customAccentColor: sw.hex })
                        }
                        title={sw.name}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          activeAccent.toLowerCase() === sw.hex.toLowerCase()
                            ? 'scale-110 border-[#181512] ring-2 ring-[#181512]/20'
                            : 'border-white shadow-sm'
                        }`}
                        style={{ backgroundColor: sw.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Couleur de Fond */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-[#4A443E]">
                      Couleur de Fond (Clair, Crème, Pastel ou Sombre)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateProject({ customBgColor: undefined })
                        }
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          !project.customBgColor
                            ? 'bg-[#181512] text-white border-[#181512]'
                            : 'bg-[#F5F2EB] text-[#6E675F] border-[#DCD4C4]'
                        }`}
                      >
                        Alternance Auto du Style
                      </button>
                      <input
                        type="color"
                        value={activeBg}
                        onChange={(e) =>
                          updateProject({ customBgColor: e.target.value })
                        }
                        className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {BG_SWATCHES.map((sw) => (
                      <button
                        key={sw.hex}
                        onClick={() => updateProject({ customBgColor: sw.hex })}
                        title={sw.name}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          project.customBgColor?.toLowerCase() ===
                          sw.hex.toLowerCase()
                            ? 'scale-110 border-[#181512] ring-2 ring-[#181512]/20'
                            : 'border-[#DCD4C4] shadow-sm'
                        }`}
                        style={{ backgroundColor: sw.hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 14 Complete Palettes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#181512] mb-2">
                  14 Palettes Complètes (Claires & Sombres — 1 clic)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {EDITORIAL_THEMES.map((th) => {
                    const active =
                      project.themeId === th.id &&
                      !project.customAccentColor &&
                      !project.customBgColor;
                    return (
                      <button
                        key={th.id}
                        onClick={() =>
                          updateProject({
                            themeId: th.id as EditorialThemeId,
                            customAccentColor: th.accent,
                            customBgColor: undefined,
                          })
                        }
                        className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition ${
                          active
                            ? 'bg-white border-[#181512] ring-1 ring-[#181512] shadow-sm'
                            : 'bg-white/60 border-[#E5DEC9] hover:bg-white'
                        }`}
                      >
                        <div
                          className="w-7 h-7 rounded-lg border border-black/15 flex items-center justify-center shrink-0"
                          style={{ backgroundColor: th.bgPrimary }}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: th.accent }}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-[#181512] truncate">
                            {th.name}
                          </div>
                          <div className="text-[10px] text-[#6E675F] truncate">
                            {th.subtitle}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 22 Visual Styles */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#181512]">
                    22 Designs de Carrousel (Tous recolorables)
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {VISUAL_STYLES.map((st) => {
                    const active = activeVisualStyle === st.id;
                    return (
                      <button
                        key={st.id}
                        onClick={() => updateProject({ visualStyle: st.id })}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          active
                            ? 'bg-white border-[#181512] ring-2 ring-[#181512] shadow-sm'
                            : 'bg-white/60 border-[#E5DEC9] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-semibold text-[#181512] truncate">
                            {st.name}
                          </span>
                          {st.badge && (
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white shrink-0"
                              style={{ backgroundColor: activeAccent }}
                            >
                              {st.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#6E675F] line-clamp-2 mt-1">
                          {st.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 15 POLICES D'ÉCRITURE */}
          {rightTab === 'fonts' && (
            <div className="p-5 flex flex-col gap-3 overflow-y-auto max-h-[780px]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#181512]">
                  15 Duos de Polices (Agence, Impact & Éditorial)
                </label>
                <span className="text-[11px] text-[#6E675F]">
                  Appliqué à toutes les slides
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {FONT_PAIRINGS.map((fp) => {
                  const active = project.fontPairingId === fp.id;
                  return (
                    <button
                      key={fp.id}
                      onClick={() =>
                        updateProject({ fontPairingId: fp.id as FontPairingId })
                      }
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                        active
                          ? 'bg-white border-[#181512] ring-1 ring-[#181512] shadow-sm'
                          : 'bg-white/60 border-[#E5DEC9] hover:bg-white'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#181512]">
                            {fp.name}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFECE4] text-[#6E675F]">
                            {fp.vibe}
                          </span>
                        </div>
                        <div
                          className="text-xl text-[#181512] mt-1 truncate"
                          style={{
                            fontFamily: fp.headingFamily,
                            fontWeight: fp.headingWeight,
                          }}
                        >
                          L’art du carrousel{' '}
                          <span className="italic" style={{ color: activeAccent }}>
                            viral & créatif
                          </span>
                        </div>
                      </div>

                      {active && (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
                          style={{ backgroundColor: activeAccent }}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: 48 ILLUSTRATIONS RECOLORABLES */}
          {rightTab === 'illustrations' && (
            <div className="p-5 flex flex-col gap-3.5 overflow-y-auto max-h-[780px]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#181512]">
                  48 Illustrations Vectorielles (Slide {activeSlideIndex + 1})
                </label>
                <button
                  onClick={() => updateActiveSlide({ illustrationId: 'none' })}
                  className="text-[11px] text-[#6E675F] hover:text-[#181512] underline"
                >
                  Retirer l’illustration
                </button>
              </div>

              <input
                type="text"
                value={illSearch}
                onChange={(e) => setIllSearch(e.target.value)}
                placeholder="Rechercher parmi les 48 illustrations (ex: cerveau, fusée, sablier, diamant...)"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCD4C4] text-xs text-[#181512]"
              />

              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setIllCategory(cat)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition ${
                      illCategory === cat
                        ? 'bg-[#181512] text-white'
                        : 'bg-[#EFECE4] text-[#6E675F] hover:text-[#181512]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 pt-1">
                {filteredIllustrations.map((item) => {
                  const selected = currentSlide.illustrationId === item.id;
                  const svgPreview = getIllustrationSvg(
                    item.id,
                    '#181512',
                    activeAccent,
                    'rgba(0,0,0,0.06)'
                  );
                  return (
                    <button
                      key={item.id}
                      onClick={() =>
                        updateActiveSlide({ illustrationId: item.id })
                      }
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                        selected
                          ? 'bg-white border-[#181512] ring-2 ring-[#181512] shadow-sm'
                          : 'bg-white/70 border-[#E5DEC9] hover:bg-white'
                      }`}
                    >
                      <div
                        className="w-14 h-14"
                        dangerouslySetInnerHTML={{ __html: svgPreview }}
                      />
                      <span className="text-[10px] font-medium text-[#181512] text-center line-clamp-1">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: ÉDITION DIRECTE DU TEXTE DE LA SLIDE ACTIVE */}
          {rightTab === 'slide' && (
            <div className="p-5 flex flex-col gap-4 overflow-y-auto max-h-[780px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#181512]">
                  Modifier la Slide {activeSlideIndex + 1} /{' '}
                  {project.slides.length}
                </span>
                <select
                  value={currentSlide.layout}
                  onChange={(e) =>
                    updateActiveSlide({
                      layout: e.target.value as SlideLayoutType,
                    })
                  }
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-[#DCD4C4] text-xs font-medium"
                >
                  <option value="cover-editorial">Couverture Éditoriale</option>
                  <option value="numbered-insight">Idée Clé Illustrée</option>
                  <option value="big-stat">Chiffre Choc (Stat / Graphique)</option>
                  <option value="comparison-split">Comparatif Avant / Après</option>
                  <option value="checklist-card">Checklist / Fiche Mémo</option>
                  <option value="cta-outro">Conclusion & Citation</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#6E675F] mb-1">
                  Sur-titre (Kicker)
                </label>
                <input
                  type="text"
                  value={currentSlide.kicker || ''}
                  onChange={(e) =>
                    updateActiveSlide({ kicker: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCD4C4] text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#6E675F] mb-1">
                  Titre principal (entoure un mot d’étoiles *comme ceci* pour le surligner)
                </label>
                <textarea
                  rows={3}
                  value={currentSlide.title}
                  onChange={(e) => updateActiveSlide({ title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCD4C4] text-xs leading-relaxed"
                />
              </div>

              {currentSlide.layout === 'big-stat' && (
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6E675F] mb-1">
                      Chiffre clé
                    </label>
                    <input
                      type="text"
                      value={currentSlide.statValue || ''}
                      onChange={(e) =>
                        updateActiveSlide({ statValue: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCD4C4] text-xs font-bold"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-semibold text-[#6E675F] mb-1">
                      Explication du chiffre
                    </label>
                    <input
                      type="text"
                      value={currentSlide.statLabel || ''}
                      onChange={(e) =>
                        updateActiveSlide({ statLabel: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCD4C4] text-xs"
                    />
                  </div>
                </div>
              )}

              {currentSlide.layout === 'comparison-split' ? (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6E675F] mb-1">
                      ✕ Erreur / Ancienne méthode
                    </label>
                    <textarea
                      rows={2}
                      value={currentSlide.comparisonLeftText || ''}
                      onChange={(e) =>
                        updateActiveSlide({
                          comparisonLeftText: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCD4C4] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6E675F] mb-1">
                      ✓ Réalité / Nouvelle méthode
                    </label>
                    <textarea
                      rows={2}
                      value={currentSlide.comparisonRightText || ''}
                      onChange={(e) =>
                        updateActiveSlide({
                          comparisonRightText: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCD4C4] text-xs"
                    />
                  </div>
                </div>
              ) : currentSlide.layout === 'checklist-card' ? (
                <div>
                  <label className="block text-[11px] font-semibold text-[#6E675F] mb-1">
                    Points de la checklist (1 par ligne)
                  </label>
                  <textarea
                    rows={4}
                    value={(currentSlide.bulletPoints || []).join('\n')}
                    onChange={(e) =>
                      updateActiveSlide({
                        bulletPoints: e.target.value.split('\n'),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCD4C4] text-xs leading-relaxed"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-semibold text-[#6E675F] mb-1">
                    Sous-titre / Phrase d’explication
                  </label>
                  <textarea
                    rows={3}
                    value={currentSlide.subtitle || ''}
                    onChange={(e) =>
                      updateActiveSlide({ subtitle: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCD4C4] text-xs leading-relaxed"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E5DEC9]">
                <div>
                  <label className="block text-[11px] font-semibold text-[#6E675F] mb-1">
                    Signature (@handle)
                  </label>
                  <input
                    type="text"
                    value={project.authorHandle}
                    onChange={(e) =>
                      updateProject({ authorHandle: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCD4C4] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#6E675F] mb-1">
                    Texte d’incitation au swipe
                  </label>
                  <input
                    type="text"
                    value={currentSlide.swipePrompt || ''}
                    onChange={(e) =>
                      updateActiveSlide({ swipePrompt: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DCD4C4] text-xs"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
export default App;
