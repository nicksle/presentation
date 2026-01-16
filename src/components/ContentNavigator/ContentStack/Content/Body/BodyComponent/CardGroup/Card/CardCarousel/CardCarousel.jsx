import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { motion } from 'framer-motion';
import HeadItem from './HeadItem';
import BodyItem from './BodyItem/BodyItem';
import './CardCarousel.css';

const CardCarousel = forwardRef(({ 
  headItems = [], // Array of { id, index, title }
  bodyItems = [], // Array of { id, children }
  onCollapse, // Callback to collapse the card
  className = '' 
}, ref) => {
  const [activeHeadId, setActiveHeadId] = useState(headItems.length > 0 ? headItems[0].id : null);
  const [headProgress, setHeadProgress] = useState(() => {
    // Initialize progress for the first item to be low (partially filled)
    const initialProgress = {};
    if (headItems.length > 0) {
      initialProgress[headItems[0].id] = 0.1; // Start at 10% filled for first item
    }
    return initialProgress;
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bodyStackRef = useRef(null);
  const headStackRef = useRef(null);

  // Function to reset scroll position to the first body item
  const resetScrollToStart = () => {
    const bodyStack = bodyStackRef.current;
    if (!bodyStack || bodyItems.length === 0) return;

    // Reset scroll to the beginning
    bodyStack.scrollTo({
      left: 0,
      behavior: 'smooth'
    });

    // Reset active head to first item
    if (headItems.length > 0) {
      setActiveHeadId(headItems[0].id);
      setHeadProgress(prev => ({
        ...prev,
        [headItems[0].id]: 0.1 // Reset to initial progress
      }));
    }

    // Close menu if open
    setIsMenuOpen(false);
  };

  // Expose resetScrollToStart function through ref
  useImperativeHandle(ref, () => ({
    resetScrollToStart
  }));

  // Track which head should be active based on scroll position
  useEffect(() => {
    const bodyStack = bodyStackRef.current;
    if (!bodyStack || bodyItems.length === 0) return;

    const handleScroll = () => {
      const containerRect = bodyStack.getBoundingClientRect();
      const containerLeft = containerRect.left;
      const containerRight = containerRect.right;
      const containerWidth = containerRect.width;
      const threshold = 0.8; // 80% threshold

      let newActiveId = activeHeadId; // Start with current active
      let maxCoverage = 0;
      const newProgress = {};
      
      // First pass: determine which item should be active
      bodyItems.forEach((item) => {
        const bodyElement = bodyStack.querySelector(`[data-id="${item.id}"]`);
        if (bodyElement) {
          const elementRect = bodyElement.getBoundingClientRect();
          const elementLeft = elementRect.left;
          const elementRight = elementRect.right;
          
          // Calculate how much of this element is visible in the container
          const visibleLeft = Math.max(elementLeft, containerLeft);
          const visibleRight = Math.min(elementRight, containerRight);
          const visibleWidth = Math.max(0, visibleRight - visibleLeft);
          
          // Calculate what percentage of the container this element occupies
          const coveragePercentage = visibleWidth / containerWidth;
          
          // Determine active head (only on non-initial loads)
          if (!isInitialLoad && coveragePercentage >= threshold && coveragePercentage > maxCoverage) {
            maxCoverage = coveragePercentage;
            newActiveId = item.id;
          }
        }
      });

      // Second pass: calculate progress based on how close the NEXT item is to becoming active
      const currentIndex = bodyItems.findIndex(item => item.id === newActiveId);
      const nextItem = currentIndex < bodyItems.length - 1 ? bodyItems[currentIndex + 1] : null;
      
      bodyItems.forEach((item) => {
        const bodyElement = bodyStack.querySelector(`[data-id="${item.id}"]`);
        if (bodyElement) {
          const elementRect = bodyElement.getBoundingClientRect();
          const elementLeft = elementRect.left;
          const elementRight = elementRect.right;
          
          // Calculate how much of this element is visible in the container
          const visibleLeft = Math.max(elementLeft, containerLeft);
          const visibleRight = Math.min(elementRight, containerRight);
          const visibleWidth = Math.max(0, visibleRight - visibleLeft);
          
          // Calculate what percentage of the container this element occupies
          const coveragePercentage = visibleWidth / containerWidth;
          
          // Calculate progress for this item (0 to 1)
          // Progress represents how close the NEXT item is to becoming active
          let progress = 0;
          
          if (item.id === newActiveId) {
            // For the currently active item, show progress based on scroll past starting point
            if (nextItem) {
              // Calculate how much we've scrolled from the starting point
              // Starting point is where the head content begins (containerLeft)
              const elementWidth = elementRect.width;
              
              if (elementRight <= containerLeft) {
                // Element is completely past the starting point
                progress = 1;
              } else if (elementLeft < containerLeft && elementRight > containerLeft) {
                // Element is partially scrolled past the starting point
                const scrolledPastStart = containerLeft - elementLeft;
                const progressFromScroll = scrolledPastStart / elementWidth;
                
                // Also factor in next item approach if it's visible
                const nextElement = bodyStack.querySelector(`[data-id="${nextItem.id}"]`);
                let nextItemProgress = 0;
                if (nextElement) {
                  const nextRect = nextElement.getBoundingClientRect();
                  const nextVisibleLeft = Math.max(nextRect.left, containerLeft);
                  const nextVisibleRight = Math.min(nextRect.right, containerRight);
                  const nextVisibleWidth = Math.max(0, nextVisibleRight - nextVisibleLeft);
                  const nextCoveragePercentage = nextVisibleWidth / containerWidth;
                  nextItemProgress = Math.min(1, nextCoveragePercentage / threshold);
                }
                
                // Use the higher of scroll progress or next item progress
                progress = Math.max(progressFromScroll, nextItemProgress);
              } else {
                // Element hasn't started scrolling past the starting point yet
                // Check if next item is visible for early progress indication
                const nextElement = bodyStack.querySelector(`[data-id="${nextItem.id}"]`);
                if (nextElement) {
                  const nextRect = nextElement.getBoundingClientRect();
                  const nextVisibleLeft = Math.max(nextRect.left, containerLeft);
                  const nextVisibleRight = Math.min(nextRect.right, containerRight);
                  const nextVisibleWidth = Math.max(0, nextVisibleRight - nextVisibleLeft);
                  const nextCoveragePercentage = nextVisibleWidth / containerWidth;
                  progress = Math.min(1, nextCoveragePercentage / threshold);
                } else {
                  // No next item visible yet, start with base progress
                  progress = 0.1; // Small amount to show it's active
                }
              }
            } else {
              // No next item, show progress based on scroll only
              if (elementRight <= containerLeft) {
                progress = 1;
              } else if (elementLeft < containerLeft && elementRight > containerLeft) {
                const elementWidth = elementRect.width;
                const scrolledPastStart = containerLeft - elementLeft;
                progress = Math.min(1, scrolledPastStart / elementWidth);
              } else {
                progress = 0.1; // Small amount to show it's active
              }
            }
          } else {
            // For inactive items, show 0 progress
            progress = 0;
          }
          
          newProgress[item.id] = progress;
        }
      });

      // Always update progress
      setHeadProgress(newProgress);

      // Only update active head on non-initial loads
      if (!isInitialLoad && newActiveId && newActiveId !== activeHeadId) {
        setActiveHeadId(newActiveId);
      }
      
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    };

    bodyStack.addEventListener('scroll', handleScroll);
    // Initial check (but don't trigger animation on load)
    handleScroll();

    return () => bodyStack.removeEventListener('scroll', handleScroll);
  }, [bodyItems, activeHeadId, isInitialLoad]);

  // Handle head stack click to toggle menu
  const handleHeadStackClick = (e) => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    
    // If opening menu, scroll to active item after a brief delay to allow height animation
    if (newMenuState && activeHeadId && headStackRef.current) {
      setTimeout(() => {
        const activeItem = headStackRef.current.querySelector(`[data-id="${activeHeadId}"]`);
        const headStack = headStackRef.current;
        if (activeItem && headStack) {
          // Use manual scroll calculation instead of scrollIntoView to prevent parent scroll reset
          const containerRect = headStack.getBoundingClientRect();
          const itemRect = activeItem.getBoundingClientRect();
          const scrollTop = activeItem.offsetTop - (containerRect.height / 2) + (itemRect.height / 2);
          
          headStack.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  // Handle header click to scroll to corresponding body section
  const handleHeaderClick = (itemId, e) => {
    e.stopPropagation(); // Prevent bubbling to head stack
    
    const bodyStack = bodyStackRef.current;
    if (!bodyStack) return;

    const targetElement = bodyStack.querySelector(`[data-id="${itemId}"]`);
    if (targetElement) {
      // If menu is open and clicking an inactive item, close menu and navigate
      if (isMenuOpen && activeHeadId !== itemId) {
        setIsMenuOpen(false);
      }
      // If menu is open and clicking the active item, close menu and reset scroll to beginning
      else if (isMenuOpen && activeHeadId === itemId) {
        setIsMenuOpen(false);
        // Reset scroll to the beginning of this body section
        const containerRect = bodyStack.getBoundingClientRect();
        const elementRect = targetElement.getBoundingClientRect();
        const scrollLeft = elementRect.left - containerRect.left + bodyStack.scrollLeft;
        
        bodyStack.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
        return;
      }
      
      // Navigate to the body section (for inactive items or when menu is closed)
      const containerRect = bodyStack.getBoundingClientRect();
      const elementRect = targetElement.getBoundingClientRect();
      const scrollLeft = elementRect.left - containerRect.left + bodyStack.scrollLeft;
      
      bodyStack.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Don't render anything if there are no items
  if (headItems.length === 0 && bodyItems.length === 0) {
    return <div className={`card-carousel ${className}`}></div>;
  }

  return (
    <div className={`card-carousel ${className}`}>
      {/* Head Stack - Stacked on Z-axis */}
      {headItems.length > 0 && (
        <div 
          ref={headStackRef}
          className={`card-carousel-head-stack ${isMenuOpen ? 'menu-open' : ''}`}
          onClick={handleHeadStackClick}
          style={{
            '--head-item-count': headItems.length
          }}
        >
          {headItems.map((item, index) => (
            <HeadItem
              key={item.id || index}
              id={item.id}
              index={item.index}
              title={item.title}
              progress={headProgress[item.id] || 0}
              isActive={activeHeadId === item.id}
              shouldAnimate={!isInitialLoad}
              isMenuOpen={isMenuOpen}
              onClick={(e) => handleHeaderClick(item.id, e)}
            />
          ))}
        </div>
      )}
      
      {/* Body Stack - Scrollable */}
      {bodyItems.length > 0 && (
        <div className="card-carousel-body-stack" ref={bodyStackRef}>
          {bodyItems.map((item, index) => (
            <BodyItem
              key={item.id || index}
              id={item.id}
              annotationItems={item.annotationItems}
              annotationSets={item.annotationSets}
            >
              {item.children}
            </BodyItem>
          ))}
          {/* Collapse Button */}
          {onCollapse && (
            <div className="card-carousel-collapse-button">
              <button 
                className="collapse-btn"
                onClick={onCollapse}
                aria-label="Collapse card"
              >
                <span className="collapse-btn-text">Collapse</span>
                <div className="collapse-btn-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

CardCarousel.displayName = 'CardCarousel';

export default CardCarousel;
