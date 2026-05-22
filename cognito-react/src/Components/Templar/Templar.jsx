import React, { useState, useEffect, useRef } from 'react';
import './Templar.css';
import archImage1 from '../../assets/Artitech.jpg';
import archImage2 from '../../assets/Temple.jpg';
import archImage3 from '../../assets/Temple2.jpg';
import mainSectionImage from '../../assets/main.webp';
import mandirBg from '../../assets/stone-texture-light.webp';
import { useLanguage } from '../../LanguageContext';

const Templar = () => {
  const { isMarathi } = useLanguage();
  const [showOpening, setShowOpening] = useState(true);
  const [lettersVisible, setLettersVisible] = useState(0);
  const [crackStage, setCrackStage] = useState(0);
  const [elementsVisible, setElementsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentHeaderSlide, setCurrentHeaderSlide] = useState(0);
   // eslint-disable-next-line
  const [sectionTitleVisible, setSectionTitleVisible] = useState(false);
  const titleRef = useRef(null);

  const openingTitle = isMarathi ? 'मंदिराची वास्तुकला' : 'Temple Architecture';
   // eslint-disable-next-line
  const sectionTitle = isMarathi ? 'मंदिराची वास्तुकला' : 'Temple Architecture';

  const images = [archImage1, archImage2, archImage3];
  const captions = [];

  const headerSlides = [
    {
      title: isMarathi ? 'मंदिराची वास्तुकला' : ' Temple Architecture',
      bgImage: mainSectionImage
    },
  ];

  // ✅ Marathi-safe grapheme splitter
  const graphemeSegments = [...new Intl.Segmenter(isMarathi ? 'mr' : 'en', { granularity: 'grapheme' }).segment(openingTitle)];

  useEffect(() => {
    if (!showOpening) return;

    const typeInterval = setInterval(() => {
      setLettersVisible(prev => {
        if (prev >= graphemeSegments.length) {
          clearInterval(typeInterval);
          setTimeout(() => setCrackStage(1), 1500);
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(typeInterval);
  }, [showOpening, graphemeSegments.length]);

  useEffect(() => {
    if (crackStage === 1) {
      setTimeout(() => {
        setCrackStage(2);
        setTimeout(() => {
          setShowOpening(false);
          setTimeout(() => {
            setElementsVisible(true);
            setTimeout(() => setSectionTitleVisible(true), 500);
          }, 300);
        }, 1000);
      }, 800);
    }
  }, [crackStage]);

  useEffect(() => {
    if (!showOpening && elementsVisible) {
      const interval = setInterval(() => {
        setCurrentHeaderSlide(prev => (prev + 1) % headerSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
     // eslint-disable-next-line
  }, [showOpening, elementsVisible]);

  useEffect(() => {
    if (!showOpening && elementsVisible) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showOpening, elementsVisible, images.length]);

  

  
  return (
    <div className="temple-arch-section">
      {/* OPENING ANIMATION SECTION */}
      {showOpening && (
        <div className={`temple-opening-section ${crackStage >= 1 ? 'cracking' : ''}`}>
          <div 
            className="temple-opening-bg" 
            style={{ backgroundImage: `url(${mandirBg})` }}
          />

          <div 
            ref={titleRef}
            className={`temple-opening-title ${crackStage >= 1 ? 'disappear' : ''}`}
          >
            {graphemeSegments.map((segment, index) => (
              <span 
                key={index} 
                className={`temple-char ${index < lettersVisible ? 'visible' : ''}`}
                style={{
                  display: 'inline-block',
                  marginRight: segment.segment === ' ' ? '0.35em' : '0px', // Add spacing between words
                  transform: `translate(${(Math.random() - 0.5) * 2}px, ${(Math.random() - 0.5) * 2}px)`,
                }}
              >
                {segment.segment}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* MAIN CONTENT SECTION */}
      <div className={`temple-main-content ${showOpening ? 'hidden' : ''}`}>
        <div className="temple-slider-header">
          <div className="temple-slider-container">
            {headerSlides.map((slide, index) => (
              <div 
                key={index}
                className={`temple-slide ${index === currentHeaderSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide.bgImage})` }}
              >
                <div className="temple-slide-overlay"></div>
                <div className="temple-slide-content">
                  <h2>{slide.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="temple-architecture-container">
          <div className="temple-content-wrapper">
            <div className={`temple-old-page-container ${elementsVisible ? 'visible slide-in-left' : ''}`}>
              <div className="temple-old-paper">
                <div className="temple-paper-content">
                  <div className="temple-text-header">
                    <h3>{isMarathi ? 'मंदिराची वास्तुकला' : 'Temple Architecture'}</h3>
                  </div>

                  <div className="temple-text-content temple-scrollable">
                    {isMarathi ? (
                      <>
                        <p>भूमिपूजनाच्या कार्यक्रमानंतर कोरोना महामारीच्या काळात सुद्धा तब्बल १० महिन्यांमध्ये आपल्या मंदिराचे  काम पूर्ण झाले. अनेक लोकांचे म्हणणे असते की तीन-चार वर्ष काम चालू असेल तरीही मंदिर बांधून पूर्ण होत नाही. पण भगवतीची इच्छा तसेच गुरुवर्यांच्या आशीर्वादाने मंदिराचे निर्विघ्नपणे कोणतेही संकट न येता स्वःखर्चातून मंदिर निर्मितीचे काम पूर्ण झाले.</p>
                        <p>मंदिराची जागा ही पूर्ण २००० चौरस फूट  असून मंदिराची बांधणी ही पूर्णपणे दक्षिणात्य पद्धतीची आहे. बाहेरील बाजूस मोठी दगडाच्या भिंतीची तटबंदी आहे. त्याच मंदिरामध्ये आपल्याला छत्रपती शिवाजी महाराजांचेही मंदिर पहायला भेटेल. ज्या राजामुळे आपल्या महाराष्ट्रात मंदिरे आहेत त्या राजाचं मंदिर करून  नित्य पूजा व्हावी ह्या उद्देशाने छत्रपतींचे हि मंदिर निर्माण केले आहे. त्याचप्रमाणे येथे श्री काळभैरव, श्री विजयमारुती व छत्रपती शिवाजी महाराज यांच्या मूर्ती   प्रतिष्ठापित केलेल्या आहेत.</p>
                        <p>ह्या काळेश्वरी मंदिरात भगवतीची सेवा तर होतेच त्याप्रमाणे अनेक समाजकार्य धार्मिक कार्य तसेच ध्यान साधना कार्य असे अनेक प्रबोधनात्मक कार्य केले जाते.</p>
                      </>
                    ) : (
                      <>
                        <p>After the Foundation ceremony (Bhoomipujan), even during the COVID-19 pandemic, the construction of the temple was completed in just 10 months.  Many people say that even after 3 to 4 years, temple construction does not get completed. But with the Divine will of the Goddess and blessings of Guruvarya the entire work was completed smoothly without any problems, and it was done fully with personal funds.</p>
                        <p>The temple stands on a total area of 2,000 square feet, and its structure is built entirely in the South Indian architectural style. Surrounding the temple is a grand stone fortification wall.</p>
                        <p>Inside the same temple, you can also see a Temple of Chhatrapati Shivaji Maharaj. Because of Chhatrapati Shivaji Maharaj that many temples exist in Maharashtra, To ensure daily worship of this great king, his temple was also built here. Along with this, idols of Shri Kalbhairav, Shri Vijay Maruti, and Chhatrapati Shivaji Maharaj have also been installed in the temple.</p>
                        <p>At Kaleshwari Temple, along with regular worship of the Goddess, a variety of activities take place including social service, religious events, and spiritual practices like meditation. The temple serves as a center for many enlightening and community-driven efforts.</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image Carousel */}
            <div className={`temple-image-carousel-container ${elementsVisible ? 'visible slide-in-right' : ''}`}>
              <div className="temple-carousel-wrapper">
                {images.map((image, index) => (
                  <div 
                    key={index}
                    className={`temple-carousel-slide ${index === currentImageIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                  >
                    <div className="temple-image-overlay"></div>
                    <div className="temple-image-caption">{captions[index]}</div>
                  </div>
                ))}

                <div className="temple-carousel-indicators">
                  {images.map((_, index) => (
                    <div 
                      key={index}
                      className={`temple-indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templar;
