import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './IntroAnimation.css';
import Header from '../../Header/Header';
import Intro1 from './Intro1/Intro1';
import Intro2 from '../../Intro2/Intro2';

const IntroAnimation = () => {
  const navigate = useNavigate();
  const [animationPhase, setAnimationPhase] = useState('initial');
  const [hasExpandedX, setHasExpandedX] = useState(false);
  // Phases: 'initial' | 'expandX' | 'expandY' | 'intro1' | 'intro2' | 'navigating'

  // Handle logo cell hover - triggers horizontal expansion
  const handleLogoHover = () => {
    if (!hasExpandedX && animationPhase === 'initial') {
      setHasExpandedX(true);
      setAnimationPhase('expandX');
    }
  };

  // Auto-trigger vertical expansion after horizontal expansion
  useEffect(() => {
    if (animationPhase === 'expandX') {
      // After horizontal expansion completes, trigger vertical
      const timer = setTimeout(() => {
        setAnimationPhase('expandY');
      }, 900); // 600ms expandX animation + 300ms delay

      return () => clearTimeout(timer);
    }
  }, [animationPhase]);

  // Auto-trigger intro1 phase after vertical expansion
  useEffect(() => {
    if (animationPhase === 'expandY') {
      // After vertical expansion completes, set to intro1
      const timer = setTimeout(() => {
        setAnimationPhase('intro1');
      }, 600); // 600ms expandY animation

      return () => clearTimeout(timer);
    }
  }, [animationPhase]);

  const scrollToIntro2 = () => {
    setAnimationPhase('intro2');
  };

  const scrollToIntro1 = () => {
    setAnimationPhase('intro1');
  };

  const navigateToWork = () => {
    setAnimationPhase('navigating');

    // Timeline:
    // 0.0s - 0.8s: ViewContainer translates out of view
    // 0.8s: Navigate to /presentation

    setTimeout(() => {
      navigate('/presentation');
    }, 800); // Navigate after translate completes
  };

  // Calculate ViewContainer dimensions based on phase
  const getContainerDimensions = () => {
    switch (animationPhase) {
      case 'initial':
        return { width: 450, height: 150 }; // SVG cell only (3 cells × 1 row)
      case 'expandX':
        return { width: 1200, height: 150 }; // Full width, still 1 row
      case 'expandY':
      case 'intro1':
        return { width: 1200, height: 600 }; // Full Intro1
      case 'intro2':
        return { width: 1200, height: 664 }; // Intro2 + Header
      case 'navigating':
        return { width: 1200, height: 664 }; // Maintain size while exiting
      default:
        return { width: 450, height: 150 };
    }
  };

  const dimensions = getContainerDimensions();

  return (
    <div className="intro-animation">
      <motion.div
        className={`view-container ${animationPhase === 'navigating' ? 'exiting' : ''}`}
        animate={{
          width: dimensions.width,
          height: dimensions.height
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="intro-content"
          animate={{
            translateY: animationPhase === 'intro1' || animationPhase === 'expandY' || animationPhase === 'expandX' || animationPhase === 'initial' ? 0 : animationPhase === 'intro2' ? -600 : -1200
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut"
          }}
        >
          {/* Intro1 Section */}
          <Intro1 onNext={scrollToIntro2} onLogoHover={handleLogoHover} />

          {/* Intro2 Section */}
          <Intro2 onPrev={scrollToIntro1} />

          {/* Header Section */}
          <Header
            isIntroMode={true}
            onWorkClick={navigateToWork}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntroAnimation;
