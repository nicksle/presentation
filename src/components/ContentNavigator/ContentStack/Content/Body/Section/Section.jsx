import React from 'react';
import { AnimatePresence } from 'framer-motion';
import './Section.css';
import Slide from '../Slide/Slide';

/**
 * Section Component
 *
 * Container for subsection slides
 * Manages slide display and animations
 */

const Section = ({ subsections, activeSubsectionId, activeSlideIndex, direction }) => {
  // Find the active subsection
  const activeSubsection = subsections?.find(sub => sub.id === activeSubsectionId);

  // Get the active slide from the active subsection
  const activeSlide = activeSubsection?.slides?.[activeSlideIndex];

  if (!activeSlide) {
    return <div className="section section-empty">No content available</div>;
  }

  return (
    <div className="section">
      <AnimatePresence mode="wait">
        <Slide
          key={`${activeSubsectionId}-${activeSlideIndex}`}
          id={`${activeSubsectionId}-${activeSlideIndex}`}
          index={activeSlide.index}
          title={activeSlide.title}
          content={activeSlide.content}
          direction={direction}
        />
      </AnimatePresence>
    </div>
  );
};

export default Section;
