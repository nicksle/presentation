import React from 'react';

const Icon = ({ 
  svgPath, 
  size = 'small', 
  className = '', 
  ...props 
}) => {
  // Size mapping
  const sizeMap = {
    small: 16,
    medium: 24,
    large: 32,
    xl: 64
  };
  
  const iconSize = sizeMap[size] || sizeMap.small;

  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d={svgPath} 
        fill="currentColor"
      />
    </svg>
  );
};

export default Icon;
