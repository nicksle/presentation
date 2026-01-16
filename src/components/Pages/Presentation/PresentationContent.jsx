import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CaseStudy.css';
import './PresentationLayout.css';
import ContentNavigator from '../../ContentNavigator/ContentNavigator';
import Head from '../../ContentNavigator/ContentStack/Content/Head/Head';
import Body from '../../ContentNavigator/ContentStack/Content/Body/Body';
import TabNav from '../../ContentNavigator/TabNav/TabNav';
import NavTabItem from '../../ContentNavigator/TabNav/NavTabItem';
import BodyComponent from '../../ContentNavigator/ContentStack/Content/Body/BodyComponent/BodyComponent';
import Text from '../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Text/Text';
import Image from '../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Image/Image';
import Tile from '../../ContentNavigator/ContentStack/Content/Body/BodyComponent/Tile/Tile';
import Carousel from '../../Carousel/Carousel';
import SlideCarousel from '../../ContentNavigator/ContentStack/Content/Body/SlideCarousel/SlideCarousel';
import CarouselItem from '../../ContentNavigator/ContentStack/Content/Body/SlideCarousel/CarouselItem/CarouselItem';
import TemplateMedia from '../../shared/TemplateMedia/TemplateMedia';
import Impact from '../../shared/Impact';
import Icon from '../../Icon';
import { ICON_PATHS } from '../../../utils/iconPaths';

// Shared media assets for placeholders
import SharedVideo from '../../../assets/TANDA/Shared/01.mov';
import SharedImage01 from '../../../assets/TANDA/Shared/01.png';
import SharedImage02 from '../../../assets/TANDA/Shared/02.png';
import SharedImage03 from '../../../assets/TANDA/Shared/03.png';

const PresentationContent = () => {
  const [activeContentId, setActiveContentId] = useState('section1');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextContentId, setNextContentId] = useState(null);
  const [contentHeight, setContentHeight] = useState(152); // Start at collapsed height for initial animation
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load animation
  const [headOpacity, setHeadOpacity] = useState(1);
  const [activeSubsectionId, setActiveSubsectionId] = useState('what-is-tanda'); // Track active subsection
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // Track active slide within subsection
  const [slideDirection, setSlideDirection] = useState('forward'); // Track slide transition direction
  const [scrollDelta, setScrollDelta] = useState(0); // Track cumulative scroll for slide navigation
  const presentationContentRef = useRef(null);
  const contentNavRef = useRef(null);
  const contentScrollRef = useRef(null);
  const bodyRef = useRef(null);

  // Scroll to content navigator
  const handleScrollToContent = () => {
    if (contentNavRef.current) {
      contentNavRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle initial load expansion animation
  useEffect(() => {
    // Trigger expansion after a short delay
    const timer = setTimeout(() => {
      console.log(`🔼 Content expansion started at ${Date.now()}`);
      setContentHeight(757);
      // Mark initial load complete after animation finishes
      setTimeout(() => {
        console.log(`✅ Content expansion completed at ${Date.now()}`);
        setIsInitialLoad(false);
      }, 400); // Match animation duration
    }, 200); // Delay before starting expansion

    return () => clearTimeout(timer);
  }, []); // Only run once on mount

  // Handle content transition with animation
  const transitionToContent = (newId) => {
    if (newId === activeContentId || isTransitioning) return;

    setIsTransitioning(true);
    setNextContentId(newId);
    setContentHeight(152); // Collapse to 152px

    // After collapse animation completes, switch content
    setTimeout(() => {
      setActiveContentId(newId);
      setNextContentId(null);

      // Reset to first subsection of the new content
      const firstSubsection = contentRegistry[newId]?.subsections?.[0];
      if (firstSubsection) {
        setActiveSubsectionId(firstSubsection.id);
        setActiveSlideIndex(0);
        setSlideDirection('forward');
        setScrollDelta(0); // Reset scroll delta when changing content
      }

      // Reset scroll position to top when changing content
      if (contentScrollRef.current) {
        contentScrollRef.current.scrollTop = 0;
      }

      // Reset head opacity
      setHeadOpacity(1);

      // Wait for pause (150ms) + head animation (400ms) before expanding
      setTimeout(() => {
        console.log(`🔼 Starting expansion after head animation`);
        // Expand to full height
        setContentHeight(757);

        // End transition after expand animation
        setTimeout(() => {
          setIsTransitioning(false);
        }, 400); // Match expand animation duration
      }, 550); // 150ms pause + 400ms head animation
    }, 400); // Match collapse animation duration
  };

  // Handle content scroll for head fade effect
  const handleContentScroll = (e) => {
    if (!contentScrollRef.current) return;

    const scrollTop = e.target.scrollTop;
    // Calculate opacity based on scroll position
    // Stay at full opacity for first 24px, then start fading from 24-98px
    const opacity = scrollTop <= 24
      ? 1
      : Math.max(0, Math.min(1, 1 - ((scrollTop - 24) / 74)));
    setHeadOpacity(opacity);
  };

  // Handle tab changes
  const handleTabChange = (id) => {
    console.log('Tab changed to:', id);
    transitionToContent(id);
  };

  const handleNextContent = () => {
    const contentIds = Object.keys(contentRegistry);
    const currentIndex = contentIds.indexOf(activeContentId);
    if (currentIndex < contentIds.length - 1) {
      transitionToContent(contentIds[currentIndex + 1]);
    }
  };

  const handleBackContent = () => {
    const contentIds = Object.keys(contentRegistry);
    const currentIndex = contentIds.indexOf(activeContentId);
    if (currentIndex > 0) {
      transitionToContent(contentIds[currentIndex - 1]);
    }
  };

  const handleScrollToTop = () => {
    // Scroll the body to top
    const body = document.querySelector('.body');
    if (body) {
      body.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleSubsectionClick = (subsectionId) => {
    // Handle subsection navigation
    console.log('Subsection clicked:', subsectionId);

    // Set the active subsection and reset to first slide
    setActiveSubsectionId(subsectionId);
    setActiveSlideIndex(0);
    setSlideDirection('forward');
    setScrollDelta(0); // Reset scroll delta when changing subsections
  };

  // Handle slide navigation via scroll
  const handleSlideNavigation = (e) => {
    e.preventDefault();

    const delta = e.deltaY;
    const newScrollDelta = scrollDelta + delta;
    const threshold = 500; // Scroll threshold in pixels (further increased for less sensitivity)

    // Get all subsections and find current one
    const subsections = contentRegistry[activeContentId]?.subsections || [];
    const currentSubsectionIndex = subsections.findIndex(sub => sub.id === activeSubsectionId);
    const activeSubsection = subsections[currentSubsectionIndex];
    const totalSlides = activeSubsection?.slides?.length || 0;

    // Check if we've reached the threshold
    if (Math.abs(newScrollDelta) >= threshold) {
      if (newScrollDelta > 0) {
        // Scrolling down - next slide or next subsection
        if (activeSlideIndex < totalSlides - 1) {
          // Move to next slide in current subsection
          setActiveSlideIndex(activeSlideIndex + 1);
          setSlideDirection('forward');
          setScrollDelta(0);
        } else if (currentSubsectionIndex < subsections.length - 1) {
          // At last slide, move to first slide of next subsection
          const nextSubsection = subsections[currentSubsectionIndex + 1];
          setActiveSubsectionId(nextSubsection.id);
          setActiveSlideIndex(0);
          setSlideDirection('forward');
          setScrollDelta(0);
        }
      } else {
        // Scrolling up - previous slide or previous subsection
        if (activeSlideIndex > 0) {
          // Move to previous slide in current subsection
          setActiveSlideIndex(activeSlideIndex - 1);
          setSlideDirection('backward');
          setScrollDelta(0);
        } else if (currentSubsectionIndex > 0) {
          // At first slide, move to last slide of previous subsection
          const prevSubsection = subsections[currentSubsectionIndex - 1];
          const lastSlideIndex = (prevSubsection?.slides?.length || 1) - 1;
          setActiveSubsectionId(prevSubsection.id);
          setActiveSlideIndex(lastSlideIndex);
          setSlideDirection('backward');
          setScrollDelta(0);
        }
      }
    } else {
      setScrollDelta(newScrollDelta);
    }
  };

  // Check if we're at the last section to hide the next button
  const isLastSection = () => {
    const contentIds = Object.keys(contentRegistry);
    const currentIndex = contentIds.indexOf(activeContentId);
    return currentIndex >= contentIds.length - 1;
  };

  // Check if we're at the first section to hide the back button
  const isFirstSection = () => {
    const contentIds = Object.keys(contentRegistry);
    return contentIds[0] === activeContentId;
  };

  // Get current and next content indices for button display
  const getCurrentContentIndex = () => {
    return contentRegistry[activeContentId]?.index || null;
  };

  const getNextContentIndex = () => {
    const contentIds = Object.keys(contentRegistry);
    const currentIndex = contentIds.indexOf(activeContentId);
    if (currentIndex < contentIds.length - 1) {
      const nextId = contentIds[currentIndex + 1];
      return contentRegistry[nextId]?.index || null;
    }
    return null;
  };

  const getPreviousContentIndex = () => {
    const contentIds = Object.keys(contentRegistry);
    const currentIndex = contentIds.indexOf(activeContentId);
    if (currentIndex > 0) {
      const previousId = contentIds[currentIndex - 1];
      return contentRegistry[previousId]?.index || null;
    }
    return null;
  };

  // Content Registry - ID-based system for managing tab content
  const contentRegistry = {
    section1: {
      id: "section1",
      index: "01",
      title: "Context",
      subtitle: "Setting the Stage",
      icon1: <Icon svgPath={ICON_PATHS.solidIso} size="xl" />,
      icon2: <Icon svgPath={ICON_PATHS.arrowDown} size="small" />,
      period: "",
      subsections: [
        {
          id: 'what-is-tanda',
          index: '01',
          text: 'What is TANDA?',
          slides: [
            {
              id: 'what-is-tanda-1',
              index: '01',
              title: 'What is TANDA?',
              content: (
                <BodyComponent key="what-is-tanda-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="What is TANDA?" style="B1">
                    TANDA information goes here.
                  </Text>
                </BodyComponent>
              )
            },
            {
              id: 'what-is-tanda-2',
              index: '02',
              title: 'TANDA Details',
              content: (
                <BodyComponent key="what-is-tanda-2" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="What is TANDA? - Slide 2" style="B1">
                    More details about TANDA.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        },
        {
          id: 'the-team',
          index: '02',
          text: 'The Team',
          slides: [
            {
              id: 'the-team-1',
              index: '01',
              title: 'The Team',
              content: (
                <SlideCarousel key="the-team-1" height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Team member 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Team member 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Team member 3" />
                  </CarouselItem>
                </SlideCarousel>
              )
            },
            {
              id: 'the-team-2',
              index: '02',
              title: 'My Role',
              content: (
                <BodyComponent key="the-team-2" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="My Role" style="B1">
                    My role information goes here.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        }
      ],
      bodyItems: [
        <BodyComponent key="section1-text" style={{ gridTemplateColumns: '1fr' }}>
          <Text
            subtitle="Welcome"
            style="B1"
          >
            This is the context section of your presentation. Add your content here.
          </Text>
        </BodyComponent>,
      ]
    },
    section2: {
      id: "section2",
      index: "02",
      title: "The Challenge",
      subtitle: "Defining the Problem",
      icon1: <Icon svgPath={ICON_PATHS.solidIso} size="xl" />,
      icon2: <Icon svgPath={ICON_PATHS.arrowDown} size="small" />,
      period: "",
      subsections: [
        {
          id: 'problem',
          index: '01',
          text: 'Problem Statement',
          slides: [
            {
              id: 'problem-1',
              index: '01',
              title: 'Core Problem Statement',
              content: (
                <BodyComponent key="problem-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Problem Statement" style="B1">
                    Defining the core problem we're solving.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        },
        {
          id: 'business-goals',
          index: '02',
          text: 'Business Goals',
          slides: [
            {
              id: 'business-goals-1',
              index: '01',
              title: 'Business Goals',
              content: (
                <BodyComponent key="business-goals-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Business Goals" style="B1">
                    Understanding the business objectives.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        },
        {
          id: 'user-goals',
          index: '03',
          text: 'User Goals',
          slides: [
            {
              id: 'user-goals-1',
              index: '01',
              title: 'User Goals',
              content: (
                <BodyComponent key="user-goals-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="User Goals" style="B1">
                    Understanding the user objectives.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        }
      ],
      bodyItems: [
        <BodyComponent key="section2-text" style={{ gridTemplateColumns: '1fr' }}>
          <Text
            subtitle="The Challenge"
            style="B1"
          >
            This is the challenge section of your presentation. Add your content here.
          </Text>
        </BodyComponent>,
      ]
    },
    section3: {
      id: "section3",
      index: "03",
      title: "Research",
      subtitle: "Understanding the Problem",
      icon1: <Icon svgPath={ICON_PATHS.solidIso} size="xl" />,
      icon2: <Icon svgPath={ICON_PATHS.arrowDown} size="small" />,
      period: "",
      subsections: [
        {
          id: 'user-interviews',
          index: '01',
          text: 'User Interviews',
          slides: [
            {
              id: 'user-interviews-1',
              index: '01',
              title: 'User Interviews',
              content: (
                <BodyComponent key="user-interviews-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="User Interviews" style="B1">
                    Insights from user interviews.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        },
        {
          id: 'ux-cam-session',
          index: '02',
          text: 'UX Cam Session',
          slides: [
            {
              id: 'ux-cam-session-1',
              index: '01',
              title: 'UX Cam Session',
              content: (
                <BodyComponent key="ux-cam-session-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="UX Cam Session" style="B1">
                    Analysis from UX Cam sessions.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        },
        {
          id: 'creating-personas',
          index: '03',
          text: 'Creating Personas',
          slides: [
            {
              id: 'creating-personas-1',
              index: '01',
              title: 'Creating Personas',
              content: (
                <BodyComponent key="creating-personas-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Creating Personas" style="B1">
                    Building user personas from research.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        },
        {
          id: 'user-flow-audit',
          index: '04',
          text: 'User Flow Audit',
          slides: [
            {
              id: 'user-flow-audit-1',
              index: '01',
              title: 'User Flow Audit',
              content: (
                <BodyComponent key="user-flow-audit-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="User Flow Audit" style="B1">
                    Auditing existing user flows.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        }
      ],
      bodyItems: [
        <BodyComponent key="section3-text" style={{ gridTemplateColumns: '1fr' }}>
          <Text
            subtitle="Research"
            style="B1"
          >
            This is the research section of your presentation. Add your content here.
          </Text>
        </BodyComponent>,
      ]
    },
    section4: {
      id: "section4",
      index: "04",
      title: "Discovery",
      subtitle: "Key Insights",
      icon1: <Icon svgPath={ICON_PATHS.solidIso} size="xl" />,
      icon2: <Icon svgPath={ICON_PATHS.arrowDown} size="small" />,
      period: "",
      subsections: [
        {
          id: 'technical-friction',
          index: '01',
          text: 'Technical Friction Caused Early Exits',
          slides: [
            {
              id: 'technical-friction-1',
              index: '01',
              title: 'Technical Friction Caused Early Exits',
              content: (
                <BodyComponent key="technical-friction-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Technical Friction" style="B1">
                    How technical issues led to early user exits.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        },
        {
          id: 'trust-barriers',
          index: '02',
          text: 'Trust Barriers & Unclear Value Prevent Activation',
          slides: [
            {
              id: 'trust-barriers-1',
              index: '01',
              title: 'Trust Barriers & Unclear Value Prevent Activation',
              content: (
                <BodyComponent key="trust-barriers-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Trust Barriers" style="B1">
                    How trust issues and unclear value prevented user activation.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        },
        {
          id: 'lack-of-guidance',
          index: '03',
          text: 'New Users Lacked Guidance and Navigation',
          slides: [
            {
              id: 'lack-of-guidance-1',
              index: '01',
              title: 'New Users Lacked Guidance and Navigation',
              content: (
                <BodyComponent key="lack-of-guidance-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Lack of Guidance" style="B1">
                    How new users struggled without proper guidance.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        }
      ],
      bodyItems: [
        <BodyComponent key="section4-text" style={{ gridTemplateColumns: '1fr' }}>
          <Text
            subtitle="Discovery"
            style="B1"
          >
            This is the discovery section of your presentation. Add your content here.
          </Text>
        </BodyComponent>,
      ]
    },
    section5: {
      id: "section5",
      index: "05",
      title: "Strategy",
      subtitle: "Planning the Approach",
      icon1: <Icon svgPath={ICON_PATHS.solidIso} size="xl" />,
      icon2: <Icon svgPath={ICON_PATHS.arrowDown} size="small" />,
      period: "",
      subsections: [
        {
          id: 'value-props-trust',
          index: '01',
          text: 'Exploring Value Props and Trust Signals',
          slides: [
            {
              id: 'value-props-trust-1',
              index: '01',
              title: 'Exploring Value Props and Trust Signals',
              content: (
                <BodyComponent key="value-props-trust-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Value Props and Trust Signals" style="B1">
                    Building trust and communicating value.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        },
        {
          id: 'education-guidance',
          index: '02',
          text: 'Integrating Education and Guidance',
          slides: [
            {
              id: 'education-guidance-1',
              index: '01',
              title: 'Integrating Education and Guidance',
              content: (
                <BodyComponent key="education-guidance-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Education and Guidance" style="B1">
                    Helping users understand and navigate the product.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        },
        {
          id: 'sign-up-flow',
          index: '03',
          text: 'Streamlining the Sign Up Flow',
          slides: [
            {
              id: 'sign-up-flow-1',
              index: '01',
              title: 'Streamlining the Sign Up Flow',
              content: (
                <BodyComponent key="sign-up-flow-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Sign Up Flow" style="B1">
                    Simplifying the registration process.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        },
        {
          id: 'onboarding-navigation',
          index: '04',
          text: 'Intuitive Onboarding and Navigation',
          slides: [
            {
              id: 'onboarding-navigation-1',
              index: '01',
              title: 'Intuitive Onboarding and Navigation',
              content: (
                <BodyComponent key="onboarding-navigation-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Onboarding and Navigation" style="B1">
                    Creating an intuitive first-time experience.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        }
      ],
      bodyItems: [
        <BodyComponent key="section5-text" style={{ gridTemplateColumns: '1fr' }}>
          <Text
            subtitle="Strategy"
            style="B1"
          >
            This is the strategy section of your presentation. Add your content here.
          </Text>
        </BodyComponent>,
      ]
    },
    section6: {
      id: "section6",
      index: "06",
      title: "Solutions",
      subtitle: "Implementing the Design",
      icon1: <Icon svgPath={ICON_PATHS.solidIso} size="xl" />,
      icon2: <Icon svgPath={ICON_PATHS.arrowDown} size="small" />,
      period: "",
      subsections: [
        {
          id: 'sign-up-context',
          index: '01',
          text: 'Efficient Sign Up that Provides Context and Motivation',
          slides: [
            {
              id: 'sign-up-context-1',
              index: '01',
              title: 'Efficient Sign Up that Provides Context and Motivation',
              content: (
                <BodyComponent key="sign-up-context-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Sign Up Context and Motivation" style="B1">
                    Creating an efficient sign up experience with clear context.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        },
        {
          id: 'trust-barriers-solution',
          index: '02',
          text: 'Trust Barriers and Unclear Value Prevented Activation',
          slides: [
            {
              id: 'trust-barriers-solution-1',
              index: '01',
              title: 'Trust Barriers and Unclear Value Prevented Activation',
              content: (
                <BodyComponent key="trust-barriers-solution-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Trust Barriers Solution" style="B1">
                    Addressing trust barriers and clarifying value proposition.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        },
        {
          id: 'guidance-navigation-solution',
          index: '03',
          text: 'New Users Lacked Guidance and Navigation',
          slides: [
            {
              id: 'guidance-navigation-solution-1',
              index: '01',
              title: 'New Users Lacked Guidance and Navigation',
              content: (
                <BodyComponent key="guidance-navigation-solution-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Guidance and Navigation Solution" style="B1">
                    Providing clear guidance and navigation for new users.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        }
      ],
      bodyItems: [
        <BodyComponent key="section6-text" style={{ gridTemplateColumns: '1fr' }}>
          <Text
            subtitle="Solutions"
            style="B1"
          >
            This is the solutions section of your presentation. Add your content here.
          </Text>
        </BodyComponent>,
      ]
    },
    section7: {
      id: "section7",
      index: "07",
      title: "Conclusion",
      subtitle: "Results and Reflection",
      icon1: <Icon svgPath={ICON_PATHS.solidIso} size="xl" />,
      icon2: <Icon svgPath={ICON_PATHS.arrowDown} size="small" />,
      period: "",
      subsections: [
        {
          id: 'results',
          index: '01',
          text: 'Results',
          slides: [
            {
              id: 'results-1',
              index: '01',
              title: 'Project Results',
              content: (
                <BodyComponent key="results-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Results" style="B1">
                    Final results and outcomes of the project.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        },
        {
          id: 'learnings',
          index: '02',
          text: 'Key Learnings',
          slides: [
            {
              id: 'learnings-1',
              index: '01',
              title: 'Key Learnings',
              content: (
                <BodyComponent key="learnings-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Key Learnings" style="B1">
                    Important lessons learned during the project.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        },
        {
          id: 'next',
          index: '03',
          text: 'Next Steps',
          slides: [
            {
              id: 'next-1',
              index: '01',
              title: 'Next Steps Forward',
              content: (
                <BodyComponent key="next-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text subtitle="Next Steps" style="B1">
                    Future plans and next steps forward.
                  </Text>
                </BodyComponent>
              )
            }
          ]
        }
      ],
      bodyItems: [
        <BodyComponent key="section7-text" style={{ gridTemplateColumns: '1fr' }}>
          <Text
            subtitle="Conclusion"
            style="B1"
          >
            This is the conclusion section of your presentation. Add your content here.
          </Text>
        </BodyComponent>,
      ]
    },
  };

  // Update viewport height on resize
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll for fade/scale effects
  useEffect(() => {
    const handleScroll = () => {
      if (!presentationContentRef.current) return;

      const contentTop = presentationContentRef.current.getBoundingClientRect().top;
      const navTop = contentNavRef.current ? contentNavRef.current.getBoundingClientRect().top : 0;
      const startY = viewportHeight;
      const endY = 0;

      // Calculate scroll progress based on when ContentNavigator reaches top of viewport
      const progress = Math.min(Math.max((startY - navTop) / (startY - endY), 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewportHeight]);

  // Handle wheel events for slide navigation
  useEffect(() => {
    const bodyElement = bodyRef.current;
    if (!bodyElement) return;

    bodyElement.addEventListener('wheel', handleSlideNavigation, { passive: false });
    return () => {
      bodyElement.removeEventListener('wheel', handleSlideNavigation);
    };
  }, [activeContentId, activeSubsectionId, activeSlideIndex, scrollDelta]);

  // Framer Motion values
  const opacity = 1 - scrollProgress;
  const scale = 1 - scrollProgress * 0.2;
  const backgroundColor = `hsl(240, 7%, ${6 + (4 * scrollProgress)}%)`;

  return (
    <motion.div
      key="presentation-page"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      <div className="casestudy-page" style={{ backgroundColor: backgroundColor }}>
        <motion.div
          className="casestudy-content-section"
          ref={presentationContentRef}
          style={{
            position: 'fixed',
            left: 0,
            width: '100%',
            height: '100vh',
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: Math.max(opacity, 0),
            scale: Math.max(scale, 0.8),
            zIndex: 1,
            right: 0,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        >
          <div className="casestudy-content">
            <div className="casestudy-info">
              <div className="casestudy-title">
                <div className="casestudy-title-top">
                  <span className="S1">01</span>
                  <span className="S1">2024</span>
                </div>
                <h2 className="casestudy-title-text H2">
                  My Portfolio Presentation
                </h2>
                <div className="casestudy-title-bottom">
                  <span className="S1">Portfolio</span>
                  <span className="S1">Design Work</span>
                </div>
              </div>
              <div className="casestudy-divider"></div>
              <p className="casestudy-description">
                Welcome to my portfolio presentation. This showcases my design work, process, and the impact of my projects. Scroll down to explore more.
              </p>
              <div className="casestudy-read-more" onClick={handleScrollToContent}>
                <Icon svgPath={ICON_PATHS.arrowDown} size="large" />
              </div>
            </div>
            <div className="casestudy-image">
              <Carousel
                items={[
                  <TemplateMedia
                    variant="centered"
                    sources={[SharedVideo]}
                    alt="Centered phone with video"
                  />,
                  <TemplateMedia
                    variant="var2"
                    sources={[SharedImage01, SharedImage02]}
                    alt="Two phones side-by-side"
                  />,
                  <TemplateMedia
                    variant="var3"
                    sources={[SharedImage01, SharedImage02, SharedImage03]}
                    alt="Three phones with center larger"
                  />,
                  <TemplateMedia
                    variant="centered"
                    sources={[SharedImage03]}
                    alt="Centered phone layout"
                  />,
                  <TemplateMedia
                    variant="centered"
                    sources={[SharedImage01]}
                    alt="Centered phone layout"
                  />
                ]}
                height="300px"
                scrollSpeed={1}
                gap={8}
              />
              <div className="casestudy-divider"></div>
              <Impact
                metrics={[
                  {
                    index: "01",
                    prefix: "+",
                    value: "50",
                    unit: "%",
                    label: "Sign Up Rate",
                    description: "More users are completing the sign-up process with streamlined onboarding",
                    icon: ICON_PATHS.solidTrendingDown
                  },
                  {
                    index: "02",
                    prefix: "+",
                    value: "50",
                    unit: "%",
                    label: "Activation Rate",
                    description: "Higher conversion rate from sign-up to fully activated users",
                    icon: ICON_PATHS.solidTrendingDown
                  },
                  {
                    index: "03",
                    prefix: "-",
                    value: "30",
                    unit: "%",
                    label: "Drop-off Rate",
                    description: "Reduced abandonment during onboarding flow",
                    icon: ICON_PATHS.solidTrendingDown
                  }
                ]}
              />
            </div>
          </div>
        </motion.div>

        <div ref={contentNavRef} style={{ zIndex: 2, position: 'relative', marginTop: '100vh' }}>
          <ContentNavigator>
            <TabNav activeId={activeContentId} onTabChange={handleTabChange}>
              <NavTabItem id="section1" index="01" title="Context" />
              <NavTabItem id="section2" index="02" title="The Challenge" />
              <NavTabItem id="section3" index="03" title="Research" />
              <NavTabItem id="section4" index="04" title="Discovery" />
              <NavTabItem id="section5" index="05" title="Strategy" />
              <NavTabItem id="section6" index="06" title="Solutions" />
              <NavTabItem id="section7" index="07" title="Conclusion" />
            </TabNav>

            {/* Horizontal Content Layout */}
            <motion.div
              className="content"
              ref={contentScrollRef}
              initial={{ height: 1, opacity: 0.3 }} // Start collapsed at 1px
              style={{
                flex: (isInitialLoad || isTransitioning) ? 'none' : '1', // Keep flex none during initial load and transitions
                flexDirection: 'row' // Ensure horizontal layout
              }}
              animate={{
                height: contentHeight, // Always animate to contentHeight (152 or 757)
                opacity: isTransitioning ? 0.3 : 1
              }}
              transition={{
                height: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.3, ease: "easeInOut" }
              }}
            >
              {/* Head - left sidebar (30%) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeContentId}
                  className="head"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Head
                    title={contentRegistry[activeContentId]?.title}
                    subsections={contentRegistry[activeContentId]?.subsections || []}
                    onSubsectionClick={handleSubsectionClick}
                    activeSubsectionId={activeSubsectionId}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Body - right content area (70%) */}
              <Body
                ref={bodyRef}
                key={activeContentId}
                subsections={contentRegistry[activeContentId]?.subsections || []}
                activeSubsectionId={activeSubsectionId}
                activeSlideIndex={activeSlideIndex}
                slideDirection={slideDirection}
                onScroll={handleContentScroll}
                totalSlides={
                  contentRegistry[activeContentId]?.subsections?.find(
                    sub => sub.id === activeSubsectionId
                  )?.slides?.length || 0
                }
              />
            </motion.div>
          </ContentNavigator>
        </div>
      </div>
    </motion.div>
  );
};

export default PresentationContent;
