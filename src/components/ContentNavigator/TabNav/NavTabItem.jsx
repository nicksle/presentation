import React from 'react';
import './NavTabItem.css';
import Icon from '../../../components/Icon';
import { ICON_PATHS } from '../../../utils/iconPaths';

const S1_STYLE = {
  fontFamily: 'var(--font-family-subtitle, "SF Mono", Menlo, Monaco, Consolas, monospace)',
  fontSize: 'var(--font-size-subtitle, 14px)',
  fontWeight: 'var(--font-weight-medium, 500)',
  color: 'var(--color-tertiary, #999988)'
};

const NavTabItem = ({ 
  id, 
  isActive, 
  onClick, 
  title,
  index = ''
}) => {
  return (
    <div
      className={`nav-tab-item ${isActive ? 'active' : ''}`}
      role="tab"
      tabIndex={0}
      onClick={() => onClick(id)}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick(id)}
    >
      <div className="navtab-item-top">
        <span style={S1_STYLE}>{index}</span>
      </div>
      <div className="navtab-item-title">
        <span>{title}</span>
      </div>
      <div className="navtab-item-bottom">
        <Icon
          svgPath={isActive ? ICON_PATHS.eye : ICON_PATHS.eyeClosed}
          size="small"
          className={`navtab-eye-svg${isActive ? ' active' : ''}`}
        />
      </div>
    </div>
  );
};

export default NavTabItem; 