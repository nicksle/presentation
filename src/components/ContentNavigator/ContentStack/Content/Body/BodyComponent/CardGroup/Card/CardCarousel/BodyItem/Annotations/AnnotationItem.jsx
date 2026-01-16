import React from 'react';
import './AnnotationItem.css';

const AnnotationItem = ({ 
  index,
  title,
  description,
  className = '' 
}) => {
  return (
    <div className={`annotation-item ${className}`}>
      <span className="annotation-index">{index}</span>
      <div className="annotation-content">
        <div className="annotation-frame">
          <h4 className="annotation-title">{title}</h4>
          <p className="annotation-description" dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
      </div>
    </div>
  );
};

export default AnnotationItem;
