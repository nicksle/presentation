import React from 'react';
import AnnotationItem from './AnnotationItem';
import './Annotations.css';

const Annotations = ({ 
  annotationItems = [], // Array of { id, index, title, description }
  className = '' 
}) => {
  if (!annotationItems || annotationItems.length === 0) {
    return null;
  }

  return (
    <div className={`annotations ${className}`}>
      {annotationItems.map((item, index) => (
        <AnnotationItem
          key={item.id || index}
          index={item.index}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default Annotations;
