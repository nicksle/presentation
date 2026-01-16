import React from 'react';
import { motion } from 'framer-motion';
import './LayeredLogo.css';

const LayeredLogo = ({
  size = 'medium',
  width,
  className = '',
  ...props
}) => {
  // Size mapping - maintains 88:56 aspect ratio (1.571428571428571)
  const sizeMap = {
    small: { width: 44, height: 28 },      // Half size
    medium: { width: 88, height: 56 },     // Original
    large: { width: 132, height: 84 },     // 1.5x
    xl: { width: 176, height: 112 }        // Double size
  };

  // Calculate dimensions
  let dimensions;
  let svgWidth, svgHeight;
  const isNumericWidth = width && typeof width === 'number';

  if (width) {
    // Custom width provided - calculate height maintaining aspect ratio
    const aspectRatio = 88 / 56; // 1.571428571428571

    if (isNumericWidth) {
      dimensions = {
        width: width,
        height: width / aspectRatio
      };
      svgWidth = width;
      svgHeight = width / aspectRatio;
    } else {
      // String value (like "100%") - use as-is, aspect ratio maintained by viewBox
      dimensions = {
        width: width,
        height: 'auto'
      };
      svgWidth = '100%';
      svgHeight = '100%';
    }
  } else {
    // Use size mapping
    dimensions = sizeMap[size] || sizeMap.medium;
    svgWidth = dimensions.width;
    svgHeight = dimensions.height;
  }

  return (
    <div
      className={`layered-logo ${className}`}
      style={{
        width: typeof dimensions.width === 'number' ? `${dimensions.width}px` : dimensions.width,
        height: typeof dimensions.height === 'number' ? `${dimensions.height}px` : dimensions.height,
        position: 'relative'
      }}
      {...props}
    >
      {/* Layer 1: Base - White rounded rectangle */}
      <motion.svg
        className="logo-layer layer-base"
        width={svgWidth}
        height={svgHeight}
        viewBox="0 0 88 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="88" height="56" rx="28" fill="currentColor"/>
      </motion.svg>

      {/* Layer 2: Outline - Black infinity border */}
      <motion.svg
        className="logo-layer layer-outline"
        width={typeof svgWidth === 'number' ? svgWidth * 0.9091 : svgWidth}
        height={typeof svgHeight === 'number' ? svgHeight * 0.8571 : svgHeight}
        viewBox="0 0 80 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1_2406_624" fill="white">
          <path d="M56 0C69.2548 0 80 10.7452 80 24C80 37.2548 69.2548 48 56 48C49.917 48 44.3636 45.7358 40.1338 42.0056C40.0574 41.9382 39.9426 41.9382 39.8662 42.0056C35.6364 45.7358 30.083 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C30.0828 0 35.6364 2.26353 39.8662 5.99342C39.9426 6.06082 40.0574 6.06082 40.1338 5.99342C44.3636 2.26353 49.9172 0 56 0Z"/>
        </mask>
        <path
          d="M39.8662 5.99342L42.5118 2.99327L39.8662 5.99342ZM40.1338 5.99342L37.4882 2.99327L40.1338 5.99342ZM40.1338 42.0056L37.4881 45.0057L40.1338 42.0056ZM39.8662 42.0056L42.5119 45.0057L39.8662 42.0056ZM56 0V4C67.0457 4 76 12.9543 76 24H80H84C84 8.53603 71.464 -4 56 -4V0ZM80 24H76C76 35.0457 67.0457 44 56 44V48V52C71.464 52 84 39.464 84 24H80ZM56 48V44C50.9288 44 46.3073 42.1166 42.7795 39.0055L40.1338 42.0056L37.4881 45.0057C42.42 49.3549 48.9052 52 56 52V48ZM39.8662 42.0056L37.2205 39.0055C33.6927 42.1166 29.0712 44 24 44V48V52C31.0948 52 37.58 49.3549 42.5119 45.0057L39.8662 42.0056ZM24 48V44C12.9543 44 4 35.0457 4 24H0H-4C-4 39.464 8.53603 52 24 52V48ZM0 24H4C4 12.9543 12.9543 4 24 4V0V-4C8.53603 -4 -4 8.53603 -4 24H0ZM24 0V4C29.0713 4 33.6931 5.88294 37.2206 8.99356L39.8662 5.99342L42.5118 2.99327C37.5797 -1.35589 31.0942 -4 24 -4V0ZM40.1338 5.99342L42.7794 8.99356C46.3069 5.88294 50.9287 4 56 4V0V-4C48.9058 -4 42.4203 -1.35589 37.4882 2.99327L40.1338 5.99342ZM39.8662 5.99342L37.2206 8.99356C38.8088 10.3941 41.1912 10.3941 42.7794 8.99356L40.1338 5.99342L37.4882 2.99327C38.9236 1.72754 41.0764 1.72753 42.5118 2.99327L39.8662 5.99342ZM40.1338 42.0056L42.7795 39.0055C41.1912 37.6049 38.8088 37.6049 37.2205 39.0055L39.8662 42.0056L42.5119 45.0057C41.0765 46.2715 38.9236 46.2715 37.4881 45.0057L40.1338 42.0056Z"
          fill="currentColor"
          mask="url(#path-1-inside-1_2406_624)"
        />
      </motion.svg>

      {/* Layer 3: Face 1 - White face with black features (smile) */}
      <motion.svg
        className="logo-layer layer-face-1"
        width={typeof svgWidth === 'number' ? svgWidth * 0.3636 : svgWidth}
        height={typeof svgHeight === 'number' ? svgHeight * 0.5714 : svgHeight}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="16" fill="currentColor" className="face-1-bg"/>
        <circle cx="10" cy="10" r="2" fill="currentColor" className="face-1-features"/>
        <circle cx="22" cy="10" r="2" fill="currentColor" className="face-1-features"/>
        <path d="M10 24C10 20.6863 12.6863 18 16 18C19.3137 18 22 20.6863 22 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="face-1-features"/>
      </motion.svg>

      {/* Layer 4: Face 2 - Black face with white features (frown) */}
      <motion.svg
        className="logo-layer layer-face-2"
        width={typeof svgWidth === 'number' ? svgWidth * 0.3636 : svgWidth}
        height={typeof svgHeight === 'number' ? svgHeight * 0.5714 : svgHeight}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="16" fill="currentColor" className="face-2-bg"/>
        <circle cx="10" cy="10" r="2" fill="currentColor" className="face-2-features"/>
        <circle cx="22" cy="10" r="2" fill="currentColor" className="face-2-features"/>
        <path d="M22 18C22 21.3137 19.3137 24 16 24C12.6863 24 10 21.3137 10 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="face-2-features"/>
      </motion.svg>
    </div>
  );
};

export default LayeredLogo;
