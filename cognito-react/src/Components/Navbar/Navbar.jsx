import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../LanguageContext';

const Navbar = () => {
  const { isMarathi, setIsMarathi } = useLanguage();
  const [isShrunk, setIsShrunk] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsShrunk(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (name) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(null);
  };

  const logoUrl = "https://zonixtec.com/cdn/logonew.PNG";

  const texts = {
    templeName: isMarathi ? 'काळेश्वरी मंदिर अन्नदान छत्र' : 'Kaleshwari Mandir Annadan Chhatra',
    aboutUs: isMarathi ? 'आमच्याबद्दल' : 'About Us',
    aboutTemple: isMarathi ? 'मंदिराबद्दल' : 'About the Temple',
    aboutArchitecture: isMarathi ? 'मंदिराची वास्तुकला' : 'About the Architecture',
    importantDates: isMarathi ? 'महत्त्वाच्या तारखा' : 'Important Dates',
    templeSchedule: isMarathi ? 'मंदिर वेळापत्रक' : 'Temple Schedule',
    gallery: isMarathi ? 'गॅलरी' : 'Gallery',
    templeActivities: isMarathi ? 'मंदिर उपक्रम' : 'Temple Activities',
    boardOfTrustees: isMarathi ? 'विश्वस्त मंडळ' : 'Board of Trustees',
    liveDarshan: isMarathi ? 'थेट दर्शन' : 'Live Darshan',
    templeESevas: isMarathi ? 'मंदिर ई-सेवा' : 'Temple eSevas',
    onlinePoojaBooking: isMarathi ? 'ऑनलाइन पूजा बुकिंग' : 'Online Pooja Booking',
    poojaDetails: isMarathi ? 'पूजा तपशील' : 'Pooja Details',
    donation: isMarathi ? 'दान' : 'Donation'
  };

  return (
    <header className={`navbar${isShrunk ? ' shrink' : ''}`}>
      <div className="navbar-container">

        {/* LEFT SECTION */}
        <div className="left-section">
          <Link to="/" className="logo-link" onClick={closeMenu}>
            <img src={logoUrl} alt="Temple Logo" className="logo-img" />
            <span className="temple-name">{texts.templeName}</span>
          </Link>
        </div>

        {/* LANGUAGE TOGGLE (MOBILE - TOP RIGHT) */}
        <button
          className="language-toggle language-mobile"
          onClick={() => setIsMarathi(!isMarathi)}
          title={isMarathi ? 'Switch to English' : 'मराठीमध्ये बदला'}
        >
          {isMarathi ? 'ENGLISH' : 'मराठी'}
        </button>

        {/* HAMBURGER ICON */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        {/* NAVIGATION LINKS */}
        <nav className={`right-section${menuOpen ? ' active' : ''}`}>
          <ul className="nav-links">
            {/* About Us Dropdown */}
            <li className="dropdown">
              <button
                className="dropdown-toggle"
                onClick={() => toggleDropdown('aboutUs')}
                tabIndex={0}
              >
                {texts.aboutUs}
                <span className={`arrow${dropdownOpen === 'aboutUs' ? ' open' : ''}`} />
              </button>
              <ul className={`dropdown-content${dropdownOpen === 'aboutUs' ? ' show' : ''}`}>
                <li><Link to="/about-temple" onClick={closeMenu}>{texts.aboutTemple}</Link></li>
                <li><Link to="/temple-architecture" onClick={closeMenu}>{texts.aboutArchitecture}</Link></li>
                <li><Link to="/Gabhara" onClick={closeMenu}>{isMarathi ? 'गर्भगृह' : 'Inner Sanctum'}</Link></li>
                <li><Link to="/important-dates" onClick={closeMenu}>{texts.importantDates}</Link></li>
                <li><Link to="/temple-schedule" onClick={closeMenu}>{texts.templeSchedule}</Link></li>
                <li><Link to="/Activities" onClick={closeMenu}>{texts.templeActivities}</Link></li>
                <li><Link to="/Board" onClick={closeMenu}>{texts.boardOfTrustees}</Link></li>
              </ul>
            </li>

            {/* Live Darshan */}
            <li><Link to="/live-darshan" onClick={closeMenu}>{texts.liveDarshan}</Link></li>

            {/* eSeva Dropdown */}
            <li className="dropdown">
              <button
                className="dropdown-toggle"
                onClick={() => toggleDropdown('templeESevas')}
                tabIndex={0}
              >
                {texts.templeESevas}
                <span className={`arrow${dropdownOpen === 'templeESevas' ? ' open' : ''}`} />
              </button>
              <ul className={`dropdown-content${dropdownOpen === 'templeESevas' ? ' show' : ''}`}>
                <li><Link to="/Pooja" onClick={closeMenu}>{texts.onlinePoojaBooking}</Link></li>
                <li><Link to="/Details" onClick={closeMenu}>{texts.poojaDetails}</Link></li>
              </ul>
            </li>

            {/* Donation */}
            <li>
              <Link to="/Donation" className="donation-link" onClick={closeMenu}>
                {texts.donation}
              </Link>
            </li>

            {/* Language Toggle for Sidebar / Desktop */}
            <li
              className="language-toggle language-sidebar"
              onClick={() => setIsMarathi(!isMarathi)}
              title={isMarathi ? 'Switch to English' : 'मराठीमध्ये बदला'}
              tabIndex={0}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {isMarathi ? 'English' : 'मराठी'}
              </span>
            </li>
          </ul>
        </nav>
      </div>
      
    </header>
    
  );
};

export default Navbar;
  