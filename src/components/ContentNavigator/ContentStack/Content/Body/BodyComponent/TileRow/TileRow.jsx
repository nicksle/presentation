import React from 'react';
import './TileRow.css';

const TileRow = ({ children, gap = '24px', className = '', subtitle, subtitleStyle = {} }) => {
  return (
    <div className={`tile-row ${className}`}>
      {subtitle && (
        <div className="tile-row-subtitle" style={subtitleStyle}>
          <span className="S1">{subtitle}</span>
        </div>
      )}
      <div
        className="tile-row-content"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: gap
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TileRow;
