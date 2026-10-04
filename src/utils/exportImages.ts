import JSZip from 'jszip';
import { toCanvas } from 'html-to-image';
import { createElement } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import {
  CarouselProject,
  EditorialTheme,
  FontPairing,
  PlatformFormatSpec,
  SlideItem,
} from '../types/carousel';
import { getIllustrationDataUri } from '../data/illustrationsLibrary';
import { FONT_PAIRINGS } from '../data/knowledgeBase';
import { computeSlidePalette, SlideCanvas } from '../components/SlideCanvas';

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function renderSlideFallbackToCanvas(
  project: CarouselProject,
  slide: SlideItem,
  slideIndex: number,
  totalSlides: number,
  baseTheme: EditorialTheme,
  format: PlatformFormatSpec
): Promise<HTMLCanvasElement> {
  const fontPairing: FontPairing =
    FONT_PAIRINGS.find((f) => f.id === project.fontPairingId) || FONT_PAIRINGS[0];
  const visualStyle = project.visualStyle || 'skale-pinned-notes';

  const {
    bgPrimary,
    bgSecondary,
    ink,
    inkMuted,
    activeAccent,
    activeAccentSoft,
    borderCol,
  } = computeSlidePalette(
    visualStyle,
    slideIndex,
    totalSlides,
    baseTheme,
    project.customAccentColor,
    project.customBgColor
  );

  const theme: EditorialTheme = {
    ...baseTheme,
    bgPrimary,
    bgSecondary,
    ink,
    inkMuted,
    accent: activeAccent,
    accentSoft: activeAccentSoft,
    border: borderCol,
  };

  const canvas = document.createElement('canvas');
  canvas.width = format.width;
  canvas.height = format.height;
  const ctx = canvas.getContext('2d')!;

  const W = format.width;
  const H = format.height;
  const isTikTok = format.aspectRatio === '9:16';
  const padX = 84;
  const padTop = isTikTok ? 150 : 88;
  const padBottom = isTikTok ? 220 : 92;

  // 1. Background
  ctx.fillStyle = theme.bgPrimary;
  ctx.fillRect(0, 0, W, H);

  // 2. Visual Style Frame & Ornaments
  if (visualStyle === 'split-magazine') {
    ctx.fillStyle = theme.accent;
    ctx.fillRect(0, 0, 28, H);
  } else if (
    visualStyle === 'bold-highlight' ||
    visualStyle === 'simplist-highlight'
  ) {
    ctx.fillStyle = theme.accent;
    ctx.fillRect(0, 0, W, 24);
  } else if (visualStyle === 'brutalist-neo') {
    ctx.fillStyle = theme.accent;
    ctx.fillRect(46, 46, W - 80, H - 80);
    ctx.fillStyle = theme.bgPrimary;
    ctx.fillRect(36, 36, W - 80, H - 80);
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 3;
    ctx.strokeRect(36, 36, W - 80, H - 80);
  } else if (
    visualStyle === 'designmates-giant-num' ||
    visualStyle === 'data-charts-glass'
  ) {
    ctx.font = `800 180px ${fontPairing.headingFamily}`;
    ctx.fillStyle = theme.accentSoft;
    ctx.fillText(`${slideIndex + 1}`, W - padX - 110, padTop);
  } else {
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 2;
    ctx.strokeRect(34, 34, W - 68, H - 68);
  }

  // 3. Top Header
  ctx.font = `600 18px ${fontPairing.monoFamily}`;
  ctx.fillStyle = theme.accent;
  ctx.textBaseline = 'top';
  ctx.fillText('✦', padX, padTop);

  ctx.fillStyle = theme.inkMuted;
  ctx.fillText(
    (slide.kicker || 'ATELIER ÉDITORIAL').toUpperCase(),
    padX + 28,
    padTop
  );

  const numText = `${String(slideIndex + 1).padStart(2, '0')} / ${String(
    totalSlides
  ).padStart(2, '0')}`;
  const numWidth = ctx.measureText(numText).width;
  ctx.fillStyle = theme.ink;
  ctx.fillText(numText, W - padX - numWidth, padTop);

  ctx.fillStyle = theme.border;
  ctx.fillRect(padX, padTop + 42, W - padX * 2, 1.5);

  let cursorY = padTop + 72;
  const contentWidth = W - padX * 2;
  const isCompactLayout =
    slide.layout === 'big-stat' ||
    slide.layout === 'comparison-split' ||
    slide.layout === 'checklist-card';

  // 4. Render Dynamic Recolorable SVG Illustration
  const hasIllustration =
    Boolean(slide.illustrationId) && slide.illustrationId !== 'none';
  const imgSrc = hasIllustration
    ? getIllustrationDataUri(
        slide.illustrationId!,
        theme.ink,
        theme.accent,
        theme.accentSoft
      )
    : undefined;

  if (imgSrc) {
    const img = await loadImage(imgSrc);
    if (img) {
      const boxH = isCompactLayout
        ? isTikTok
          ? 270
          : 210
        : isTikTok
        ? 440
        : 340;
      const scale = Math.min(contentWidth / img.width, boxH / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const drawX = padX + (contentWidth - drawW) / 2;
      const drawY = cursorY;

      if (
        visualStyle === 'modern-bento' ||
        visualStyle === 'polaroid-atelier' ||
        visualStyle === 'brutalist-neo' ||
        visualStyle === 'skale-pinned-notes'
      ) {
        ctx.fillStyle = theme.bgSecondary;
        ctx.fillRect(drawX - 24, drawY - 12, drawW + 48, drawH + 24);
        ctx.strokeStyle = theme.accent;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(drawX - 24, drawY - 12, drawW + 48, drawH + 24);
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      cursorY += boxH + 34;
    }
  } else {
    cursorY += isTikTok ? 140 : 80;
  }

  // 5. Big Stat Block
  if (slide.layout === 'big-stat') {
    ctx.font = `italic 400 116px ${fontPairing.headingFamily}`;
    ctx.fillStyle = theme.accent;
    ctx.fillText(slide.statValue || 'À SOURCER', padX, cursorY - 12);
    cursorY += 118;

    if (slide.statLabel) {
      ctx.font = `500 22px ${fontPairing.bodyFamily}`;
      ctx.fillStyle = theme.inkMuted;
      cursorY = drawWrappedText(
        ctx,
        slide.statLabel,
        padX,
        cursorY,
        contentWidth,
        32
      );
      cursorY += 16;
    }

    ctx.fillStyle = theme.border;
    ctx.fillRect(padX, cursorY, contentWidth, 1.5);
    cursorY += 28;
  }

  // 6. Main Title
  const titleSize = isCompactLayout ? 52 : imgSrc ? 60 : 70;
  cursorY = drawRichTitle(
    ctx,
    slide.title,
    padX,
    cursorY,
    contentWidth,
    titleSize,
    Math.round(titleSize * 1.14),
    theme,
    fontPairing
  );
  cursorY += 24;

  // 7. Layout Details
  if (slide.layout === 'checklist-card') {
    const items =
      slide.bulletPoints && slide.bulletPoints.length > 0
        ? slide.bulletPoints
        : ['Point clé 1', 'Point clé 2', 'Point clé 3'];

    items.forEach((item, idx) => {
      ctx.fillStyle = theme.bgSecondary;
      ctx.fillRect(padX, cursorY, contentWidth, 68);
      ctx.strokeStyle = theme.border;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(padX, cursorY, contentWidth, 68);

      ctx.fillStyle = theme.accent;
      ctx.font = `700 20px ${fontPairing.monoFamily}`;
      ctx.fillText(`0${idx + 1}`, padX + 22, cursorY + 23);

      ctx.font = `500 23px ${fontPairing.bodyFamily}`;
      ctx.fillStyle = theme.ink;
      drawWrappedText(
        ctx,
        item.replace(/\*/g, ''),
        padX + 74,
        cursorY + 21,
        contentWidth - 94,
        30
      );
      cursorY += 82;
    });
  } else if (slide.layout === 'comparison-split') {
    const colW = (contentWidth - 24) / 2;
    ctx.fillStyle = theme.bgSecondary;
    ctx.fillRect(padX, cursorY, colW, 195);
    ctx.font = `700 16px ${fontPairing.monoFamily}`;
    ctx.fillStyle = theme.inkMuted;
    ctx.fillText(
      `✕ ${(slide.comparisonLeftTitle || 'À ÉVITER').toUpperCase()}`,
      padX + 24,
      cursorY + 24
    );
    ctx.font = `400 22px ${fontPairing.bodyFamily}`;
    drawWrappedText(
      ctx,
      slide.comparisonLeftText || '',
      padX + 24,
      cursorY + 58,
      colW - 48,
      31
    );

    const rightX = padX + colW + 24;
    ctx.fillStyle = theme.bgSecondary;
    ctx.fillRect(rightX, cursorY, colW, 195);
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(rightX, cursorY, colW, 195);
    ctx.font = `700 16px ${fontPairing.monoFamily}`;
    ctx.fillStyle = theme.accent;
    ctx.fillText(
      `✓ ${(slide.comparisonRightTitle || 'À ADOPTER').toUpperCase()}`,
      rightX + 24,
      cursorY + 24
    );
    ctx.font = `600 22px ${fontPairing.bodyFamily}`;
    ctx.fillStyle = theme.ink;
    drawWrappedText(
      ctx,
      slide.comparisonRightText || '',
      rightX + 24,
      cursorY + 58,
      colW - 48,
      31
    );
  } else if (slide.subtitle) {
    ctx.font = `400 26px ${fontPairing.bodyFamily}`;
    ctx.fillStyle = theme.inkMuted;
    drawWrappedText(ctx, slide.subtitle, padX, cursorY, contentWidth, 38);
  }

  // 8. Footer + Progress Bar
  const footerY = H - padBottom - 36;
  ctx.font = `500 18px ${fontPairing.monoFamily}`;
  ctx.fillStyle = theme.inkMuted;
  ctx.fillText(project.authorHandle || '@atelier.carrousel', padX, footerY);

  const swipeText = slide.swipePrompt || 'Swiper →';
  ctx.fillStyle = theme.accent;
  const swW = ctx.measureText(swipeText).width;
  ctx.fillText(swipeText, W - padX - swW, footerY);

  const barY = H - padBottom + 4;
  ctx.fillStyle = theme.border;
  ctx.fillRect(padX, barY, contentWidth, 4);
  ctx.fillStyle = theme.accent;
  ctx.fillRect(
    padX,
    barY,
    contentWidth * ((slideIndex + 1) / Math.max(1, totalSlides)),
    4
  );

  return canvas;
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(/\s+/);
  let line = '';
  let curY = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, curY);
      line = words[i];
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, curY);
    curY += lineHeight;
  }
  return curY;
}

function drawRichTitle(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number,
  lineHeight: number,
  theme: EditorialTheme,
  fontPairing: FontPairing
): number {
  const segments = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  const tokens: { word: string; accent: boolean }[] = [];

  segments.forEach((seg) => {
    const isAccent = seg.startsWith('*') && seg.endsWith('*');
    const clean = isAccent ? seg.slice(1, -1) : seg.replace(/\[|\]/g, '');
    clean
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => tokens.push({ word: w, accent: isAccent }));
  });

  let curX = x;
  let curY = y;

  tokens.forEach((tk) => {
    ctx.font = `${tk.accent ? 'italic ' : ''}${fontPairing.headingWeight} ${fontSize}px ${fontPairing.headingFamily}`;
    const wordWithSpace = tk.word + ' ';
    const wWidth = ctx.measureText(wordWithSpace).width;

    if (curX + wWidth > x + maxWidth && curX > x) {
      curX = x;
      curY += lineHeight;
    }

    if (tk.accent) {
      ctx.fillStyle = theme.accentSoft;
      ctx.fillRect(curX - 4, curY - 2, wWidth - 6, fontSize + 4);
      ctx.fillStyle = theme.accent;
    } else {
      ctx.fillStyle = theme.ink;
    }

    ctx.fillText(tk.word, curX, curY);
    curX += wWidth;
  });

  return curY + lineHeight;
}

export async function renderSlideToCanvas(
  project: CarouselProject,
  slide: SlideItem,
  slideIndex: number,
  totalSlides: number,
  baseTheme: EditorialTheme,
  format: PlatformFormatSpec
): Promise<HTMLCanvasElement> {
  const fontPairing =
    FONT_PAIRINGS.find((item) => item.id === project.fontPairingId) || FONT_PAIRINGS[0];
  const stage = document.createElement('div');
  stage.style.position = 'fixed';
  stage.style.left = `-${format.width + 100}px`;
  stage.style.top = '0';
  stage.style.width = `${format.width}px`;
  stage.style.height = `${format.height}px`;
  stage.style.overflow = 'hidden';
  stage.style.pointerEvents = 'none';
  stage.style.zIndex = '-1';
  document.body.appendChild(stage);

  const root = createRoot(stage);
  try {
    flushSync(() => {
      root.render(createElement(SlideCanvas, {
        slide,
        slideIndex,
        totalSlides,
        project,
        format,
        theme: baseTheme,
        fontPairing,
        scale: 1,
      }));
    });
    if (document.fonts?.ready) await document.fonts.ready;

    const canvasNode = stage.firstElementChild?.firstElementChild as HTMLElement | null;
    if (!canvasNode) throw new Error('La slide à exporter est introuvable.');

    return await toCanvas(canvasNode, {
      width: format.width,
      height: format.height,
      canvasWidth: format.width,
      canvasHeight: format.height,
      pixelRatio: 1,
      backgroundColor: project.customBgColor || baseTheme.bgPrimary,
      cacheBust: true,
    });
  } catch {
    return renderSlideFallbackToCanvas(
      project,
      slide,
      slideIndex,
      totalSlides,
      baseTheme,
      format
    );
  } finally {
    root.unmount();
    stage.remove();
  }
}

export type ImageExportFormat = 'png' | 'jpg';

export async function downloadSingleSlideImage(
  project: CarouselProject,
  slide: SlideItem,
  slideIndex: number,
  theme: EditorialTheme,
  format: PlatformFormatSpec,
  imageFormat: ImageExportFormat = 'png'
): Promise<void> {
  const canvas = await renderSlideToCanvas(
    project,
    slide,
    slideIndex,
    project.slides.length,
    theme,
    format
  );
  const mimeType = imageFormat === 'jpg' ? 'image/jpeg' : 'image/png';
  const dataUrl = canvas.toDataURL(mimeType, imageFormat === 'jpg' ? 0.94 : undefined);
  const link = document.createElement('a');
  const num = String(slideIndex + 1).padStart(2, '0');
  link.download = `carrousel-slide-${num}.${imageFormat}`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function downloadSingleSlidePng(
  project: CarouselProject,
  slide: SlideItem,
  slideIndex: number,
  theme: EditorialTheme,
  format: PlatformFormatSpec
): Promise<void> {
  return downloadSingleSlideImage(project, slide, slideIndex, theme, format, 'png');
}

export async function downloadAllSlidesZip(
  project: CarouselProject,
  theme: EditorialTheme,
  format: PlatformFormatSpec,
  onProgress?: (cur: number, tot: number) => void,
  imageFormat: ImageExportFormat = 'png'
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder('carrousel-images');

  for (let i = 0; i < project.slides.length; i++) {
    if (onProgress) onProgress(i + 1, project.slides.length);
    const canvas = await renderSlideToCanvas(
      project,
      project.slides[i],
      i,
      project.slides.length,
      theme,
      format
    );
    const mimeType = imageFormat === 'jpg' ? 'image/jpeg' : 'image/png';
    const base64 = canvas.toDataURL(mimeType, imageFormat === 'jpg' ? 0.94 : undefined).split(',')[1];
    const num = String(i + 1).padStart(2, '0');
    folder?.file(`slide-${num}.${imageFormat}`, base64, { base64: true });
  }

  folder?.file(
    'legende-post.txt',
    `${project.caption}\n\n${project.hashtags.join(' ')}`
  );

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `carrousel-${project.formatId}-${imageFormat}.zip`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
