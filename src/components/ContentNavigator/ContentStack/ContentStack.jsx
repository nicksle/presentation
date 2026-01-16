import React, { useState } from 'react';
import './ContentStack.css';

const ContentStack = ({ activeId, children }) => {
  // Convert children to array to get proper length
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div className="content-stack">
      {React.Children.map(childrenArray, (child, index) => {
        if (React.isValidElement(child)) {
          const isActive = child.props.id === activeId;
          
          return (
            <div className={`content-stack-wrapper stack-position-${index + 1}`}>
              {React.cloneElement(child, {
                isActive,
                id: child.props.id,
                className: `content-stack-item ${isActive ? 'active' : ''}`,
                style: {
                  width: '100%',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: isActive ? 'auto' : 'none'
                }
              })}
            </div>
          );
        }
        return child;
      })}
    </div>
  );
};

export default ContentStack; 