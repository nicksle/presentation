import React from 'react';
import { Media } from '../utils/mediaUtils';
import './Var3.css';
import './phone.css';

/**
 * Var3 - Three phones with size hierarchy
 * Center phone larger (16px padding), side phones smaller (24px padding)
 *
 * @param {Array} sources - Array of exactly 3 media sources [left, center, right]
 * @param {string} alt - Alt text
 */
const Var3 = ({ sources, alt }) => {
  if (!sources || sources.length !== 3) {
    console.warn('Var3 requires exactly 3 sources');
    return null;
  }

  return (
    <div className="container">
      <div className="phone-wrapper small">
        <Media
          src={sources[0]}
          alt={`${alt} - left`}
          className="media phone"
        />
      </div>
      <div className="phone-wrapper large">
        <Media
          src={sources[1]}
          alt={`${alt} - center`}
          className="media phone"
        />
      </div>
      <div className="phone-wrapper small">
        <Media
          src={sources[2]}
          alt={`${alt} - right`}
          className="media phone"
        />
      </div>
    </div>
  );
};

export default Var3;
