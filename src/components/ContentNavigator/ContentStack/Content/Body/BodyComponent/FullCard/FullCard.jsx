import React from 'react';
import './FullCard.css';
import CardCTA from '../CardGroup/Card/CardCTA/CardCTA';
import CardCarousel from '../CardGroup/Card/CardCarousel/CardCarousel';

// Helper function to render icons
const renderIcon = (icon, className) => {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    // For React SVG components, clone with className
    return React.cloneElement(icon, { className });
  } else {
    // For image files, use img tag
    return <img src={icon} alt="icon" className={className} />;
  }
};

// Styles using CSS custom properties - consistent with other components
const textStyles = {
  index: {
    fontFamily: 'var(--font-family-subtitle, "SF Mono", Menlo, Monaco, Consolas, monospace)',
    fontSize: 'var(--font-size-subtitle, 14px)',
    fontWeight: 'var(--font-weight-medium, 500)',
    color: 'var(--color-tertiary, #999988)'
  },
  heading: {
    fontFamily: 'var(--font-family-title, "Satoshi", Helvetica, Arial, sans-serif)',
    fontSize: 'var(--font-size-title-base, 24px)',
    fontWeight: 'var(--font-weight-medium, 500)',
    color: 'var(--color-primary, #ffffe3)'
  },
  body: {
    fontFamily: 'var(--font-family-body, "Satoshi", Helvetica, Arial, sans-serif)',
    fontSize: 'var(--font-size-body-sm, 20px)',
    fontWeight: 'var(--font-weight-regular, 400)',
    color: 'var(--color-primary, #ffffe3)'
  }
};

const FullCard = ({ 
  index,
  icon = null,
  title,
  description,
  ctaText,
  ctaIcon,
  children,
  headItems = [], // Array of { id, index, title } for CardCarousel head stack
  bodyItems = [], // Array of { id, children } for CardCarousel body stack
  style = {},
  className = '',
  onCtaClick
}) => {
  const handleCtaClick = () => {
    onCtaClick?.();
  };
  return (
    <div className={`full-card ${className}`.trim()}>
      <span className="full-card-index" style={textStyles.index}>{index}</span>
      <div className="full-card-indent">
        <div className="full-card-frame">
          <div className="full-card-head">
            <div className="full-card-content">
              {renderIcon(icon, "full-card-icon")}
              <h3 style={textStyles.heading}>{title}</h3>
              <p style={textStyles.body}>{description}</p>
            </div>
            <CardCTA 
              ctaText={ctaText}
              ctaIcon={ctaIcon}
              onClick={handleCtaClick}
              variant="full-card"
            />
          </div>
          <div className="full-card-body">
            <div className={`full-card-body-scroll ${headItems.length > 0 && bodyItems.length > 0 ? 'carousel-mode' : ''}`}>
              {headItems.length > 0 && bodyItems.length > 0 ? (
                <CardCarousel headItems={headItems} bodyItems={bodyItems} />
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullCard;
