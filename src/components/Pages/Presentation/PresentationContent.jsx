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
import TileRow from '../../ContentNavigator/ContentStack/Content/Body/BodyComponent/TileRow/TileRow';
import TileColumn from '../../ContentNavigator/ContentStack/Content/Body/BodyComponent/TileColumn/TileColumn';
import TabPanel from '../../ContentNavigator/ContentStack/Content/Body/BodyComponent/TabPanel/TabPanel';
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

// Section 02 - The Challenge images
import ChallengeAnalytics01 from '../../../assets/TANDA/Presentation/02 The Challenge/01 Using Analytics/01.png';

// Section 03 - Research images
import Persona01 from '../../../assets/TANDA/Presentation/03 Research/03 Creating Personas/01.png';
import Persona02 from '../../../assets/TANDA/Presentation/03 Research/03 Creating Personas/02.png';
import Persona03 from '../../../assets/TANDA/Presentation/03 Research/03 Creating Personas/03.png';

// Section 04 - Discovery images
import DiscoveryTechnicalFriction01 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/01.png';
import DiscoveryTechnicalFriction02 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/02.png';
import DiscoveryTechnicalFriction03 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/03.png';
import DiscoveryTechnicalFriction04 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/04.png';
import DiscoveryTechnicalFriction05 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/05.png';
import DiscoveryTechnicalFriction06 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/06.png';
import DiscoveryTechnicalFriction07 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/07.png';
import DiscoveryTechnicalFriction08 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/08.png';
import DiscoveryTechnicalFriction09 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/09.png';
import DiscoveryTechnicalFriction10 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/10.png';
import DiscoveryTechnicalFriction11 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/11.png';
import DiscoveryTechnicalFriction12 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/12.mov';
import DiscoveryTechnicalFriction13 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/13.png';
import DiscoveryTechnicalFriction14 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/14.png';
import DiscoveryTechnicalFriction15 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/15.png';
import DiscoveryTechnicalFriction16 from '../../../assets/TANDA/Presentation/04 Discovery/01 Technical Friction/16.mov';

// Value Proposition images and videos
import ValueProp01 from '../../../assets/TANDA/Presentation/05 Exploration/01 Value Props/01.png';
import ValueProp02 from '../../../assets/TANDA/Presentation/05 Exploration/01 Value Props/02.png';
import ValueProp03 from '../../../assets/TANDA/Presentation/05 Exploration/01 Value Props/03.png';
import ValueProp04 from '../../../assets/TANDA/Presentation/05 Exploration/01 Value Props/04.png';
import ValueProp05 from '../../../assets/TANDA/Presentation/05 Exploration/01 Value Props/05.png';
import ValueProp06 from '../../../assets/TANDA/Presentation/05 Exploration/01 Value Props/06.mov';

// Section 06 - Strategy videos and images
import Strategy01 from '../../../assets/TANDA/Presentation/06 Strategy/01.mp4';
import Strategy02 from '../../../assets/TANDA/Presentation/06 Strategy/02.mov';
import Strategy03 from '../../../assets/TANDA/Presentation/06 Strategy/03.mov';
import Strategy04 from '../../../assets/TANDA/Presentation/06 Strategy/04.mov';
import Strategy05 from '../../../assets/TANDA/Presentation/06 Strategy/05.png';
import Strategy06 from '../../../assets/TANDA/Presentation/06 Strategy/06.png';
import Strategy07 from '../../../assets/TANDA/Presentation/06 Strategy/07.png';
import Strategy08 from '../../../assets/TANDA/Presentation/06 Strategy/08.png';
import Strategy09 from '../../../assets/TANDA/Presentation/06 Strategy/09.png';
import Strategy10 from '../../../assets/TANDA/Presentation/06 Strategy/10.png';
import Strategy11 from '../../../assets/TANDA/Presentation/06 Strategy/11.png';
import Strategy12 from '../../../assets/TANDA/Presentation/06 Strategy/12.png';
import Strategy13 from '../../../assets/TANDA/Presentation/06 Strategy/13.png';
import Strategy14 from '../../../assets/TANDA/Presentation/06 Strategy/14.png';
import Strategy15 from '../../../assets/TANDA/Presentation/06 Strategy/15.png';
import Strategy16 from '../../../assets/TANDA/Presentation/06 Strategy/16.png';
import Strategy17 from '../../../assets/TANDA/Presentation/06 Strategy/17.png';
import Strategy18 from '../../../assets/TANDA/Presentation/06 Strategy/18.png';
import Strategy19 from '../../../assets/TANDA/Presentation/06 Strategy/19.png';
import Strategy20 from '../../../assets/TANDA/Presentation/06 Strategy/20.png';
import Strategy21 from '../../../assets/TANDA/Presentation/06 Strategy/21.png';
import Strategy22 from '../../../assets/TANDA/Presentation/06 Strategy/22.png';
import Strategy23 from '../../../assets/TANDA/Presentation/06 Strategy/23.png';
import Strategy24 from '../../../assets/TANDA/Presentation/06 Strategy/24.png';
import Strategy25 from '../../../assets/TANDA/Presentation/06 Strategy/25.png';
import Strategy26 from '../../../assets/TANDA/Presentation/06 Strategy/26.png';
import Strategy27 from '../../../assets/TANDA/Presentation/06 Strategy/27.png';
import Strategy28 from '../../../assets/TANDA/Presentation/06 Strategy/28.mov';
import Strategy29 from '../../../assets/TANDA/Presentation/06 Strategy/29.mov';
import Strategy30 from '../../../assets/TANDA/Presentation/06 Strategy/30.png';
import Strategy31 from '../../../assets/TANDA/Presentation/06 Strategy/31.png';
import Strategy32 from '../../../assets/TANDA/Presentation/06 Strategy/32.mov';
import Strategy33 from '../../../assets/TANDA/Presentation/06 Strategy/33.png';
import Strategy34 from '../../../assets/TANDA/Presentation/06 Strategy/34.png';
import Strategy35 from '../../../assets/TANDA/Presentation/06 Strategy/35.png';
import Strategy36 from '../../../assets/TANDA/Presentation/06 Strategy/36.png';
import Strategy37 from '../../../assets/TANDA/Presentation/06 Strategy/37.png';
import Strategy38 from '../../../assets/TANDA/Presentation/06 Strategy/38.png';
import Strategy39 from '../../../assets/TANDA/Presentation/06 Strategy/39.png';
import Strategy40 from '../../../assets/TANDA/Presentation/06 Strategy/40.png';
import Strategy41 from '../../../assets/TANDA/Presentation/06 Strategy/41.png';

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

  // Handle slide navigation via arrow buttons (within current subsection only)
  const handleSlidePrev = () => {
    if (activeSlideIndex > 0) {
      setActiveSlideIndex(activeSlideIndex - 1);
      setSlideDirection('backward');
      setScrollDelta(0);
    }
  };

  const handleSlideNext = () => {
    const activeSubsection = contentRegistry[activeContentId]?.subsections?.find(
      sub => sub.id === activeSubsectionId
    );
    const totalSlides = activeSubsection?.slides?.length || 0;

    if (activeSlideIndex < totalSlides - 1) {
      setActiveSlideIndex(activeSlideIndex + 1);
      setSlideDirection('forward');
      setScrollDelta(0);
    }
  };

  // Get total slides for current subsection
  const getTotalSlides = () => {
    const activeSubsection = contentRegistry[activeContentId]?.subsections?.find(
      sub => sub.id === activeSubsectionId
    );
    return activeSubsection?.slides?.length || 0;
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
                <>
                  <BodyComponent key="what-is-tanda-1" style={{ gridTemplateColumns: '1fr' }}>
                    <Text style="B1">
                      TANDA is a fintech startup dedicated to making financial security accessible to everyone.
                    </Text>
                  </BodyComponent>
                  <SlideCarousel height="100%" gap={16}>
                    <CarouselItem>
                      <img src={Strategy39} alt="TANDA Thumbnail 1" />
                    </CarouselItem>
                    <CarouselItem>
                      <img src={Strategy40} alt="TANDA Thumbnail 2" />
                    </CarouselItem>
                    <CarouselItem>
                      <img src={Strategy41} alt="TANDA Thumbnail 3" />
                    </CarouselItem>
                  </SlideCarousel>
                </>
              )
            },
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
          text: 'Using Analytics to Identify the Problem',
          slides: [
            {
              id: 'problem-1',
              index: '01',
              title: 'Using Analytics to Identify the Problem',
              content: (
                <>
                  <BodyComponent key="problem-1-image" style={{ gridTemplateColumns: '1fr' }}>
                    <img src={Strategy38} alt="Analytics Graph" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </BodyComponent>
                  <BodyComponent key="problem-1-tiles" style={{ gridTemplateColumns: '1fr' }}>
                    <TileRow>
                      <Tile
                        index="01"
                        title="Sign Up"
                      />
                      <Tile
                        index="02"
                        title="Activation"
                      />
                      <Tile
                        index="03"
                        title="Onboard Completion"
                      />
                    </TileRow>
                  </BodyComponent>
                </>
              )
            },
            {
              id: 'problem-2',
              index: '02',
              title: 'Problem Statement',
              content: (
                <BodyComponent key="problem-2" style={{ gridTemplateColumns: '1fr', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center' }}>
                  <Text style="B1">
                    Users are rapidly falling off as they go through the steps of our sign up and onboarding funnels.
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
                <TileColumn>
                  <Tile
                    index="01"
                    title="Increase Sign-Up Completion Rate"
                    bottomLeft={<span className="subtitle">Reduce drop-off during account creation to improve funnel conversion</span>}
                  />
                  <Tile
                    index="02"
                    title="Improve User Activation"
                    bottomLeft={<span className="subtitle">Get more users to complete onboarding and reach their first transaction</span>}
                  />
                  <Tile
                    index="03"
                    title="Increase User Acquisition"
                    bottomLeft={<span className="subtitle">Expand our reach and grow the number of new users joining TANDA</span>}
                  />
                </TileColumn>
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
                <TileColumn>
                  <Tile
                    index="01"
                    title="Get Quick Access to Funds"
                    bottomLeft={<span className="subtitle">User goal description goes here</span>}
                  />
                  <Tile
                    index="02"
                    title="Improve Financial Status"
                    bottomLeft={<span className="subtitle">User goal description goes here</span>}
                  />
                  <Tile
                    index="03"
                    title="Not Worry About Money"
                    bottomLeft={<span className="subtitle">User goal description goes here</span>}
                  />
                </TileColumn>
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
                <TabPanel
                  items={[
                    {
                      id: 'quick-dirty',
                      index: '01',
                      label: 'Quick and Dirty Interviews',
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                          <Text subtitle="Who" style="titleBase">
                            ~100+ mall workers and small business workers in the Bay Area.
                          </Text>
                          <Text subtitle="What" style="titleBase">
                            In-person walkthroughs of the TANDA product with informal questioning integrated within.
                          </Text>
                          <Text subtitle="Why" style="titleBase">
                            Allows us to onboard new users and gather a baseline for our users knowledge.
                          </Text>
                        </div>
                      )
                    },
                    {
                      id: 'formal-interviews',
                      index: '02',
                      label: 'Formal Interviews',
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                          <Text subtitle="Who" style="titleBase">
                            50 New TANDA Users. 30 Successful Activated Users, 10 Successful Sign Ups, 10 Churned Users.
                          </Text>
                          <Text subtitle="What" style="titleBase">
                            30 minute interviews with users. Goals were to understand their experience going through the Onboarding flow.
                          </Text>
                          <Text subtitle="Why" style="titleBase">
                            Allows deeper insights into reasonings for user actions and identify commonalities between the different groups.
                          </Text>
                        </div>
                      )
                    },
                    {
                      id: 'user-surveys',
                      index: '03',
                      label: 'User Surveys',
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                          <Text subtitle="Who" style="titleBase">
                            ~50 New TANDA Users.
                          </Text>
                          <Text subtitle="What" style="titleBase">
                            Simple survey capturing general experience with the product and preferences.
                          </Text>
                          <Text subtitle="Why" style="titleBase">
                            Provided good general insights into users preferences and feelings.
                          </Text>
                        </div>
                      )
                    }
                  ]}
                  defaultActiveId="quick-dirty"
                />
              )
            },
            {
              id: 'user-interviews-2',
              index: '02',
              title: 'Findings and Takeaways',
              content: (
                <BodyComponent key="user-interviews-2" style={{ gridTemplateColumns: '1fr' }}>
                  <TileRow>
                    <Tile
                      index="01"
                      title="In-Person Onboarding Drives Highest Activation"
                      bottomLeft={<span className="subtitle">In-person onboarding had the highest activation rate</span>}
                      bottom2Icon={<Icon svgPath={ICON_PATHS.lightbulb} size="small" />}
                      bottom2Subtitle={<span className="subtitle">Design Opportunity</span>}
                      bottom2ClassName="design-opportunity"
                    />
                    <Tile
                      index="02"
                      title="Need for Thorough Product Explanation"
                      bottomLeft={<span className="subtitle">Users preferred a thorough explanation of what TANDA is and does</span>}
                      bottom2Icon={<Icon svgPath={ICON_PATHS.lightbulb} size="small" />}
                      bottom2Subtitle={<span className="subtitle">Design Opportunity</span>}
                      bottom2ClassName="design-opportunity"
                    />
                  </TileRow>
                  <TileRow>
                    <Tile
                      index="03"
                      title="KYC and SSN Confusion"
                      bottomLeft={<span className="subtitle">Questions about KYC and why SSN was required</span>}
                      bottom2Icon={<Icon svgPath={ICON_PATHS.solidTrendingDown} size="small" />}
                      bottom2Subtitle={<span className="subtitle">Pain Point</span>}
                      bottom2ClassName="pain-point"
                    />
                    <Tile
                      index="04"
                      title="Delayed Onboarding Engagement"
                      bottomLeft={<span className="subtitle">Users did not immediately start the onboarding flow</span>}
                      bottom2Icon={<Icon svgPath={ICON_PATHS.lightbulb} size="small" />}
                      bottom2Subtitle={<span className="subtitle">Design Opportunity</span>}
                      bottom2ClassName="design-opportunity"
                    />
                  </TileRow>
                  <TileRow>
                    <Tile
                      index="05"
                      title="Friend Discovery Challenges"
                      bottomLeft={<span className="subtitle">Can't find their friends in-app</span>}
                      bottom2Icon={<Icon svgPath={ICON_PATHS.solidTrendingDown} size="small" />}
                      bottom2Subtitle={<span className="subtitle">Pain Point</span>}
                      bottom2ClassName="pain-point"
                    />
                    <Tile
                      index="06"
                      title="Lack of Social Proof"
                      bottomLeft={<span className="subtitle">Users wanted to see testimonials or evidence that others successfully use TANDA</span>}
                      bottom2Icon={<Icon svgPath={ICON_PATHS.lightbulb} size="small" />}
                      bottom2Subtitle={<span className="subtitle">Design Opportunity</span>}
                      bottom2ClassName="design-opportunity"
                    />
                  </TileRow>
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
              title: 'Takeaways and Findings',
              content: (
                <BodyComponent key="ux-cam-session-2" style={{ gridTemplateColumns: '1fr' }}>
                  <TileRow>
                    <Tile
                      index="01"
                      title="Login and Sign Up Flow Confusion"
                      bottomLeft={<span className="subtitle">Confusion between the Login / Sign Up Flows</span>}
                      bottom2Icon={<Icon svgPath={ICON_PATHS.solidTrendingDown} size="small" />}
                      bottom2Subtitle={<span className="subtitle">Pain Point</span>}
                      bottom2ClassName="pain-point"
                    />
                    <Tile
                      index="02"
                      title="Early Circle Exploration"
                      bottomLeft={<span className="subtitle">Users started exploring the circles table before onboarding</span>}
                      bottom2Icon={<Icon svgPath={ICON_PATHS.lightbulb} size="small" />}
                      bottom2Subtitle={<span className="subtitle">Design Opportunity</span>}
                      bottom2ClassName="design-opportunity"
                    />
                  </TileRow>
                  <TileRow>
                    <Tile
                      index="03"
                      title="Dead Ends Cause Abandonment"
                      bottomLeft={<span className="subtitle">Dead ends lead to abandonment</span>}
                      bottom2Icon={<Icon svgPath={ICON_PATHS.solidTrendingDown} size="small" />}
                      bottom2Subtitle={<span className="subtitle">Pain Point</span>}
                      bottom2ClassName="pain-point"
                    />
                    <Tile
                      index="04"
                      title="Missing Onboarding Redirection"
                      bottomLeft={<span className="subtitle">No clear redirection to onboarding</span>}
                      bottom2Icon={<Icon svgPath={ICON_PATHS.lightbulb} size="small" />}
                      bottom2Subtitle={<span className="subtitle">Design Opportunity</span>}
                      bottom2ClassName="design-opportunity"
                    />
                  </TileRow>
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
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={Persona01} alt="Persona 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={Persona02} alt="Persona 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={Persona03} alt="Persona 3" />
                  </CarouselItem>
                </SlideCarousel>
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
              id: 'user-flow-audit-2',
              index: '01',
              title: 'User Flow Walkthrough',
              content: (
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <div style={{ display: 'flex', gap: '16px', width: '100%', height: '100%' }}>
                      <img src={SharedImage01} alt="User Flow 1-1" style={{ flex: 1, height: '100%', objectFit: 'contain' }} />
                      <img src={SharedImage02} alt="User Flow 1-2" style={{ flex: 1, height: '100%', objectFit: 'contain' }} />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div style={{ display: 'flex', gap: '16px', width: '100%', height: '100%' }}>
                      <img src={SharedImage01} alt="User Flow 2-1" style={{ flex: 1, height: '100%', objectFit: 'contain' }} />
                      <img src={SharedImage02} alt="User Flow 2-2" style={{ flex: 1, height: '100%', objectFit: 'contain' }} />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '16px', width: '100%', height: '100%' }}>
                      <img src={SharedImage01} alt="User Flow 3-1" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      <img src={SharedImage02} alt="User Flow 3-2" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      <img src={SharedImage03} alt="User Flow 3-3" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      <img src={SharedImage01} alt="User Flow 3-4" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div style={{ display: 'flex', gap: '16px', width: '100%', height: '100%' }}>
                      <img src={SharedImage01} alt="User Flow 4-1" style={{ flex: 1, height: '100%', objectFit: 'contain' }} />
                      <img src={SharedImage02} alt="User Flow 4-2" style={{ flex: 1, height: '100%', objectFit: 'contain' }} />
                      <img src={SharedImage03} alt="User Flow 4-3" style={{ flex: 1, height: '100%', objectFit: 'contain' }} />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage01} alt="User Flow 5" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="User Flow 6" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="User Flow 7" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage01} alt="User Flow 8" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="User Flow 9" />
                  </CarouselItem>
                </SlideCarousel>
              )
            },
            {
              id: 'user-flow-audit-3',
              index: '02',
              title: 'Takeaways',
              content: (
                <BodyComponent key="user-flow-audit-3" style={{ gridTemplateColumns: '1fr' }}>
                  <TileRow>
                    <Tile
                      index="01"
                      title="Takeaway Title 01"
                      bottomLeft={<span className="subtitle">Takeaway description goes here</span>}
                    />
                    <Tile
                      index="02"
                      title="Takeaway Title 02"
                      bottomLeft={<span className="subtitle">Takeaway description goes here</span>}
                    />
                  </TileRow>
                  <TileRow>
                    <Tile
                      index="03"
                      title="Takeaway Title 03"
                      bottomLeft={<span className="subtitle">Takeaway description goes here</span>}
                    />
                    <Tile
                      index="04"
                      title="Takeaway Title 04"
                      bottomLeft={<span className="subtitle">Takeaway description goes here</span>}
                    />
                  </TileRow>
                  <TileRow>
                    <Tile
                      index="05"
                      title="Takeaway Title 05"
                      bottomLeft={<span className="subtitle">Takeaway description goes here</span>}
                    />
                    <Tile
                      index="06"
                      title="Takeaway Title 06"
                      bottomLeft={<span className="subtitle">Takeaway description goes here</span>}
                    />
                  </TileRow>
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
              title: 'Unclear Email Sign Up',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'email-signup-tab-1',
                      index: '01',
                      label: 'Confusing Login for Sign Up',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={DiscoveryTechnicalFriction01} alt="Sign Up Screen" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage02} alt="Confusing Login for Sign Up - 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage03} alt="Confusing Login for Sign Up - 3" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    },
                    {
                      id: 'email-signup-tab-2',
                      index: '02',
                      label: 'Email Verification Action Out of Sync',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={DiscoveryTechnicalFriction02} alt="Email Verification Action Out of Sync - 1" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={DiscoveryTechnicalFriction03} alt="Email Verification Action Out of Sync - 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage03} alt="Email Verification Action Out of Sync - 3" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    }
                  ]}
                  defaultActiveId="email-signup-tab-1"
                />
              )
            },
            {
              id: 'technical-friction-2',
              index: '02',
              title: 'Bugs that Prevented Successful Sign Ups',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'bugs-tab-1',
                      index: '01',
                      label: 'Bug Category 01',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={SharedImage01} alt="Bug Category 01 - 1" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage02} alt="Bug Category 01 - 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage03} alt="Bug Category 01 - 3" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    },
                    {
                      id: 'bugs-tab-2',
                      index: '02',
                      label: 'Bug Category 02',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={SharedImage01} alt="Bug Category 02 - 1" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage02} alt="Bug Category 02 - 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage03} alt="Bug Category 02 - 3" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    }
                  ]}
                  defaultActiveId="bugs-tab-1"
                />
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
              title: 'KYC Trust Issues',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'context-kyc',
                      index: '01',
                      label: 'Providing Context Before the KYC Flow Increases Trust',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <video src={DiscoveryTechnicalFriction12} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={DiscoveryTechnicalFriction05} alt="Context Before KYC Flow - 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage02} alt="Context Before KYC Flow - 3" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage03} alt="Context Before KYC Flow - 4" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    },
                    {
                      id: 'visual-security',
                      index: '02',
                      label: 'Visual Security Signals Build Trust',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={DiscoveryTechnicalFriction13} alt="Visual Security Signals - 1" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={DiscoveryTechnicalFriction14} alt="Visual Security Signals - 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={DiscoveryTechnicalFriction15} alt="Visual Security Signals - 3" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    },
                    {
                      id: 'progressive-form',
                      index: '03',
                      label: 'Progressive Form Input Lowers Cognitive Load',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={DiscoveryTechnicalFriction04} alt="Progressive Form Input - 1" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage02} alt="Progressive Form Input - 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage03} alt="Progressive Form Input - 3" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    },
                    {
                      id: 'failure-states',
                      index: '04',
                      label: 'Failure States Lead to Immediate Churn',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={DiscoveryTechnicalFriction06} alt="Failure States - 1" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={DiscoveryTechnicalFriction07} alt="Failure States - 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={DiscoveryTechnicalFriction08} alt="Failure States - 3" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    }
                  ]}
                  defaultActiveId="context-kyc"
                />
              )
            },
            {
              id: 'trust-barriers-2',
              index: '02',
              title: 'Value Proposition Gaps',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'delaying-core-value',
                      index: '01',
                      label: 'Users do not immediately understand TANDA',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={SharedImage01} alt="Delaying Core Value 1" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage02} alt="Delaying Core Value 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage03} alt="Delaying Core Value 3" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    },
                    {
                      id: 'circle-discovery',
                      index: '02',
                      label: 'Circle Discovery Hidden Behind Onboarding Forms',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <video src={DiscoveryTechnicalFriction16} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage02} alt="Circle Discovery 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage03} alt="Circle Discovery 3" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    },
                    {
                      id: 'personalized-value',
                      index: '04',
                      label: 'Personalized Value Demonstrations Drives Motivation',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={SharedImage01} alt="Personalized Value 1" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage02} alt="Personalized Value 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage03} alt="Personalized Value 3" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    }
                  ]}
                  defaultActiveId="delaying-core-value"
                />
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
              title: 'Onboarding Carousel Lacked Appeal',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'onboarding-lacks-engagement',
                      index: '01',
                      label: 'Onboarding Lacks Engagement',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={DiscoveryTechnicalFriction03} alt="Onboarding Lacks Engagement - 1" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage02} alt="Onboarding Lacks Engagement - 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage03} alt="Onboarding Lacks Engagement - 3" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    },
                    {
                      id: 'onboarding-bloated',
                      index: '02',
                      label: 'Onboarding Flow is Bloated and Too Restricted',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={DiscoveryTechnicalFriction09} alt="Onboarding Flow Bloated - 1" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    },
                    {
                      id: 'no-clear-cta',
                      index: '03',
                      label: 'No Clear CTA or Actions to Take',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={DiscoveryTechnicalFriction10} alt="No Clear CTA - 1" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={DiscoveryTechnicalFriction11} alt="No Clear CTA - 2" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    }
                  ]}
                  defaultActiveId="onboarding-lacks-engagement"
                />
              )
            },
            {
              id: 'lack-of-guidance-2',
              index: '02',
              title: 'Unclear Navigation and Direction',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'confusing-navigation',
                      index: '01',
                      label: 'Confusing Navigation Patterns',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={SharedImage01} alt="Confusing Navigation Patterns - 1" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage02} alt="Confusing Navigation Patterns - 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage03} alt="Confusing Navigation Patterns - 3" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    },
                    {
                      id: 'lack-of-direction',
                      index: '02',
                      label: 'Lack of Clear Direction for New Users',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={SharedImage01} alt="Lack of Clear Direction - 1" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage02} alt="Lack of Clear Direction - 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage03} alt="Lack of Clear Direction - 3" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    }
                  ]}
                  defaultActiveId="confusing-navigation"
                />
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
      title: "Exploration",
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
              title: 'Value Proposition Brainstorm',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'financial-goals',
                      index: '01',
                      label: 'Financial Goals',
                      content: (
                        <>
                          <Text subtitle="Achieve your financial goals faster" style="titleBase">
                            Highlights specific outcomes like vacations, emergency funds, or down payments
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={ValueProp01} alt="Financial Goals" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'community-savings',
                      index: '02',
                      label: 'Community Savings',
                      content: (
                        <>
                          <Text subtitle="Save together with friends and family" style="titleBase">
                            Focuses on social connection and collective wealth building
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={ValueProp02} alt="Community Savings" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'quick-cash-access',
                      index: '03',
                      label: 'Quick Cash Access',
                      content: (
                        <>
                          <Text subtitle="Access emergency funds when you need them" style="titleBase">
                            Emphasizes immediate financial relief and speed
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={ValueProp03} alt="Quick Cash Access" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'flexible-contributions',
                      index: '04',
                      label: 'Flexible Contributions',
                      content: (
                        <>
                          <Text subtitle="Save at your own pace" style="titleBase">
                            Emphasizes control and lack of rigid requirements
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={ValueProp04} alt="Flexible Contributions" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    }
                  ]}
                  defaultActiveId="financial-goals"
                />
              )
            },
            {
              id: 'value-props-trust-2',
              index: '02',
              title: 'Trust Signals Brainstorm',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'security-badges',
                      index: '01',
                      label: 'Security Badges',
                      content: (
                        <>
                          <Text subtitle="Security Badges" style="titleBase">
                            Description for security badges goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={Strategy30} alt="Security 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy31} alt="Security 2" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'trust-indicators',
                      index: '02',
                      label: 'Trust Indicators',
                      content: (
                        <>
                          <Text subtitle="Trust Indicators" style="titleBase">
                            Description for trust indicators goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={SharedImage01} alt="Trust Indicators 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Trust Indicators 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Trust Indicators 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'verification-methods',
                      index: '03',
                      label: 'Verification Methods',
                      content: (
                        <>
                          <Text subtitle="Verification Methods" style="titleBase">
                            Description for verification methods goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={SharedImage01} alt="Verification Methods 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Verification Methods 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Verification Methods 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    }
                  ]}
                  defaultActiveId="security-badges"
                />
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
              title: 'Identify Points of Need',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'sign-up-screen',
                      index: '01',
                      label: 'Sign Up Screen',
                      content: (
                        <>
                          <Text subtitle="Sign Up Screen" style="titleBase">
                            Description for sign up screen point of need goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={ValueProp05} alt="Sign Up Screen 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Sign Up Screen 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Sign Up Screen 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'onboarding',
                      index: '02',
                      label: 'Onboarding',
                      content: (
                        <>
                          <Text subtitle="Onboarding" style="titleBase">
                            Description for onboarding point of need goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={Strategy27} alt="Onboard Locked" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Onboarding 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Onboarding 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'joining-circles',
                      index: '03',
                      label: 'Joining / Finding Circles',
                      content: (
                        <>
                          <Text subtitle="Joining / Finding Circles" style="titleBase">
                            Description for joining/finding circles point of need goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={SharedImage01} alt="Joining/Finding Circles 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Joining/Finding Circles 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Joining/Finding Circles 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    }
                  ]}
                  defaultActiveId="sign-up-screen"
                />
              )
            },
            {
              id: 'education-guidance-2',
              index: '02',
              title: 'Exploring Education Options',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'tooltips',
                      index: '01',
                      label: 'Tooltips',
                      content: (
                        <>
                          <Text subtitle="Tooltips" style="titleBase">
                            Description for tooltips goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={SharedImage01} alt="Tooltips 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Tooltips 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Tooltips 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'mock-products',
                      index: '02',
                      label: 'Mock Products',
                      content: (
                        <>
                          <Text subtitle="Mock Products" style="titleBase">
                            Description for mock products goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <video src={Strategy28} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                              </CarouselItem>
                              <CarouselItem>
                                <video src={Strategy29} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'guided-walkthroughs',
                      index: '03',
                      label: 'Guided Walkthroughs',
                      content: (
                        <>
                          <Text subtitle="Guided Walkthroughs" style="titleBase">
                            Description for guided walkthroughs goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <video src={Strategy32} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'faq-links',
                      index: '04',
                      label: 'FAQ Links',
                      content: (
                        <>
                          <Text subtitle="FAQ Links" style="titleBase">
                            Description for FAQ links goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={SharedImage01} alt="FAQ Links 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="FAQ Links 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="FAQ Links 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    }
                  ]}
                  defaultActiveId="tooltips"
                />
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
              title: 'Sign Up Options',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'option-1',
                      index: '01',
                      label: 'Added Sign Up Options',
                      content: (
                        <>
                          <Text subtitle="Added Sign Up Options" style="titleBase">
                            Added sign up options description goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={SharedImage01} alt="Added Sign Up Options - Slide 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Added Sign Up Options - Slide 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Added Sign Up Options - Slide 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'option-2',
                      index: '02',
                      label: 'Simplified Login / Sign Up',
                      content: (
                        <>
                          <Text subtitle="Simplified Login / Sign Up" style="titleBase">
                            Simplified login / sign up description goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <video src={ValueProp06} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage01} alt="Simplified Login - Slide 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Simplified Login - Slide 3" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Simplified Login - Slide 4" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'option-3',
                      index: '03',
                      label: 'Progressive Disclosure Forms',
                      content: (
                        <>
                          <Text subtitle="Progressive Disclosure Forms" style="titleBase">
                            Progressive disclosure forms description goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={Strategy22} alt="Progressive Disclosure - Slide 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy23} alt="Progressive Disclosure - Slide 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy24} alt="Progressive Disclosure - Slide 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    }
                  ]}
                  defaultActiveId="option-1"
                />
              )
            },
            {
              id: 'sign-up-flow-3',
              index: '02',
              title: 'Add User Segmentation Survey',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'segmentation-overview',
                      index: '01',
                      label: 'Overview',
                      content: (
                        <>
                          <Text subtitle="Overview" style="titleBase">
                            Description for segmentation survey overview goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={SharedImage01} alt="Segmentation Overview 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Segmentation Overview 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Segmentation Overview 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'investor',
                      index: '02',
                      label: 'Investor',
                      content: (
                        <>
                          <Text subtitle="Investor" style="titleBase">
                            Description for investor segment goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={Strategy06} alt="Investor 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy07} alt="Investor 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy08} alt="Investor 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'saver',
                      index: '03',
                      label: 'Saver',
                      content: (
                        <>
                          <Text subtitle="Saver" style="titleBase">
                            Description for saver segment goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={Strategy09} alt="Saver 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy10} alt="Saver 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy11} alt="Saver 3" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy12} alt="Saver 4" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy13} alt="Saver 5" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'spender',
                      index: '04',
                      label: 'Spender',
                      content: (
                        <>
                          <Text subtitle="Spender" style="titleBase">
                            Description for spender segment goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={Strategy14} alt="Spender 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy15} alt="Spender 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy16} alt="Spender 3" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy17} alt="Spender 4" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    }
                  ]}
                  defaultActiveId="segmentation-overview"
                />
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
                <TabPanel
                  items={[
                    {
                      id: 'onboarding-carousels',
                      index: '01',
                      label: 'Onboarding Carousels',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={Strategy18} alt="Onboarding Carousels 1" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={Strategy19} alt="Onboarding Carousels 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={Strategy20} alt="Onboarding Carousels 3" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={Strategy21} alt="Onboarding Carousels 4" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    },
                    {
                      id: 'onboarding-types',
                      index: '02',
                      label: 'Onboarding Types',
                      content: (
                        <>
                          <Text subtitle="Onboarding Types" style="titleBase">
                            Description for onboarding types goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={Strategy25} alt="Onboarding Types 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy26} alt="Onboarding Types 2" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'navigation-explorations',
                      index: '03',
                      label: 'Navigation Explorations',
                      content: (
                        <>
                          <Text subtitle="Navigation Explorations" style="titleBase">
                            Description for navigation explorations goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={SharedImage01} alt="Navigation Explorations 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Navigation Explorations 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Navigation Explorations 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    }
                  ]}
                  defaultActiveId="onboarding-carousels"
                />
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
              id: 'sign-up-context-2',
              index: '01',
              title: 'User Motivation During Sign Up',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'sign-up-screen',
                      index: '01',
                      label: 'Sign Up Screen Carousel',
                      content: (
                        <>
                          <Text subtitle="Sign Up Screen Carousel" style="titleBase">
                            Description for sign up screen carousel goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <video src={Strategy01} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage01} alt="Sign up screen 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Sign up screen 3" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Sign up screen 4" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'sso-options',
                      index: '02',
                      label: 'SSO Sign Up Options',
                      content: (
                        <>
                          <Text subtitle="SSO Sign Up Options" style="titleBase">
                            Description for SSO sign up options goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={SharedImage01} alt="SSO options 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="SSO options 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="SSO options 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'email-signup',
                      index: '03',
                      label: 'Simplified Email Sign Up',
                      content: (
                        <>
                          <Text subtitle="Simplified Email Sign Up" style="titleBase">
                            Description for simplified email sign up goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={SharedImage01} alt="Email sign up 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Email sign up 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Email sign up 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'segmentation-survey',
                      index: '04',
                      label: 'Segmentation Survey',
                      content: (
                        <>
                          <Text subtitle="Segmentation Survey" style="titleBase">
                            Description for segmentation survey goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={Strategy33} alt="Segmentation survey 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy34} alt="Segmentation survey 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy35} alt="Segmentation survey 3" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy36} alt="Segmentation survey 4" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={Strategy37} alt="Segmentation survey 5" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    }
                  ]}
                  defaultActiveId="sign-up-screen"
                />
              )
            }
          ]
        },
        {
          id: 'onboarding-education-solution',
          index: '02',
          text: 'Guided Onboarding with In-App Education',
          slides: [
            {
              id: 'onboarding-education-solution-2',
              index: '01',
              title: 'Reworked Onboarding to Secure Retention',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'present-value-direction',
                      index: '01',
                      label: 'Present Value and Direction',
                      content: (
                        <>
                          <Text subtitle="Present Value and Direction" style="titleBase">
                            Description for present value and direction goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <video src={Strategy04} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Present Value and Direction 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Present Value and Direction 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'late-bind-onboarding',
                      index: '02',
                      label: 'Late Bind Onboarding',
                      content: (
                        <>
                          <Text subtitle="Late Bind Onboarding" style="titleBase">
                            Description for late bind onboarding goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={Strategy05} alt="Late Bind Onboarding 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Late Bind Onboarding 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Late Bind Onboarding 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'proper-redirection',
                      index: '04',
                      label: 'Proper Redirection',
                      content: (
                        <>
                          <Text subtitle="Proper Redirection" style="titleBase">
                            Description for proper redirection goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <video src={Strategy02} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                              </CarouselItem>
                              <CarouselItem>
                                <video src={Strategy03} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    }
                  ]}
                  defaultActiveId="present-value-direction"
                />
              )
            }
          ]
        },
        {
          id: 'trust-clarity-solution',
          index: '03',
          text: 'Earning Trust through Context and Clarity',
          slides: [
            {
              id: 'trust-clarity-solution-2',
              index: '01',
              title: 'Building Trust and Providing Context',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'introduce-kyc-context',
                      index: '01',
                      label: 'Introduce KYC to Provide Context',
                      content: (
                        <div style={{ flex: 1, minHeight: 0 }}>
                          <SlideCarousel height="100%" gap={16}>
                            <CarouselItem>
                              <img src={Strategy30} alt="Security 1" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage02} alt="Introduce KYC Context 2" />
                            </CarouselItem>
                            <CarouselItem>
                              <img src={SharedImage03} alt="Introduce KYC Context 3" />
                            </CarouselItem>
                          </SlideCarousel>
                        </div>
                      )
                    },
                    {
                      id: 'progressive-disclosure',
                      index: '02',
                      label: 'Progressive Disclosure',
                      content: (
                        <>
                          <Text subtitle="Progressive Disclosure" style="titleBase">
                            Description for progressive disclosure goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={Strategy22} alt="Progressive Disclosure 1" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'trust-signals',
                      index: '03',
                      label: 'Trust Signals',
                      content: (
                        <>
                          <Text subtitle="Trust Signals" style="titleBase">
                            Description for trust signals goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={SharedImage01} alt="Trust Signals 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Trust Signals 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Trust Signals 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    },
                    {
                      id: 'improved-fail-states',
                      index: '04',
                      label: 'Improved Fail States',
                      content: (
                        <>
                          <Text subtitle="Improved Fail States" style="titleBase">
                            Description for improved fail states goes here.
                          </Text>
                          <div style={{ flex: 1, minHeight: 0 }}>
                            <SlideCarousel height="100%" gap={16}>
                              <CarouselItem>
                                <img src={SharedImage01} alt="Improved Fail States 1" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage02} alt="Improved Fail States 2" />
                              </CarouselItem>
                              <CarouselItem>
                                <img src={SharedImage03} alt="Improved Fail States 3" />
                              </CarouselItem>
                            </SlideCarousel>
                          </div>
                        </>
                      )
                    }
                  ]}
                  defaultActiveId="introduce-kyc-context"
                />
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
                  Improving User Education and Building Trust During Onboarding to Increase User Growth
                </h2>
                <div className="casestudy-title-bottom">
                  <span className="S1">Portfolio</span>
                  <span className="S1">Design Work</span>
                </div>
              </div>
              <div className="casestudy-divider"></div>
              <p className="casestudy-description">
                We redesigned the sign-up and onboarding flow to reduce drop-off and improve activation. A late-binding approach provides context at key moments, educates users on features, and builds trust—lowering barriers and guiding users effectively from the start.
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
              <NavTabItem id="section5" index="05" title="Exploration" />
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

              {/* Body - right content area */}
              <Body
                ref={bodyRef}
                key={activeContentId}
                subsections={contentRegistry[activeContentId]?.subsections || []}
                activeSubsectionId={activeSubsectionId}
                activeSlideIndex={activeSlideIndex}
                slideDirection={slideDirection}
                onScroll={handleContentScroll}
                totalSlides={getTotalSlides()}
              />
            </motion.div>
          </ContentNavigator>
        </div>
      </div>
    </motion.div>
  );
};

export default PresentationContent;
