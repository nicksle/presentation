import React, { Children } from 'react';
import Annotations from './Annotations';
import './TextSet.css';

/**
 * TextSet - Vertical layout wrapper for text and annotations
 * Stacks text/annotation items vertically
 *
 * @param {React.ReactNode} children - Text elements or Annotations components
 * @param {Array} annotationItems - Array of annotation objects (alternative to children)
 * @param {string} text - Optional context text to display above annotations
 * @param {string} gap - Gap between text items (default: '12px')
 * @param {string} className - Additional CSS classes
 */
const TextSet = ({
  children,
  annotationItems,
  text,
  gap = '12px',
  className = ''
}) => {
  // If annotationItems are provided, render as Annotations component
  if (annotationItems && annotationItems.length > 0) {
    return (
      <div
        className={`text-set ${className}`}
        style={{ '--text-gap': gap }}
      >
        {text && <p className="text-set-context">{text}</p>}
        <Annotations annotationItems={annotationItems} />
      </div>
    );
  }

  // Otherwise, render children directly
  const childArray = Children.toArray(children);

  return (
    <div
      className={`text-set ${className}`}
      style={{ '--text-gap': gap }}
    >
      {text && <p className="text-set-context">{text}</p>}
      {childArray}
    </div>
  );
};

export default TextSet;
