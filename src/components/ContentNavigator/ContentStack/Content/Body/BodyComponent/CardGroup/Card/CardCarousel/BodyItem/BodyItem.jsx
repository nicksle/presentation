import React, { Children, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MediaSet from './MediaSet';
import TextSet from './TextSet';
import Annotations from './Annotations';
import './BodyItem.css';

const BodyItem = ({
  id,
  children,
  annotationItems, // Keep for backward compatibility (deprecated)
  annotationSets, // Deprecated - use MediaSet/TextSet instead
  className = ''
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold: 0.1, // Trigger when 10% of the element is visible
    once: false // Allow animation to repeat on scroll
  });

  // Helper function to render content
  // New approach: Simply render children as-is, expecting MediaSet/TextSet wrappers
  const renderContent = () => {
    const childArray = Children.toArray(children);

    // If using new MediaSet/TextSet approach, render directly
    if (childArray.length > 0 && !annotationSets) {
      return childArray;
    }

    // Legacy support: If annotationSets is provided, use old behavior
    if (annotationSets && annotationSets.length > 0) {
      const result = [];
      let childIndex = 0;

      annotationSets.forEach((annotationSet, setIndex) => {
        const { position, items } = annotationSet;

        // Add children before this annotation position
        while (childIndex < position && childIndex < childArray.length) {
          result.push(
            <div key={`child-${childIndex}`} className="body-item-child">
              {childArray[childIndex]}
            </div>
          );
          childIndex++;
        }

        // Add the annotation set
        if (items && items.length > 0) {
          result.push(
            <div key={`annotations-${setIndex}`} className="body-item-annotations">
              <Annotations annotationItems={items} />
            </div>
          );
        }
      });

      // Add any remaining children
      while (childIndex < childArray.length) {
        result.push(
          <div key={`child-${childIndex}`} className="body-item-child">
            {childArray[childIndex]}
          </div>
        );
        childIndex++;
      }

      return result;
    }

    // Fallback: Render children with default wrapper
    return childArray.map((child, index) => (
      <div key={index} className="body-item-child">
        {child}
      </div>
    ));
  };

  return (
    <motion.div
      ref={ref}
      className={`body-item ${className}`}
      data-id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="body-item-content">
        {renderContent()}
        {/* Legacy support: standalone annotationItems */}
        {!annotationSets && annotationItems && annotationItems.length > 0 && (
          <div className="body-item-annotations">
            <Annotations annotationItems={annotationItems} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BodyItem;
