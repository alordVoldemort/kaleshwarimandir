import React, { useState, useEffect } from "react";
import "./Pooja.css";
import { useLanguage } from '../../LanguageContext';

// Images
import banner1 from '../../assets/milkk.jpeg';
import banner2 from '../../assets/Vastra new.jpeg';
import banner3 from '../../assets/kumkum.jpg';
import banner4 from '../../assets/two1.png'; 
import banner5 from '../../assets/car111.jpeg'; 
import pooja1 from '../../assets/milk2222.jpg';
import pooja2 from '../../assets/var22.jpg';
import pooja3 from '../../assets/kumkumpooja1.jpg';
import pooja4 from '../../assets/two1.png';
import pooja7 from '../../assets/carpooja.png';
import pooja6 from '../../assets/panchamurt.png';
import banner6 from '../../assets/spicalpoojause.jpg';

const Pooja = () => {
  const { isMarathi } = useLanguage();

  // Helper function to convert Latin digits to Marathi


  const [showForm, setShowForm] = useState(false);
  const [selectedPooja, setSelectedPooja] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    time: "",
    date: "",
    address: ""
  });
  const [errors, setErrors] = useState({});
  const [bookingStatus, setBookingStatus] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  
useEffect(() => {
  if (bookingStatus === 'pending') {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}, [bookingStatus]);

  
  // Banner images for slider
  const bannerImages = [
    {
      image: banner1,
      title: isMarathi ? "दुग्धाभिषेक पूजा" : "Dugdabhishek Pooja",
    },
    {
      image: banner2,
      title: isMarathi ? "अभिषेक वस्त्र महापूजा" : "Abhishek Vastra Maha pooja",
    },
    {
      image: banner3,
      title: isMarathi ? "कुंकुमार्चन अभिषेक महापूजा" : "kunkumarchan Abhishek Mahapooja",
    },
    {
      image: banner4,
      title: isMarathi ? "दुचाकी वाहन पूजा" : "Two-Wheeler Vehicle Pooja",
    },
    {
      image: banner5,
      title: isMarathi ? "चारचाकी वाहन पूजा" : "Four-Wheeler Pooja",
    },
    {
      image: banner6,
      title: isMarathi ? "पंचामृत पूजा" : "Panchamrutham Pooja",
    }
  ];

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  // Pooja data with conditional Marathi costs
 const poojaData = [
  {
    title: isMarathi ? " दुग्धाभिषेक पूजा / पंचामृत पूजा" : "Dugdabhishek Pooja / Panchamrutham Pooja ",
    image: pooja1,
    color: "#B1045B",
    cost: isMarathi ? "५,००१ - ७,००१ रुपये" : "₹5,001 - ₹7,001",
  },
  {
    title: isMarathi ? "अभिषेक वस्त्र महापूजा" : "Abhishek Vastra Mahapooja",
    image: pooja2,
    color: "#007C80",
    cost: isMarathi ? "११,००० रुपये" : "₹11,000",
  },
  {
    title: isMarathi ? "कुंकुमार्चन अभिषेक महापूजा" : "kunkumarchan Abhishek Mahapooja",
    image: pooja3,
    color: "#C27C0E",
    cost: isMarathi ? "३१,००० रुपये" : "₹31,000",
  },
  {
    title: isMarathi ? "दुचाकी वाहन पूजा" : "Two-Wheeler Pooja",
    image: pooja4,
    color: "#1C8D73",
    cost: isMarathi ? "५०१ रुपये" : "₹501",  // No comma for 3-digit numbers
  },
  {
    title: isMarathi ? "चारचाकी वाहन पूजा" : "Four-Wheeler Vehicle Pooja",
    image: pooja7,
    color: "#884EA0",
    cost: isMarathi ? "१,००१ रुपये" : "₹1,001",
  },
  
];

  const handleBookNow = (pooja) => {
    setSelectedPooja(pooja);
    setShowForm(true);
    setErrors({});
    setBookingStatus(null);
   document.body.style.overflow = 'hidden';

  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedPooja(null);
    setFormData({ name: "", number: "", time: "", date: "", address: "" });
    setErrors({});
  document.body.style.overflow = 'auto';

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "number") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

 const validateForm = () => {
  const newErrors = {};
  const today = new Date().toISOString().split("T")[0];

  console.log("Validating formData:", formData);

  if (!formData.name.trim()) {
    newErrors.name = isMarathi ? "नाव आवश्यक आहे." : "Name is required.";
  } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
    newErrors.name = isMarathi
      ? "नावात फक्त अक्षरे आणि मोकळी जागा असू शकते."
      : "Name can only contain letters and spaces.";
  }

  if (!formData.number.trim()) {
    newErrors.number = isMarathi ? "व्हाट्सअॅप नंबर आवश्यक आहे." : "WhatsApp number is required.";
  } else if (!/^\d{10}$/.test(formData.number)) {
    newErrors.number = isMarathi
      ? "वैध 10-अंकी व्हाट्सअॅप नंबर प्रविष्ट करा."
      : "Enter a valid 10-digit WhatsApp number.";
  }

  if (!formData.date) {
    newErrors.date = isMarathi ? "पूजेची तारीख आवश्यक आहे." : "Pooja date is required.";
  } else if (new Date(formData.date) < new Date(today)) {
    newErrors.date = isMarathi ? "कृपया भविष्यातील तारीख निवडा." : "Please select a future date.";
  }

  if (!formData.time.trim()) {
    newErrors.time = isMarathi ? "पसंतीची वेळ आवश्यक आहे." : "Preferred time is required.";
  } else if (!["07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "06:00 PM"].includes(formData.time)) {
    newErrors.time = isMarathi
      ? "वेळ निवडण्यात अडचण आहे."
      : "Invalid time selected.";
  }

  if (!formData.address.trim()) {
    newErrors.address = isMarathi ? "पत्ता आवश्यक आहे." : "Address is required.";
  }

  console.log("Validation errors:", newErrors); //  Show errors clearly

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleBookingRequest = () => {
    console.log("Booking request triggered");

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    const bookingId = Date.now();

    const newBooking = {
      id: bookingId,
      name: formData.name,
      number: formData.number,
      date: formData.date,
      time: formData.time,
      address: formData.address,
      pooja: selectedPooja.title,
      cost: selectedPooja.cost,
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    console.log("Sending data:", newBooking);

    fetch("https://kaleshwarimandirannadanchhatra.org/pooja-backend/booking.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBooking)
    })
    .then(async res => {
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        console.log("Response from server:", data);
        if (data.success) {
          setBookingStatus("pending");
          handleCloseForm();
        } else {
          alert(data.message || "Something went wrong.");
        }
      } catch (err) {
        console.error("Invalid JSON response from server:", text);
        alert("Server error. Please contact support.");
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Server error. Please try again later.");
    });
  };

  return (
    <div className="pooja-container">
      {/* Hero Slider Section */}
      <div className="pooja-slider">
        <div className="pooja-slider-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {bannerImages.map((banner, index) => (
            <div key={index} className="pooja-slide">
              <img src={banner.image} alt={`Pooja Banner ${index + 1}`} className="pooja-slide-image" />
              <div className="pooja-slide-content">
                <h2>{banner.title}</h2>
                <button
                  className="pooja-slider-book-btn"
                  onClick={() => handleBookNow(poojaData[index])}
                >
                  {isMarathi ? "आता बुक करा" : "Book Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="pooja-slider-dots">
          {bannerImages.map((_, index) => (
            <span
              key={index}
              className={index === currentSlide ? "pooja-dot active" : "pooja-dot"}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* All Pujas Grid Section */}
      <div className="pooja-all-section">
        <div className="pooja-container-inner">
          <h2 className="pooja-section-title">
            {isMarathi ? "ऑनलाइन पूजा बुकिंग" : "Online Pooja Booking"}
            <span className="pooja-title-underline"></span>
          </h2>

          <div className="pooja-grid">
            {poojaData.map((pooja, index) => (
              <div
                className="pooja-card"
                key={index}
                style={{ '--card-color': pooja.color }}
              >
                <div className="pooja-card-image-container">
                  <img src={pooja.image} alt={pooja.title} className="pooja-card-image" />
                </div>
                <div className="pooja-card-content">
                  <h3>{pooja.title}</h3>
                  <p>{pooja.description}</p>
                  <div className="pooja-card-footer">
                    <div className="pooja-card-cost">{pooja.cost}</div>
                    <button
                      className="pooja-book-now-btn"
                      onClick={() => handleBookNow(pooja)}
                    >
                      {isMarathi ? "बुक करा" : "Book Now"}
                      <span className="pooja-btn-glow"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showForm && selectedPooja && (
        <div className="pooja-form-modal-overlay">
          <div className="pooja-booking-form">
            <button className="pooja-form-close-btn" onClick={handleCloseForm}>
              <svg viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>

            <h2>
            
              <span className="pooja-highlight">{selectedPooja.title}</span>
            </h2>

            <div className="pooja-form-group">
              <label>{isMarathi ? "पूर्ण नाव" : "Full Name"}:</label>
              <input
                type="text"
                className="pooja-input"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <p className="pooja-error-msg">{errors.name}</p>}
            </div>

            <div className="pooja-form-group">
              <label>{isMarathi ? "व्हाट्सअॅप नंबर" : "WhatsApp Number"}:</label>
              <input
                type="tel"
                className="pooja-input"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                required
                maxLength="10"
              />
              {errors.number && <p className="pooja-error-msg">{errors.number}</p>}
            </div>

            <div className="pooja-form-group">
              <label>{isMarathi ? "पत्ता" : "Address"}:</label>
              <textarea
                className="pooja-textarea"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows="3"
              />
              {errors.address && <p className="pooja-error-msg">{errors.address}</p>}
            </div>
             <div className="pooja-form-group">
  <label>{isMarathi ? "पूजेची तारीख" : "Pooja Date"}:</label>
  <input
    type="date"
    className="pooja-input"
    name="date"
    value={formData.date}
    onChange={handleInputChange}
    required
  />
  {errors.date && <p className="pooja-error-msg">{errors.date}</p>}
</div>
          <div className="pooja-form-group">
  <label>{isMarathi ? "पसंतीची वेळ" : "Preferred Time"}:</label>
  <select
    className="pooja-input"
    name="time"
    value={formData.time}
    onChange={handleInputChange}
    required
  >
    <option value="">
      {isMarathi ? "वेळ निवडा" : "Select a Time"}
    </option>

    {/* Time Slot Options */}
    {[
      { value: "07:00 AM", en: "07:00 AM", mr: "सकाळी ०७:००" },
      { value: "08:00 AM", en: "08:00 AM", mr: "सकाळी ०८:००" },
      { value: "09:00 AM", en: "09:00 AM", mr: "सकाळी ०९:००" },
      { value: "10:00 AM", en: "10:00 AM", mr: "सकाळी १०:००" },
      { value: "11:00 AM", en: "11:00 AM", mr: "सकाळी ११:००" },
      { value: "12:00 PM", en: "12:00 PM", mr: "दुपारी १२:००" },
      { value: "06:00 PM", en: "06:00 PM", mr: "संध्याकाळी ०६:००" },
    ].map((slot, index) => (
      <option key={index} value={slot.value}>
        {isMarathi ? slot.mr : slot.en}
      </option>
    ))}
  </select>

  {errors.time && <p className="pooja-error-msg">{errors.time}</p>}
</div>


            {/* Summary Section */}
            <div className="pooja-summary-section">
              <div className="pooja-summary-item">
                <span>{isMarathi ? "पूजा" : "Pooja"}:</span>
                <span>{selectedPooja.title}</span>
              </div>
              <div className="pooja-summary-item">
                <span>{isMarathi ? "रक्कम" : "Amount"}:</span>
                <span className="pooja-amount">{selectedPooja.cost}</span>
              </div>
            </div>

           <button
            className="pooja-pay-btn"
            onClick={handleBookingRequest}
           >
  {isMarathi ? "बुकिंग विनंती पाठवा" : "Send Booking Request"}
  <span className="pooja-btn-glow"></span>
</button>
          </div>
        </div>
      )}

      {/* Booking Status Modal */}
      {bookingStatus === 'pending' && (
        <div className="pooja-status-modal">
          <div className="pooja-status-content">
            <div className="pooja-status-icon success">
              <svg viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            </div>
            <h3>{isMarathi ? "तुमची विनंती दाखल केली आहे " : "Your request has been submitted"}</h3>
            <p>
              {isMarathi
                ? "तुमची पूजा बुकिंग विनंती व्यवस्थापकाकडे पाठवण्यात आली आहे. मंजुरी झाल्यानंतर तुम्हाला पेमेंट सूचना मिळेल."
                : "Your pooja booking request has been sent to the admin. You will receive payment instructions once approved."}
            </p>
            <button
              className="pooja-status-ok-btn"
              onClick={() => setBookingStatus(null)}
            >
              {isMarathi ? "ठीक आहे" : "OK"}
            </button>
          </div>
        </div>
      )}
    </div>  
  );
};

export default Pooja;