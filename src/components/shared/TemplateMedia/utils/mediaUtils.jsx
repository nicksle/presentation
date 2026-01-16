/**
 * Check if a source is a video based on file extension
 * @param {string} src - The media source URL
 * @returns {boolean} - True if source is a video
 */
export const isVideo = (src) => {
  if (!src) return false;
  const videoExtensions = ['.mp4', '.mov', '.webm', '.ogg', '.avi'];
  return videoExtensions.some(ext => src.toLowerCase().endsWith(ext));
};

/**
 * Media component that renders either img or video based on source
 * @param {Object} props - Component props
 * @param {string} props.src - Media source
 * @param {string} props.alt - Alt text
 * @param {string} props.className - CSS class name
 * @param {Object} props.style - Inline styles
 * @param {boolean} props.autoPlay - Auto play videos (default: true)
 * @param {boolean} props.loop - Loop videos (default: true)
 * @param {boolean} props.muted - Mute videos (default: true)
 * @returns {JSX.Element} - img or video element
 */
export const Media = ({
  src,
  alt = '',
  className = '',
  style = {},
  autoPlay = true,
  loop = true,
  muted = true
}) => {
  if (isVideo(src)) {
    return (
      <video
        src={src}
        className={className}
        style={style}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
    />
  );
};
