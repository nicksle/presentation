import React from 'react';
import './CarouselItem.css';

/**
 * CarouselItem Component
 *
 * Container for media content (images/videos) within SlideCarousel
 * Provides consistent styling and sizing for carousel items
 */

const CarouselItem = ({ children, className = '' }) => {
  return (
    <div className={`carousel-item-container ${className}`}>
      {children}
    </div>
  );
};

export default CarouselItem;
