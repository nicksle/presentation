import React from 'react';
import './BodyComponent.css';

const BodyComponent = ({ 
  children, 
  rows = 1, // Default to 1 row
  style = {} 
}) => {
  return (
    <div 
      className="body-component" 
      style={{
        ...style,
        gridTemplateRows: `repeat(${rows}, auto)`,
      }}
    >
      {children}
    </div>
  );
};

export default BodyComponent;
