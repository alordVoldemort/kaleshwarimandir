  // ImportantDates.jsx
  import React, { useEffect, useState } from 'react';
  import './ImportantDates.css';
  import { useLanguage } from '../../LanguageContext';

  
const templeImage = "https://zonixtec.com/cdn/home3.JPG";
const eventBg1 = "https://zonixtec.com/cdn/maha11.jpg";
const eventBg2 = "https://zonixtec.com/cdn/shivvvv.jpg";
const eventBg3 = "https://zonixtec.com/cdn/maha-shivratri-special.png";
const eventBg4 = "https://zonixtec.com/cdn/maharaj17.jpg";
const eventBg5 = "https://zonixtec.com/cdn/gudi.jpg";
const eventBg6 = "https://zonixtec.com/cdn/jayhanuman.jpg";
const eventBg7 = "https://zonixtec.com/cdn/guru07.jpg"; 
const eventBg8 = "https://zonixtec.com/cdn/Shardiya_Navratri.jpg";
const eventBg9 = "https://zonixtec.com/cdn/khoja.jpg";
const eventBg10 = "https://zonixtec.com/cdn/diwali1.jpg";
const eventBg11 = "https://zonixtec.com/cdn/vishunu.jpg";
const eventBg12 = "https://zonixtec.com/cdn/kalbhairav2.jpg";
const eventBg13 = "https://zonixtec.com/cdn/khandobamaharaj.jpg";
const eventBg14 = "https://zonixtec.com/cdn/khandobamaharaj2.jpg";
const eventBg15 = "https://zonixtec.com/cdn/dataa04.jpg";
const eventBg16 = "https://zonixtec.com/cdn/shivparvati1.jpg";

  // No need to import rangoliPattern if not directly used in JS (it's in CSS)
  // import rangoliPattern from '../../assets/maha.jpg'; 

  const ImportantDates = () => {
    const { isMarathi } = useLanguage();
    const [showIntro, setShowIntro] = useState(true);
    const [activeCategory] = useState('all');

    

    const events = [
      {
        event: { en: "Shakambhari Poornima – Evening Maha Aarti of the Goddess.", mr: "शाकंभरी पौर्णिमा - संध्याकाळ देवीची महाआरती." },
        
        highlight: true,
        date: { en: "January 13, 2025", mr: "१३ जानेवारी २०२५" },
        bgImage: eventBg1,
        patternImage: eventBg1
      },
      {
        event: { en: "Chhatrapati Shivaji Maharaj Jayanti  Special Program on the Occasion.", mr: "छत्रपती शिवाजी महाराज जयंती - निमित्त विशेष कार्यक्रम." },
      
        highlight: true,
        date: { en: "February 19, 2025", mr: "१९ फेब्रुवारी २०२५" },
        bgImage: eventBg2,
        patternImage: eventBg2
      },
      {
        event: { en: "Mahashivratri – Early morning Abhishek and grand Alankar Mahapooja for the Goddess and Lord Mahadev, along with Shri Kalbhairav Abhishek and worship.", mr: "महाशिवरात्री - पहाटे देवीजींना व महादेवांना अभिषेक व विशेष अलंकार महापूजा व श्री कालभैरव अभिषेक पूजन." },
        
        highlight: true,
        date: { en: "February 26, 2025", mr: "२६ फेब्रुवारी २०२५" },
        bgImage: eventBg3,
        patternImage: eventBg3
      },
      {
        event: { en: "Phalgun Vadya Tritiya – Special Program on the Occasion of Chhatrapati Shivaji Maharaj Jayanti as per the Tithi.", mr: "फाल्गुन वद्य तृतीया - तिथीप्रमाणे छत्रपती शिवाजी महाराज जयंती निमित्त विशेष कार्यक्रम." },
        
        highlight: true,
        date: { en: "March 17, 2025", mr: "१७ मार्च २०२५" },
        bgImage: eventBg4,
        patternImage: eventBg4
      },
      {
        event: { en: "Chaitra Shu 1 - Gudi Padwa and Chaitra Navratri Begin – In the morning, Kalimata Ghatasthapana is performed. During this Navratri, for all 9 days, the Goddess is worshipped with special decorations and rituals. Aarti is performed daily at 9 AM and 7 PM.", mr: "चैत्र शु १ - गुढीपाडवा व चैत्र नवरात्री प्रारंभ - सकाळी कालीमाता घटस्थापना ह्या नवरात्रीमध्ये ९ दिवस रोज देवीला विशेष अलंकार पूजा. सकाळी ०९ वाजता तसेच सायं. ०७ वाजता आरती." },
      
        highlight: true,
        date: { en: "March 30, 2025 ", mr: "३० मार्च २०२५ " },
        bgImage: eventBg5,
        patternImage: eventBg5
      },
      {
        event: { en: "Chaitra Poornima - Hanuman Jayanti (Shri Vijay - Maruti Abhishek Maha pooja in the morning).", mr: "चैत्र पौर्णिमा - हनुमान जयंती(सकाळी श्री विजय-मारुती अभिषेक महापूजा)." },
        
        highlight: true,
        date: { en: "April 12, 2025", mr: "१२ एप्रिल २०२५" },
        bgImage: eventBg6,
        patternImage: eventBg6
      },
      {
        event: { en: "Ashadh Poornima / Guru Poornima – Special Alankar pooja for the Goddess and Annadan Mahaprasad throughout the day.", mr: "आषाढ पौर्णिमा / गुरुपौर्णिमा - देवीला विशेष अलंकार पूजा, संपूर्ण दिवसभर अन्नदान महाप्रसाद." },
        
        highlight: true,
        date: { en: "July 10, 2025", mr: "१० जुलै २०२५" },
        bgImage: eventBg7,
        patternImage: eventBg7
      },
      {
        event: { en: "Shravan Kri 13 - on the day of Shivaratri, the royal wedding ceremony of the Goddess is held to mark the anniversary of the installation of the Goddess in the temple.", mr: "श्रावण कृ १३ - म्ह‌णजेच शिवरात्री या तिथीवर मंदिरात देवीस्थापनेच्या वर्धापन दिनानिमित्त देवीचा शाही विवाह सोहळा." },
        
        highlight: true,
        date: { en: "August 21, 2025", mr: "२१ ऑगस्ट २०२५" },
        bgImage: eventBg16,
        patternImage: eventBg16
      },
      {
        event: { en: "Ashwin Shu 1 – Sharadiya Navratri – Ghatsthapana During these nine days of Navratri, the Goddess is adorned and worshipped daily with special Alankar pooja. Aarti is performed at 9:00 AM and 7:00 PM.", mr: "आश्विन शुद्ध १ - शारदीय नवरात्र - घटस्थापना ह्या नवरात्रीमध्ये ९ दिवस रोज देवीला विशेष अलंकार पूजा. सकाळी ०९ वाजता तसेच सायं. ०७ वाजता आरती." },
        
        highlight: true,
        date: { en: "September 22, 2025", mr: "२२ सप्टेंबर २०२५" },
        bgImage: eventBg8,
        patternImage: eventBg8
      },
      {
        event: { en: "Ashwin Poornima / Kojagiri Poornima - Special decoration worship of the Goddess. Food distribution throughout the day, Mahaprasad, Goddess' wake and milk boiling program in the evening.", mr: "अश्विन पौर्णिमा / कोजागिरी पौर्णिमा - देवीची विशेष अलंकार पूजा. दिवसभर अन्नदान महाप्रसाद  सायं देवीचा जागर व दूध उकळण्याचा कार्यक्रम." },
        
        highlight: true,
        date: { en: "October 6, 2025", mr: "६ ऑक्टोबर २०२५" },
        bgImage: eventBg9,
        patternImage: eventBg9
      },
      {
        event: { en: "Ashwin Kri 14 Narak Chaturdashi (Diwali) : In the evening grand Kali Pujan and Havan, Maha Aarti and Maha Prasad.", mr: "अश्विन कृ १४ नरक चतुर्दशी (दीपावली) - सायं भव्य कालीपूजन व हवन, महाआरती व महाप्रसाद." },
        
        highlight: true,
        date: { en: "October 20, 2025", mr: "२० ऑक्टोबर २०२५	" },
        bgImage: eventBg10,
        patternImage: eventBg10
      },
      {
        event: { en: "Kartik Poornima / Tripurari Poornima - Evening Deepotsav.", mr: "कार्तिक पौर्णिमा / त्रिपुरारी पौर्णिमा - सायं दीपोत्सव." },
        
        highlight: true,
        date: { en: "November 5, 2025", mr: "५ नोव्हेंबर २०२५	" },
        bgImage: eventBg11,
        patternImage: eventBg11
      },
      {
        event: { en: "Kartik Kri 8 Kalashtami - Kalabhairav ​​Jayanti, Evening Mahabhishek Pooja, Havan and Nath's Bhandar.", mr: "कार्तिक कृ ८ कालाष्टमी - कालभैरव जयंती, सायं महाभिषेक पूजा, हवन व नाथांचे भराड." },
      
        highlight: true,
        date: { en: "12 November 2025", mr: "१२ नोव्हेंबर २०२५" },
        bgImage: eventBg12,
        patternImage: eventBg12
      },
      {
        event: { en: "Margashirsha Shu 1 – Beginning of Martand Bhairav Shad-Ratri Utsav Shri Malhari Martand Khandoba Ghatsthapana.", mr: "मार्गशिर्ष शु १ - मार्तंडभैरव षड्‌रात्रोत्सवारंभ श्री मल्हारी मार्तंड खंडोबा घटस्थापना." },
        
        highlight: true,
        date: { en: "21 November 2025", mr: "२१ नोव्हेंबर २०२५ "},
        bgImage: eventBg13,
        patternImage: eventBg13
      },
      {
        event: { en: "Margashirsha Shu 6 Champashashthi - Shri Khandoba Ghatasthapana at 12 noon, offering of Talibhandar and Mahaprasad.", mr: " मार्गशिर्ष शु ६ चंपाषष्ठी - श्री खंडोबा घटोत्थापन  दुपारी १२ वाजता तळीभंडार व महाप्रसाद." },
        
        highlight: true,
        date: { en: "26 November 2025", mr: "२६ नोव्हेंबर २०२५" },
        bgImage: eventBg14,
        patternImage: eventBg14
      },
      {
        event: { en: " Margashirsha Poornima – Shri Datt Jayanti. In the evening devotional night vigil (Jagar) of the Goddess and the traditional Bangdi Vadhvanyacha program (bangle offering ceremony) for Shri Yellamma Devi.", mr: " मार्गशिर्ष पौर्णिमा - श्री दत्त जयंती, सायं देवीचा जागर तसेच श्री यल्लम्मा देवी बांगडी वाढवण्याचा कार्यक्रम." },
        
        highlight: true,
        date: { en: "December 4, 2025", mr: "४ डिसेंबर २०२५ " },
        bgImage: eventBg15,
        patternImage: eventBg15
      },
    ];

    useEffect(() => {
      const timer = setTimeout(() => setShowIntro(false), 1500);
      return () => clearTimeout(timer);
    }, []);

    const filteredEvents = activeCategory === 'all'
      ? events
      : events.filter(item => item.category === activeCategory);

    return (
      <div className="important-page-container">
        {showIntro ? (
          <div className="modern-intro-screen">
            <div className="mandala-pattern"></div>
            <div className="intro-content">
              <div className="diya-container">
                <div className="modern-diya">
                  <div className="modern-flame"></div>
                </div>
              </div>
              <h1 className="modern-intro-text">
                {isMarathi ? "महत्त्वाचे कार्यक्रम" : "Important Events"}
              </h1>
              <div className="loading-bar">
                <div className="loading-progress"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="main-content">
            <div className="temple-banner" style={{ backgroundImage: `url(${templeImage})` }}>
              <div className="banner-overlay"></div>
              <div className="banner-gradient"></div>
              <header className="page-header">
                <h1 className="banner-title">
                  <span className="title-part">{isMarathi ? 'काळेश्वरी मंदिर':'Kaleshwari Mandir'}</span>
                  <span className="title-divider">-</span>
                  <span className="title-part">{isMarathi ? 'कार्यक्रम':'Events'}</span>
                </h1>
              </header>
            </div>

            <div className="content-area">
              

              <div className="events-list">
                {filteredEvents.map((item, index) => (
                  <div key={index} className={`event-item ${item.highlight ? 'highlight' : ''}`}>
                    {item.highlight && (
                      <div
                        className="event-pattern"
                        style={{
                          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${item.patternImage})`
                        }}
                      ></div>
                    )}
                    {/* Date positioned at top-left using absolute positioning */}
                    <div className="event-date-top-left">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
                      </svg>
                      <span>{isMarathi ? item.date.mr : item.date.en}</span>
                    </div>

                    {/* Event title at the bottom */}
                    <div className="event-content-bottom">
                      <h3>{isMarathi ? item.event.mr : item.event.en}</h3>
                    </div>

                    {/* Original event-meta and event-decoration can be removed or repositioned as needed */}
                    {/* For now, keeping them commented out as they conflict with the new layout */}
                    {/* <div className="event-meta">
                      <div className="event-date">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
                        </svg>
                        <span>{isMarathi ? item.date.mr : item.date.en}</span>
                      </div>
                    </div> */}
                    {/* <div className="event-decoration">
                      <div className="rangoli-dot"></div>
                      <div className="rangoli-line"></div>
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default ImportantDates;