import React from 'react';
import { Media } from '../utils/mediaUtils';
import './Var2.css';
import './phone.css';

/**
 * Var2 - Two phones side-by-side with 24px gap
 * Similar to Centered but with 2 phones horizontally
 * 12px padding top and bottom, media scaled to fit
 *
 * @param {Array} sources - Array of exactly 2 media sources [left, right]
 * @param {string} alt - Alt text
 */
const Var2 = ({ sources, alt }) => {
  if (!sources || sources.length !== 2) {
    console.warn('Var2 requires exactly 2 sources');
    return null;
  }

  return (
    <div className="container">
      <Media
        src={sources[0]}
        alt={`${alt} - left`}
        className="media phone"
      />
      <Media
        src={sources[1]}
        alt={`${alt} - right`}
        className="media phone"
      />
    </div>
  );
};

export default Var2;
