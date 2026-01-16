import React from 'react';
import Centered from '../variants/Centered';
import Var2 from '../variants/Var2';
import Var3 from '../variants/Var3';

/**
 * Items - Handles variant-specific positioning of media within TemplateMedia container
 * Parent container is fixed at 400x300
 *
 * @param {string} variant - Layout variant type ('centered', 'var2', 'var3')
 * @param {Array} sources - Array of media sources (images/videos)
 * @param {string} alt - Alt text for accessibility
 */
const Items = ({ variant = 'centered', sources, alt = '' }) => {
  switch (variant) {
    case 'var2':
      return <Var2 sources={sources} alt={alt} />;

    case 'var3':
      return <Var3 sources={sources} alt={alt} />;

    case 'centered':
    default:
      return <Centered sources={sources} alt={alt} />;
  }
};

export default Items;
