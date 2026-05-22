import React, { useState } from "react";
import Slider from "react-slick";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ added for navigation
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from "../../LanguageContext";

// CDN paths for all images
const CDN_BASE = "https://zonixtec.com/cdn/";
const img1 = CDN_BASE + "home3.JPG";
const img2 = CDN_BASE + "IMG_7181.webp";
const img3 = CDN_BASE + "matahome.jpg";

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow next`} onClick={onClick}>
      &#10095;
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow prev`} onClick={onClick}>
      &#10094;
    </div>
  );
};

const AnimatedHeading = ({ text }) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const child = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.h1
      className="slide-heading"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block", marginRight: "0.4rem" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const Home = () => {
  const { isMarathi } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate(); // ✅ initialize navigate

  const slides = [
    {
      image: img1,
      heading: isMarathi
        ? "समाजसेवेची दिव्यता"
        : "The Divinity of Social Service ",
      text: isMarathi
        ? "नवरात्र साडी वाटपा पासून ते अन्नदानापर्यंत  गरजूंना सन्मानाने आणि भक्तीने उन्नत करतो."
        : "From distributing sarees to donating food, Navratri uplifts the needy with dignity and devotion.",
      imgStyle: {
        height: "100vh",
        objectFit: "cover",
        objectPosition: "100% 40%",
      },
    },
    {
      image: img2,
      heading: isMarathi
        ? "सशक्त समाज, समृद्ध परंपरा"
        : "Empowered Society, Enriched Traditions",
      text: isMarathi
        ? "सांस्कृतिक कार्यक्रम आणि सामाजिक कार्यक्रमांद्वारे एकत्रित सामुदाय निर्माण करतो."
        : "Builds a united community through cultural programs and social events.",
      imgStyle: {
        height: "100vh",
        objectFit: "cover",
        objectPosition: "center 30%",
      },
    },
    {
      image: img3,
      heading: isMarathi
        ? "आरोग्य व पर्यावरण"
        : "Health and Environment",
      text: isMarathi
        ? "रक्तदान शिबिर व वृक्षारोपण उपक्रम, आरोग्य आणि पर्यावरण संरक्षणाला मदत करतो."
        : "Blood donation camps and tree plantation activities help in protecting health and environment.",
      imgStyle: {
        height: "100vh",
        objectFit: "cover",
        objectPosition: "center 18%",
      },
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => {
      if (document.activeElement) document.activeElement.blur();
      setCurrentSlide(next);
    },
  };

  return (
    <div className="home-hero">
      <Slider {...settings} className="home-slider">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className="slide"
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
            >
              <motion.img
                src={slide.image}
                alt={`Slide ${index}`}
                className="slide-image"
                style={slide.imgStyle}
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 8,
                  ease: "easeInOut",
                }}
              />

              <div className="overlay"></div>

              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    key={index}
                    className="slide-content"
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          when: "beforeChildren",
                          staggerChildren: 0.4,
                        },
                      },
                    }}
                  >
                    <motion.div
                      className="text-box"
                      variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                    >
                      <AnimatedHeading text={slide.heading} />

                      <motion.p
                        className="slide-text"
                        variants={{
                          hidden: { opacity: 0, y: 30 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                        }}
                      >
                        {slide.text}
                      </motion.p>

                      <motion.div
                        className="slide-buttons"
                        variants={{
                          hidden: { opacity: 0, y: 30 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                        }}
                      >
                        <button
                          className="primary-btn"
                          onClick={() => navigate("/donation")}
                        >
                          {isMarathi ? "दान करा" : "Donate Now"}
                        </button>
                        <button
                          className="secondary-btn"
                          onClick={() => navigate("/about-temple")}
                        >
                          {isMarathi ? "अधिक जाणून घ्या" : "Learn More"}
                        </button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Home;
