import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./HistorySection.css";
import { useLanguage } from "../../LanguageContext";

// Enhanced Devanagari digit conversion
function toDevanagari(str) {
  if (!str) return "";
  
  // Map ASCII digits to Devanagari
  const digitMap = {
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
    '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
  };
  
  return str.replace(/[0-9]/g, digit => digitMap[digit] || digit);
}

// CDN Images
const cdnPath = "https://zonixtec.com/cdn/";
const about1 = `${cdnPath}home3.JPG`;
const about2 = `${cdnPath}mata111.webp`;
const about3 = `${cdnPath}mata44.webp`;
const about4 = `${cdnPath}mata55.webp`;
const about5 = `${cdnPath}mata88.webp`;
const petal1 = `${cdnPath}petal2.webp`;
const petal2 = `${cdnPath}petal2.webp`;
const petal3 = `${cdnPath}petal2.webp`;
const flower1 = `${cdnPath}petal2.webp`;
const flower2 = `${cdnPath}petal2.webp`;
const flower3 = `${cdnPath}petal2.webp`;
const flowerCluster = `${cdnPath}petal2.webp`;

const historyContent = {
  en: {
    sectionTitle: "Our Legacy",
    items: [
      {
        year: "2020",
        image: about1,
        badge: "Sacred Beginning",
        title: "Foundation on Kojagiri Poornima",
        paragraphs: [
          "On the occasion of Kojagiri Poornima on October 11, 2020, a foundation ceremony for the Kaleshwari Temple Annadaan Chhatra was organized.",
          "The foundation ceremony was conducted by Guruvarya and their parents, marking the beginning of the sacred journey of the temple.",
        ],
      },
      {
        year: "2021",
        image: about2,
        badge: "Kalash Sthapana & Idol Installation",
        title: "Kalash Sthapana and Idol Installation",
         // eslint-disable-next-line
        paragraphs: [
          "On August 29, 30, and 31, 2021, the installation of the idol of Goddess Shri Dakshineshwari Kali Mata and the Kalash Sthapana ceremony took place in the temple.",
          ,
        ],
      },
      {
        year: "2022",
        image: about3,
        badge: "Temple Completion & Architecture",
        title: "Temple Completion & Architecture",
        paragraphs: [
          "Despite delays caused by the COVID-19 pandemic, the temple was completed in just 10 months through self-funding and divine grace.",
          "Spread over 2,000 square feet, the temple is built in South Indian architectural style, featuring grand stone fortifications and intricate wooden carvings.",
        ],
      },
      {
        year: "2023",
        image: about4,
        badge: "Daily Service & Annadan Chhatra",
        title: "Daily Service and Annadan Chhatra",
        paragraphs: [
          "Kaleshwari Temple Annadan Chhatra has been established in accordance with the belief 'Annadanam Mahadanam', to provide free prasad every day.",
        ],
      },
      {
        year: "2024",
        image: about5,
        badge: "Pillar of Dharma",
        title: "Temple as a Pillar of Dharma",
        paragraphs: [
          "From the old cow shed to the sacred temple, this temple now stands as a symbol of primal energy and collective devotion.",
          "It stands not only as a place of worship but as a legacy of faith, service, and spiritual growth for the coming generations."
        ],
      },
    ],
  },
  mr: {
    sectionTitle: "आमचा वारसा",
    items: [
      {
        year: "2020",  // Keep as ASCII digits for conversion
        image: about1,
        badge: "पवित्र सुरुवात",
        title: "कोजागिरी पौर्णिमेला स्थापना",
        paragraphs: [
          "11 ऑक्टोबर 2020 रोजी कोजागिरी पौर्णिमेच्या मुहूर्तावर काळेश्वरी मंदिर अन्नदान छत्राचा भूमिपूजन समारंभ आयोजित करण्यात आला.",
          "गुरुवर्य व त्यांच्या आई वडिलांच्या हस्ते भूमिपूजन समारंभ पार पाडला आणि ही मंदिराच्या पवित्र प्रवासाची सुरुवात ठरली.",
        ],
      },
      {
        year: "2021",  // Keep as ASCII digits for conversion
        image: about2,
        badge: "कलशारोहण व मूर्ती स्थापना",
        title: "कलशारोहण व मूर्ती स्थापना",
        paragraphs: [
          "29, 30 आणि 31 ऑगस्ट 2021 रोजी मंदिरात श्री दक्षिणेश्वरी काली मातेच्या मूर्तीची स्थापना आणि कलशारोहण कार्यक्रम पार पडले.",
        ],
      },
      {
        year: "2022",  // Keep as ASCII digits for conversion
        image: about3,
        badge: "मंदिराची पूर्णता व रचना",
        title: "मंदिराची पूर्णता व रचना",
        paragraphs: [
          "कोरोना महामारीमुळे झालेल्या विलंबानंतरही, स्वयं-निधी आणि दैवी कृपेने मंदिर 10 महिन्यांत पूर्ण झाले.",
          "2,000 चौरस फूट क्षेत्रफळावर पसरलेले हे मंदिर दक्षिण भारतीय स्थापत्यशैलीने तयार करण्यात आले असून, भव्य दगडी किल्लेबंदी आणि लाकडी कोरीव कामाने सजलेले आहे.",
        ],
      },
      {
        year: "2023",  // Keep as ASCII digits for conversion
        image: about4,
        badge: "दैनंदिन सेवा व अन्नदान छत्र",
        title: "दैनंदिन सेवा व अन्नदान छत्र",
        paragraphs: [
          " काळेश्वरी मंदिर अन्नदान छत्राची स्थापना 'अन्न दानम महा दानम ' या श्रद्धेला धरून दररोज मोफत प्रसाद देण्यासाठी करण्यात आली.",
        ],
      },
      {
        year: "2024",  // Keep as ASCII digits for conversion
        image: about5,
        badge: "धर्माचा आधारस्तंभ म्हणून मंदिर",
        title: "धर्माचा आधारस्तंभ म्हणून मंदिर",
        paragraphs: [
          "पूर्वीच्या गायीच्या गोठ्यापासून ते पवित्र मंदिरापर्यंत, हे मंदिर आता आदिमायाशक्ती आणि सामूहिक भक्तीचे प्रतीक आहे.",
          "ते केवळ पूजा स्थळ नसून येणाऱ्या पिढ्यांसाठी श्रद्धा, सेवा आणि आध्यात्मिक वाढीचा वारसा म्हणून उभे आहे."
        ],
      },
    ],
  },
};

// Flower Positions
const flowerPositions = [
  { top: "5%", left: "5%", size: 50, rotation: -15 },
  { top: "15%", right: "10%", size: 70, rotation: 25 },
  { bottom: "10%", left: "7%", size: 60, rotation: 10 },
  { bottom: "20%", right: "5%", size: 55, rotation: -20 },
  { top: "30%", left: "3%", size: 45, rotation: 5 },
  { top: "40%", right: "3%", size: 65, rotation: -30 },
];

// Cluster Positions
const clusterPositions = [
  { top: "10%", left: "20%", size: 80 },
  { top: "25%", right: "25%", size: 100 },
  { bottom: "15%", left: "15%", size: 90 },
  { bottom: "30%", right: "20%", size: 70 },
];

// Flower Petal Component
const FlowerPetal = ({ petalImages }) => {
  const randomPetal = petalImages[Math.floor(Math.random() * petalImages.length)];
  const startX = Math.random() * 100;
  const rotation = Math.random() * 360;
  const duration = 3 + Math.random() * 3;
  const delay = Math.random() * 0.5;
  const size = 30 + Math.random() * 40;
  const swayAmount = 20 + Math.random() * 60;

  return (
    <motion.div
      className="flower-petal"
      style={{
        position: "absolute",
        top: "-10%",
        left: `${startX}%`,
        zIndex: 1000,
        backgroundImage: `url(${randomPetal})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        width: `${size}px`,
        height: `${size}px`,
        filter: `hue-rotate(${Math.random() * 360}deg) brightness(1.2)`,
      }}
      initial={{ y: -100, opacity: 0, rotate: 0, x: startX }}
      animate={{
        y: "110%",
        opacity: [0, 1, 1, 0],
        rotate: rotation + 360 + Math.random() * 180,
        x: [startX, startX + swayAmount, startX - swayAmount / 2, startX]
      }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
        times: [0, 0.1, 0.7, 1]
      }}
    />
  );
};

// Flower Cluster Component
const FlowerCluster = ({ position, size }) => (
  <motion.div
    className="flower-cluster"
    style={{
      position: "absolute",
      zIndex: 1,
      width: `${size}px`,
      height: `${size}px`,
      backgroundImage: `url(${flowerCluster})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      ...position,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.8, 0.8, 0],
      scale: [0, 1.1, 1, 0.8],
      rotate: [0, 10, -5, 0]
    }}
    transition={{
      duration: 4,
      times: [0, 0.2, 0.8, 1]
    }}
  />
);

// Static Flower Component
const StaticFlower = ({ position, size, rotation, image }) => (
  <motion.div
    className="static-flower"
    style={{
      position: "absolute",
      zIndex: 2,
      width: `${size}px`,
      height: `${size}px`,
      backgroundImage: `url(${image})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      ...position,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.7, scale: 1 }}
    transition={{ duration: 1.5, type: "spring" }}
    whileHover={{
      scale: 1.1,
      rotate: rotation + 10,
      transition: { duration: 0.3 }
    }}
  />
);

// Main HistorySection Component
const HistorySection = () => {
  const { isMarathi } = useLanguage();
  const lang = isMarathi ? "mr" : "en";
  
  // Pre-convert all content to avoid flash of unconverted content
  const content = useMemo(() => {
    const originalContent = historyContent[lang];
    
    // Convert all numbers in Marathi mode
    if (isMarathi) {
      return {
        ...originalContent,
        items: originalContent.items.map(item => ({
          ...item,
          year: toDevanagari(item.year),
          badge: toDevanagari(item.badge),
          title: toDevanagari(item.title),
          paragraphs: item.paragraphs.map(para => toDevanagari(para))
        }))
      };
    }
    
    return originalContent;
  }, [isMarathi, lang]);

  const [activeIndex, setActiveIndex] = useState(0);
   // eslint-disable-next-line
  const [isHovering, setIsHovering] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);
  const [showClusters, setShowClusters] = useState(false);
  const [direction, setDirection] = useState(1);
  const prevIndexRef = useRef(activeIndex);
  const flowerImages = [flower1, flower2, flower3, petal1, petal2, petal3];
  const [petalCount, setPetalCount] = useState(25);
  const [backgroundImage, setBackgroundImage] = useState(content.items[0].image);

  // TITLE SLIDER STATE
  const [titleIndex, setTitleIndex] = useState(0);
   // eslint-disable-next-line
  const [titleDirection, setTitleDirection] = useState(1);

  const handleYearChange = (index) => {
    setDirection(index > prevIndexRef.current ? 1 : -1);
    prevIndexRef.current = index;
    setActiveIndex(index);
    setBackgroundImage(content.items[index].image);
    setTitleIndex(index);
    setPetalCount(40 + Math.floor(Math.random() * 30));
    setShowFlowers(true);
    setShowClusters(true);
    setTimeout(() => {
      setShowFlowers(false);
      setShowClusters(false);
    }, 3000);
  };

  useEffect(() => { 
    setTitleIndex(activeIndex); 
  }, [activeIndex]);

  // Update background when content changes
  useEffect(() => {
    setBackgroundImage(content.items[activeIndex].image);
  }, [content, activeIndex]);

  const current = content.items[activeIndex];
  const titleItem = content.items[titleIndex];

  return (
    <section className="history-section">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeIndex}-${lang}`} // Add lang to key to force re-render
          className="background-image"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            filter: "blur(2px)"
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      <div className="section-overlay"></div>

      <div className="flower-petals-container">
        {showFlowers &&
          [...Array(petalCount)].map((_, i) => (
            <FlowerPetal key={i} petalImages={flowerImages} />
          ))
        }
      </div>

      {showClusters && clusterPositions.map((pos, i) => (
        <FlowerCluster key={`cluster-${i}`} position={pos} size={pos.size} />
      ))}

      {flowerPositions.map((pos, i) => (
        <StaticFlower
          key={i}
          position={pos}
          image={flowerImages[i % flowerImages.length]}
          rotation={pos.rotation}
        />
      ))}

      <div className="title-slider-container">
        <div className="title-slider-wrapper">
          <AnimatePresence mode="wait" custom={titleDirection}>
            <motion.div
              key={`${titleIndex}-${lang}`} // Add lang to key
              className="title-slide"
              custom={titleDirection}
              initial={{
                x: titleDirection > 0 ? "100%" : "-100%",
                opacity: 0,
                rotateY: titleDirection > 0 ? 90 : -90
              }}
              animate={{
                x: 0,
                opacity: 1,
                rotateY: 0
              }}
              exit={{
                x: titleDirection > 0 ? "-100%" : "100%",
                opacity: 0,
                rotateY: titleDirection > 0 ? -90 : 90
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <h3 className="title-slide-content">
                <span className="glow-text">
                  {titleItem.title}
                </span>
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="history-container">
        <div className="content-wrapper">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={`${activeIndex}-${lang}`} // Add lang to key
              className="history-card"
              custom={direction}
              initial={{
                opacity: 0,
                x: direction * 100,
                scale: 0.8
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              }}
              exit={{
                opacity: 0,
                x: -direction * 100,
                scale: 0.8
              }}
              transition={{
                duration: 0.7,
                type: "spring",
                damping: 15
              }}
              whileHover={{
                y: -10,
                boxShadow: "0 35px 60px -15px rgba(0, 0, 0, 0.6)"
              }}
            >
              <div className="card-glow"></div>

              <motion.div
                className="year-image"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <img
                  src={current.image}
                  alt={`Year ${current.year}`}
                />
              </motion.div>

              <div className="text-content">
                <motion.span
                  className="badge"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {current.badge}
                </motion.span>

                <div className="divider"></div>

                <div className="content-body">
                  {current.paragraphs.map((para, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div
            className="timeline-nav-right"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {content.items.map((item, index) => (
              <motion.div
                key={index}
                className={`timeline-marker-circle ${index === activeIndex ? "active" : ""}`}
                onClick={() => handleYearChange(index)}
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{
                  scale: index === activeIndex ? 1.2 : 0.9,
                  opacity: index === activeIndex ? 1 : 0.7
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="marker-inner">
                  <span>{item.year}</span>
                  {index === activeIndex && (
                    <motion.div
                      className="active-pulse"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;  