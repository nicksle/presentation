import React from 'react';
import './CalloutItem.css';

const CalloutItem = ({ 
  index,
  content,
  className = ''
}) => {
  return (
    <div className={`callout-item ${className}`}>
      <div className="callout-item-index subtitle">{index}</div>
      <div className="callout-item-frame">
        <div className="callout-item-content subtitle">
          {content}
        </div>
      </div>
    </div>
  );
};

export default CalloutItem;
