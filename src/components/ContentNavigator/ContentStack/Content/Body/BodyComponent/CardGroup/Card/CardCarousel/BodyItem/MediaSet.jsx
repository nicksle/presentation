import React from 'react';
import './MediaSet.css';

/**
 * MediaSet - Horizontal layout wrapper for images and videos
 * Stacks media items horizontally with consistent spacing
 *
 * @param {React.ReactNode} children - Images or video elements to display
 * @param {string} gap - Gap between media items (default: '4px')
 * @param {string} className - Additional CSS classes
 */
const MediaSet = ({
  children,
  gap = '4px',
  className = ''
}) => {
  return (
    <div
      className={`media-set ${className}`}
      style={{ '--media-gap': gap }}
    >
      {children}
    </div>
  );
};

export default MediaSet;
