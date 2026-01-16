import React, { useState, cloneElement } from 'react';
import { LayoutGroup, motion } from 'framer-motion';

/**
 * CardPair - Manages a pair of cards with coordinated positioning
 * When the second card expands, the first card slides left so the second card
 * appears at the original position of the first card
 */
const CardPair = ({ children, className = '' }) => {
  const [expandedIndex, setExpandedIndex] = useState(null); // 0 | 1 | null

  const childrenArray = React.Children.toArray(children);
  
  // Calculate translateX for cards when second card expands
  // 540px (card width) + 24px (gap) = -564px
  const firstCardX = expandedIndex === 1 ? -564 : 0;
  const secondCardX = expandedIndex === 1 ? -564 : 0;

  return (
    <LayoutGroup>
      <div className={`card-group ${className}`}>
        {childrenArray.map((child, index) => {
          if (index === 0) {
            // First card - slides off-screen left when second card expands
            return (
              <motion.div
                key={index}
                animate={{ x: firstCardX }}
                transition={{ 
                  x: { duration: 0.4, ease: "easeInOut" }
                }}
                style={{ display: 'inline-block', willChange: 'transform' }}
              >
                {cloneElement(child, {
                  onExpandChange: (isExpanded) => setExpandedIndex(isExpanded ? 0 : null)
                })}
              </motion.div>
            );
          } else {
            // Second card - slides left to align with BodyComponent left edge
            return (
              <motion.div
                key={index}
                animate={{ x: secondCardX }}
                transition={{ 
                  x: { duration: 0.4, ease: "easeInOut" }
                }}
                style={{ display: 'inline-block', willChange: 'transform' }}
              >
                {cloneElement(child, {
                  onExpandChange: (isExpanded) => setExpandedIndex(isExpanded ? 1 : null)
                })}
              </motion.div>
            );
          }
        })}
      </div>
    </LayoutGroup>
  );
};

export default CardPair;

