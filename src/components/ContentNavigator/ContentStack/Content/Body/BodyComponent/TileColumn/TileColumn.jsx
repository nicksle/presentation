import React from 'react';
import './TileColumn.css';

const TileColumn = ({ children, gap = '16px', className = '', subtitle, subtitleStyle = {} }) => {
  return (
    <div className={`tile-column ${className}`}>
      {subtitle && (
        <div className="tile-column-subtitle" style={subtitleStyle}>
          <span className="S1">{subtitle}</span>
        </div>
      )}
      <div 
        className="tile-column-content"
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: gap 
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TileColumn; 