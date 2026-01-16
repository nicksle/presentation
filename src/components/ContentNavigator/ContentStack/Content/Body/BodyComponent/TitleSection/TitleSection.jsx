import React from 'react';
import './TitleSection.css';

const TitleSection = ({ title, children }) => {
  return (
    <div className="title-section">
      <div className="title-section-head">
        <h2 className="title-section-title">{title}</h2>
      </div>
      <div className="title-section-body">
        {children}
      </div>
    </div>
  );
};

export default TitleSection;
