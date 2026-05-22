import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Livedarshan.css';
import heroImage from '../../assets/home3.JPG';
import { useLanguage } from '../../LanguageContext';
import Hls from 'hls.js';

// Background audio from public folder - provide multiple formats for cross-browser compatibility
const bgAudioMp3 = process.env.PUBLIC_URL + '/livebg.mp3';
const bgAudioOgg = process.env.PUBLIC_URL + '/livebg.ogg';
const bgAudioM4a = process.env.PUBLIC_URL + '/livebg.m4a';

const LiveDarshan = () => {
  const { isMarathi } = useLanguage();
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Initialize audio for Safari and all browsers
  const initializeAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties
    audio.volume = 0.5;
    audio.loop = true;
    
    // For Safari: load the audio to prepare it
    audio.load();
  }, []);

  // Toggle audio play/pause - requires user interaction for Safari
  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.pause();
      setIsAudioPlaying(false);
    } else {
      // For Safari: we need to set properties before playing
      audio.volume = 0.5;
      
      // Use the play promise pattern for cross-browser compatibility
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsAudioPlaying(true);
          })
          .catch((error) => {
            console.log('Audio play failed:', error);
            // For Safari: try playing with user gesture context
            // The user has already clicked, so this should work
            setTimeout(() => {
              audio.play()
                .then(() => setIsAudioPlaying(true))
                .catch(err => console.log('Retry play failed:', err));
            }, 100);
          });
      }
    }
  }, [isAudioPlaying]);

  // Handle audio ended/error events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      // Audio is set to loop, but just in case
      if (isAudioPlaying) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };

    const handleError = (e) => {
      console.log('Audio error:', e);
      setIsAudioPlaying(false);
    };

    const handlePause = () => {
      // Only update state if we didn't trigger the pause
      if (!audio.ended) {
        setIsAudioPlaying(false);
      }
    };

    const handlePlay = () => {
      setIsAudioPlaying(true);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, [isAudioPlaying]);

  // Initialize audio on component mount
  useEffect(() => {
    initializeAudio();
  }, [initializeAudio]);

  useEffect(() => {
    const video = videoRef.current;
    
    // Use proxy URL for production to avoid CORS/SSL issues
    const isProduction = window.location.hostname !== 'localhost';
    const streamUrl = isProduction 
      ? `${window.location.origin}/pooja-backend/stream_proxy.php`  // Uses current domain automatically
      : 'http://82.112.226.74/cctv/live.m3u8';

    // Keep video always muted (especially important for iOS Safari)
    video.muted = true;
    video.volume = 0;
    video.defaultMuted = true;
    video.setAttribute('muted', '');

    // Ensure muted stays on even if user tries to unmute
    const keepMuted = () => {
      video.muted = true;
      video.volume = 0;
    };
    video.addEventListener('volumechange', keepMuted);

    if (Hls.isSupported()) {
      const hls = new Hls({
        lowLatencyMode: true,
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      return () => {
        video.removeEventListener('volumechange', keepMuted);
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari support
      video.src = streamUrl;
      return () => {
        video.removeEventListener('volumechange', keepMuted);
      };
    }
  }, []);

  return (
    <div className="live-darshan-container">
      {/* Hero Image Section */}
      <section className="live-darshan-hero-section">
        <img src={heroImage} alt="Live Darshan" className="live-darshan-image" />
        <div className="live-darshan-overlay"></div>
        <div className="live-darshan-content">
          <h1 className="live-darshan-title">
            {isMarathi ? "काळेश्वरी मंदिर लाईव्ह दर्शन" : "Kaleshwari Mandir Live Darshan"}
          </h1>
          <p className="live-darshan-subtitle">
            {isMarathi
              ? "काळेश्वरी मातेचे लाईव्ह दर्शन घ्या"
              : "Experience Live Darshan of Kaleshwari Mata"}
          </p>
        </div>
      </section>

      {/* Live CCTV Stream Section */}
      <section className="youtube-live-section">
        <div className="youtube-section-header">
          <h2 className="youtube-section-title">
            {isMarathi ? "लाईव्ह दर्शन" : "Live Darshan"}
          </h2>
          <p className="youtube-section-description">
            {isMarathi
              ? "काळेश्वरी मातेचे थेट दर्शन घ्या आणि आशीर्वाद मिळवा"
              : "Watch live darshan of Kaleshwari Mata and receive blessings"}
          </p>
        </div>

        <div className="video-wrapper">
          <div className="video-container">
            <video
              ref={videoRef}
              controls
              autoPlay
              muted={true}
              defaultMuted
              playsInline
              webkit-playsinline="true"
              className="live-video"
            />
          </div>
          <div className="video-status">
            <span className="live-indicator"></span>
            <span className="live-text">{isMarathi ? "लाईव्ह" : "LIVE"}</span>
          </div>

          {/* Audio Control Button - Required for Safari */}
          <div className="audio-control-container">
            <button 
              className={`audio-control-btn ${isAudioPlaying ? 'playing' : ''}`}
              onClick={toggleAudio}
              aria-label={isAudioPlaying ? 'Pause Bhajan' : 'Play Bhajan'}
            >
              <span className="audio-icon">
                {isAudioPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                )}
              </span>
              <span className="audio-text">
                {isAudioPlaying 
                  ? (isMarathi ? "भजन थांबवा" : "Pause Bhajan") 
                  : (isMarathi ? "भजन ऐका" : "Play Bhajan")}
              </span>
            </button>
          </div>

          {/* Audio Element for Background Bhajan - Multiple formats for cross-browser support */}
          <audio
            ref={audioRef}
            loop
            preload="auto"
            playsInline
            webkit-playsinline="true"
          >
            {/* MP3 for most browsers */}
            <source src={bgAudioMp3} type="audio/mpeg" />
            {/* M4A/AAC for Safari */}
            <source src={bgAudioM4a} type="audio/mp4" />
            <source src={bgAudioM4a} type="audio/x-m4a" />
            <source src={bgAudioM4a} type="audio/aac" />
            {/* OGG for Firefox */}
            <source src={bgAudioOgg} type="audio/ogg" />
            {/* Fallback */}
            Your browser does not support the audio element.
          </audio>
        </div>
      </section>
    </div>
  );
};

export default LiveDarshan;
