import React from 'react';
import './Callout.css';

const Callout = ({ title, children }) => {
  return (
    <div className="callout-root">
      <div className="callout-head">
        <h2 className="callout-title">{title}</h2>
      </div>
      <div className="callout-body">
        {children}
      </div>
    </div>
  );
};

export default Callout;
