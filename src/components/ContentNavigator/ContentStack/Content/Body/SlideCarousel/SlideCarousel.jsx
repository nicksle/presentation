import React from 'react';
import './SlideCarousel.css';
import Carousel from '../../../../../Carousel/Carousel';

/**
 * SlideCarousel Component
 *
 * Slide-specific carousel wrapper for presentation content
 * Takes CarouselItem children and displays them in a horizontal carousel
 */

const SlideCarousel = ({
  children,
  height = '100%',
  gap = 16,
  className = ''
}) => {
  // Convert children to array for Carousel component
  const items = React.Children.toArray(children);

  return (
    <div className={`slide-carousel ${className}`}>
      <Carousel
        items={items}
        height={height}
        scrollSpeed={0}
        gap={gap}
        pauseOnHover={false}
      />
    </div>
  );
};

export default SlideCarousel;
