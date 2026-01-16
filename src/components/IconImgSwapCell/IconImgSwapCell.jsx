import React, { useState, useEffect } from 'react';
import './IconImgSwapCell.css';

const IconImgSwapCell = ({ icon, image, imageAlt = '', cellId = '', className = '', onHover = null }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScaled, setIsScaled] = useState(false);

  useEffect(() => {
    let timer;
    if (isHovered) {
      timer = setTimeout(() => {
        setIsScaled(true);
      }, 1000);
    } else {
      setIsScaled(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) {
      onHover();
    }
  };

  return (
    <div
      className={`icon-img-swap-cell ${className}`}
      id={cellId}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`swap-icon ${isHovered ? 'hidden' : ''}`}>
        {icon}
      </div>
      <img
        src={image}
        alt={imageAlt}
        className={`swap-image ${isHovered ? 'visible' : ''} ${isScaled ? 'scaled' : ''}`}
      />
    </div>
  );
};

export default IconImgSwapCell;
