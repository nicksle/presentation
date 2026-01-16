import React, { useState, useEffect, useRef, useLayoutEffect, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ContentNavigator.css';
import Icon from '../Icon/Icon';
import { ICON_PATHS } from '../../utils/iconPaths';

// ContentNavigatorButton component - contains all navigation buttons (up, back, next)
export const ContentNavigatorButton = ({
  onScrollToTop,
  onBackSection,
  onNextSection,
  showBackButton = false,
  showNextButton = true,
  currentIndex = null,
  previousIndex = null,
  nextIndex = null
}) => {
  return (
    <div className="content-navigator-button-container" style={{ display: 'flex', width: '100%', gap: 0 }}>
      {/* Up/Back to Top Button */}
      {onScrollToTop && (
        <button
          className="content-navigator-button content-navigator-button-up"
          onClick={onScrollToTop}
        >
          <Icon svgPath={ICON_PATHS.arrowDown} size="medium" className="content-navigator-button-icon" />
        </button>
      )}

      {/* Back/Previous Section Button */}
      {showBackButton && onBackSection && (
        <button
          className="content-navigator-button content-navigator-button-back"
          onClick={onBackSection}
          style={{ flex: 1 }}
        >
          <Icon
            svgPath={ICON_PATHS.arrowRight}
            size="small"
            style={{ color: 'var(--color-primary)', transform: 'rotate(180deg)' }}
          />
          <span style={{
            fontFamily: 'var(--font-family-subtitle)',
            fontSize: 'var(--font-size-subtitle)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-primary)'
          }}>Back</span>
        </button>
      )}

      {/* Next Section Button */}
      {showNextButton && onNextSection && (
        <button
          className="content-navigator-button content-navigator-button-next"
          onClick={onNextSection}
          style={{ flex: 1 }}
        >
          <span style={{
            fontFamily: 'var(--font-family-subtitle)',
            fontSize: 'var(--font-size-subtitle)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-primary)'
          }}>Next</span>
          <Icon
            svgPath={ICON_PATHS.arrowRight}
            size="small"
            style={{ color: 'var(--color-primary)' }}
          />
        </button>
      )}
    </div>
  );
};

const ContentNavigator = ({ children, activeId, enableAnimations = true }) => {
  // Separate children into TabNav and content
  const childrenArray = Children.toArray(children);
  const tabNav = childrenArray.find(child => child.props?.className?.includes?.('tab-nav') || child.type?.name === 'TabNav');
  const content = childrenArray.filter(child => child !== tabNav);

  // Simple render without built-in animations - let parent pages handle animations
  return (
    <div className="content-navigator">
      {tabNav}
      {content}
    </div>
  );
};

export default ContentNavigator;
