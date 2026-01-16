import React from 'react';
import './CallOuts.css';

const CallOuts = ({ title, description, children }) => {
  return (
    <div className="callouts-root">
      <div className="callouts-head">
        <h2 className="callouts-title">{title}</h2>
        <p className="callouts-description">{description}</p>
      </div>
      <div className="callouts-body">
        {children}
      </div>
    </div>
  );
};

export default CallOuts;
