import React from 'react';
import './SlideNav.css';
import Icon from '../../../../Icon';
import { ICON_PATHS } from '../../../../../utils/iconPaths';

/**
 * SlideNav Component
 *
 * Vertical navigation arrows for navigating through slides
 * Positioned on the far right side of the content area
 */

const SlideNav = ({
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
  className = ''
}) => {
  return (
    <div className={`slide-nav ${className}`}>
      {canGoPrev && (
        <button
          className="slide-nav-button slide-nav-button-up"
          onClick={onPrev}
          aria-label="Previous slide"
        >
          <Icon svgPath={ICON_PATHS.arrowUp} size={24} />
        </button>
      )}
      {canGoNext && (
        <button
          className="slide-nav-button slide-nav-button-down"
          onClick={onNext}
          aria-label="Next slide"
        >
          <Icon svgPath={ICON_PATHS.arrowDown} size={24} />
        </button>
      )}
    </div>
  );
};

export default SlideNav;
