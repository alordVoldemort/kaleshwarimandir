import React, { useEffect, useRef, useState, useCallback } from "react";
import "./AboutTempleData.css";
import { useLanguage } from "../../LanguageContext";

const cdnPath = "https://zonixtec.com/cdn/";

const initialImages = [
  { original: `${cdnPath}mata44.webp` },
  { original: `${cdnPath}mata88.webp` },
  { original: `${cdnPath}mata111.webp` },
  { original: `${cdnPath}maashiv3.webp` },
  { original: `${cdnPath}home3.JPG` },
  { original: `${cdnPath}IMG_7181.webp` },
];

const AboutTempleData = () => {
  const galleryTitleRef = useRef();
  const gallerySectionRef = useRef();
  const { isMarathi } = useLanguage();
  const [images, setImages] = useState(initialImages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isMainImageLoading, setIsMainImageLoading] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState(new Set());
  const [isSectionLoading, setIsSectionLoading] = useState(true);
  const [thumbPage, setThumbPage] = useState(0);
  const thumbsPerPage = 6;

  useEffect(() => {
    const fetchBackendImages = async () => {
      try {
        const res = await fetch("https://kaleshwarimandirannadanchhatra.org/pooja-backend/getImages.php");
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const backendImgs = data.data.map(img => `https://kaleshwarimandirannadanchhatra.org/pooja-backend/uploads/${img.filename}`);
          const uniqueImgs = [...new Set([...backendImgs, ...initialImages.map(i => i.original)])];
          setImages(uniqueImgs.map(url => ({ original: url })));
        }
      } catch (err) {
        console.error("Error fetching uploaded images:", err);
      }
    };

    fetchBackendImages();
  }, []);

  useEffect(() => {
    if (showLightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLightbox]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSectionLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const preloadImage = (src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setPreloadedImages(prev => new Set(prev).add(src));
      };
    };
    if (images.length) {
      preloadImage(images[0].original);
      preloadImage(images[1 % images.length].original);
      preloadImage(images[(images.length - 1) % images.length].original);
    }
  }, [images]);

  useEffect(() => {
    const preloadImage = (src) => {
      if (!preloadedImages.has(src)) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setPreloadedImages(prev => new Set(prev).add(src));
        };
      }
    };
    if (images.length) {
      preloadImage(images[(currentIndex + 1) % images.length].original);
      preloadImage(images[(currentIndex - 1 + images.length) % images.length].original);
    }
  }, [currentIndex, images, preloadedImages]);

  useEffect(() => {
    const titleEl = galleryTitleRef.current;
    const sectionEl = gallerySectionRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("animate");
      });
    }, { threshold: 0.1 });

    if (titleEl) observer.observe(titleEl);
    if (sectionEl) observer.observe(sectionEl);

    return () => {
      if (titleEl) observer.unobserve(titleEl);
      if (sectionEl) observer.unobserve(sectionEl);
    };
  }, []);

  const goToNext = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isAnimating, images.length]);

  const goToPrev = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isAnimating, images.length]);

  const goToImage = (index) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const openLightbox = () => setShowLightbox(true);
  const closeLightbox = () => setShowLightbox(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showLightbox) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") goToNext();
        if (e.key === "ArrowLeft") goToPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showLightbox, currentIndex, goToNext, goToPrev]);

  const handleImageLoad = () => setIsMainImageLoading(false);
  useEffect(() => setIsMainImageLoading(true), [currentIndex]);

  const startIdx = thumbPage * thumbsPerPage;
  const endIdx = startIdx + thumbsPerPage;
  const pagedThumbs = images.slice(startIdx, endIdx);

  return (
    <div className="temple-about-wrapper">
      <div className="temple-gallery-bg">
        {isSectionLoading ? (
          <div className="temple-section-skeleton">
            <div className="temple-skeleton-header" />
            <div className="temple-skeleton-main" />
            <div className="temple-skeleton-thumbs">
              {Array(9).fill().map((_, i) => (
                <div key={i} className="temple-skeleton-thumb" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="temple-svg-background">
              <svg viewBox="0 0 100 100" className="temple-svg-1">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" strokeOpacity="0.1" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#d4af37" strokeOpacity="0.1" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="#d4af37" strokeOpacity="0.1" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="15" fill="none" stroke="#d4af37" strokeOpacity="0.1" strokeWidth="0.5" />
              </svg>
              <svg viewBox="0 0 100 100" className="temple-svg-3">
                <path d="M50,15 Q55,5 60,15 T70,15 T80,20 T85,30 T80,40 T70,45 T60,45 T55,50 T50,45 T45,50 T40,45 T30,45 T20,40 T15,30 T20,20 T30,15 T40,15 T45,5 Z" fill="none" stroke="#d4af37" strokeOpacity="0.08" strokeWidth="0.6" />
              </svg>
            </div>

            <div className="temple-divine-light"></div>

            <div className="temple-gallery-section" ref={gallerySectionRef}>
              <div className="temple-gallery-heading">
                <div className="temple-gallery-title-container">
                  <h1 className="temple-glow-title" ref={galleryTitleRef}>
                    {isMarathi ? "मंदिर गॅलरी" : "TEMPLE GALLERY"}
                  </h1>
                  <div className="temple-title-decoration">
                    <div className="temple-title-line"></div>
                    <div className="temple-title-icon">🕉️</div>
                    <div className="temple-title-line"></div>
                  </div>
                  <p className="temple-subtitle">
                    {isMarathi ? "काळेश्वरी मंदिराच्या दिव्य क्षणांचे दर्शन" : "Divine moments at Kaleshwari Temple"}
                  </p>
                </div>
              </div>

              <div className="temple-gallery-container">
                <div className="temple-main-preview" onClick={openLightbox}>
                  <div className="temple-gold-frame">
                    {isMainImageLoading && (
                      <div className="temple-image-loading">
                        <div className="temple-loading-spinner"></div>
                      </div>
                    )}
                    <img
                      src={images[currentIndex].original}
                      alt="Main Temple"
                      className={`temple-active-img ${isMainImageLoading ? 'temple-img-hidden' : ''}`}
                      onLoad={handleImageLoad}
                    />
                    <div className="temple-image-overlay"></div>
                  </div>
                </div>

                <div className="temple-thumbnail-grid">
                  {pagedThumbs.map((img, idx) => {
                    const realIndex = startIdx + idx;
                    return (
                      <div
                        key={realIndex}
                        className={`temple-thumbnail ${realIndex === currentIndex ? "active" : ""}`}
                        onClick={() => goToImage(realIndex)}
                      >
                        <img
                          src={img.original}
                          alt={`Thumb ${realIndex + 1}`}
                          className="temple-thumb-img"
                          loading="lazy"
                        />
                        <div className="temple-thumb-overlay">
                          <span>{realIndex + 1}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="temple-pagination-controls">
                  <button onClick={() => setThumbPage((p) => Math.max(0, p - 1))} disabled={thumbPage === 0}>Prev Page</button>
                  <button onClick={() => setThumbPage((p) => (endIdx < images.length ? p + 1 : p))} disabled={endIdx >= images.length}>Next Page</button>
                </div>
              </div>

              <div className="temple-carousel-controls">
                <button className="temple-carousel-button temple-carousel-prev" onClick={goToPrev}>&lt;</button>
                <div className="temple-indicators">
                  {currentIndex + 1} / {images.length}
                </div>
                <button className="temple-carousel-button temple-carousel-next" onClick={goToNext}>&gt;</button>
              </div>
            </div>
          </>
        )}
      </div>

      {showLightbox && (
        <div className="temple-lightbox" onClick={closeLightbox}>
          <div className="temple-lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="temple-lightbox-close" onClick={closeLightbox}>&times;</button>
            <img
              src={images[currentIndex].original}
              alt="Fullscreen Temple"
              className="temple-lightbox-img"
            />
            <div className="temple-lightbox-controls">
              <button className="temple-lightbox-prev" onClick={goToPrev}>&lt;</button>
              <button className="temple-lightbox-next" onClick={goToNext}>&gt;</button>
            </div>
            <div className="temple-lightbox-indicator">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutTempleData;
