import React, { useState, useRef, useEffect } from 'react';
import './Carousel.css';

/**
 * Carousel - Auto-scrolling horizontal carousel with manual scroll support
 *
 * @param {Array} items - Array of React elements to display
 * @param {string} height - Container height (default: '400px')
 * @param {number} scrollSpeed - Pixels per interval for auto-scroll (default: 1)
 * @param {number} gap - Gap between items in px (default: 4)
 * @param {boolean} pauseOnHover - Pause auto-scroll on hover (default: true)
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} insertAfterIndex - Element to insert directly into carousel-scroll after the specified item index
 */
const Carousel = ({
  items = [],
  height = '400px',
  scrollSpeed = 1,
  gap = 4,
  pauseOnHover = true,
  className = '',
  insertAfterIndex = null,
  insertElement = null
}) => {
  const carouselScrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll carousel
  useEffect(() => {
    if (!carouselScrollRef.current || (pauseOnHover && isHovered)) return;

    const container = carouselScrollRef.current;
    const intervalTime = 40; // ms (~25fps)

    const interval = setInterval(() => {
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll) {
        clearInterval(interval); // Stop when last item is visible
      } else {
        container.scrollLeft += scrollSpeed;
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isHovered, scrollSpeed, pauseOnHover]);

  return (
    <div className={`carousel ${className}`} style={{ height }}>
      <div
        className="carousel-scroll"
        ref={carouselScrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ gap: `${gap}px` }}
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div className="carousel-item">
              {item}
            </div>
            {insertAfterIndex === index && insertElement}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
