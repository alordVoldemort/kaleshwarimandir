import React, { useEffect, useRef, useState } from 'react';
import './AboutTemple.css';
import { useLanguage } from '../../LanguageContext';

const AboutTemple = () => {
  const { isMarathi } = useLanguage();
   // eslint-disable-next-line
  const [isHovered, setIsHovered] = useState(false);

  const infoRef = useRef();
  const detailsRef = useRef();
  const mapRef = useRef();

  // CDN Image Paths
  const templeImage = 'https://zonixtec.com/cdn/home3.JPG';
  const img1 = 'https://zonixtec.com/cdn/Temple2.webp';
  const img2 = 'https://zonixtec.com/cdn/kaleshwari.webp';
  const kalash = 'https://zonixtec.com/cdn/kalash.webp';
  const templedetail = 'https://zonixtec.com/cdn/mata111.webp';

  useEffect(() => {
    const revealOnScroll = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(revealOnScroll, {
      threshold: 0.1,
    });

    [infoRef, detailsRef, mapRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-temple">
      <div className="hero-section">
        <div className="hero-image-container">
          <img src={templeImage} alt="Temple" className="temple-hero-img" />
          <div className="hero-overlay">
            <h1 className="hero-title">
              {isMarathi ? 'काळेश्वरी मंदिर' : 'Kaleshwari Temple'}
            </h1>
          </div>
        </div>
      </div>

      <div className="about-content">
        <section ref={infoRef} className="image-text-section">
          <div className="info-container">
            <div className="text-content">
              <h2>{isMarathi ? 'मंदिराचा इतिहास' : 'Temple History'}</h2>
              {isMarathi ? (
                <div>
                  <p>काळेश्वरी मंदिर अन्नदान छत्र हे पुण्यातील शांततामय वारजे माळवाडी परिसरात वसलेले एक पवित्र आणि आध्यात्मिक मंदिर आहे.</p>
                  <p>श्री. मच्छिंद्र महाराज वाळंज यांनी पुण्यातील वारजे माळवाडी या भागामध्ये महाकालीचे भव्य देवालय उभे केले, स्वतःच्या गृहस्थ जीवनामध्ये प्रत्येक जण स्वतःचे घर असावे स्वतःकडे संपत्ती असावी, परंतु श्री. मच्छिंद्र महाराज वाळंज यांनी या विचाराला तिलांजली देऊन, स्वतःच्या मालकी हक्काची खरेदी करून घेतलेली जमीन मंदिरासाठी देऊन त्या ठिकाणी हे भव्य देवालय उभारण्यात आले.</p>
                  <p>श्री. मच्छिंद्र महाराज वाळंज यांनी वीस वर्षे स्वतःच्या राहत्या घरामध्ये भगवतीची आराधना केली परंतु याला मूर्त स्वरूप देण्यासाठी आणि अखंड भक्तांसाठी या मंदिराची स्थापना करण्यात आली कोजागिरी पौर्णिमेच्या दिवशी या मंदिराचे भूमिपूजन संपन्न झाले. ज्या जागेवर आता मंदिर उभे आहे ती जागा पूर्वी श्री. मच्छिंद्र महाराज वाळंज यांची होती आणि सुमारे तीन ते चार वर्षे ती गायीचा गोठा म्हणून वापरली जात होती. जिथे सामान्य लोक आपल्या घरातील एका कोपऱ्यात देवघरासाठी जागा ठेवतात, परंतु श्री. मच्छिंद्र महाराज वाळंज यांचा असा विश्वास होता की देवासाठी मोठी आणि भव्य जागा असावी. फक्त घरात पूजा न करता, आदिमायाशक्तीचे एक अढळ प्रतीक निर्माण करावे, जे भविष्यातील पिढ्यांसाठी भक्ती आणि धर्माचे प्रतीक राहील, असा विचार होता. या पवित्र विचारातून मंदिर बांधण्याच्या स्वप्नाला नवजीवन मिळाले.</p>
                </div>
              ) : (
                <div>
                  <p>Kaleshwari Temple Annadan Chhatra is a sacred and spiritual temple located in the peaceful Warje Malwadi area of ​​Pune.</p>
                  <p>Shri Machindra Maharaj Walanj established a grand temple dedicated to Goddess Mahakali in this area of Warje Malwadi, Pune. While most people in their household lives aspire to own a home and acquire wealth, Shri Machindra Maharaj Walanj renounced this conventional mindset. He gave a piece of land he had personally purchased and legally owned for the construction of this majestic temple.</p>
                  <p>For twenty years, Shri Machindra Maharaj Walanj worshipped the Goddess in his own residence. However, in order to give this devotion a embodied form and create a sacred space for countless devotees, the foundation of the temple was laid on the auspicious day of Kojagiri Poornima. The land on which the temple now stands originally belonged to Shri Machindra Maharaj Walanj and had been used as a cowshed for nearly three to four years.</p>
                  <p>While most people dedicate a small corner of their home for a shrine, Shri Machindra Maharaj Walanj firmly believed that a divine presence deserves a large and magnificent space. Rather than limiting worship within the confines of a house, he envisioned the creation of a powerful symbol of the Divine Mother, a spiritual beacon that would stand as a symbol of devotion and dharma for future generations. With this pure thought, the dream of building this temple came to life.</p>
                </div>
              )}
              <div className="kalash-container">
                <img src={kalash} alt="Kalash" className="kalash-decoration" />
              </div>
            </div>

            <div className="image-stack">
              <div className="image-wrapper top-image">
                <img src={img1} alt="Temple Detail" className="stacked-img" />
              </div>
              <div className="image-wrapper bottom-image">
                <img src={img2} alt="Temple Detail" className="stacked-img" />
              </div>
            </div>
          </div>
        </section>

        <section id="temple-info" className="temple-info-section">
          <h2 className="section-headline">{isMarathi ? 'मंदिर तपशील' : 'Temple Details'}</h2>
          <div className="info-container">
            <div className="info-grid">
              <div className="info-tile" style={{ backgroundImage: `url(${img1})` }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="tile-overlay"></div>
                <div className="tile-wave"></div>
                <div className="tile-icon"></div>
                <h3 className="tile-title">{isMarathi ? 'स्थान' : 'Location'}</h3>
                <p className="tile-text">{isMarathi ? 'विठ्ठल नगर रोड, सहयोग नगर, वारजे' : 'Vitthal Nagar Rd, Sahayog Nagar, Warje'}</p>
              </div>

              <div className="info-tile" style={{ backgroundImage: `url(${img2})` }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="tile-overlay"></div>
                <div className="tile-wave"></div>
                <div className="tile-icon"></div>
                <h3 className="tile-title">{isMarathi ? 'मंदिराची वेळ' : 'Temple Hours'}</h3>
                <p className="tile-text">{isMarathi ? 'सकाळी ६:०० ते रात्री ९:०० (दररोज)' : '6:00 AM – 9:00 PM (Daily)'}</p>
              </div>

              <div className="info-tile" style={{ backgroundImage: `url(${templeImage})` }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="tile-overlay"></div>
                <div className="tile-wave"></div>
                <h3 className="tile-title">{isMarathi ? 'थेट दर्शन' : 'Live Darshan'}</h3>
                <p className="tile-text">{isMarathi ? 'आपल्या घरीच' : 'At Your Home Door'}</p>
              </div>
                                                                         
              <div className="info-tile" style={{ backgroundImage: `url(${templedetail})` }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="tile-overlay"></div>
                <div className="tile-wave"></div>
                <h3 className="tile-title">{isMarathi ? 'विशेष वैशिष्ट्ये' : 'Special Features'}</h3>
                <p className="tile-text">{isMarathi ? 'अन्नदान छत्र, कलश विधी, दररोज पूजा' : 'Annadan Chhatra, Kalash rituals, daily poojas'}</p>
              </div>
            </div>
          </div>
        </section>

        <section ref={mapRef} className="temple-map">
          <h2>{isMarathi ? 'नकाशावर स्थान' : 'Map Location'}</h2>
          <div className="map-container">
            <iframe
              title="Temple Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.108929111101!2d73.7923399738582!3d18.478724470453813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfa06d9d6fff%3A0x37eccb813e4a97dc!2sKaleshwari%20Mandir%20Annadan%20Chhatra%20Warje%20Malwadi%20Pune58!5e0!3m2!1sen!2sin!4v1748946918715!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutTemple;
