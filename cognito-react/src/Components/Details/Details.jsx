import React from "react";
import { useLanguage } from '../../LanguageContext';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Details.css";

const Details = () => {
  const { isMarathi } = useLanguage();

  const poojaData = [
    {
      type: isMarathi ? "दुग्धाभिषेक पूजा" : "Dugdhabhishek Pooja",
      time: isMarathi ? "प्रत्येक शनिवारी. सकाळी ७:०० ते ९:००" : "Every Saturday. 7:00 AM - 9:00 AM",
      amount: isMarathi ? "९,१०० रुपये/-" : "₹9,100/-",
      note: isMarathi
        ? `अभिषेकचे सामान भक्तांनी आणावे. भक्तांना मंदिराकडून श्रीफळ व प्रसाद देण्यात येईल.`
        : `Devotees should bring the items for Abhishek. Devotees will be given Shreephal and Prasad from the temple.`,
    },
    {
      type: isMarathi ? "अभिषेक वस्त्र महापूजा" : "Abhishek Vastra Mahapooja",
      time: isMarathi ? "प्रत्येक शनिवारी.\n सकाळी ७:०० ते ९:००" : "Every Saturday 7:00 AM - 9:00 AM",
      amount: isMarathi ? "११,००० रुपये/-" : "₹11,000/-",
      note: isMarathi
        ? `भक्तांनी देवीला हार, गजरे, फळे व लाल रंगाची साडी ओटी आणावी. ह्या पुजेसाठी अभिषेकचे हतर साहित्य मंदिराकडे राहिल. भक्तांना मंदिराकडून श्रीफळ, प्रसाद, व देवीजींची प्रतिमा देण्यात येईल.`
        : `Devotees should bring a garland, flowers, fruits, and a red saree (oti) for the Goddess. The materials for the Abhishek for this Pooja will remain with the temple. Devotees will receive a Shreephal, prasad, and an image of the Goddess from the temple.`,
    },
    {
      type: isMarathi ? "कुंकुमार्चन अभिषेक महापूजा" : " kunkumarchan Abhishek Mahapooja",
      time: isMarathi ? "बुकिंग केल्यानंतर मुहुर्त चांगला दिवस पाहून दिवस / वेळ ठरविला जाईल" : "As per Muhurt",
      amount: isMarathi ? "३१,००० रुपये/-" : "₹31,000/-",
      note: isMarathi
        ? `अभिषेकासाठी लागणारे सर्व साहित्य मंदिराकडे राहिल. देवीसाडी साडी, फळे, नैवेद्य तसेच ११ किलो शुद्ध हळदीयुक्त कुंकु मंदिराकडे राहिल. भक्तांना मंदिराकडून श्रीफळ, प्रसाद तसेच देवीजींना कुंकुमार्चन केलेले कुंकु व प्रतिमा देण्यात येईल.`
        : `All materials required for the Abhishek, including saree for the Goddess, fruits, naivedya, and 11 kg of pure turmeric-enriched kumkum, will be arranged by the temple. Devotees will receive a Shreephal, prasad, the kumkum used in the pooja, and an image of the Goddess.`,
    },
    {
      type: isMarathi ? "दुचाकी वाहन पूजा" : "Two-Wheeler Vehicle Pooja",
      time: isMarathi ? "सकाळी ८:०० ते सायं ५:००" : "8:00 AM - 5:00 PM",
      amount: isMarathi ? "५०१ रुपये/-" : "₹501/-",
      note: isMarathi ? `पूजेसाठी श्रीफळ व पेढे आणावे.` : `Devotees should bring Shreephal and Sweet for the pooja`,
    },
    {
      type: isMarathi ? "चारचाकी वाहन पूजा" : "Four-Wheeler Vehicle Pooja",
      time: isMarathi ? "सकाळी ८:०० ते सायं ५:००" : "8:00 AM - 5:00 PM",
      amount: isMarathi ? "१,००१ रुपये/-" : "₹1,001/-",
      note: isMarathi ? `पूजेसाठी श्रीफळ व पेढे आणावे` : `Devotees should bring Shreephal and Sweet for the pooja`,
    },
    {
      type: isMarathi ? "पंचामृत पूजा" : "Panchamrutham Pooja",
      time: isMarathi ? "सकाळी ८:०० ते सायं ५:००" : "8:00 AM - 5:00 PM",
      amount: isMarathi ? "५,०००-७,००० रुपये/-" : "₹5,000-7,000/-",
      note: isMarathi ? `पूजेसाठी श्रीफळ व पेढे आणावे.` : `Devotees should bring Shreephal and Sweet for the pooja.`,
    },
  ];

  const headers = [
    isMarathi ? "पूजेचा प्रकार" : "Type of Pooja",
    isMarathi ? "पूजेची वेळ" : "Pooja Time",
    isMarathi ? "दक्षिणा" : "Offering",
    isMarathi ? "नोंद" : "Note",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div className="details-container" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="details-header">
        <motion.h1 className="details-title" variants={itemVariants}>
          {isMarathi ? "पूजा तपशील" : "Pooja Details"}
        </motion.h1>
        <motion.p className="details-subtitle" variants={itemVariants}>
          {isMarathi ? "आमच्या मंदिरात उपलब्ध विशेष पूजा सेवा" : "Special Pooja Services Available at Our Temple"}
        </motion.p>
        <motion.div className="divider" variants={itemVariants} />
      </div>

      <motion.div className="details-content" variants={itemVariants}>
        <motion.div className="info-card" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }} variants={itemVariants}>
         
          <div className="info-content">
            <h3 className="info-title">{isMarathi ? "महत्वाची माहिती" : "Important Information"}</h3>
            <p className="info-text">
              {isMarathi
                ? "आमच्या मंदिरात खालील मुख्य पूजा उपलब्ध आहेत. सर्व पूजांसाठी आधी बुकिंग करणे अनिवार्य आहे. तुम्ही आमच्या वेबसाइटवरून ऑनलाइन पूजा बुक करू शकता."
                : "The following main Poojas are available in our temple. Advance booking is mandatory for all poojas. You can book your pooja online from our website."}
            </p>
          </div>
        </motion.div>

        <div className="table-container">
          <div className="table-scroll">
            <table className="pooja-table">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>
                      <div className="header-cell">
                        {header}
                        <div className="sort-indicator">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 15l-6-6-6 6" />
                          </svg>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {poojaData.map((pooja, index) => (
                  <motion.tr key={index} variants={itemVariants} whileHover="hover">
                    <td data-label={headers[0]} className="pooja-type">
                      <div className="pooja-type-content">
                        <div className="pooja-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5L18 9v6l-6 3.5-6-3.5V9l6-3.5z" />
                          </svg>
                        </div>
                        {pooja.type}
                      </div>
                    </td>
                    <td data-label={headers[1]}>{pooja.time}</td>
                    <td data-label={headers[2]} className="amount">
                      <div className="amount-badge">{pooja.amount}</div>
                    </td>
                    <td data-label={headers[3]}>
                      {pooja.note
                        .split('.')
                        .filter(line => line.trim() !== '')
                        .map((line, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <span style={{ marginRight: '6px' }}>•</span>
                            <span>{line.trim()}.</span>
                          </div>
                        ))}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
 <motion.div className="additional-info-card" variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <div className="additional-info-content">
            <h3 className="additional-info-title">
              {isMarathi ? "अतिरिक्त माहिती" : "Additional Information"}
            </h3>
            <div className="additional-info-text">
              {isMarathi ? (
                <>
                  <p>अभिषेक पूजेला त्याचप्रमाणे हवनासाठी येणाऱ्या भाविक भक्तांना नाश्त्याची सोय मंदिराकडे राहील.</p>
                  <p>भाविक भक्तांहस्ते देवीला अभिषेक पूजा व कालीहवन दर शनिवारी मंदिरात होईल. किंवा इतर कोणत्याही शुभ प्रसंगी हवन पूजा करायची असेल तर बुकिंग करणे आवश्यक आहे. कोणत्या पध्दतीची हवन पूजा करायची आहे त्यानुसार वेळ व दक्षिणा अवलंबून राहिल.</p>
                </>
              ) : (
                <>
                  <p>The temple will provide breakfast arrangements for devotees coming for the Abhishek Pooja and Havan.</p>
                  <p>Abhishek Pooja and Kali Havan will be performed by devotees every Saturday at the temple. If anyone wishes to perform a Havan on any other auspicious occasion, pre booking is required. The type of Havan to be performed will determine the timing and the required offering.</p>
                </>
              )}
            </div>
          </div>
        </motion.div>
        <motion.div className="cta-card" variants={itemVariants}>
          <div className="cta-content">
            <h3>{isMarathi ? "पूजा बुक करा" : "Book Your Pooja"}</h3>
            <p>{isMarathi ? "" : ""}</p>
            <Link to="/Pooja" className="cta-button">
              {isMarathi ? "आता बुक करा" : "Book Now"}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="cta-image">
            <div className="image-overlay"></div>
          </div>
        </motion.div>
        
      </motion.div>
    </motion.div>
  );
};

export default Details;
