import React, { useState, useEffect } from 'react';
import './Board.css';
import t1 from '../../assets/machindramaharaj.JPG';
import t2 from '../../assets/krishanlmaharaj.JPG';
import headerImage from '../../assets/home3.JPG'; // Make sure this image exists
import { useLanguage } from '../../LanguageContext';

const trustees = [
  {
    name: {
      en: 'Shri. Machindra Maharaj Walanj',
      mr: 'श्री. मच्छिंद्र महाराज वाळंज'
    },
    position: {
      en: 'Founder',
      mr: 'संस्थापक'
    },
    image: t1
  },
  {
    name: {
      en: 'Shri. Krishnal Maharaj Tagunde',
      mr: 'श्री. क्रिष्णल महाराज तागुंदे'
    },
    position: {
      en: 'Founder',
      mr: 'संस्थापक'
    },
    image: t2
  }
];

const generateParticles = (count = 30) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 15 + 10}s`
  }));

const Board = () => {
  const { isMarathi } = useLanguage();
  const [clickedIndex, setClickedIndex] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [particles] = useState(generateParticles(30));

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  const handleClick = (index) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 800);
  };

  return (
    <>
      {/* ✅ Header Section */}
      <section className="board-header-section">
        <div className="board-header-img-wrapper">
          <img src={headerImage} alt="Board Header" />
          <div className="board-header-title">
            {isMarathi ? 'विश्वस्त मंडळ' : 'Board of Trustees'}
          </div>
        </div>
      </section>

      {/* ✅ Main Trustees Section */}
      <section className="board-advanced">
        <div className="bg-particles">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                top: p.y,
                left: p.x,
                animationDelay: p.delay,
                animationDuration: p.duration
              }}
            />
          ))}
        </div>

        <div className="board-advanced-content">
          <div className="board-advanced-header">
            <p>
              {isMarathi
                ? 'मंदिराच्या प्रगती, परंपरा आणि भक्तसेवेसाठी समर्पित विश्वस्त मंडळ.'
                : 'A board of trustees dedicated to the temple progress, traditions and devotee service.'}
            </p>
          </div>

          <div className={`trustee-advanced-grid ${animate ? 'animate-grid' : ''}`}>
            {trustees.map((trustee, index) => (
              <div
                key={index}
                className={`trustee-advanced-card ${animate ? (index === 0 ? 'from-left' : 'from-right') : ''}`}
              >
                <div
                  className={`trustee-img-wrapper ${clickedIndex === index ? 'glass-effect-click' : ''}`}
                  onClick={() => handleClick(index)}
                >
                  <img
                    src={trustee.image}
                    alt={trustee.name[isMarathi ? 'mr' : 'en']}
                    loading="lazy"
                  />
                  <div className="shiny-overlay"></div>
                  <div className="card-glow"></div>
                </div>
                <div className="trustee-details">
                  <h3>{trustee.name[isMarathi ? 'mr' : 'en']}</h3>
                  <span>{trustee.position[isMarathi ? 'mr' : 'en']}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Board;
