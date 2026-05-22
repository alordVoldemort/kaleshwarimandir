import React, { useState, useRef, useEffect } from 'react';
import './Donation.css';
import templeLogo from '../../assets/logonew.PNG';
import qrcode from '../../assets/kaleshwarimandirqr.jpg';
import DeviPhoto from '../../assets/home3.JPG';
import { useLanguage } from '../../LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const Donation = () => {
  const { isMarathi } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const receiptRef = useRef();

  // Scroll to top when form is shown
  useEffect(() => {
    if (showForm) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [showForm]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const formVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  // Validation function (kept for future use if needed)
  const validate = () => {
    if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      return false;
    }
    if (!amount || parseFloat(amount) <= 0) {
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      return false;
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      return false;
    }
    return true;
  };

  // Suppress unused variable warning
  if (validate && receiptRef) {
    // These are kept for potential future use
  }

  return (
    <div className="donation-container">
      <AnimatePresence>
        {!showForm ? (
          <motion.div
            className="donation-hero"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="hero-content" variants={itemVariants}>
              <motion.h1 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
            >
              {isMarathi ? "देणगी" : "Donation"}
          </motion.h1>
              { isMarathi ? (
                <motion.h2 
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  style={{ fontSize: '1.2rem', fontWeight: '400', color: '#6a3093', marginTop: '0.5rem' }}
                >
                  श्रद्धेची पूर्ती, सेवेसाठी कृती.
                </motion.h2>
                ) : (
                    <motion.h2 
                      initial={{ y: -30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      style={{ fontSize: '1.2rem', fontWeight: '400', color: '#6a3093', marginTop: '0.5rem' }}
                    >
                      Fulfillment of Faith, Action in Service.
                    </motion.h2>
                )}

              
              <motion.p variants={itemVariants}>
                {isMarathi
                  ? "काळेश्वरी मंदिर देवीच्या भक्तांसाठी म्हणजे केवळ पूजेचे स्थळ नसून श्रद्धा, संस्कार आणि सामूहिक उन्नतीचे केंद्र आहे. येथे दरवर्षी अन्नदान, शिक्षण सहाय्य, धार्मिक कार्यक्रम आणि सांस्कृतिक उपक्रमांची परंपरा जपली जाते. या प्रत्येक उपक्रमामागे आपले निःस्वार्थ सहकार्य आणि प्रेम असते. आपण दिलेली एक छोटीशी देणगीही अनेक गरजूंसाठी मोठा आधार ठरते. दान केल्यानंतर आपल्याला काळेश्वरी अन्नदान छत्र मंदिराकडून अधिकृत पावती मिळेल."
                  : "For the devotees of Kaleshwari Temple, it is not just a place of worship, but a center of faith, values, and collective upliftment. Every year, traditions such as food donation, educational assistance, religious events, and cultural programs are upheld here. Behind each of these initiatives lies your selfless support and love. Even a small donation from you can become a great support for many in need – after making a donation, you will receive an official receipt from the Kaleshwari Annadaan Chhatra Mandir."}
              </motion.p>

              <motion.div 
                className="bank-details-card"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <h3>{isMarathi ? "देणगीसाठी तपशील" : "Donation Details"}</h3>
                <div className="bank-details-grid">
                  <div className="detail-item">
                    <span>{isMarathi ? "बँक:" : "Bank:"}</span>
                    <span>{isMarathi ? "ICICI बँक" : "ICICI Bank"}</span>
                  </div>
                  <div className="detail-item">
                    <span>{isMarathi ? "खातेधारक:" : "Account Holder:"}</span>
                    <span>{isMarathi ? "काळेश्वरी मंदिर अन्नदान छत्र प्रतिष्ठान" : "KALESHWARI MANDIR ANNADAN CHHATRA FOUNDATION"}</span>
                  </div>
                  <div className="detail-item">
                    <span>{isMarathi ? "खाते क्रमांक:" : "Account No:"}</span>
                    <span>{isMarathi ? "००३९०५०२७४३५" : "003905027435"}</span>
                  </div>
                  <div className="detail-item">
                    <span>IFSC:</span>
                    <span>{isMarathi ? "ICIC०००००३९" : "ICIC0000039"}</span>
                  </div>
                </div>
              </motion.div>

              <motion.button 
                className="donate-button"
                onClick={() => setShowForm(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                {isMarathi ? "आता दान करा" : "Donate Now"}
                <span className="button-glow"></span>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="donation-form-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="form-left-panel"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <img src={templeLogo} alt="Temple Logo" className="logo" />
              <h2>{isMarathi ? "काळेश्वरी मंदिर ट्रस्ट" : "Kaleshwari Mandir Trust"}</h2>
              <h3>{isMarathi ? "देणगी फॉर्म" : "Donation Form"}</h3>
              <p className="form-note">
                <strong>{isMarathi ? "टीप:" : "Note:"}</strong> {isMarathi ? "सर्व माहिती रेकॉर्डसाठी ट्रस्टसोबत शेअर केली जाईल." : "All info will be shared with the trust for records."}
              </p>
              <div className="temple-image-container">
                <img src={DeviPhoto} alt="Devi" className="temple-image" />
              </div>
            </motion.div>

            <motion.div 
              className="form-right-panel"
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="payment-methods">
                <img src={qrcode} alt={isMarathi ? "पेमेंट पद्धती" : "Payment Methods"} className="payment-methods-logo" />
              </div>

             
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Donation;