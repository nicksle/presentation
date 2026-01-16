import React from 'react';
import './CalloutItem.css';

const CalloutItem = ({ index, title, description, onCtaClick }) => {
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    }
  };

  return (
    <div className="callout-item-root">
      <div className="callout-item-index S1">{index}</div>
      <div className="callout-item-indent">
        <div className="callout-item-card-frame">
          <div className="callout-item-card-head">
            <div className="callout-item-card-content">
              <div className="callout-item-description S1">{description}</div>
            </div>
          </div>
          {onCtaClick && (
            <div className="callout-item-cta clickable" onClick={handleCtaClick}>
              <span className="callout-item-cta-text S1">Learn More</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalloutItem;
