import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../../../../../../../components/Icon';
import { ICON_PATHS } from '../../../../../../../../../utils/iconPaths';
import './CardCTA.css';

// Styles using CSS custom properties - consistent with Card component
const textStyles = {
  index: {
    fontFamily: 'var(--font-family-subtitle)',
    fontSize: 'var(--font-size-subtitle)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-tertiary)'
  }
};

// Helper function to render icons (similar to FullCard)
const renderIcon = (icon, className) => {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    // For React SVG components, clone with className
    return React.cloneElement(icon, { className });
  } else if (icon.svgPath) {
    // For icon objects with svgPath property
    return <Icon svgPath={icon.svgPath} size="small" className={className} />;
  } else {
    // For image files, use img tag
    return <img src={icon} alt="icon" className={className} />;
  }
};

const CardCTA = ({ 
  ctaText, 
  ctaIcon, 
  onClick,
  isExpanded = false,
  className = '',
  variant = 'card' // 'card' or 'full-card'
}) => {
  const baseClass = variant === 'full-card' ? 'full-card-cta' : 'card-cta';
  const iconClass = variant === 'full-card' ? 'full-card-cta-icon' : 'cta-icon';
  const wrapperClass = variant === 'full-card' ? 'cta-icon-wrapper' : 'cta-icon-wrapper';
  
  return (
    <div
      className={`${baseClass} ${className}`}
      onClick={onClick}
    >
      <span
        className="cta-text"
        style={textStyles.index}
      >
        {ctaText}
      </span>
      
      {variant === 'full-card' ? (
        // FullCard style: direct icon rendering (matches FullCard.jsx structure)
        renderIcon(ctaIcon, iconClass)
      ) : (
        // Card style: icon with wrapper
        <div className={wrapperClass}>
          <div className="cta-icon-container">
            <Icon
              svgPath={ctaIcon?.svgPath || ICON_PATHS.arrowRight}
              size="small"
              className={iconClass}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardCTA;
