import React from 'react';
import {
  CarouselProject,
  EditorialTheme,
  FontPairing,
  PlatformFormatSpec,
  SlideItem,
  VisualStyleId,
} from '../types/carousel';
import { getIllustrationSvg } from '../data/illustrationsLibrary';

interface SlideCanvasProps {
  slide: SlideItem;
  slideIndex: number;
  totalSlides: number;
  project: CarouselProject;
  format: PlatformFormatSpec;
  theme: EditorialTheme;
  fontPairing: FontPairing;
  scale?: number;
  showSafeZoneOverlay?: boolean;
}

function parseHex(hex: string): { r: number; g: number; b: number } {
  const clean = (hex || '#BE4B2A').replace('#', '').trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return { r: isNaN(r) ? 190 : r, g: isNaN(g) ? 75 : g, b: isNaN(b) ? 42 : b };
  }
  if (clean.length !== 6) return { r: 190, g: 75, b: 42 };
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return { r: isNaN(r) ? 190 : r, g: isNaN(g) ? 75 : g, b: isNaN(b) ? 42 : b };
}

function hexToRgba(hex: string, alpha: number): string {
  const { r, g, b } = parseHex(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function isColorDark(hex: string): boolean {
  const { r, g, b } = parseHex(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.48;
}

function mixWithBlack(hex: string, darknessRatio: number): string {
  const { r, g, b } = parseHex(hex);
  const factor = Math.max(0, Math.min(1, 1 - darknessRatio));
  const nr = Math.round(r * factor);
  const ng = Math.round(g * factor);
  const nb = Math.round(b * factor);
  return `#${nr.toString(16).padStart(2, '0')}${ng
    .toString(16)
    .padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
}

function mixWithWhite(hex: string, whitenessRatio: number): string {
  const { r, g, b } = parseHex(hex);
  const nr = Math.round(r + (255 - r) * whitenessRatio);
  const ng = Math.round(g + (255 - g) * whitenessRatio);
  const nb = Math.round(b + (255 - b) * whitenessRatio);
  return `#${nr.toString(16).padStart(2, '0')}${ng
    .toString(16)
    .padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
}

// 3D Pushpin SVG for Skale Pinned Notes style — dynamically colored!
const PushPin3DSvg: React.FC<{ color: string }> = ({ color }) => (
  <svg width="46" height="46" viewBox="0 0 48 48" fill="none">
    <ellipse cx="26" cy="40" rx="11" ry="5" fill="rgba(0,0,0,0.22)" />
    <path d="M24 28 L24 41" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
    <circle cx="24" cy="24" r="13" fill={color} />
    <circle cx="24" cy="24" r="13" fill="rgba(0,0,0,0.15)" />
    <circle cx="23" cy="18" r="10" fill={color} />
    <ellipse
      cx="19"
      cy="15"
      rx="4.5"
      ry="2.8"
      transform="rotate(-25 19 15)"
      fill="rgba(255,255,255,0.65)"
    />
  </svg>
);

export function computeSlidePalette(
  visualStyle: VisualStyleId,
  slideIndex: number,
  totalSlides: number,
  theme: EditorialTheme,
  customAccentColor?: string,
  customBgColor?: string
) {
  const userAccent = customAccentColor || theme.accent;
  const baseBg = customBgColor || theme.bgPrimary;

  let bgPrimary = baseBg;
  let activeAccent = userAccent;

  if (visualStyle === 'grow-corporate-blue') {
    // Alternates light/base slide and deep accent slide unless customBgColor is forced
    if (!customBgColor && slideIndex % 2 === 1) {
      bgPrimary = mixWithBlack(userAccent, 0.45);
      activeAccent = mixWithWhite(userAccent, 0.55);
    }
  } else if (visualStyle === 'neon-purple-agency') {
    bgPrimary = customBgColor || (isColorDark(baseBg) ? baseBg : mixWithBlack(userAccent, 0.88));
  } else if (visualStyle === 'red-black-scribble') {
    const isHighlightSlide = slideIndex === 0 || slideIndex === totalSlides - 1;
    if (!customBgColor) {
      bgPrimary = isHighlightSlide ? userAccent : mixWithBlack(userAccent, 0.92);
      activeAccent = isHighlightSlide ? '#FFFFFF' : userAccent;
    }
  } else if (visualStyle === 'designmates-giant-num') {
    const isLastSlide = slideIndex === totalSlides - 1;
    if (!customBgColor && isLastSlide) {
      bgPrimary = userAccent;
      activeAccent = isColorDark(userAccent) ? '#FFFFFF' : '#181512';
    }
  } else if (visualStyle === 'nexora-acid-lime') {
    const isDarkSlide = slideIndex % 2 === 0;
    if (!customBgColor) {
      bgPrimary = isDarkSlide
        ? mixWithBlack(userAccent, 0.9)
        : mixWithWhite(userAccent, 0.92);
    }
  } else if (visualStyle === 'netroots-crumpled-pills') {
    const isColorSlide = slideIndex % 2 === 0;
    if (!customBgColor) {
      bgPrimary = isColorSlide ? userAccent : mixWithWhite(userAccent, 0.94);
      activeAccent = isColorSlide
        ? isColorDark(userAccent)
          ? '#FFFFFF'
          : '#111111'
        : userAccent;
    }
  } else if (visualStyle === 'aurora-glass') {
    bgPrimary = customBgColor ||
      (isColorDark(baseBg) ? baseBg : mixWithBlack(userAccent, 0.91));
  } else if (visualStyle === 'kinetic-type' && !customBgColor && slideIndex === totalSlides - 1) {
    bgPrimary = isColorDark(baseBg) ? baseBg : mixWithBlack(userAccent, 0.84);
    activeAccent = isColorDark(userAccent) ? mixWithWhite(userAccent, 0.36) : userAccent;
  }

  const darkBg = isColorDark(bgPrimary);
  const ink = darkBg ? '#FFFFFF' : customBgColor ? '#181512' : theme.ink;
  const inkMuted = darkBg
    ? 'rgba(255, 255, 255, 0.76)'
    : customBgColor
    ? '#57534E'
    : theme.inkMuted;
  const bgSecondary = darkBg
    ? mixWithWhite(bgPrimary, 0.08)
    : customBgColor
    ? '#FFFFFF'
    : theme.bgSecondary;
  const borderCol = darkBg
    ? hexToRgba('#FFFFFF', 0.2)
    : customBgColor
    ? hexToRgba('#181512', 0.14)
    : theme.border;
  const activeAccentSoft = hexToRgba(activeAccent, darkBg ? 0.22 : 0.15);

  return {
    bgPrimary,
    bgSecondary,
    ink,
    inkMuted,
    activeAccent,
    activeAccentSoft,
    borderCol,
    darkBg,
    userAccent,
  };
}

export const SlideCanvas: React.FC<SlideCanvasProps> = ({
  slide,
  slideIndex,
  totalSlides,
  project,
  format,
  theme,
  fontPairing,
  scale = 0.28,
  showSafeZoneOverlay = false,
}) => {
  const { width, height, safeZone } = format;
  const isVertical916 = format.aspectRatio === '9:16';
  const isSquare = format.aspectRatio === '1:1';
  const visualStyle: VisualStyleId = project.visualStyle || 'skale-pinned-notes';

  const padTop = project.respectSafeZones ? safeZone.top : 78;
  const padBottom = project.respectSafeZones ? safeZone.bottom : 86;
  const padLeft = project.respectSafeZones
    ? visualStyle === 'split-magazine'
      ? safeZone.left + 22
      : visualStyle === 'notebook-paper' || visualStyle === 'shodwe-brush'
      ? safeZone.left + 32
      : safeZone.left
    : 74;
  const padRight = project.respectSafeZones ? safeZone.right : 74;

  const numStr = String(slideIndex + 1).padStart(2, '0');
  const totalStr = String(totalSlides).padStart(2, '0');

  const {
    bgPrimary,
    bgSecondary,
    ink,
    inkMuted,
    activeAccent,
    activeAccentSoft,
    borderCol,
    darkBg,
    userAccent,
  } = computeSlidePalette(
    visualStyle,
    slideIndex,
    totalSlides,
    theme,
    project.customAccentColor,
    project.customBgColor
  );

  const headingFont = fontPairing.headingFamily;
  const isUppercaseHeading =
    visualStyle === 'neon-purple-agency' ||
    visualStyle === 'nexora-acid-lime' ||
    visualStyle === 'netroots-crumpled-pills' ||
    visualStyle === 'kinetic-type';

  const hasIllustration =
    Boolean(slide.illustrationId) && slide.illustrationId !== 'none';

  const dynamicSvgRaw = hasIllustration
    ? getIllustrationSvg(
        slide.illustrationId!,
        ink,
        activeAccent,
        activeAccentSoft
      )
    : '';

  const isCenteredStyle =
    visualStyle === 'gallery-arch' ||
    visualStyle === 'japanese-zen' ||
    visualStyle === 'luxury-monogram' ||
    visualStyle === 'shodwe-brush' ||
    visualStyle === 'neon-purple-agency' ||
    visualStyle === 'aurora-glass' ||
    visualStyle === 'kinetic-type';

  const renderStyledHeadline = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        const word = part.slice(1, -1);

        if (
          visualStyle === 'bold-highlight' ||
          visualStyle === 'simplist-highlight'
        ) {
          const highlightTextCol = isColorDark(activeAccent)
            ? '#FFFFFF'
            : '#111111';
          return (
            <span
              key={idx}
              style={{
                backgroundColor: activeAccent,
                color: highlightTextCol,
                padding: '2px 14px 6px 14px',
                borderRadius:
                  visualStyle === 'simplist-highlight' ? '4px' : '8px',
                fontStyle:
                  visualStyle === 'simplist-highlight' ? 'normal' : 'italic',
                display: 'inline-block',
                lineHeight: 1.05,
                margin: '2px 4px',
              }}
            >
              {word}
            </span>
          );
        }

        if (visualStyle === 'red-black-scribble') {
          return (
            <span
              key={idx}
              style={{
                backgroundColor: darkBg ? '#FFFFFF' : userAccent,
                color: darkBg ? userAccent : '#FFFFFF',
                padding: '2px 12px 4px 12px',
                display: 'inline-block',
                lineHeight: 1.05,
                fontWeight: 800,
                margin: '2px 4px',
              }}
            >
              {word}
            </span>
          );
        }

        if (
          visualStyle === 'neon-purple-agency' ||
          visualStyle === 'nexora-acid-lime' ||
          visualStyle === 'netroots-crumpled-pills' ||
          visualStyle === 'designmates-giant-num'
        ) {
          return (
            <span
              key={idx}
              style={{
                color: activeAccent,
                textDecoration:
                  visualStyle === 'netroots-crumpled-pills' && darkBg
                    ? 'underline'
                    : 'none',
              }}
            >
              {word}
            </span>
          );
        }

        if (visualStyle === 'brutalist-neo') {
          return (
            <span
              key={idx}
              style={{
                backgroundColor: activeAccentSoft,
                color: activeAccent,
                padding: '0px 10px 4px 10px',
                border: `2px solid ${activeAccent}`,
                boxShadow: `3px 3px 0px ${activeAccent}`,
                fontStyle: 'italic',
                display: 'inline-block',
                lineHeight: 1.05,
                margin: '0 4px',
              }}
            >
              {word}
            </span>
          );
        }

        if (visualStyle === 'paper-collage') {
          return (
            <span
              key={idx}
              style={{
                backgroundColor: activeAccent,
                color: isColorDark(activeAccent) ? '#FFFFFF' : '#171717',
                padding: '1px 12px 4px',
                borderRadius: '3px 10px 3px 10px',
                display: 'inline-block',
                lineHeight: 1.05,
                transform: 'rotate(-1.5deg)',
                margin: '2px 3px',
              }}
            >
              {word}
            </span>
          );
        }

        if (visualStyle === 'kinetic-type' || visualStyle === 'aurora-glass') {
          return (
            <span
              key={idx}
              style={{
                color: activeAccent,
                fontStyle: 'normal',
                fontWeight: 800,
                textShadow: visualStyle === 'aurora-glass'
                  ? `0 0 28px ${hexToRgba(activeAccent, 0.28)}`
                  : 'none',
              }}
            >
              {word}
            </span>
          );
        }

        if (visualStyle === 'dashboard-analytics' || visualStyle === 'studio-grid-system' || visualStyle === 'story-frames') {
          return (
            <span
              key={idx}
              style={{
                color: activeAccent,
                fontStyle: 'normal',
                borderBottom: `3px solid ${hexToRgba(activeAccent, 0.38)}`,
                paddingBottom: '1px',
              }}
            >
              {word}
            </span>
          );
        }

        return (
          <span
            key={idx}
            style={{
              color: activeAccent,
              fontStyle: 'italic',
              fontWeight: 400,
              backgroundImage: `linear-gradient(180deg, transparent 62%, ${activeAccentSoft} 62%)`,
              paddingLeft: '4px',
              paddingRight: '6px',
              borderRadius: '4px',
            }}
          >
            {word}
          </span>
        );
      }
      return <React.Fragment key={idx}>{part}</React.Fragment>;
    });
  };

  // Dedicated 3D Sticky Note layout for `skale-pinned-notes`, using the selected palette.
  const renderPinnedNoteStage = () => {
    const innerPastel = mixWithWhite(userAccent, 0.88);
    const tiltDeg = slideIndex % 2 === 0 ? -2.2 : 2.1;
    const cardSvg = hasIllustration
      ? getIllustrationSvg(
          slide.illustrationId!,
          '#0F172A',
          userAccent,
          hexToRgba(userAccent, 0.18)
        )
      : '';

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          position: 'relative',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      >
        {/* Dashed connecting path in background using userAccent */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          viewBox="0 0 800 1000"
          fill="none"
        >
          <path
            d="M 140 220 Q 520 360 360 560 T 620 860"
            stroke={hexToRgba(userAccent, 0.45)}
            strokeWidth="3.5"
            strokeDasharray="10 10"
          />
        </svg>

        {/* Main 3D Pinned Sticky Note Card */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            margin: 'auto',
            width: '92%',
            backgroundColor: '#FFFFFF',
            borderRadius: '34px',
            padding: '38px 28px 28px 28px',
            boxShadow: `0 28px 60px -12px ${hexToRgba(
              userAccent,
              0.22
            )}, 0 8px 20px -4px rgba(15, 23, 42, 0.08)`,
            border: `1.5px solid ${hexToRgba(userAccent, 0.2)}`,
            transform: `rotate(${tiltDeg}deg)`,
          }}
        >
          {/* 3D PushPin at top center */}
          <div
            style={{
              position: 'absolute',
              top: '-24px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
            }}
          >
            <PushPin3DSvg color={userAccent} />
          </div>

          <div
            style={{
              backgroundColor: innerPastel,
              borderRadius: '24px',
              padding: isVertical916 ? '38px 34px' : '28px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '58px',
                  fontWeight: 700,
                  color: userAccent,
                  lineHeight: 0.9,
                }}
              >
                {numStr}
              </span>

              {hasIllustration && (
                <div
                  style={{ width: '130px', height: '130px' }}
                  dangerouslySetInnerHTML={{ __html: cardSvg }}
                />
              )}
            </div>

            <h2
              style={{
                fontFamily: fontPairing.headingFamily,
                fontWeight: fontPairing.headingWeight,
                fontSize: isSquare ? '44px' : '50px',
                lineHeight: 1.08,
                color: '#0F172A',
                margin: 0,
              }}
            >
              {slide.title.split(/(\*[^*]+\*)/g).map((part, idx) =>
                part.startsWith('*') && part.endsWith('*') ? (
                  <span
                    key={idx}
                    style={{
                      color: userAccent,
                      fontStyle: 'italic',
                      textDecoration: 'underline',
                    }}
                  >
                    {part.slice(1, -1)}
                  </span>
                ) : (
                  <React.Fragment key={idx}>{part}</React.Fragment>
                )
              )}
            </h2>

            {slide.layout === 'comparison-split' ? (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(255,255,255,0.75)',
                    fontFamily: fontPairing.bodyFamily,
                    fontSize: '20px',
                    color: '#475569',
                  }}
                >
                  <strong>✕ Avant :</strong> {slide.comparisonLeftText}
                </div>
                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: '14px',
                    backgroundColor: '#FFFFFF',
                    border: `2px solid ${userAccent}`,
                    fontFamily: fontPairing.bodyFamily,
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#0F172A',
                  }}
                >
                  <strong style={{ color: userAccent }}>✓ Maintenant :</strong>{' '}
                  {slide.comparisonRightText}
                </div>
              </div>
            ) : slide.layout === 'checklist-card' && slide.bulletPoints ? (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                {slide.bulletPoints.slice(0, 3).map((bp, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(255,255,255,0.88)',
                      borderLeft: `4px solid ${userAccent}`,
                      fontFamily: fontPairing.bodyFamily,
                      fontSize: '20px',
                      color: '#1E293B',
                      fontWeight: 500,
                    }}
                  >
                    {bp.replace(/\*/g, '')}
                  </div>
                ))}
              </div>
            ) : (
              <p
                style={{
                  fontFamily: fontPairing.bodyFamily,
                  fontSize: '23px',
                  lineHeight: 1.42,
                  color: '#334155',
                  margin: 0,
                }}
              >
                {slide.subtitle || slide.statLabel}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Decorative analytics placeholder; never present sample chart values as real evidence.
  const renderDataChartWidget = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '24px 28px',
        borderRadius: '28px',
        backgroundColor: darkBg ? 'rgba(255,255,255,0.1)' : '#FFFFFF',
        border: `1.5px solid ${borderCol}`,
        boxShadow: `0 20px 45px ${hexToRgba(activeAccent, 0.1)}`,
        marginBottom: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        <svg width="150" height="150" viewBox="0 0 150 150" style={{ flexShrink: 0 }} aria-hidden="true">
          <circle cx="75" cy="75" r="57" fill="none" stroke={hexToRgba(activeAccent, 0.18)} strokeWidth="16" />
          <circle cx="75" cy="75" r="37" fill={hexToRgba(activeAccent, 0.08)} />
          <text
            x="75"
            y="84"
            textAnchor="middle"
            fill={activeAccent}
            style={{ fontFamily: fontPairing.headingFamily, fontSize: '30px', fontWeight: 700 }}
          >
            ···
          </text>
        </svg>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '84px' }} aria-hidden="true">
            {[42, 58, 48, 64, 54].map((height, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  height: `${height}%`,
                  borderRadius: '8px 8px 4px 4px',
                  backgroundColor: hexToRgba(activeAccent, index === 4 ? 0.72 : 0.22),
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontFamily: fontPairing.monoFamily,
              fontSize: '13px',
              color: inkMuted,
              fontWeight: 600,
              letterSpacing: '0.08em',
            }}
          >
            EXEMPLE VISUEL
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: `1px solid ${borderCol}`,
          paddingTop: '10px',
          fontFamily: fontPairing.monoFamily,
          fontSize: '11px',
          color: inkMuted,
          letterSpacing: '0.06em',
        }}
      >
        REMPLACE CET APERÇU PAR DES DONNÉES SOURCÉES
      </div>
    </div>
  );

  const renderIllustrationStage = (size: number) => {
    if (!hasIllustration || !dynamicSvgRaw) return null;

    if (visualStyle === 'aurora-glass') {
      return (
        <div
          style={{
            width: `${size + 56}px`,
            height: `${size + 38}px`,
            borderRadius: '34px',
            border: `1px solid ${hexToRgba(activeAccent, 0.44)}`,
            background: darkBg ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.58)',
            backdropFilter: 'blur(18px)',
            boxShadow: `0 24px 64px ${hexToRgba(activeAccent, 0.18)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: `${size - 12}px`, height: `${size - 12}px` }} dangerouslySetInnerHTML={{ __html: dynamicSvgRaw }} />
        </div>
      );
    }

    if (visualStyle === 'dashboard-analytics') {
      return (
        <div
          style={{
            width: `${size + 60}px`,
            height: `${size + 38}px`,
            padding: '18px',
            boxSizing: 'border-box',
            borderRadius: '22px',
            backgroundColor: darkBg ? 'rgba(255,255,255,0.06)' : '#FFFFFF',
            border: `1px solid ${borderCol}`,
            boxShadow: `0 18px 44px ${hexToRgba(ink, 0.08)}`,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'absolute', top: '12px', left: '16px', right: '16px', display: 'flex', gap: '5px' }}>
            {[0, 1, 2].map((dot) => <span key={dot} style={{ height: '6px', width: '6px', borderRadius: '50%', backgroundColor: hexToRgba(activeAccent, 0.38 + dot * 0.2) }} />)}
          </div>
          <div style={{ width: `${size - 14}px`, height: `${size - 14}px`, marginTop: '10px' }} dangerouslySetInnerHTML={{ __html: dynamicSvgRaw }} />
        </div>
      );
    }

    if (visualStyle === 'paper-collage') {
      return (
        <div
          style={{
            width: `${size + 42}px`,
            height: `${size + 26}px`,
            padding: '14px',
            backgroundColor: darkBg ? bgSecondary : '#FFFFFF',
            border: `1px solid ${borderCol}`,
            boxShadow: `10px 12px 0 ${hexToRgba(activeAccent, 0.2)}, 0 22px 42px ${hexToRgba(ink, 0.08)}`,
            transform: `rotate(${slideIndex % 2 === 0 ? '-2deg' : '2deg'})`,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'absolute', top: '-9px', left: '42%', width: '78px', height: '18px', backgroundColor: activeAccentSoft, border: `1px solid ${hexToRgba(activeAccent, 0.26)}` }} />
          <div style={{ width: `${size - 6}px`, height: `${size - 6}px` }} dangerouslySetInnerHTML={{ __html: dynamicSvgRaw }} />
        </div>
      );
    }

    if (visualStyle === 'story-frames' || visualStyle === 'studio-grid-system') {
      return (
        <div
          style={{
            width: `${size + 38}px`,
            height: `${size + 34}px`,
            borderRadius: visualStyle === 'story-frames' ? '28px' : '8px',
            backgroundColor: darkBg ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.68)',
            border: `1px solid ${hexToRgba(activeAccent, 0.32)}`,
            boxShadow: `0 18px 40px ${hexToRgba(activeAccent, 0.1)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div style={{ width: `${size - 14}px`, height: `${size - 14}px` }} dangerouslySetInnerHTML={{ __html: dynamicSvgRaw }} />
        </div>
      );
    }

    if (
      visualStyle === 'modern-bento' ||
      visualStyle === 'designmates-giant-num'
    ) {
      return (
        <div
          style={{
            width: `${size + 44}px`,
            height: `${size + 32}px`,
            borderRadius: '32px',
            backgroundColor: darkBg ? 'rgba(255,255,255,0.12)' : '#FFFFFF',
            border: `1.5px solid ${borderCol}`,
            boxShadow: `0 18px 40px ${hexToRgba(activeAccent, 0.1)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{ width: `${size - 18}px`, height: `${size - 18}px` }}
            dangerouslySetInnerHTML={{ __html: dynamicSvgRaw }}
          />
        </div>
      );
    }

    if (visualStyle === 'polaroid-atelier') {
      return (
        <div
          style={{
            width: `${size + 42}px`,
            padding: '18px 18px 38px 18px',
            backgroundColor: darkBg ? bgSecondary : '#FFFFFF',
            border: `1.5px solid ${borderCol}`,
            boxShadow: `0 16px 36px ${hexToRgba(ink, 0.08)}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              width: '86px',
              height: '20px',
              backgroundColor: activeAccentSoft,
              border: `1px solid ${hexToRgba(activeAccent, 0.4)}`,
            }}
          />
          <div
            style={{
              width: `${size - 12}px`,
              height: `${size - 24}px`,
              backgroundColor: bgPrimary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{ width: `${size - 26}px`, height: `${size - 26}px` }}
              dangerouslySetInnerHTML={{ __html: dynamicSvgRaw }}
            />
          </div>
        </div>
      );
    }

    if (visualStyle === 'brutalist-neo') {
      return (
        <div
          style={{
            width: `${size + 36}px`,
            height: `${size + 28}px`,
            backgroundColor: darkBg ? bgSecondary : '#FFFFFF',
            border: `2.5px solid ${activeAccent}`,
            boxShadow: `8px 8px 0px ${activeAccent}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{ width: `${size - 16}px`, height: `${size - 16}px` }}
            dangerouslySetInnerHTML={{ __html: dynamicSvgRaw }}
          />
        </div>
      );
    }

    if (visualStyle === 'gallery-arch') {
      return (
        <div
          style={{
            width: `${size + 32}px`,
            height: `${size + 36}px`,
            borderRadius: '999px 999px 24px 24px',
            backgroundColor: bgSecondary,
            border: `1.5px solid ${activeAccent}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{ width: `${size - 14}px`, height: `${size - 14}px` }}
            dangerouslySetInnerHTML={{ __html: dynamicSvgRaw }}
          />
        </div>
      );
    }

    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: `${size * 0.78}px`,
            height: `${size * 0.78}px`,
            borderRadius: '999px',
            background:
              visualStyle === 'japanese-zen'
                ? activeAccentSoft
                : `radial-gradient(circle, ${activeAccentSoft} 0%, transparent 72%)`,
          }}
        />
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 2,
          }}
          dangerouslySetInnerHTML={{ __html: dynamicSvgRaw }}
        />
      </div>
    );
  };

  const renderKickerBadge = (text?: string) => {
    if (!text) return null;

    if (visualStyle === 'red-black-scribble') {
      return (
        <div
          style={{
            fontFamily: fontPairing.headingFamily,
            fontSize: '42px',
            fontWeight: 800,
            color: activeAccent,
            lineHeight: 1,
            marginBottom: '12px',
          }}
        >
          {slideIndex + 1}.
        </div>
      );
    }

    if (
      visualStyle === 'modern-bento' ||
      visualStyle === 'bold-highlight' ||
      visualStyle === 'dashboard-analytics' ||
      visualStyle === 'studio-grid-system' ||
      visualStyle === 'story-frames' ||
      visualStyle === 'aurora-glass'
    ) {
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            alignSelf: isCenteredStyle ? 'center' : 'flex-start',
            padding: '7px 16px',
            borderRadius: '999px',
            backgroundColor:
              visualStyle === 'bold-highlight' ? activeAccent : activeAccentSoft,
            color:
              visualStyle === 'bold-highlight'
                ? isColorDark(activeAccent)
                  ? '#FFFFFF'
                  : '#111111'
                : activeAccent,
            fontFamily: fontPairing.monoFamily,
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          <span>●</span>
          <span>{text}</span>
        </div>
      );
    }

    if (visualStyle === 'brutalist-neo') {
      return (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            alignSelf: 'flex-start',
            padding: '6px 14px',
            backgroundColor: activeAccent,
            color: isColorDark(activeAccent) ? '#FFFFFF' : '#111111',
            border: `2px solid ${ink}`,
            boxShadow: `4px 4px 0px ${ink}`,
            fontFamily: fontPairing.monoFamily,
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '18px',
          }}
        >
          <span>{text}</span>
        </div>
      );
    }

    if (isCenteredStyle) {
      return (
        <div
          style={{
            fontFamily: fontPairing.monoFamily,
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: activeAccent,
            marginBottom: '14px',
            textAlign: 'center',
          }}
        >
          ✦ {text} ✦
        </div>
      );
    }

    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: fontPairing.monoFamily,
          fontSize: '15px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: activeAccent,
          marginBottom: '16px',
        }}
      >
        <span
          style={{
            width: '24px',
            height: '2px',
            backgroundColor: activeAccent,
            display: 'inline-block',
          }}
        />
        <span>{text}</span>
      </div>
    );
  };

  const renderVisualStyleFrame = () => {
    switch (visualStyle) {
      case 'skale-pinned-notes':
        return (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `repeating-linear-gradient(to bottom, transparent 0px, transparent 58px, ${hexToRgba(
                userAccent,
                0.12
              )} 59px)`,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        );
      case 'simplist-highlight':
        return (
          <div
            style={{
              position: 'absolute',
              top: `${padTop + 44}px`,
              left: 0,
              right: 0,
              height: '44px',
              backgroundColor: activeAccent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isColorDark(activeAccent) ? '#FFFFFF' : '#111111',
              fontFamily: fontPairing.bodyFamily,
              fontSize: '17px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              zIndex: 2,
            }}
          >
            {slide.kicker || 'Le guide essentiel étape par étape'}
          </div>
        );
      case 'shodwe-brush':
        return (
          <>
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '58px',
                width: '18px',
                background:
                  'linear-gradient(90deg, rgba(0,0,0,0.06) 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: `${padBottom - 10}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 6,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  backgroundColor: activeAccent,
                  color: isColorDark(activeAccent) ? '#FFFFFF' : '#111111',
                  padding: '8px 34px',
                  borderRadius: '18px 4px 20px 6px',
                  fontFamily: '"Caveat", cursive',
                  fontSize: '28px',
                  fontWeight: 700,
                  boxShadow: `0 8px 20px ${hexToRgba(activeAccent, 0.35)}`,
                }}
              >
                {slideIndex === 0 ? 'Voir les détails' : `${slideIndex + 1}`}
              </div>
              {slideIndex === 0 && (
                <span
                  style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '42px',
                    color: activeAccent,
                  }}
                >
                  ↗
                </span>
              )}
            </div>
          </>
        );
      case 'grow-corporate-blue':
        return (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(to right, ${hexToRgba(
                activeAccent,
                0.1
              )} 1px, transparent 1px), linear-gradient(to bottom, ${hexToRgba(
                activeAccent,
                0.1
              )} 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        );
      case 'neon-purple-agency':
        return (
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(to right, ${hexToRgba(
                  activeAccent,
                  0.1
                )} 1px, transparent 1px), linear-gradient(to bottom, ${hexToRgba(
                  activeAccent,
                  0.1
                )} 1px, transparent 1px)`,
                backgroundSize: '64px 64px',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-90px',
                right: '-90px',
                width: '320px',
                height: '320px',
                borderRadius: '999px',
                border: `2px solid ${hexToRgba(activeAccent, 0.45)}`,
                outline: `2px solid ${hexToRgba(activeAccent, 0.22)}`,
                outlineOffset: '22px',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
          </>
        );
      case 'red-black-scribble':
        return (
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(to right, ${hexToRgba(
                  ink,
                  0.07
                )} 1px, transparent 1px), linear-gradient(to bottom, ${hexToRgba(
                  ink,
                  0.07
                )} 1px, transparent 1px)`,
                backgroundSize: '44px 44px',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: `${padTop - 10}px`,
                right: `${padRight}px`,
                fontFamily: fontPairing.monoFamily,
                fontSize: '18px',
                letterSpacing: '0.45em',
                color: activeAccent,
                lineHeight: 1.4,
                pointerEvents: 'none',
                zIndex: 3,
              }}
            >
              × × × ×<br />× × × ×
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: `${padBottom + 44}px`,
                left: `${padLeft}px`,
                right: `${padRight}px`,
                padding: '16px 22px',
                backgroundColor: darkBg ? '#FFFFFF' : bgSecondary,
                color: '#0A0A0A',
                border: `2px solid ${userAccent}`,
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                zIndex: 4,
              }}
            >
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '999px',
                  backgroundColor: userAccent,
                  color: isColorDark(userAccent) ? '#FFFFFF' : '#111111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '20px',
                  flexShrink: 0,
                }}
              >
                !
              </span>
              <span
                style={{
                  fontFamily: fontPairing.bodyFamily,
                  fontSize: '17px',
                  fontWeight: 600,
                }}
              >
                {slide.kicker || 'Conseil stratégique à appliquer dès maintenant'}
              </span>
            </div>
          </>
        );
      case 'data-charts-glass':
        return (
          <div
            style={{
              position: 'absolute',
              top: `${padTop - 20}px`,
              right: `${padRight}px`,
              fontFamily: fontPairing.headingFamily,
              fontSize: '130px',
              fontWeight: 700,
              color: hexToRgba(activeAccent, 0.2),
              lineHeight: 0.85,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            {numStr}
          </div>
        );
      case 'designmates-giant-num':
        return (
          <div
            style={{
              position: 'absolute',
              top: `${padTop - 10}px`,
              right: `${padRight}px`,
              fontFamily: fontPairing.headingFamily,
              fontSize: '185px',
              fontWeight: 800,
              color: hexToRgba(activeAccent, 0.22),
              lineHeight: 0.82,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            {slideIndex + 1}
          </div>
        );
      case 'nexora-acid-lime':
        return (
          <>
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                right: '30px',
                fontFamily: '"Anton", sans-serif',
                fontSize: '390px',
                color: hexToRgba(activeAccent, 0.08),
                lineHeight: 0.8,
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              N
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: `${padBottom - 6}px`,
                right: `${padRight}px`,
                width: '54px',
                height: '54px',
                borderRadius: '999px',
                backgroundColor: activeAccent,
                color: isColorDark(activeAccent) ? '#FFFFFF' : '#0E1311',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 800,
                zIndex: 6,
              }}
            >
              →
            </div>
          </>
        );
      case 'netroots-crumpled-pills':
        return (
          <div
            style={{
              position: 'absolute',
              bottom: `${padBottom + 56}px`,
              left: `${padLeft}px`,
              right: `${padRight}px`,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              zIndex: 4,
            }}
          >
            {['STRATÉGIE', 'ALGORITHME', 'CROISSANCE', 'IMPACT', 'VIRAL'].map(
              (tag, i) => (
                <span
                  key={tag}
                  style={{
                    padding: '8px 22px',
                    borderRadius: '999px',
                    backgroundColor: '#FFFFFF',
                    color: userAccent,
                    border: `2.5px solid ${userAccent}`,
                    fontFamily: fontPairing.monoFamily,
                    fontSize: '15px',
                    fontWeight: 800,
                    transform: `rotate(${i % 2 === 0 ? -6 : 5}deg)`,
                    boxShadow: '0 6px 14px rgba(0,0,0,0.1)',
                  }}
                >
                  {tag}
                </span>
              )
            )}
          </div>
        );
      case 'editorial-luxury':
        return (
          <>
            <div
              style={{
                position: 'absolute',
                top: `${padTop - 24}px`,
                bottom: `${padBottom - 24}px`,
                left: `${padLeft - 24}px`,
                right: `${padRight - 24}px`,
                border: `1.5px solid ${hexToRgba(activeAccent, 0.35)}`,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: `${padTop - 18}px`,
                bottom: `${padBottom - 18}px`,
                left: `${padLeft - 18}px`,
                right: `${padRight - 18}px`,
                border: `1px solid ${borderCol}`,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
          </>
        );
      case 'modern-bento':
        return (
          <div
            style={{
              position: 'absolute',
              top: `${padTop - 22}px`,
              bottom: `${padBottom - 22}px`,
              left: `${padLeft - 22}px`,
              right: `${padRight - 22}px`,
              borderRadius: '38px',
              border: `2px solid ${hexToRgba(activeAccent, 0.3)}`,
              backgroundColor: hexToRgba(activeAccent, 0.03),
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        );
      case 'swiss-poster':
        return (
          <>
            <div
              style={{
                position: 'absolute',
                top: `${padTop + 44}px`,
                left: 0,
                right: 0,
                height: '2px',
                backgroundColor: activeAccent,
                opacity: 0.35,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: `${padBottom + 54}px`,
                left: 0,
                right: 0,
                height: '2px',
                backgroundColor: activeAccent,
                opacity: 0.35,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${padLeft - 24}px`,
                width: '2px',
                backgroundColor: activeAccent,
                opacity: 0.25,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
          </>
        );
      case 'gallery-arch':
        return (
          <div
            style={{
              position: 'absolute',
              top: `${padTop - 22}px`,
              bottom: `${padBottom - 22}px`,
              left: `${padLeft - 20}px`,
              right: `${padRight - 20}px`,
              borderRadius: '460px 460px 28px 28px',
              border: `2px solid ${hexToRgba(activeAccent, 0.4)}`,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        );
      case 'bold-highlight':
        return (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '22px',
              backgroundColor: activeAccent,
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />
        );
      case 'newspaper-gazette':
        return (
          <>
            <div
              style={{
                position: 'absolute',
                top: `${padTop + 44}px`,
                left: `${padLeft}px`,
                right: `${padRight}px`,
                borderTop: `3px solid ${activeAccent}`,
                borderBottom: `1px solid ${activeAccent}`,
                height: '6px',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: `${padBottom + 56}px`,
                left: `${padLeft}px`,
                right: `${padRight}px`,
                borderTop: `1px solid ${activeAccent}`,
                borderBottom: `3px solid ${activeAccent}`,
                height: '6px',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
          </>
        );
      case 'polaroid-atelier':
        return (
          <div
            style={{
              position: 'absolute',
              top: `${padTop - 20}px`,
              bottom: `${padBottom - 20}px`,
              left: `${padLeft - 20}px`,
              right: `${padRight - 20}px`,
              border: `2px dashed ${hexToRgba(activeAccent, 0.4)}`,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        );
      case 'brutalist-neo':
        return (
          <div
            style={{
              position: 'absolute',
              top: `${padTop - 22}px`,
              bottom: `${padBottom - 22}px`,
              left: `${padLeft - 22}px`,
              right: `${padRight - 22}px`,
              border: `3px solid ${activeAccent}`,
              boxShadow: `10px 10px 0px ${activeAccent}`,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        );
      case 'japanese-zen':
        return (
          <>
            <div
              style={{
                position: 'absolute',
                top: '18%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '420px',
                height: '420px',
                borderRadius: '999px',
                backgroundColor: activeAccentSoft,
                opacity: 0.75,
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: `${padTop - 16}px`,
                bottom: `${padBottom - 16}px`,
                left: `${padLeft - 16}px`,
                right: `${padRight - 16}px`,
                border: `1.5px solid ${hexToRgba(activeAccent, 0.35)}`,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
          </>
        );
      case 'luxury-monogram':
        return (
          <div
            style={{
              position: 'absolute',
              top: `${padTop - 22}px`,
              bottom: `${padBottom - 22}px`,
              left: `${padLeft - 22}px`,
              right: `${padRight - 22}px`,
              border: `2.5px solid ${activeAccent}`,
              outline: `1px solid ${hexToRgba(activeAccent, 0.45)}`,
              outlineOffset: '-10px',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        );
      case 'split-magazine':
        return (
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: '28px',
              backgroundColor: activeAccent,
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />
        );
      case 'notebook-paper':
        return (
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `repeating-linear-gradient(to bottom, transparent 0px, transparent 47px, ${hexToRgba(
                  activeAccent,
                  0.16
                )} 48px)`,
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${padLeft - 18}px`,
                width: '2.5px',
                backgroundColor: hexToRgba(activeAccent, 0.65),
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
          </>
        );
      case 'aurora-glass':
        return (
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `radial-gradient(ellipse at 12% 16%, ${hexToRgba(activeAccent, 0.25)} 0%, transparent 36%), radial-gradient(ellipse at 90% 78%, ${hexToRgba(activeAccent, 0.16)} 0%, transparent 35%)`,
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: `${padTop - 14}px`,
                bottom: `${padBottom - 14}px`,
                left: `${padLeft - 14}px`,
                right: `${padRight - 14}px`,
                border: `1px solid ${hexToRgba(activeAccent, 0.42)}`,
                borderRadius: '42px',
                background: darkBg ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.35)',
                boxShadow: `0 0 48px ${hexToRgba(activeAccent, 0.12)}`,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
          </>
        );
      case 'kinetic-type':
        return (
          <>
            <div
              style={{
                position: 'absolute',
                right: `${padRight - 20}px`,
                bottom: `${padBottom + 80}px`,
                fontFamily: fontPairing.headingFamily,
                fontSize: isSquare ? '360px' : '510px',
                lineHeight: 0.72,
                fontWeight: 800,
                color: hexToRgba(activeAccent, darkBg ? 0.13 : 0.09),
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              {numStr}
            </div>
            <div
              style={{
                position: 'absolute',
                left: `${padLeft - 28}px`,
                top: `${padTop + 110}px`,
                bottom: `${padBottom + 110}px`,
                width: '8px',
                borderRadius: '999px',
                backgroundColor: activeAccent,
                opacity: 0.85,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
          </>
        );
      case 'paper-collage':
        return (
          <>
            <div
              style={{
                position: 'absolute',
                right: `${padRight + 8}px`,
                bottom: `${padBottom + 140}px`,
                width: '330px',
                height: '260px',
                backgroundColor: bgSecondary,
                border: `1px solid ${borderCol}`,
                boxShadow: `0 24px 56px ${hexToRgba(ink, 0.10)}`,
                transform: 'rotate(5deg)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: `${padLeft + 35}px`,
                bottom: `${padBottom + 178}px`,
                width: '220px',
                height: '170px',
                backgroundColor: activeAccentSoft,
                border: `1px solid ${hexToRgba(activeAccent, 0.28)}`,
                transform: 'rotate(-7deg)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: `${padTop + 55}px`,
                right: `${padRight + 26}px`,
                width: '104px',
                height: '28px',
                backgroundColor: activeAccent,
                opacity: 0.82,
                transform: 'rotate(7deg)',
                pointerEvents: 'none',
                zIndex: 3,
              }}
            />
          </>
        );
      case 'dashboard-analytics':
        return (
          <>
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '14px',
                backgroundColor: activeAccent,
                pointerEvents: 'none',
                zIndex: 3,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: `${padTop - 22}px`,
                right: `${padRight}px`,
                width: '168px',
                height: '72px',
                borderRadius: '16px',
                border: `1px solid ${borderCol}`,
                backgroundColor: darkBg ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
                backgroundImage: `linear-gradient(to top, ${hexToRgba(activeAccent, 0.18)} 1px, transparent 1px)`,
                backgroundSize: '100% 18px',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: `${padTop + 18}px`,
                right: `${padRight + 18}px`,
                width: '132px',
                height: '44px',
                background: `linear-gradient(135deg, transparent 10%, ${hexToRgba(activeAccent, 0.38)} 10% 15%, transparent 15% 28%, ${hexToRgba(activeAccent, 0.58)} 28% 34%, transparent 34% 48%, ${hexToRgba(activeAccent, 0.78)} 48% 55%, transparent 55%)`,
                pointerEvents: 'none',
                zIndex: 3,
              }}
            />
          </>
        );
      case 'studio-grid-system':
        return (
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(to right, ${hexToRgba(activeAccent, 0.08)} 1px, transparent 1px), linear-gradient(to bottom, ${hexToRgba(activeAccent, 0.08)} 1px, transparent 1px)`,
                backgroundSize: '90px 90px',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: `${padTop + 54}px`,
                bottom: `${padBottom + 62}px`,
                left: '33.333%',
                borderLeft: `1px dashed ${hexToRgba(activeAccent, 0.28)}`,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: `${padTop + 54}px`,
                bottom: `${padBottom + 62}px`,
                left: '66.666%',
                borderLeft: `1px dashed ${hexToRgba(activeAccent, 0.28)}`,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
          </>
        );
      case 'story-frames':
        return (
          <>
            <div
              style={{
                position: 'absolute',
                top: `${padTop + 78}px`,
                bottom: `${padBottom + 78}px`,
                left: `${padLeft - 28}px`,
                width: '3px',
                background: `linear-gradient(to bottom, ${hexToRgba(activeAccent, 0.12)}, ${activeAccent}, ${hexToRgba(activeAccent, 0.12)})`,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: `${padTop + 112}px`,
                left: `${padLeft - 38}px`,
                width: '23px',
                height: '23px',
                borderRadius: '50%',
                backgroundColor: bgPrimary,
                border: `4px solid ${activeAccent}`,
                boxShadow: `0 0 0 7px ${activeAccentSoft}`,
                pointerEvents: 'none',
                zIndex: 3,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: `${padTop - 18}px`,
                bottom: `${padBottom - 18}px`,
                left: `${padLeft - 18}px`,
                right: `${padRight - 18}px`,
                border: `1px solid ${borderCol}`,
                borderRadius: '28px',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
          </>
        );
      default:
        return null;
    }
  };

  const renderSlideBody = () => {
    if (visualStyle === 'skale-pinned-notes') {
      return renderPinnedNoteStage();
    }

    if (
      (visualStyle === 'data-charts-glass' ||
        visualStyle === 'grow-corporate-blue' ||
        visualStyle === 'dashboard-analytics') &&
      (slide.layout === 'big-stat' || slide.layout === 'numbered-insight')
    ) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            gap: '18px',
          }}
        >
          {renderKickerBadge(slide.kicker)}
          <h2
            style={{
              fontFamily: headingFont,
              fontWeight: fontPairing.headingWeight,
              fontSize: isSquare ? '48px' : '56px',
              lineHeight: 1.08,
              color: ink,
              margin: 0,
            }}
          >
            {renderStyledHeadline(slide.title)}
          </h2>
          {renderDataChartWidget()}
          {slide.subtitle && (
            <p
              style={{
                fontFamily: fontPairing.bodyFamily,
                fontSize: '23px',
                lineHeight: 1.42,
                color: inkMuted,
                margin: 0,
              }}
            >
              {slide.subtitle}
            </p>
          )}
        </div>
      );
    }

    switch (slide.layout) {
      case 'cover-editorial': {
        const illusSize = isVertical916 ? 370 : isSquare ? 245 : 300;
        const titleSize = isVertical916
          ? hasIllustration
            ? '68px'
            : '82px'
          : isSquare
          ? hasIllustration
            ? '56px'
            : '68px'
          : hasIllustration
          ? '64px'
          : '76px';

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: isCenteredStyle ? 'center' : 'stretch',
              textAlign: isCenteredStyle ? 'center' : 'left',
              height: '100%',
              paddingTop: visualStyle === 'simplist-highlight' ? '56px' : '12px',
              paddingBottom:
                visualStyle === 'red-black-scribble' ||
                visualStyle === 'netroots-crumpled-pills'
                  ? '95px'
                  : '12px',
            }}
          >
            {hasIllustration ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  minHeight: 0,
                }}
              >
                {renderIllustrationStage(illusSize)}
              </div>
            ) : (
              <div style={{ flex: 0.25 }} />
            )}

            <div style={{ width: '100%' }}>
              {renderKickerBadge(slide.kicker)}

              <h1
                style={{
                  fontFamily: headingFont,
                  fontWeight: fontPairing.headingWeight,
                  fontStyle: fontPairing.headingStyle || 'normal',
                  textTransform: isUppercaseHeading ? 'uppercase' : 'none',
                  fontSize: titleSize,
                  lineHeight: 1.04,
                  letterSpacing: isUppercaseHeading ? '0.01em' : '-0.025em',
                  color: ink,
                  margin: 0,
                  marginBottom: slide.subtitle ? '20px' : '0',
                }}
              >
                {renderStyledHeadline(slide.title)}
              </h1>

              {slide.subtitle && (
                <p
                  style={{
                    fontFamily: fontPairing.bodyFamily,
                    fontSize: isVertical916 ? '25px' : '23px',
                    lineHeight: 1.42,
                    color: inkMuted,
                    margin: isCenteredStyle ? '0 auto' : 0,
                    maxWidth: '92%',
                  }}
                >
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        );
      }

      case 'big-stat': {
        const illusSize = isVertical916 ? 260 : isSquare ? 180 : 210;
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: isCenteredStyle ? 'center' : 'stretch',
              textAlign: isCenteredStyle ? 'center' : 'left',
              height: '100%',
              gap: '20px',
            }}
          >
            {hasIllustration && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {renderIllustrationStage(illusSize)}
              </div>
            )}

            <div>
              {renderKickerBadge(slide.kicker)}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isCenteredStyle ? 'center' : 'flex-start',
                  gap: '24px',
                  padding: '22px 28px',
                  borderRadius:
                    visualStyle === 'brutalist-neo' ? '0px' : '24px',
                  backgroundColor: bgSecondary,
                  border:
                    visualStyle === 'brutalist-neo'
                      ? `2.5px solid ${activeAccent}`
                      : `1.5px solid ${borderCol}`,
                  boxShadow:
                    visualStyle === 'brutalist-neo'
                      ? `6px 6px 0px ${activeAccent}`
                      : 'none',
                  marginBottom: '22px',
                }}
              >
                <div
                  style={{
                    fontFamily: headingFont,
                    fontSize: isSquare ? '78px' : '94px',
                    lineHeight: 0.92,
                    letterSpacing: '-0.03em',
                    color: activeAccent,
                    fontStyle: isUppercaseHeading ? 'normal' : 'italic',
                    flexShrink: 0,
                  }}
                >
                  {slide.statValue || 'À SOURCER'}
                </div>

                {slide.statLabel && (
                  <div
                    style={{
                      fontFamily: fontPairing.bodyFamily,
                      fontSize: '20px',
                      lineHeight: 1.35,
                      color: inkMuted,
                      borderLeft: `2px solid ${borderCol}`,
                      paddingLeft: '20px',
                      textAlign: 'left',
                    }}
                  >
                    {slide.statLabel}
                  </div>
                )}
              </div>

              <h2
                style={{
                  fontFamily: headingFont,
                  fontWeight: fontPairing.headingWeight,
                  textTransform: isUppercaseHeading ? 'uppercase' : 'none',
                  fontSize: isSquare ? '48px' : '54px',
                  lineHeight: 1.08,
                  color: ink,
                  margin: 0,
                  marginBottom: slide.subtitle ? '14px' : '0',
                }}
              >
                {renderStyledHeadline(slide.title)}
              </h2>

              {slide.subtitle && (
                <p
                  style={{
                    fontFamily: fontPairing.bodyFamily,
                    fontSize: '23px',
                    lineHeight: 1.42,
                    color: inkMuted,
                    margin: 0,
                  }}
                >
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        );
      }

      case 'comparison-split': {
        const illusSize = isVertical916 ? 200 : 150;
        const isSideBySideUI =
          visualStyle === 'designmates-giant-num' ||
          visualStyle === 'shodwe-brush';

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              gap: '20px',
            }}
          >
            <div style={{ textAlign: isCenteredStyle ? 'center' : 'left' }}>
              {renderKickerBadge(slide.kicker)}
              <h2
                style={{
                  fontFamily: headingFont,
                  fontWeight: fontPairing.headingWeight,
                  textTransform: isUppercaseHeading ? 'uppercase' : 'none',
                  fontSize: isSquare ? '48px' : '54px',
                  lineHeight: 1.06,
                  color: ink,
                  margin: 0,
                }}
              >
                {renderStyledHeadline(slide.title)}
              </h2>
            </div>

            {hasIllustration && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {renderIllustrationStage(illusSize)}
              </div>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isSideBySideUI ? '1fr 1fr' : '1fr',
                gap: '16px',
              }}
            >
              <div
                style={{
                  padding: '24px 26px',
                  borderRadius:
                    visualStyle === 'shodwe-brush'
                      ? '999px'
                      : visualStyle === 'brutalist-neo'
                      ? '0px'
                      : '22px',
                  backgroundColor: bgSecondary,
                  border:
                    visualStyle === 'brutalist-neo'
                      ? `2px solid ${ink}`
                      : `1.5px solid ${borderCol}`,
                  textAlign: visualStyle === 'shodwe-brush' ? 'center' : 'left',
                }}
              >
                <div
                  style={{
                    fontFamily: fontPairing.monoFamily,
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: inkMuted,
                    marginBottom: '8px',
                  }}
                >
                  ✕ {slide.comparisonLeftTitle || 'Avant'}
                </div>
                <p
                  style={{
                    fontFamily: fontPairing.bodyFamily,
                    fontSize: '21px',
                    lineHeight: 1.38,
                    color: inkMuted,
                    margin: 0,
                  }}
                >
                  {slide.comparisonLeftText}
                </p>
              </div>

              <div
                style={{
                  padding: '24px 26px',
                  borderRadius:
                    visualStyle === 'shodwe-brush'
                      ? '999px'
                      : visualStyle === 'brutalist-neo'
                      ? '0px'
                      : '22px',
                  backgroundColor: bgSecondary,
                  border: `2.5px solid ${activeAccent}`,
                  boxShadow:
                    visualStyle === 'brutalist-neo'
                      ? `6px 6px 0px ${activeAccent}`
                      : `0 14px 32px ${activeAccentSoft}`,
                  textAlign: visualStyle === 'shodwe-brush' ? 'center' : 'left',
                }}
              >
                <div
                  style={{
                    fontFamily: fontPairing.monoFamily,
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: activeAccent,
                    marginBottom: '8px',
                  }}
                >
                  ✓ {slide.comparisonRightTitle || 'Maintenant'}
                </div>
                <p
                  style={{
                    fontFamily: fontPairing.bodyFamily,
                    fontSize: '21px',
                    lineHeight: 1.38,
                    color: ink,
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {slide.comparisonRightText}
                </p>
              </div>
            </div>
          </div>
        );
      }

      case 'checklist-card': {
        const bullets = slide.bulletPoints || [];
        const illusSize = isVertical916 ? 200 : 145;
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              gap: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              <div style={{ flex: 1 }}>
                {renderKickerBadge(slide.kicker)}
                <h2
                  style={{
                    fontFamily: headingFont,
                    fontWeight: fontPairing.headingWeight,
                    textTransform: isUppercaseHeading ? 'uppercase' : 'none',
                    fontSize: isSquare ? '46px' : '52px',
                    lineHeight: 1.06,
                    color: ink,
                    margin: 0,
                  }}
                >
                  {renderStyledHeadline(slide.title)}
                </h2>
              </div>

              {hasIllustration && renderIllustrationStage(illusSize)}
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              {bullets.slice(0, 4).map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    padding: '20px 24px',
                    borderRadius:
                      visualStyle === 'brutalist-neo' ? '0px' : '20px',
                    backgroundColor: bgSecondary,
                    border:
                      visualStyle === 'brutalist-neo'
                        ? `2px solid ${activeAccent}`
                        : `1.5px solid ${borderCol}`,
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius:
                        visualStyle === 'brutalist-neo' ? '0px' : '999px',
                      backgroundColor: activeAccent,
                      color: isColorDark(activeAccent) ? '#FFFFFF' : '#111111',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: fontPairing.monoFamily,
                      fontSize: '15px',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </div>
                  <div
                    style={{
                      fontFamily: fontPairing.bodyFamily,
                      fontSize: '22px',
                      lineHeight: 1.35,
                      color: ink,
                      fontWeight: 500,
                    }}
                  >
                    {renderStyledHeadline(item)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'quote-manifesto':
      case 'cta-outro': {
        const illusSize = isVertical916 ? 270 : 200;
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
              gap: '24px',
              paddingLeft: '16px',
              paddingRight: '16px',
            }}
          >
            {hasIllustration && renderIllustrationStage(illusSize)}

            <div>
              {renderKickerBadge(slide.kicker)}

              <h2
                style={{
                  fontFamily: headingFont,
                  fontWeight: fontPairing.headingWeight,
                  textTransform: isUppercaseHeading ? 'uppercase' : 'none',
                  fontSize: isSquare ? '50px' : '58px',
                  lineHeight: 1.1,
                  color: ink,
                  margin: 0,
                  marginBottom: slide.subtitle ? '20px' : '0',
                }}
              >
                {renderStyledHeadline(slide.title)}
              </h2>

              {slide.subtitle && (
                <p
                  style={{
                    fontFamily: fontPairing.bodyFamily,
                    fontSize: '23px',
                    lineHeight: 1.42,
                    color: inkMuted,
                    margin: '0 auto',
                    maxWidth: '88%',
                  }}
                >
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        );
      }

      case 'numbered-insight':
      default: {
        const illusSize = isVertical916 ? 290 : isSquare ? 200 : 245;
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: isCenteredStyle ? 'center' : 'stretch',
              textAlign: isCenteredStyle ? 'center' : 'left',
              height: '100%',
              gap: '24px',
            }}
          >
            {hasIllustration && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {renderIllustrationStage(illusSize)}
              </div>
            )}

            <div>
              {renderKickerBadge(slide.kicker)}

              <h2
                style={{
                  fontFamily: headingFont,
                  fontWeight: fontPairing.headingWeight,
                  textTransform: isUppercaseHeading ? 'uppercase' : 'none',
                  fontSize: isSquare ? '50px' : '58px',
                  lineHeight: 1.07,
                  letterSpacing: isUppercaseHeading ? '0.01em' : '-0.02em',
                  color: ink,
                  margin: 0,
                  marginBottom: slide.subtitle ? '20px' : '0',
                }}
              >
                {renderStyledHeadline(slide.title)}
              </h2>

              {slide.subtitle && (
                <p
                  style={{
                    fontFamily: fontPairing.bodyFamily,
                    fontSize: '24px',
                    lineHeight: 1.45,
                    color: inkMuted,
                    margin: 0,
                    paddingLeft: isCenteredStyle ? '0' : '22px',
                    borderLeft: isCenteredStyle
                      ? 'none'
                      : `3px solid ${activeAccent}`,
                  }}
                >
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div
      style={{
        width: `${width * scale}px`,
        height: `${height * scale}px`,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '18px',
        boxShadow:
          '0 22px 50px -12px rgba(24, 21, 18, 0.14), 0 4px 16px -2px rgba(24, 21, 18, 0.06)',
        backgroundColor: bgPrimary,
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          backgroundColor: bgPrimary,
          color: ink,
          position: 'relative',
          boxSizing: 'border-box',
          paddingTop: `${padTop}px`,
          paddingBottom: `${padBottom}px`,
          paddingLeft: `${padLeft}px`,
          paddingRight: `${padRight}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        {/* Subtle ambient glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 85% 12%, ${activeAccentSoft} 0%, transparent 52%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {renderVisualStyleFrame()}

        {/* Top Bar */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '12px',
          }}
        >
          <span
            style={{
              fontFamily: fontPairing.monoFamily,
              fontSize: '15px',
              fontWeight: 600,
              color: inkMuted,
              letterSpacing: '0.05em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {visualStyle === 'skale-pinned-notes' && (
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '6px',
                  backgroundColor: userAccent,
                  display: 'inline-block',
                }}
              />
            )}
            {project.authorHandle}
          </span>

          {project.showSlideNumbers && (
            <span
              style={{
                fontFamily: fontPairing.monoFamily,
                fontSize: '14px',
                fontWeight: 600,
                color: inkMuted,
                letterSpacing: '0.1em',
              }}
            >
              {numStr} / {totalStr}
            </span>
          )}
        </div>

        {/* Main Body */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: 0,
          }}
        >
          {renderSlideBody()}
        </div>

        {/* Bottom Footer */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
          }}
        >
          {visualStyle === 'designmates-giant-num' ? (
            <div
              style={{
                fontFamily: fontPairing.monoFamily,
                fontSize: '20px',
                color: activeAccent,
                letterSpacing: '0.25em',
              }}
            >
              ♡ 💬 ⌲ 🔖
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {Array.from({ length: totalSlides }).map((_, idx) => {
                const active = idx === slideIndex;
                return (
                  <span
                    key={idx}
                    style={{
                      width: active ? '28px' : '8px',
                      height: '8px',
                      borderRadius: '999px',
                      backgroundColor: active ? activeAccent : borderCol,
                    }}
                  />
                );
              })}
            </div>
          )}

          {project.showSwipeIndicator && (
            <div
              style={{
                fontFamily: fontPairing.monoFamily,
                fontSize: '14px',
                fontWeight: 600,
                color: slideIndex === totalSlides - 1 ? activeAccent : ink,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {slide.swipePrompt ||
                (slideIndex === totalSlides - 1 ? 'Enregistrer 📌' : 'Glisser →')}
            </div>
          )}
        </div>

        {/* Safe Zone Overlay */}
        {showSafeZoneOverlay && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 30,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: `${safeZone.top}px`,
                bottom: `${safeZone.bottom}px`,
                left: `${safeZone.left}px`,
                right: `${safeZone.right}px`,
                border: '2px dashed rgba(190, 75, 42, 0.55)',
                borderRadius: '12px',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
