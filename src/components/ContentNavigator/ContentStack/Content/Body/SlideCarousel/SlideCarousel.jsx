import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SlideCarousel.css';
import Icon from '../../../../../Icon';
import { ICON_PATHS } from '../../../../../../utils/iconPaths';

/**
 * SlideCarousel Component
 *
 * Slideshow-style carousel that displays one slide at a time
 * Navigation arrows switch between slides with sliding animation
 */

const SlideCarousel = ({
  children,
  className = ''
}) => {
  const items = React.Children.toArray(children);
  const totalItems = items.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex(i => Math.max(0, i - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex(i => Math.min(totalItems - 1, i + 1));
  };

  const showLeftArrow = currentIndex > 0;
  const showRightArrow = currentIndex < totalItems - 1;

  // Animation variants
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  return (
    <div className={`slide-carousel ${className}`}>
      {showLeftArrow && (
        <button className="slide-carousel-nav slide-carousel-nav-left" onClick={goToPrev}>
          <Icon svgPath={ICON_PATHS.arrowLeft} size={24} />
        </button>
      )}

      <div className="slide-carousel-content">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="slide-carousel-slide"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {showRightArrow && (
        <button className="slide-carousel-nav slide-carousel-nav-right" onClick={goToNext}>
          <Icon svgPath={ICON_PATHS.arrowRight} size={24} />
        </button>
      )}
    </div>
  );
};

export default SlideCarousel;
