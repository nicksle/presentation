import React from 'react';
import './SectionNav.css';
import Icon from '../../../../../Icon';
import { ICON_PATHS } from '../../../../../../utils/iconPaths';

/**
 * SectionNav Component
 *
 * Reusable navigation component for displaying section title and subsection list
 * Used inside Head component
 */

const SectionNav = ({ title, items = [], onItemClick, activeItemId }) => {
  return (
    <div className="section-nav">
      {/* Title */}
      <div className="section-nav-title">
        <span className="H2">{title}</span>
      </div>

      {/* List */}
      <div className="section-nav-list">
        {items.map((item) => (
          <div
            key={item.id}
            className={`section-nav-list-item ${item.id === activeItemId ? 'active' : ''}`}
            onClick={() => onItemClick && onItemClick(item.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && onItemClick) {
                e.preventDefault();
                onItemClick(item.id);
              }
            }}
          >
            {/* Index and Icon Container */}
            <div className="section-nav-item-header">
              <span className="section-nav-item-index subtitle">{item.index}</span>
              <Icon svgPath={ICON_PATHS.eye} size="small" />
            </div>

            {/* Text */}
            <div className="section-nav-item-text">
              <span className="B2">{item.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionNav;
