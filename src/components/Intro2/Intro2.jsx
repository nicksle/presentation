import React, { useState } from 'react';
import './Intro2.css';
import IconImgSwapCell from '../IconImgSwapCell/IconImgSwapCell';
import SF01 from '../../assets/Intro2/SF/SF01.jpg';
import SF02 from '../../assets/Intro2/SF/SF02.jpg';
import SF03 from '../../assets/Intro2/SF/SF03.jpg';
import HowImFeelingNow from '../../assets/Intro2/Albums/how-im-feeling-now.png';
import NFR from '../../assets/Intro2/Albums/nfr.png';
import Brat from '../../assets/Intro2/Albums/brat.png';
import Evermore from '../../assets/Intro2/Albums/evermore.png';
import CowboyCarter from '../../assets/Intro2/Albums/cowboy-carter.jpg';
import QR01 from '../../assets/Intro2/QR01.jpg';
import CAT01 from '../../assets/Intro2/Cat/CAT01.jpg';
import CAT02 from '../../assets/Intro2/Cat/CAT02.jpg';
import CAT03 from '../../assets/Intro2/Cat/CAT03.jpg';
import CAT04 from '../../assets/Intro2/Cat/CAT04.jpg';
import CAT05 from '../../assets/Intro2/Cat/CAT05.jpg';
import Art01 from '../../assets/Intro2/SF/Art/3AM.png';
import Cloud1 from '../../assets/Intro2/Clouds/Front/Cloud1.svg';
import Cloud2 from '../../assets/Intro2/Clouds/Front/Cloud2.svg';
import Cloud3 from '../../assets/Intro2/Clouds/Front/Cloud3.svg';
import Cloud1Back from '../../assets/Intro2/Clouds/Back/Cloud1.svg';
import Cloud2Back from '../../assets/Intro2/Clouds/Back/Cloud2.svg';

const Intro2 = () => {
  const sfImages = [SF01, SF02, SF03];
  const [currentSFImage, setCurrentSFImage] = useState(sfImages[Math.floor(Math.random() * sfImages.length)]);

  const catImages = [CAT01, CAT02, CAT03, CAT04, CAT05];
  const [currentCatImage, setCurrentCatImage] = useState(catImages[Math.floor(Math.random() * catImages.length)]);

  const handleSFHover = () => {
    // Get a random image that's different from the current one
    let newImage;
    do {
      newImage = sfImages[Math.floor(Math.random() * sfImages.length)];
    } while (newImage === currentSFImage && sfImages.length > 1);

    setCurrentSFImage(newImage);
  };

  const handleCatHover = () => {
    // Get a random image that's different from the current one
    let newImage;
    do {
      newImage = catImages[Math.floor(Math.random() * catImages.length)];
    } while (newImage === currentCatImage && catImages.length > 1);

    setCurrentCatImage(newImage);
  };

  // Music cell songs
  const songs = [
    { title: "party 4 u", artist: "Charli XCX", albumArt: HowImFeelingNow },
    { title: "hope is a dangerous thing for a woman like me to have - but i have it", artist: "Lana Del Rey", albumArt: NFR },
    { title: "360", artist: "Charli XCX", albumArt: Brat },
    { title: "cowboy like me", artist: "Taylor Swift", albumArt: Evermore },
    { title: "II HANDS II HEAVEN", artist: "Beyoncé", albumArt: CowboyCarter }
  ];
  const [currentSong] = useState(songs[Math.floor(Math.random() * songs.length)]);

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="grainNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend mode="multiply" in="SourceGraphic" />
          </filter>
        </defs>
      </svg>
      <div className="intro2-section">
      {/* Row 1 */}
      <div className="grid-cell text-r1">
        <p className="text-r1-text">I'm a product designer</p>
        <div className="artboard-frame">
          <div className="artboard-border"></div>
          <div className="corner-point point-tl"></div>
          <div className="corner-point point-tr"></div>
          <div className="corner-point point-bl"></div>
          <div className="corner-point point-br"></div>
          <div className="dimension-label">
            <span className="dimension-text">2 x 2</span>
            <span className="dimension-text-hover">686 x 100</span>
          </div>
        </div>
      </div>
      <div className="grid-cell blank-r1-c6"></div>
      <div className="grid-cell image-r1r2">
        <span>Image</span>
      </div>

      {/* Row 2 */}
      <div className="grid-cell blank-r2-c1">
        <IconImgSwapCell
          cellId="QR"
          icon={
            <svg
              width="80"
              height="80"
              viewBox="0 0 100 86.6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="50,86.6 0,0 100,0" fill="#FF69B4"/>
            </svg>
          }
          image={QR01}
          imageAlt="QR Code"
        />
      </div>
      <div className="grid-cell blank-r2-c2">
        <IconImgSwapCell
          cellId="Art"
          icon={
            <svg
              width="70"
              height="70"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Artist palette shape */}
              <ellipse cx="35" cy="40" rx="28" ry="24" fill="currentColor"/>
              {/* Thumb hole */}
              <ellipse cx="56" cy="48" rx="8" ry="7" fill="#0e0e10"/>
              {/* Paint blobs */}
              <circle cx="28" cy="32" r="4" fill="#0e0e10"/>
              <circle cx="40" cy="28" r="4" fill="#0e0e10"/>
              <circle cx="24" cy="44" r="4" fill="#0e0e10"/>
              <circle cx="38" cy="48" r="4" fill="#0e0e10"/>
            </svg>
          }
          image={Art01}
          imageAlt="Art"
        />
      </div>
      <div className="grid-cell text-r2" id="QRCR">
        {"queer creative".split('').map((char, index) =>
          char === ' '
            ? <span key={index} className="space">{char}</span>
            : <span key={index} className="char">{char}</span>
        )}
      </div>

      {/* Row 3 */}
      <div className="grid-cell blank-r3-c1">
        <span>&</span>
      </div>
      <div className="grid-cell text-r3" id="Music">
        <div className="text-r3-content">
          <span className="music-default-text">
            pop music enthusiast
          </span>
          <span className="music-now-playing">
            Now Playing: {currentSong.title}·{currentSong.artist}
          </span>
        </div>
      </div>
      <div className="grid-cell blank-r3-c7" id="Album1">
        <div className="record"></div>
        <div className="album-image">
          {currentSong.albumArt ? (
            <img src={currentSong.albumArt} alt={`${currentSong.title} by ${currentSong.artist}`} />
          ) : (
            <div className="album-placeholder"></div>
          )}
        </div>
      </div>
      <div className="grid-cell blank-r3-c8"></div>

      {/* Row 4 */}
      <div className="grid-cell blank-r4-c1">
        <IconImgSwapCell
          cellId="Cat"
          icon={
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Cat face */}
              <circle cx="30" cy="30" r="20" fill="currentColor"/>
              {/* Left ear */}
              <path d="M15 15 L10 5 L20 12 Z" fill="currentColor"/>
              {/* Right ear */}
              <path d="M45 15 L50 5 L40 12 Z" fill="currentColor"/>
              {/* Left eye */}
              <circle cx="23" cy="28" r="3" fill="#0e0e10"/>
              {/* Right eye */}
              <circle cx="37" cy="28" r="3" fill="#0e0e10"/>
              {/* Nose */}
              <path d="M30 33 L28 36 L32 36 Z" fill="#0e0e10"/>
              {/* Mouth */}
              <path d="M30 36 Q25 40 20 38" stroke="#0e0e10" strokeWidth="1.5" fill="none"/>
              <path d="M30 36 Q35 40 40 38" stroke="#0e0e10" strokeWidth="1.5" fill="none"/>
              {/* Whiskers */}
              <line x1="10" y1="30" x2="18" y2="29" stroke="currentColor" strokeWidth="1"/>
              <line x1="10" y1="34" x2="18" y2="33" stroke="currentColor" strokeWidth="1"/>
              <line x1="50" y1="30" x2="42" y2="29" stroke="currentColor" strokeWidth="1"/>
              <line x1="50" y1="34" x2="42" y2="33" stroke="currentColor" strokeWidth="1"/>
            </svg>
          }
          image={currentCatImage}
          imageAlt="Cat photo"
          onHover={handleCatHover}
        />
      </div>
      <div className="grid-cell blank-r4-c2"></div>
      <div className="grid-cell blank-r4-c3">
        <IconImgSwapCell
          cellId="SF"
          icon={
            <svg
              width="80"
              height="60"
              viewBox="0 0 80 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Golden Gate Bridge simplified icon */}
              {/* Left tower */}
              <rect x="15" y="15" width="4" height="30" fill="currentColor"/>
              {/* Right tower */}
              <rect x="61" y="15" width="4" height="30" fill="currentColor"/>
              {/* Bridge deck */}
              <rect x="0" y="40" width="80" height="3" fill="currentColor"/>
              {/* Suspension cables - main arc */}
              <path d="M15 20 Q40 10 65 20" stroke="currentColor" strokeWidth="2" fill="none"/>
              {/* Vertical suspension cables */}
              <line x1="25" y1="15" x2="25" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
              <line x1="35" y1="11" x2="35" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
              <line x1="45" y1="11" x2="45" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
              <line x1="55" y1="15" x2="55" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
            </svg>
          }
          image={currentSFImage}
          imageAlt="San Francisco"
          onHover={handleSFHover}
        />
      </div>
      <div className="grid-cell text-r4" id="Location">
        <div className="clouds-back">
          <img src={Cloud2Back} alt="" className="cloud cloud-2" />
          <img src={Cloud1Back} alt="" className="cloud cloud-1" />
        </div>
        <div className="text">
          <span className="text-prefix">based in </span>
          <span className="text-location">San Francisco</span>
        </div>
        <div className="clouds-front">
          <img src={Cloud1} alt="" className="cloud cloud-1" />
          <img src={Cloud2} alt="" className="cloud cloud-2" />
          <img src={Cloud3} alt="" className="cloud cloud-3" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Intro2;
