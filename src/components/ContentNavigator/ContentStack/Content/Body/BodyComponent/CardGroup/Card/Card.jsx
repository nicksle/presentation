import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './Card.css';
import Icon from '../../../../../../../../components/Icon';
import { ICON_PATHS } from '../../../../../../../../utils/iconPaths';
import CardCarousel from './CardCarousel/CardCarousel';
import CardCTA from './CardCTA/CardCTA';

// Styles using CSS custom properties - consistent with Text component
const textStyles = {
  index: {
    fontFamily: 'var(--font-family-subtitle)',
    fontSize: 'var(--font-size-subtitle)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-tertiary)'
  },
  heading: {
    fontFamily: 'var(--font-family-title)',
    fontSize: 'var(--font-size-title-base)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-primary)'
  },
  body: {
    fontFamily: 'var(--font-family-body)',
    fontSize: 'var(--font-size-body-sm)',
    fontWeight: 'var(--font-weight-regular)',
    color: 'var(--color-primary)'
  }
};

const Card = ({ 
  index,
  icon,
  title,
  description,
  ctaText,
  ctaIcon,
  children,
  headItems = [], // Array of { id, index, title } for CardCarousel head stack
  bodyItems = [], // Array of { id, children } for CardCarousel body stack
  onExpandChange, // Callback to notify parent when expand state changes
  onExpand, // Alternative callback prop name used by CardGroup
  isExpanded: propIsExpanded, // External control from CardGroup
  className = '',
  style = {} 
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const cardCarouselRef = useRef(null);
  
  // Use prop if provided (from CardGroup), otherwise use internal state
  const isExpanded = propIsExpanded !== undefined ? propIsExpanded : internalExpanded;

  const handleCtaClick = () => {
    const newState = !isExpanded;
    
    // If collapsing (going from expanded to collapsed), reset scroll
    if (isExpanded && !newState) {
      cardCarouselRef.current?.resetScrollToStart();
    }
    
    if (propIsExpanded !== undefined) {
      // Controlled by CardGroup
      onExpand?.(newState);
    } else {
      // Internal state management
      setInternalExpanded(newState);
      onExpandChange?.(newState);
    }
  };

  // Note: animatedChildren logic removed - only CardCarousel is used now

  return (
    <div className={`card ${isExpanded ? 'expanded' : ''} ${className}`}>
      <span className="card-index" style={textStyles.index}>{index}</span>
      <div className="card-indent">
        <motion.div 
          layout 
          className={`card-frame ${isExpanded ? 'expanded' : ''}`}
          transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
        >
          <motion.div
            layout
            className="card-head"
            onClick={handleCtaClick}
            transition={{
              layout: { duration: 0.4, ease: "easeInOut" }
            }}
          >
            <motion.div
              layout="position"
              className="card-content"
              transition={{
                layout: { duration: 0.4, ease: "easeInOut" }
              }}
            >
              <div className="card-icon-wrapper">
                {icon || <Icon
                  svgPath={ICON_PATHS.arrowRight}
                  size="xl"
                  className="card-icon"
                />}
              </div>
              <h3 style={textStyles.heading}>{title}</h3>
              <p
                style={textStyles.body}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </motion.div>
            <CardCTA
              ctaText={ctaText}
              ctaIcon={ctaIcon || { svgPath: ICON_PATHS.arrowRight }}
              isExpanded={isExpanded}
            />
          </motion.div>
          <motion.div 
            layout 
            className="card-body"
            transition={{ 
              layout: { duration: 0.4, ease: "easeInOut" }
            }}
          >
            <div className="body-scroll carousel-mode">
              <CardCarousel 
                ref={cardCarouselRef}
                headItems={headItems} 
                bodyItems={bodyItems} 
                onCollapse={() => handleCtaClick()}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Card; 