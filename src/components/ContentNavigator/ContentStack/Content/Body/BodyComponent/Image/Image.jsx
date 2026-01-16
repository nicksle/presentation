import React from 'react';
import './Image.css';

const Image = ({ 
  src, 
  alt = '', 
  style = {} 
}) => {
  return (
    <div className="image-container">
      <img 
        src={src} 
        alt={alt} 
        className="image-component"
        style={style}
      />
    </div>
  );
};

export default Image;
