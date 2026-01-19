import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TabPanel.css';

/**
 * TabPanel Component
 *
 * Two-column layout with left navigation and right content area
 * - Left: List-style navigation items (30%)
 * - Right: Dynamic content area with animations (70%)
 */

const TabPanel = ({ items = [], defaultActiveId, className = '' }) => {
  const [activeId, setActiveId] = useState(defaultActiveId || items[0]?.id);

  // Find the active item
  const activeItem = items.find(item => item.id === activeId);

  const handleItemClick = (id) => {
    setActiveId(id);
  };

  // Animation variants for content transitions
  const contentVariants = {
    enter: {
      y: 10,
      opacity: 0
    },
    center: {
      y: 0,
      opacity: 1
    },
    exit: {
      y: -10,
      opacity: 0
    }
  };

  return (
    <div className={`tab-panel ${className}`}>
      {/* Left Navigation */}
      <div className="tab-panel-nav">
        <div className="tab-panel-nav-list">
          {items.map((item) => (
            <div
              key={item.id}
              className={`tab-panel-nav-item ${item.id === activeId ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleItemClick(item.id);
                }
              }}
            >
              <div className="tab-panel-nav-item-header">
                <span className="tab-panel-nav-item-index subtitle">{item.index}</span>
              </div>
              <div className="tab-panel-nav-item-text">
                <span className="B2">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="tab-panel-content">
        <AnimatePresence mode="wait">
          {activeItem && (
            <motion.div
              key={activeId}
              className="tab-panel-content-inner"
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                y: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              {activeItem.content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TabPanel;
