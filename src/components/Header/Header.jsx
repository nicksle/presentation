import React from 'react';
import './Header.css';

const Header = ({ isIntroMode = false, onWorkClick }) => {
  if (isIntroMode) {
    return (
      <header className="header intro-header">
        <div className="header-content">
          <button onClick={onWorkClick} className="header-button">
            Start Presentation →
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Presentation</h1>
      </div>
    </header>
  );
};

export default Header;
