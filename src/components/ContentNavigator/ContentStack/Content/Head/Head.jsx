import React from 'react';
import './Head.css';
import SectionNav from './SectionNav/SectionNav';

/**
 * Head Component - Returns SectionNav directly
 */

const Head = ({ title, subsections, onSubsectionClick, activeSubsectionId }) => {
  return (
    <SectionNav
      title={title}
      items={subsections}
      onItemClick={onSubsectionClick}
      activeItemId={activeSubsectionId}
    />
  );
};

export default Head;
