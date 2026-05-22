import React from "react";
import { useLanguage } from "../../LanguageContext";
import "./Tempact.css";

// Define base CDN path
const cdn = "https://zonixtec.com/cdn/";

const activityContent = {
  en: {
    bannerTitle: "Our Community Activities",
    activities: [
      {
         title: "Navratri Saree Distribution Initiative",
        description:
          "During Navratri, the Temple Trust distributes sarees to underprivileged women as part of its welfare initiative.",
        image: `${cdn}mata10.webp`,
        color: "#B1045B",
        icon: `${cdn}saree-icon.jpg`,
      },
      {
        title:" Marriage Assistance Scheme",
        description: "The Trust organizes and sponsors weddings for underprivileged individuals, supporting them with dignity and compassion.",
        image: `${cdn}home3.JPG`,
        color: "#007C80",
        icon: `${cdn}wedding-icon (1).png`,
      },
      {
        title: "Blood Donation Camp",
        description:  "The Trust regularly organizes blood donation camps to support hospitals and save lives during medical emergencies.",
        image: `${cdn}mata44.webp`,
        color: "#C27C0E",
        icon: `${cdn}blood-icon (1).png`,
      },
      {
        title: "Food Donation",
        description: "Food Donation is a religious and social service in temples, where free, wholesome food is provided to devotees.",
        image: `${cdn}mata55.webp`,
        color: "#6C3483",
        icon: `${cdn}food-icon1.png`,
      },
      {
        title: "Cultural Heritage Events",
        description:
          "Traditional music, dance, and spiritual talks are organized to preserve and promote Indian culture.",
        image: `${cdn}mata88.webp`,
        color: "#2874A6",
        icon: `${cdn}icon-cluture.png`,
      },
      {
        title: "Eco-Friendly Initiatives",
        description:
          "Programs include tree plantation activities, plastic-free environment and sanitation initiatives.",
        image: `${cdn}matahome.jpg`,
        color: "#229954",
        icon: `${cdn}eco-icon__1.png`,
      },
    ],
  },
  mr: {
    bannerTitle: "विश्वस्तांकडून सामुदायिक उपक्रम",
    activities: [
      {
        title: "नवरात्र साडी वितरण उपक्रम",
        description:
          "नवरात्री दरम्यान, मंदिर ट्रस्ट त्यांच्या कल्याणकारी उपक्रमाचा भाग म्हणून दुर्बल, गरजू व आर्थिकदृष्ट्या दुर्बल महिलांना सन्मानपूर्वक साड्यांचे वाटप करते.",
        image: `${cdn}mata10.webp`,
        color: "#B1045B",
        icon: `${cdn}saree-icon.jpg`,
      },
      {
        title: "विवाह योजना",
        description:
          "ट्रस्ट दुर्बल व गरजू व्यक्तींसाठी विवाहसोहळे आयोजित व प्रायोजित करते, त्यांच्या आयुष्याच्या या नव्या प्रवासात सन्मान, प्रेम व करुणेने त्यांना आधार देते.",
        image: `${cdn}home3.JPG`,
        color: "#007C80",
        icon: `${cdn}wedding-icon (1).png`,
      },
      {
        title: "रक्तदान शिबिर",
        description:
          "वैद्यकीय आपत्कालीन परिस्थितीत रुग्णालयांना मदत करण्यासाठी आणि जीव वाचवण्यासाठी ट्रस्ट नियमितपणे रक्तदान शिबिरे आयोजित करते.",
        image: `${cdn}mata44.webp`,
        color: "#C27C0E",
        icon: `${cdn}blood-icon (1).png`,
      },
      {
        title: "अन्नदान सेवा",
        description:
          "अन्नदान सेवा ही मंदिरातील एक धार्मिक आणि सामाजिक सेवा आहे, जिथे भक्तांना आणि गरजूंना मोफत, अन्न दिलं जातं.",
        image: `${cdn}mata55.webp`,
        color: "#6C3483",
        icon: `${cdn}food-icon (1).png`,
      },
      {
        title: "संस्कृती वारसा कार्यक्रम",
        description:"भारतीय संस्कृतीचे जतन आणि संवर्धन करण्यासाठी पारंपारिक संगीत, नृत्य आणि आध्यात्मिक व्याख्याने आयोजित केली जातात.",
        image: `${cdn}mata88.webp`,
        color: "#2874A6",
        icon: `${cdn}icon-cluture.png`,
      },
      {
        title: "पर्यावरण पूरक उपक्रम",
        description:
          "कार्यक्रमांमध्ये वृक्षारोपण उपक्रम, प्लास्टिकमुक्त पर्यावरण, स्वच्छता उपक्रम व हरित क्षेत्र वाढवण्याचे प्रयत्न यांचा समावेश आहे.",
        image: `${cdn}matahome.jpg`,
        color: "#229954",
        icon: `${cdn}eco-icon__1.png`,
      },
    ],
  },
};

const Activities = () => {
  const { isMarathi } = useLanguage();
  const language = isMarathi ? "mr" : "en";
  const content = activityContent[language];

  return (
    <div className="activities-section">
      {/* Top Banner */}
      <div className="top-banner">
        <div className="banner-overlay"></div>
        <img
          src={`${cdn}home3.JPG`}
          alt="Community Activities Banner"
          className="banner-image-activities"
          loading="lazy"
        />
        <div className="banner-content">
          <div className="banner-text-container">
            <h1 className="banner-title">{content.bannerTitle}</h1>
            <div className="banner-divider"></div>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{content.title}</h2>
          <div className="section-divider"></div>
        </div>

        {/* Activity Cards */}
        <div className="activity-cards-container">
          <div className="activity-cards">
            {content.activities.map((activity, index) => (
              <div className="activity-card" key={index}>
                <div className="card-image-container">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="card-image"
                    loading="lazy"
                  />
                  <div className="image-overlay"></div>
                  <div className="activity-decoration">
                    <img
                      src={activity.icon}
                      alt=""
                      className="decorative-element"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="activity-title">{activity.title}</h3>
                  <p className="activity-description">{activity.description}</p>
                </div>

                <div className="initiative-wave">
                  <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path
                      d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,
                      70.36-5.37,136.33-33.31,206.8-37.5C438.64,
                      32.43,512.34,53.67,583,72.05c69.27,18,
                      138.3,24.88,209.4,13.08,36.15-6,
                      69.85-17.84,104.45-29.34C989.49,
                      25,1113-14.29,1200,52.47V0Z"
                      opacity=".25"
                      fill={activity.color}
                    ></path>
                    <path
                      d="M0,0V15.81C13,36.92,27.64,56.86,
                      47.69,72.05,99.41,111.27,165,111,
                      224.58,91.58c31.15-10.15,60.09-26.07,
                      89.67-39.8,40.92-19,84.73-46,
                      130.83-49.67,36.26-2.85,70.9,
                      9.42,98.6,31.56,31.77,25.39,62.32,
                      62,103.63,73,40.44,10.79,
                      81.35-6.69,119.13-24.28s75.16-39,
                      116.92-43.05c59.73-5.85,113.28,
                      22.88,168.9,38.84,30.2,8.66,59,
                      6.17,87.09-7.5,22.43-10.89,48-26.93,
                      60.65-49.24V0Z"
                      opacity=".5"
                      fill={activity.color}
                    ></path>
                    <path
                      d="M0,0V5.63C149.93,59,
                      314.09,71.32,475.83,42.57c43-7.64,
                      84.23-20.12,127.61-26.46,59-8.63,
                      112.48,12.24,165.56,35.4C827.93,
                      77.22,886,95.24,951.2,90c86.53-7,
                      172.46-45.71,248.8-84.81V0Z"
                      fill={activity.color}
                    ></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optional Gallery Section (uncomment if needed) */}
      {/* <div className="gallery-section">
        <GallerySection
          heading={isMarathi ? "आमची गॅलरी" : "Our Gallery"}
          description={
            isMarathi
              ? "ट्रस्टच्या उपक्रमांची छायाचित्रे आणि व्हिडिओ"
              : "Photos and videos of the Trust's initiatives"
          }
        />
      </div> */}
    </div>
  );
};

export default Activities;
