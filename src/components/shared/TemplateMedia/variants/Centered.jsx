import React from 'react';
import { Media } from '../utils/mediaUtils';
import './Centered.css';
import './phone.css';

/**
 * Centered - Single phone/video centered with padding
 * 12px padding top and bottom, media scaled to fit
 *
 * @param {Array} sources - Array with 1 media source or single src prop
 * @param {string} alt - Alt text
 */
const Centered = ({ sources, alt }) => {
  const src = Array.isArray(sources) ? sources[0] : sources;

  if (!src) {
    console.warn('Centered variant requires at least 1 source');
    return null;
  }

  return (
    <div className="container">
      <Media
        src={src}
        alt={alt}
        className="media phone"
      />
    </div>
  );
};

export default Centered;
