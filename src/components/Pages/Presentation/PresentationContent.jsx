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
                      <img src={SharedImage01} alt="TANDA slide 1" />
                      <img src={SharedImage02} alt="TANDA slide 1b" />
                    </CarouselItem>
                    <CarouselItem>
                      <img src={SharedImage02} alt="TANDA slide 2" />
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
                  <SlideCarousel>
                    <CarouselItem>
                      <img src={SharedImage01} alt="Analytics slide 1" />
                    </CarouselItem>
                    <CarouselItem>
                      <img src={SharedImage02} alt="Analytics slide 2" />
                    </CarouselItem>
                  </SlideCarousel>
                  <TileRow>
                    <Tile
                      index="01"
                      title="Sign Up Rate"
                    />
                    <Tile
                      index="02"
                      title="Activation Rate"
                    />
                    <Tile
                      index="03"
                      title="Onboarding Time"
                    />
                  </TileRow>
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
                    title="Goal 1"
                    body="Description for goal 1"
                  />
                  <Tile
                    index="02"
                    title="Goal 2"
                    body="Description for goal 2"
                  />
                  <Tile
                    index="03"
                    title="Goal 3"
                    body="Description for goal 3"
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
                          <Text subtitle="Subtitle 01" style="H3">
                            Quick and dirty interviews content goes here.
                          </Text>
                          <Text subtitle="Subtitle 02" style="H3">
                            Quick and dirty interviews content goes here.
                          </Text>
                          <Text subtitle="Subtitle 03" style="H3">
                            Quick and dirty interviews content goes here.
                          </Text>
                          <Text subtitle="Subtitle 04" style="H3">
                            Quick and dirty interviews content goes here.
                          </Text>
                        </div>
                      )
                    },
                    {
                      id: 'formal',
                      index: '02',
                      label: 'Formal Interviews',
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                          <Text subtitle="Subtitle 01" style="H3">
                            Formal interviews content goes here.
                          </Text>
                          <Text subtitle="Subtitle 02" style="H3">
                            Formal interviews content goes here.
                          </Text>
                          <Text subtitle="Subtitle 03" style="H3">
                            Formal interviews content goes here.
                          </Text>
                          <Text subtitle="Subtitle 04" style="H3">
                            Formal interviews content goes here.
                          </Text>
                        </div>
                      )
                    },
                    {
                      id: 'survey',
                      index: '03',
                      label: 'User Survey',
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                          <Text subtitle="Subtitle 01" style="H3">
                            User survey content goes here.
                          </Text>
                          <Text subtitle="Subtitle 02" style="H3">
                            User survey content goes here.
                          </Text>
                          <Text subtitle="Subtitle 03" style="H3">
                            User survey content goes here.
                          </Text>
                          <Text subtitle="Subtitle 04" style="H3">
                            User survey content goes here.
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
                      title="Complex Registration Process"
                      bottomLeft={<span className="subtitle">Users found the account creation flow too long with too many required fields</span>}
                    />
                    <Tile
                      index="02"
                      title="Unclear Value Proposition"
                      bottomLeft={<span className="subtitle">Users didn't understand TANDA's benefits before being asked to sign up</span>}
                    />
                  </TileRow>
                  <TileRow>
                    <Tile
                      index="03"
                      title="Mobile Experience Issues"
                      bottomLeft={<span className="subtitle">Sign-up drop-off was significantly higher on mobile devices</span>}
                    />
                    <Tile
                      index="04"
                      title="Trust and Security Concerns"
                      bottomLeft={<span className="subtitle">Users hesitated to provide personal information without clear security indicators</span>}
                    />
                  </TileRow>
                  <TileRow>
                    <Tile
                      index="05"
                      title="Confusing Onboarding Flow"
                      bottomLeft={<span className="subtitle">Users who completed sign-up didn't know what to do next to reach their first transaction</span>}
                    />
                    <Tile
                      index="06"
                      title="Lack of Social Proof"
                      bottomLeft={<span className="subtitle">Users wanted to see testimonials or evidence that others successfully use TANDA</span>}
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
              title: 'UX Cam Session Overview',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'session-1',
                      index: '01',
                      label: 'Session 01',
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                          <Text subtitle="Subtitle 01" style="H3">
                            Session 01 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 02" style="H3">
                            Session 01 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 03" style="H3">
                            Session 01 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 04" style="H3">
                            Session 01 content goes here.
                          </Text>
                        </div>
                      )
                    },
                    {
                      id: 'session-2',
                      index: '02',
                      label: 'Session 02',
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                          <Text subtitle="Subtitle 01" style="H3">
                            Session 02 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 02" style="H3">
                            Session 02 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 03" style="H3">
                            Session 02 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 04" style="H3">
                            Session 02 content goes here.
                          </Text>
                        </div>
                      )
                    },
                    {
                      id: 'session-3',
                      index: '03',
                      label: 'Session 03',
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                          <Text subtitle="Subtitle 01" style="H3">
                            Session 03 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 02" style="H3">
                            Session 03 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 03" style="H3">
                            Session 03 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 04" style="H3">
                            Session 03 content goes here.
                          </Text>
                        </div>
                      )
                    }
                  ]}
                  defaultActiveId="session-1"
                />
              )
            },
            {
              id: 'ux-cam-session-2',
              index: '02',
              title: 'Takeaways and Findings',
              content: (
                <BodyComponent key="ux-cam-session-2" style={{ gridTemplateColumns: '1fr' }}>
                  <TileRow>
                    <Tile
                      index="01"
                      title="Finding Title 01"
                      bottomLeft={<span className="subtitle">Finding description goes here</span>}
                    />
                    <Tile
                      index="02"
                      title="Finding Title 02"
                      bottomLeft={<span className="subtitle">Finding description goes here</span>}
                    />
                  </TileRow>
                  <TileRow>
                    <Tile
                      index="03"
                      title="Finding Title 03"
                      bottomLeft={<span className="subtitle">Finding description goes here</span>}
                    />
                    <Tile
                      index="04"
                      title="Finding Title 04"
                      bottomLeft={<span className="subtitle">Finding description goes here</span>}
                    />
                  </TileRow>
                  <TileRow>
                    <Tile
                      index="05"
                      title="Finding Title 05"
                      bottomLeft={<span className="subtitle">Finding description goes here</span>}
                    />
                    <Tile
                      index="06"
                      title="Finding Title 06"
                      bottomLeft={<span className="subtitle">Finding description goes here</span>}
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
                    <img src={SharedImage01} alt="Persona 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Persona 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Persona 3" />
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
              id: 'user-flow-audit-1',
              index: '01',
              title: 'Overview',
              content: (
                <TabPanel
                  items={[
                    {
                      id: 'sign-up-flow',
                      index: '01',
                      label: 'Sign-Up Flow',
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                          <Text subtitle="Subtitle 01" style="H3">
                            Sign-up flow content goes here.
                          </Text>
                          <Text subtitle="Subtitle 02" style="H3">
                            Sign-up flow content goes here.
                          </Text>
                          <Text subtitle="Subtitle 03" style="H3">
                            Sign-up flow content goes here.
                          </Text>
                          <Text subtitle="Subtitle 04" style="H3">
                            Sign-up flow content goes here.
                          </Text>
                        </div>
                      )
                    },
                    {
                      id: 'onboarding-flow',
                      index: '02',
                      label: 'Onboarding Flow',
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                          <Text subtitle="Subtitle 01" style="H3">
                            Onboarding flow content goes here.
                          </Text>
                          <Text subtitle="Subtitle 02" style="H3">
                            Onboarding flow content goes here.
                          </Text>
                          <Text subtitle="Subtitle 03" style="H3">
                            Onboarding flow content goes here.
                          </Text>
                          <Text subtitle="Subtitle 04" style="H3">
                            Onboarding flow content goes here.
                          </Text>
                        </div>
                      )
                    },
                    {
                      id: 'transaction-flow',
                      index: '03',
                      label: 'Transaction Flow',
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                          <Text subtitle="Subtitle 01" style="H3">
                            Transaction flow content goes here.
                          </Text>
                          <Text subtitle="Subtitle 02" style="H3">
                            Transaction flow content goes here.
                          </Text>
                          <Text subtitle="Subtitle 03" style="H3">
                            Transaction flow content goes here.
                          </Text>
                          <Text subtitle="Subtitle 04" style="H3">
                            Transaction flow content goes here.
                          </Text>
                        </div>
                      )
                    }
                  ]}
                  defaultActiveId="sign-up-flow"
                />
              )
            },
            {
              id: 'user-flow-audit-2',
              index: '02',
              title: 'User Flow Walkthrough',
              content: (
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="User Flow 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="User Flow 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="User Flow 3" />
                  </CarouselItem>
                </SlideCarousel>
              )
            },
            {
              id: 'user-flow-audit-3',
              index: '03',
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
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Unclear Email Sign Up 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Unclear Email Sign Up 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Unclear Email Sign Up 3" />
                  </CarouselItem>
                </SlideCarousel>
              )
            },
            {
              id: 'technical-friction-2',
              index: '02',
              title: 'Bugs that Prevented Successful Sign Ups',
              content: (
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Bugs 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Bugs 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Bugs 3" />
                  </CarouselItem>
                </SlideCarousel>
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
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="KYC Trust Issues 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="KYC Trust Issues 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="KYC Trust Issues 3" />
                  </CarouselItem>
                </SlideCarousel>
              )
            },
            {
              id: 'trust-barriers-2',
              index: '02',
              title: 'Value Proposition Gaps',
              content: (
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Value Proposition Gaps 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Value Proposition Gaps 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Value Proposition Gaps 3" />
                  </CarouselItem>
                </SlideCarousel>
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
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Onboarding Carousel 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Onboarding Carousel 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Onboarding Carousel 3" />
                  </CarouselItem>
                </SlideCarousel>
              )
            },
            {
              id: 'lack-of-guidance-2',
              index: '02',
              title: 'Unclear Navigation and Direction',
              content: (
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Navigation Issues 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Navigation Issues 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Navigation Issues 3" />
                  </CarouselItem>
                </SlideCarousel>
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
                      id: 'value-prop-1',
                      index: '01',
                      label: 'Value Proposition 01',
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                          <Text subtitle="Subtitle 01" style="H3">
                            Value proposition 01 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 02" style="H3">
                            Value proposition 01 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 03" style="H3">
                            Value proposition 01 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 04" style="H3">
                            Value proposition 01 content goes here.
                          </Text>
                        </div>
                      )
                    },
                    {
                      id: 'value-prop-2',
                      index: '02',
                      label: 'Value Proposition 02',
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                          <Text subtitle="Subtitle 01" style="H3">
                            Value proposition 02 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 02" style="H3">
                            Value proposition 02 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 03" style="H3">
                            Value proposition 02 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 04" style="H3">
                            Value proposition 02 content goes here.
                          </Text>
                        </div>
                      )
                    },
                    {
                      id: 'value-prop-3',
                      index: '03',
                      label: 'Value Proposition 03',
                      content: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                          <Text subtitle="Subtitle 01" style="H3">
                            Value proposition 03 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 02" style="H3">
                            Value proposition 03 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 03" style="H3">
                            Value proposition 03 content goes here.
                          </Text>
                          <Text subtitle="Subtitle 04" style="H3">
                            Value proposition 03 content goes here.
                          </Text>
                        </div>
                      )
                    }
                  ]}
                  defaultActiveId="value-prop-1"
                />
              )
            },
            {
              id: 'value-props-trust-2',
              index: '02',
              title: 'Trust Signals Brainstorm',
              content: (
                <BodyComponent key="value-props-trust-2" style={{ gridTemplateColumns: '1fr' }}>
                  <Text style="B1">
                    Trust signals brainstorm content goes here.
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
              title: 'Identify Points of Need',
              content: (
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Points of need 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Points of need 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Points of need 3" />
                  </CarouselItem>
                </SlideCarousel>
              )
            },
            {
              id: 'education-guidance-2',
              index: '02',
              title: 'Exploring Education Options',
              content: (
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Education options 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Education options 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Education options 3" />
                  </CarouselItem>
                </SlideCarousel>
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
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Sign up options 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Sign up options 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Sign up options 3" />
                  </CarouselItem>
                </SlideCarousel>
              )
            },
            {
              id: 'sign-up-flow-2',
              index: '02',
              title: 'Sign Up Flow Rearrangement',
              content: (
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Sign up flow 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Sign up flow 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Sign up flow 3" />
                  </CarouselItem>
                </SlideCarousel>
              )
            },
            {
              id: 'sign-up-flow-3',
              index: '03',
              title: 'Add User Segmentation Survey',
              content: (
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Segmentation survey 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Segmentation survey 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Segmentation survey 3" />
                  </CarouselItem>
                </SlideCarousel>
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
              title: 'Overview',
              content: (
                <BodyComponent key="sign-up-context-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text style="B1">
                    Overview content goes here.
                  </Text>
                </BodyComponent>
              )
            },
            {
              id: 'sign-up-context-2',
              index: '02',
              title: 'Sign Up Screen Carousel',
              content: (
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Sign up screen 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Sign up screen 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Sign up screen 3" />
                  </CarouselItem>
                </SlideCarousel>
              )
            },
            {
              id: 'sign-up-context-3',
              index: '03',
              title: 'Sign Up Options',
              content: (
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Sign up options 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Sign up options 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Sign up options 3" />
                  </CarouselItem>
                </SlideCarousel>
              )
            },
            {
              id: 'sign-up-context-4',
              index: '04',
              title: 'Simplified Email Sign Up',
              content: (
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
              )
            },
            {
              id: 'sign-up-context-5',
              index: '05',
              title: 'Segmentation Survey',
              content: (
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Segmentation survey 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Segmentation survey 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Segmentation survey 3" />
                  </CarouselItem>
                </SlideCarousel>
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
              title: 'Overview',
              content: (
                <BodyComponent key="trust-barriers-solution-1" style={{ gridTemplateColumns: '1fr' }}>
                  <Text style="B1">
                    Overview content goes here.
                  </Text>
                </BodyComponent>
              )
            },
            {
              id: 'trust-barriers-solution-2',
              index: '02',
              title: 'Integrate Education In-App',
              content: (
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Education in-app 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Education in-app 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Education in-app 3" />
                  </CarouselItem>
                </SlideCarousel>
              )
            },
            {
              id: 'trust-barriers-solution-3',
              index: '03',
              title: 'Reworked Onboarding',
              content: (
                <SlideCarousel height="100%" gap={16}>
                  <CarouselItem>
                    <img src={SharedImage01} alt="Reworked onboarding 1" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage02} alt="Reworked onboarding 2" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={SharedImage03} alt="Reworked onboarding 3" />
                  </CarouselItem>
                </SlideCarousel>
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
