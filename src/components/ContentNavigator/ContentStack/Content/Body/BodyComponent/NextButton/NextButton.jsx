import React from 'react';
import './NextButton.css';
import Icon from '../../../../../../../components/Icon';
import { ICON_PATHS } from '../../../../../../../utils/iconPaths';

const NextButton = ({
  onClick,
  isVisible = true,
  className = '',
  style = {}
}) => {
  if (!isVisible) return null;

  return (
    <div className={`next-button-container ${className}`} style={style}>
      <button
        className="next-button"
        onClick={onClick}
      >
        <span className="next-button-text">Next Section</span>
        <Icon
          svgPath={ICON_PATHS.arrowRight}
          size="small"
          className="next-button-icon"
        />
      </button>
    </div>
  );
};

export default NextButton;
