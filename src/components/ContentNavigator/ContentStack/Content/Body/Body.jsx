import React, { forwardRef, useState, useEffect } from 'react';
import './Body.css';
import Section from './Section/Section';

/**
 * Body Component - Renders Section with active slides
 */

const Body = forwardRef(({ subsections, activeSubsectionId, activeSlideIndex, slideDirection, onScroll, totalSlides }, ref) => {
  // Calculate progress percentage
  const progress = totalSlides > 0 ? ((activeSlideIndex + 1) / totalSlides) * 100 : 0;
  const [displayProgress, setDisplayProgress] = useState(progress);

  // Reset to 0 and animate to current progress when subsection changes
  useEffect(() => {
    // Reset to 0
    setDisplayProgress(0);

    // After a brief moment, animate to the actual progress
    const timer = setTimeout(() => {
      setDisplayProgress(progress);
    }, 50); // Small delay to ensure reset is visible

    return () => clearTimeout(timer);
  }, [activeSubsectionId]);

  // Update progress when slide changes (without reset)
  useEffect(() => {
    setDisplayProgress(progress);
  }, [activeSlideIndex]);

  return (
    <div
      className="body"
      ref={ref}
      onScroll={onScroll}
    >
      <Section
        subsections={subsections}
        activeSubsectionId={activeSubsectionId}
        activeSlideIndex={activeSlideIndex}
        direction={slideDirection}
      />

      {/* Progress bar */}
      <div className="body-progress-container">
        <div
          className="body-progress-fill"
          style={{ height: `${displayProgress}%` }}
        />
      </div>
    </div>
  );
});

export default Body;
