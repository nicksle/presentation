import React from 'react';
import { motion } from 'framer-motion';
import './HeadItem.css';

const HeadItem = ({ 
  id, 
  index, 
  title,
  progress = 0,
  isActive = false,
  shouldAnimate = false,
  isMenuOpen = false,
  onClick,
  className = '' 
}) => {
  const handleClick = (e) => {
    // If menu is closed and this is the active item, don't handle the click here
    // Let it bubble up to the head stack to open the menu
    if (!isMenuOpen && isActive) {
      return; // Don't stop propagation, let it bubble up
    }
    
    // For other cases, stop propagation and handle the click
    e.stopPropagation();
    
    // Handle the click if menu is open (for any item)
    if (isMenuOpen) {
      onClick?.(e);
    }
  };

  return (
    <div 
      className={`head-item ${isActive ? 'active' : ''} ${isMenuOpen ? 'menu-open' : ''} ${className}`} 
      data-id={id}
      onClick={handleClick}
      style={{ cursor: (onClick && (isActive || isMenuOpen)) ? 'pointer' : 'default' }}
    >
      <div className="head-item-top">
        <span className="head-item-index">{index}</span>
      </div>
      <h3 
        className={`head-item-title ${shouldAnimate ? 'animate' : ''}`}
        key={isActive ? 'active' : 'inactive'}
      >
        {title}
      </h3>
      <div className="head-item-progress-bar">
        <motion.div 
          className="head-item-progress-fill"
          initial={{ width: "0%" }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default HeadItem;
