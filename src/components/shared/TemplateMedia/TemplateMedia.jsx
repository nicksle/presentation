import React, { useState } from 'react';
import Items from './Items/Items';
import { getRandomGradient } from './utils/gradients';
import './TemplateMedia.css';

/**
 * TemplateMedia - Fixed 400x300 container for media templates
 * Supports both images and videos
 * Variants handled by Items component
 * Background features dark purple mesh gradients with grain
 *
 * @param {string} variant - Template type (single, double, double-centered, double-offset, triple-horizontal, triple-cascade)
 * @param {string} src - Media source (for single variant) - can be image or video
 * @param {Array} sources - Array of media sources (for multi-media variants) - can be images or videos
 * @param {string} alt - Alt text for accessibility
 * @param {object} style - Additional inline styles
 * @param {string} className - Additional CSS classes
 */
const TemplateMedia = ({
  variant = 'single',
  src,
  sources,
  alt = '',
  style = {},
  className = ''
}) => {
  // Get random gradient on mount
  const [gradient] = useState(() => getRandomGradient());

  return (
    <>
      {/* SVG noise filter for grain effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 0.05" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <div
        className={`template-media ${className}`}
        style={{
          width: '400px',
          height: '300px',
          position: 'relative',
          background: gradient.background,
          ...style
        }}
      >
        {/* Grain overlay */}
        <div className="template-media__grain" />

        <Items
          variant={variant}
          sources={sources || [src]}
          alt={alt}
        />
      </div>
    </>
  );
};

export default TemplateMedia;
