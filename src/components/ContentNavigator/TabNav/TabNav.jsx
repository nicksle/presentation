import React from 'react';
import './TabNav.css';

const TabNav = ({ activeId, onTabChange, children }) => {
  return (
    <nav className="tab-nav">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isActive: child.props.id === activeId,
            onClick: onTabChange
          });
        }
        return child;
      })}
    </nav>
  );
};

export default TabNav; 