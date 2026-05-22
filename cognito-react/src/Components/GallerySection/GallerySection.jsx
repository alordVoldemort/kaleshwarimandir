import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GallerySection.css';

// ==============================
// IMAGE DATA
// ==============================
const galleryData = [
  {
    id: 'events',
    en: {
      title: 'Cultural Events',
      description: 'Vibrant celebrations showcasing our rich heritage through dance, music, and traditional performances that bring our community together.'
    },
    mr: {
      title: 'सांस्कृतिक कार्यक्रम',
      description: 'नृत्य, संगीत आणि पारंपारिक कला प्रदर्शनांद्वारे आपल्या समृद्ध वारशाचे प्रदर्शन करणारे उत्सव.'
    },
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'education',
    en: {
      title: 'Education Programs',
      description: 'Empowering our youth through scholarship programs, tutoring sessions, and educational workshops focused on STEM and arts.'
    },
    mr: {
      title: 'शैक्षणिक कार्यक्रम',
      description: 'स्टेम आणि कला क्षेत्रातील शिष्यवृत्ती, ट्यूटोरियल आणि कार्यशाळांद्वारे तरुण पिढीला सक्षम करणे.'
    },
    images: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'environment',
    en: {
      title: 'Green Initiatives',
      description: 'Community-driven environmental projects including tree plantation drives, clean-up campaigns, and sustainable living workshops.'
    },
    mr: {
      title: 'पर्यावरण उपक्रम',
      description: 'वृक्षारोपण, स्वच्छता मोहीम आणि शाश्वत जीवनावरील कार्यशाळांसह पर्यावरण संवर्धन कार्यक्रम.'
    },
    images: [
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'health',
    en: {
      title: 'Health Camps',
      description: 'Free medical checkups, vaccination drives, and health awareness programs conducted in rural areas.'
    },
    mr: {
      title: 'आरोग्य शिबिरे',
      description: 'ग्रामीण भागात विनामूल्य वैद्यकीय तपासणी, लसीकरण कार्यक्रम आणि आरोग्य जागरुकता अभियान.'
    },
    images: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ]
  }
];

// ==============================
// GALLERY SECTION COMPONENT
// ==============================
const GallerySection = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [perspective, setPerspective] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);
  const activeCardRef = useRef(null);

  // Handle mouse movement for 3D perspective effect
  const handleMouseMove = (e) => {
    if (!containerRef.current || activeCard) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPerspective({ x, y });
  };

  // Toggle card detail view
  const toggleCard = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  // Close active card when clicking outside
  useEffect(() => {
    if (!activeCard) return;
    const handleClickOutside = (e) => {
      if (activeCardRef.current && !activeCardRef.current.contains(e.target)) {
        setActiveCard(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeCard]);

  // Prevent body scroll when card is open
  useEffect(() => {
    if (activeCard) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [activeCard]);

  return (
    <section
      className="gallery-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        perspective: '1000px',
        perspectiveOrigin: activeCard ? '50% 50%' : `${perspective.x}% ${perspective.y}%`
      }}
    >
      {/* Section Header */}
      <motion.header
        className="gallery-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Community Gallery</h2>
        <p>Explore our initiatives and events through the years</p>
      </motion.header>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {galleryData.map((item) => (
          <GalleryCard
            key={item.id}
            data={item}
            isActive={activeCard === item.id}
            onToggle={() => toggleCard(item.id)}
          />
        ))}
      </div>

      {/* Full-screen detail overlay */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            className="card-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overlay-content" ref={activeCardRef}>
              <GalleryCardDetail
                data={galleryData.find(item => item.id === activeCard)}
                onClose={() => setActiveCard(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Gallery Card Component
const GalleryCard = React.memo(({ data, isActive, onToggle }) => {
  return (
    <motion.div
      className={`gallery-card${isActive ? ' active' : ''}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateX: isActive ? 0 : -5,
        rotateY: isActive ? 0 : -5
      }}
      whileHover={{
        scale: isActive ? 1 : 1.05,
        zIndex: isActive ? 20 : 10
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 25
      }}
      onClick={onToggle}
      layout
      tabIndex={0}
      aria-pressed={isActive}
      role="button"
    >
      <div className="card-inner">
        {/* Front Side - Preview */}
        <div className="card-front">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${data.images[0]})` }}
            aria-label={data.en.title}
          />
          <div className="card-title">
            <h3>{data.en.title}</h3>
            <p>{data.mr.title}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Detail Component for Full-screen View
const GalleryCardDetail = ({ data, onClose }) => {
  if (!data) return null;
  return (
    <motion.div
      className="card-detail"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <button
        className="close-btn"
        onClick={onClose}
        aria-label="Close details"
        tabIndex={0}
      >
        ✕
      </button>

      <div className="detail-header">
        <h2>{data.en.title}</h2>
        <h3>{data.mr.title}</h3>
      </div>

      <div className="description">
        <p>{data.en.description}</p>
        <p className="marathi-text">{data.mr.description}</p>
      </div>

      <div className="images-grid">
        {data.images.map((img, index) => (
          <motion.div
            key={index}
            className="image-item"
            style={{ backgroundImage: `url(${img})` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            aria-label={`Gallery image ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default GallerySection;