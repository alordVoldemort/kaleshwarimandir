import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './TempleSchedule.css';
import { useLanguage } from '../../LanguageContext';

const TempleSchedule = () => {
  const { isMarathi } = useLanguage();
  const videoRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const cdn = "https://zonixtec.com/cdn/";

  const sliderImages = [
    `${cdn}home3.JPG`,
    `${cdn}Temple2.webp`
    
  ];
  
  const morningVideo = `${cdn}sun22.mp4`;
  const afternoonVideo = `${cdn}Clouds.mp4`;
  const eveningVideo = `${cdn}sunset.mp4`;
  const nightvedio = `${cdn}night.mp4`;
  const nightimg = `${cdn}spicalpoojause.jpg`; 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  if (videoRefs.current.length === 0) {
    videoRefs.current = Array(5).fill().map(() => React.createRef());
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 15px 30px -10px rgba(139, 69, 19, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  const handleMouseEnter = (index) => {
    const video = videoRefs.current[index]?.current;
    if (video) {
      video.play().catch(error => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  };

  const handleMouseLeave = (index) => {
    const video = videoRefs.current[index]?.current;
    if (video) {
      setTimeout(() => {
        video.pause();
        video.currentTime = 0;
      }, 100);
    }
  };

  return (
    <div className="temple-schedule-section">
      {/* Slider Section */}
      <div className="ts-slider-container">
        <div className="ts-slider-wrapper">
          {sliderImages.map((image, index) => (
            <motion.div
              key={index}
              className={`ts-slide ${index === currentSlide ? 'active' : ''}`}
              initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
              animate={{
                opacity: index === currentSlide ? 1 : 0,
                clipPath: index === currentSlide
                  ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                  : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <img src={image} alt={`Slide ${index + 1}`} className="ts-slide-image" />
            </motion.div>
          ))}
        </div>

        <div className="ts-slider-overlay">
          <h2 className="ts-section-title">
            {isMarathi ? 'मंदिराचे दैनंदिन वेळापत्रक' : 'Temple Daily Schedule'}
          </h2>
        </div>

        <div className="ts-slider-indicators">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              className={`ts-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Schedule Cards */}
      <motion.div
        className="ts-schedule-container"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="ts-schedule-grid">
          {/* Morning */}
          <motion.section variants={item} whileHover="hover" className="ts-schedule-card ts-card-morning" onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={() => handleMouseLeave(0)}>
            <div className="ts-card-video-container">
              <video ref={videoRefs.current[0]} className="ts-card-video" muted loop playsInline preload="auto">
                <source src={morningVideo} type="video/mp4" />
              </video>
              <div className="ts-video-overlay"></div>
              <div className="ts-card-content">
                <div className="ts-card-header">
                  <h3>{isMarathi ? 'सकाळ' : 'Morning '}</h3>
                </div>
                <ul className="ts-schedule-list">
                  <li><strong>{isMarathi ? 'रोज देवीजींना सकाळी ७:०० वाजता नित्यस्नान  व' : 'Every day at 7:00 AM, the Goddess is given a ritual bath,'}</strong> {isMarathi ? 'त्यानंतर सकाळी ९:०० वाजता नित्य आरती' : ''}</li>
                  <li><strong>{isMarathi ? '' : ''}</strong> {isMarathi ? '' : 'followed by the daily Aarti at 9:00 AM.'}</li>
                </ul>
              </div>
            </div>
            <div className="ts-card-wave"></div>
          </motion.section>

          {/* Afternoon */}
          <motion.section variants={item} whileHover="hover" className="ts-schedule-card ts-card-afternoon" onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={() => handleMouseLeave(1)}>
            <div className="ts-card-video-container">
              <video ref={videoRefs.current[1]} className="ts-card-video" muted loop playsInline preload="auto">
                <source src={afternoonVideo} type="video/mp4" />
              </video>
              <div className="ts-video-overlay"></div>
              <div className="ts-card-content">
                <div className="ts-card-header"><h3>{isMarathi ? 'दुपार' : 'Afternoon'}</h3></div>
                <ul className="ts-schedule-list">
                  <li><strong>{isMarathi ? 'देवीजींना दुपारी १:०० वाजता नैवद्य महाभोग व ' : 'Naivadya Mahabhog to Goddess at 1:00 PM. '}</strong> {isMarathi ? ' त्यानंतर मंदिर दर्शनासाठी बंद राहील' : ''}</li>
                  <li><strong>{isMarathi ? '' : ''}</strong> {isMarathi ? '' : 'After that the temple will be closed for darshan'}</li>
                </ul>
              </div>
            </div>
            <div className="ts-card-wave"></div>
          </motion.section>

          {/* Evening */}
          <motion.section variants={item} whileHover="hover" className="ts-schedule-card ts-card-evening" onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={() => handleMouseLeave(2)}>
            <div className="ts-card-video-container">
              <video ref={videoRefs.current[2]} className="ts-card-video" muted loop playsInline preload="auto">
                <source src={eveningVideo} type="video/mp4" />
              </video>
              <div className="ts-video-overlay"></div>
              <div className="ts-card-content">
                <div className="ts-card-header"><h3>{isMarathi ? 'सायंकाळ' : 'Evening'}</h3></div>
                <ul className="ts-schedule-list">
                  <li> <strong>{isMarathi ? 'देवीजींचे मंदिर सायं.५:०० वाजता दर्शनासाठी खुले होईल व त्यानंतर निर्माल्य विसर्जन व देवीजींची पूजा  व' : 'The temple of Goddess will be open for darshan at 5:00 PM followed by Nirmalya Visarjan and worship of Deviji'}</strong> {isMarathi ? ' '  : ''} </li>
                  {/* <li><strong>{isMarathi ? 'निर्माल्य विसर्जन व देवीजींची पूजा' : ' Nirmalya Visarjan and Goddess Pooja'}</strong> {isMarathi ? ' ' : ''}</li> */}
                  <li><strong>{isMarathi ? '' : ''}</strong> {isMarathi ? ' त्यानंतर सायं: ७:०० वाजता सायंकाळची आरती' : 'After that evening aarti at 7:00 PM.'}</li>
                </ul>
              </div>
            </div>
            <div className="ts-card-wave"></div>
          </motion.section>

          {/* Night */}
          <motion.section variants={item} whileHover="hover" className="ts-schedule-card ts-card-night" onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={() => handleMouseLeave(3)}>
            <div className="ts-card-video-container">
              <video ref={videoRefs.current[3]} className="ts-card-video" muted loop playsInline preload="auto">
                <source src={nightvedio} type="video/mp4" />
              </video>
              <div className="ts-video-overlay"></div>
              <div className="ts-card-content">
                <div className="ts-card-header"><h3>{isMarathi ? 'रात्री' : 'Night'}</h3></div>
                <ul className="ts-schedule-list">
                  <li><strong>{isMarathi ? 'रात्री ०९:00 वाजता देवीजींना नैवद्य महाभोग व' : 'Naivedya Mahabhog to Deviji at 9:00 pm.'}</strong></li>
                  <li>{isMarathi ? 'त्यानंतर पुन्हा एकदा मंदिर दर्शनासाठी बंद राहील.' : 'After that, the temple will be closed for darshan once again.'}</li>
                </ul>
              </div>
            </div>
            <div className="ts-card-wave"></div>
          </motion.section>
        </div>

        {/* Special Section */}
        <div className="ts-special-section">
          <motion.section variants={item} whileHover="hover" className="ts-schedule-card ts-card-special">
            <div className="ts-card-video-container">
            <img src={nightimg} alt="Special Ritual" className="ts-card-video" />
              <div className="ts-card-content">
                <div className="ts-card-header"><h3>{isMarathi ? 'विशेष पूजा' : 'Special Ritual'}</h3></div>
                <ul className="ts-schedule-list">
                  <li><strong>{isMarathi ? 'प्रत्येक  शनिवारी' : 'Every Saturday'}</strong> {isMarathi ? 'अभिषेक पूजा सकाळी ७:00 ते ९:00' : 'Abhishek Puja 7:00 AM to 9:00 AM.'}</li>
                  <li><strong>{isMarathi ? 'अमावस्या' : 'Every new moon of every month'}</strong> {isMarathi ? 'प्रत्येक महिन्यात दर अमावस्येला सायं ७:00 वाजता देवीजींना अभिषेक पूजा.' : 'Abhishek Pooja at 7:00 PM, followed by devotional programs and Maha Aarti at 8:30 PM.'}</li>
                  <li> {isMarathi ? 'त्यानंतर भाविक भक्तांना देवीजींची माहिती व्हावी यासाठी धार्मिक ग्रंथ त्याचप्रमाणे देवीजींची अनेक स्तोत्र, देवी महात्म्य तसेच धर्माब‌द्दल जनजागृतीचा कार्यक्रम होईल.' : 'Following the Pooja, there will be a spiritual awareness session featuring religious texts, hymns and praises of the Goddess such as Devi Stotra and Devi Mahatmya, aimed at educating and inspiring devotees.'}</li>
                <li><strong>{isMarathi ? 'त्यानंतर रात्री ८:३० वाजता देवीजींची महाआरती व प्रसाद वितरण' : 'At 8:30 PM – Maha Aarti of the Goddess followed by distribution of Prasad.'}</strong> </li>

                </ul>
              </div>
            </div>
            <div className="ts-card-wave"></div>
          </motion.section>

          
        </div>
        
      </motion.div>
     <div className='sunday'>
       <motion.div variants={item} className="ts-special-note" whileHover={{ scale: 1.03 }}>
            <div className="ts-note-icon"></div>
            <div>
              {isMarathi ? (
                <>
          
                  <p><strong>रविवारी:</strong> मंदिर संपूर्ण वेळ खुले राहते</p>
                </>
              ) : (
                <>
                  <p><strong>Sunday:</strong> Temple remains open all day</p>
                </>
              )}
            </div>
          </motion.div>
     </div>
    </div>
  );
};

export default TempleSchedule;
