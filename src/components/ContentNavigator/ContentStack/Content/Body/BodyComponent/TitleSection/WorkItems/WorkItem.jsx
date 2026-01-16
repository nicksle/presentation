import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkItem.css';
import Icon from '../../../../../../../../components/Icon';
import { ICON_PATHS } from '../../../../../../../../utils/iconPaths';

// MediaItem component - handles individual media items (image or video)
const MediaItem = ({ img, video, alt, scale = 1 }) => {
  const style = {
    transform: `scale(${scale})`
  };

  if (video) {
    return (
      <video
        className="media-item"
        src={video}
        autoPlay
        loop
        muted
        playsInline
        style={style}
      />
    );
  } else if (img) {
    return <img src={img} alt={alt || ''} className="media-item" style={style} />;
  }
  return null;
};

// WorkItemThumbnail component - arranges multiple MediaItems with gradient or custom background
const WorkItemThumbnail = ({ thumbnails, background, index }) => {
  console.log('🎨 WorkItemThumbnail background:', background);
  return (
    <>
      {background && background.component && (
        // Render custom background component with wrapper for proper positioning
        <div className="work-item-gradient-background">
          {background.component}
        </div>
      )}
      {background && !background.component && (
        // Render traditional SVG gradient with wrapper
        <div className="work-item-gradient-background">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: background.startColor || '#667eea', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: background.endColor || '#764ba2', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill={`url(#gradient-${index})`} />
          </svg>
        </div>
      )}
      <div className="work-item-thumbnail-container">
        {thumbnails && thumbnails.map((item, idx) => (
          <MediaItem key={idx} img={item.img} video={item.video} alt={item.alt} scale={item.scale} />
        ))}
      </div>
    </>
  );
};

const WorkItem = ({ index, image, video, background, leftImage, rightImage, thumbnails, title, description, navigateTo, onCtaClick }) => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    console.log('🖱️ WorkItem handleCtaClick called');
    console.log('onCtaClick exists?', !!onCtaClick);
    console.log('navigateTo exists?', !!navigateTo);

    if (onCtaClick) {
      // Use custom click handler if provided
      console.log('Calling onCtaClick...');
      onCtaClick();
    } else if (navigateTo) {
      // Fall back to default navigation behavior
      console.log('Calling navigate with:', navigateTo);
      navigate(navigateTo);
    }
  };

  // Determine what to render in the media container
  const renderMedia = () => {
    // New thumbnails array prop takes priority
    if (thumbnails) {
      return (
        <WorkItemThumbnail
          thumbnails={thumbnails}
          background={background}
          index={index}
        />
      );
    }

    // Backward compatibility: convert old props to thumbnails format
    if (video || leftImage || rightImage) {
      const legacyThumbnails = [];
      if (leftImage) legacyThumbnails.push({ img: leftImage });
      if (video) legacyThumbnails.push({ video: video });
      if (rightImage) legacyThumbnails.push({ img: rightImage });

      return (
        <WorkItemThumbnail
          thumbnails={legacyThumbnails}
          background={background}
          index={index}
        />
      );
    }

    // Fallback to single image
    if (image) {
      return <img src={image} alt={title} />;
    }

    return null;
  };

  return (
    <div className="work-item-root">
      <div className="work-item-index S1">{index}</div>
      <div className="work-item-indent">
        <div className="work-item-card-frame" onClick={handleCtaClick}>
          <div className="work-item-card-head">
            <div className="work-item-image">
              {renderMedia()}
            </div>
            <div className="work-item-card-content">
              <div className="work-item-title H3">{title}</div>
              <div className="work-item-description B2">{description}</div>
            </div>
          </div>
          <div className="work-item-cta">
            <span className="work-item-cta-text S1">Read More</span>
            <span className="work-item-arrow">
              <Icon
                svgPath={ICON_PATHS.arrowRightSimple}
                size="small"
                className="work-item-arrow-icon"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkItem; 