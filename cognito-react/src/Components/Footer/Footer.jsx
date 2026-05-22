import React from 'react';
import './Footer.css';
import { useLanguage } from '../../LanguageContext';
import { FaInstagram, FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';



const Footer = () => {
  const { isMarathi } = useLanguage();

  const texts = {
    en: {
      findUs: "Find us",
      address: "Vitthal Nagar Rd, Sahayog Nagar, Warje",
      callUs: "Call us",
      phone: "8263997493",
      mailUs: "Email us",
      email: "kaleshwarimandir@gmail.com",
      logo: "Kaleshwari Mandir Annadan Chhatra",
      empowerText: "Empowering your journey with timeless stories and unforgettable experiences.",
      followUs: "Follow us",
    },
    mr: {
      findUs: "आम्हाला शोधा",
      address: "विठ्ठल नगर रोड, सहयोग नगर, वारजे.",
      callUs: "आमच्याशी संपर्क करा",
      phone: "८२६३९९७४९३",
      mailUs: "आम्हाला ईमेल करा",
      email: "kaleshwarimandir@gmail.com",
      logo: "काळेश्वरी मंदिर अन्नदान छत्र",
      empowerText: "सशक्तीकरणाच्या कथा आणि अविस्मरणीय अनुभवांसह तुमचा प्रवास समृद्ध करत आहे.",
      followUs: "आमचे अनुसरण करा",
    }
  };

  const t = isMarathi ? texts.mr : texts.en;

  return (
    <footer className="footer">
      {/* Background image with fade effect */}
      <div className="footer-background">
        <div className="fade-overlay"></div>
      </div>
      
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-item">
            <div className="footer-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="footer-text">
              <h4>{t.findUs}</h4>
              <p>
                <a
                  href="https://www.google.com/maps?q=Kaleshwari+Mandir+Annadan+Chhatra+Warje+Malwadi+Pune+58"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.address}
                </a>
              </p>
            </div>
          </div>
          
          <div className="footer-item">
            <div className="footer-icon">
              <i className="fas fa-phone"></i>
            </div>
            <div className="footer-text">
              <h4>{t.callUs}</h4>
              <p><a href={`tel:${texts.en.phone}`}>{t.phone}</a></p>
            </div>
          </div>
          
          <div className="footer-item">
            <div className="footer-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="footer-text">
              <h4>{t.mailUs}</h4>
              <p><a href={`mailto:${t.email}`}>{t.email}</a></p>
            </div>
          </div>
        </div>

      <div className="footer-middle">
  <h3 className="footer-logo">{t.logo}</h3>
  <p className="footer-description">{t.empowerText}</p>

  <div className="footer-socials">
    <span>{t.followUs}</span>
    <div className="social-icons">
      <a href="https://www.instagram.com/machindra_mharaj_walanj" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <FaInstagram className="social-icon instagram" />
      </a>
      <a href="https://www.facebook.com/profile.php?id=100007695947704&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <FaFacebookF className="social-icon facebook" />
      </a>
      <a  target="_blank" rel="noopener noreferrer" href="tel:8263997493" aria-label="Phone">
        <FaPhoneAlt className="social-icon phone" />
      </a>
      <a
  target="_blank"
  rel="noopener noreferrer"
  href="https://www.google.com/maps?q=Kaleshwari+Mandir+Annadan+Chhatra+Warje+Malwadi+Pune+58"
  aria-label="Location"
>
  <FaMapMarkerAlt className="social-icon location" />
</a>
    </div>
  </div>
</div>

      </div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2026 <a href="https://zonixtec.com/" target="_blank" rel="noopener noreferrer">Zonixtec IT Services Private Limited</a>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;