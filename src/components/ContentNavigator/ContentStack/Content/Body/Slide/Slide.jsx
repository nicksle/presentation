import React from 'react';
import { motion } from 'framer-motion';
import './Slide.css';

/**
 * Slide Component
 *
 * Individual slide within a subsection
 * Composed of slideHead (index + title) and slideBody (content)
 * Renders with Framer Motion animations
 */

const Slide = ({ id, index, title, content, direction = 'forward' }) => {
  // Animation variants based on direction
  const variants = {
    enter: {
      y: direction === 'forward' ? 20 : -20,
      opacity: 0
    },
    center: {
      y: 0,
      opacity: 1
    },
    exit: {
      y: direction === 'forward' ? -20 : 20,
      opacity: 0
    }
  };

  return (
    <motion.div
      key={id}
      className="slide"
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
    >
      {/* slideHead - contains index and title */}
      <div className="slide-head">
        <span className="slide-head-index subtitle">{index}</span>
        <span className="slide-head-title B1">{title}</span>
      </div>

      {/* slideBody - contains content */}
      <div className="slide-body">
        {content}
      </div>
    </motion.div>
  );
};

export default Slide;
