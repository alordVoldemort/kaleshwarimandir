import React, { useRef, useEffect } from "react";
import { useLanguage } from "../../LanguageContext";
import "./Gabhara.css";

// CDN image path
const cdnImage = "https://zonixtec.com/cdn/home3.JPG"; // Replace with the actual CDN path for the image

const Gabhara = () => {
  const { isMarathi } = useLanguage();
  const containerRef = useRef(null);
  const underlineRef = useRef(null);

  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
       // eslint-disable-next-line
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div className="gabhara-page">
      {/* Static Top Image with Title */}
      <div
        className="static-top-image"
        style={{ backgroundImage: `url(${cdnImage})` }}
      >
        <div className="overlay">
          <h1 className="section-title">
            {isMarathi ? "गर्भगृह" : "Inner Sanctum"}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="gabhara-container" ref={containerRef}>
        {/* Decorative Background Elements */}
        <div className="ornament-top-left"></div>
        <div className="ornament-top-right"></div>
        <div className="ornament-bottom-left"></div>
        <div className="ornament-bottom-right"></div>

        {/* Wooden Frame Elements */}
        <div className="wood-frame-top"></div>
        <div className="wood-frame-right"></div>
        <div className="wood-frame-bottom"></div>
        <div className="wood-frame-left"></div>

        {/* Corner Decorations */}
        <div className="wood-corner tl"></div>
        <div className="wood-corner tr"></div>
        <div className="wood-corner bl"></div>
        <div className="wood-corner br"></div>

        {/* Parchment Content */}
        <div className="parchment-paper">
          <h2 className="gabhara-title">
            {isMarathi ? "गर्भगृह" : "The Gabhara (Inner Sanctum)"}
            <div className="underline-container">
              <div className="underline" ref={underlineRef}></div>
            </div>
          </h2>

          <div className="gabhara-content">
            <div className="gabhara-text">
              <p className="fade-in">
                {isMarathi
                  ? "मंदिरातील देवीचा गाभारा हा १४ फूट लांब १० फूट रुंद असून तेथे सुंदर सुबक असे भगवतीचे सागवानी नक्षीकामातील तीन स्थाने आहेत. जी अगदी सुबक कोरिवकामात आहेत."
                  : "The sanctum of the goddess in the temple is 14 feet long and 10 feet wide, and there are three beautifully crafted wooden carvings of the goddess, which are very elegantly carved. In the sanctum, there is a beautiful four-armed idol of Goddess Dakshineshwari Kali Mata. This stone idol has been consecrated. On both sides of it, there are movable installations of the  entire Maharashtra Kulswamini Shri Tuljabhavani Mata and Shri Mandhardevi Kalubai mata."}
              </p>
              <p className="fade-in">
                {isMarathi
                  ? "गर्भगृहामध्ये मुख्य स्थानी दक्षिणेश्वरी काली मातेची सुंदर अशी चतुर्भुज मुर्ती आहे. ही पाषाणमूर्ती प्राण प्रतिष्ठापित केलेली आहे. त्याच प्रमाणे तिच्या दोन्ही बाजूलाच अखंड महाराष्ट्राची कुलस्वामिनी श्री तुळजाभवानी माता व श्री मांढरदेवी काळूबाई माता यांची चलित स्थापना केलेली आहे. तसेच याच गर्भगृहामध्ये श्री खंडोबा महाराज व श्री मळगंगा माता यांची चलित स्थापना केली आहे. जी मुख्य दक्षिणेश्वरी कालीमातेची मुर्ती आहे ती लांब जिव्हा व ती चतुर्भुज अगदी सुंदर सुबक आहे. भगवतीच्या एका हातात खड्‌ग एका हातात मुंड तसेच एक वरदमुद्रा व एक अभयमुद्रा आहे."
                  : "Also, in this sanctum, the moving installation of Shri Khandoba Maharaj and Shri Malganga Mata has been made. The main idol of Dakshineshwari Kali Mata is elongated with a long tongue and is beautifully adorned with four arms. In one hand, the Goddess holds a sword, in another a severed head. The third hand is in the blessing gesture (Varadamudra), and the fourth is in the protection gesture (Abhayamudra)."}
              </p>
              <p className="fade-in">
                {isMarathi
                  ? "व ती श्री शिवशंकराच्या हृदयस्थानावर उभी आहे. ज्याप्रमाणे मुळ कोलकत्ता येथे देवीची मूर्ती आहे तसेच भगवतीचे रूप आपल्याला येथे पाहायला मिळेल. मूर्तीची उंची ३.५ फूट असून देवीचा कृष्णवर्ण आपल्या डोळयांचे पारणे फेडतो."
                  : "She is standing on the heart of Lord Shivshankar. Just like the original idol of the Goddess in Kolkata, you can see a similar divine form here. The idol is 3.5 feet tall, and the Goddess’s dark complexion is truly dazzles our eyes."}
              </p>
            </div>

            <div className="gabhara-image-container">
              <div className="antique-photo-frame">
                <div className="frame-inner">
                  <img
                    src={cdnImage}
                    alt={isMarathi ? "दक्षिणेश्वर काली मातेची मूर्ती" : "Idol of Dakshineshwari Kali Mata"}
                    className="gabhara-image"
                  />
                </div>
              </div>
              <div className="image-caption">
                {isMarathi ? "श्री दक्षिणेश्वरी काली माता" : " Shri Dakshineshwari Kali Mata"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gabhara;
