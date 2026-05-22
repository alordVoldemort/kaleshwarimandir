import React, { useEffect, useState } from "react";
import { useLanguage } from '../../LanguageContext';
import "./OnlineBookingData.css";

const OnlineBookingData = () => {
  const [bookings, setBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pending"); // pending or confirmed
  const { isMarathi } = useLanguage();

  // Fetch bookings on mount
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setIsLoading(true);
    fetch("https://kaleshwarimandirannadanchhatra.org/pooja-backend/get_bookings.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPendingBookings(data.data.filter(b => b.status === "pending"));
          setBookings(data.data.filter(b => b.status === "approved"));
        }
      })
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateBookingStatus = (booking, newStatus) => {
    fetch("https://kaleshwarimandirannadanchhatra.org/pooja-backend/update_booking.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: booking.id, status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const updatedPending = pendingBookings.filter((b) => b.id !== booking.id);
          setPendingBookings(updatedPending);

          if (newStatus === "approved") {
            setBookings([...bookings, { ...booking, status: "approved" }]);

            const paymentMessage = isMarathi
              ? `प्रिय ${booking.name},\n\nतुमची ${booking.pooja} ची बुकिंग मंजूर झाली आहे...\n\n`
              : `Dear ${booking.name},\n\nYour ${booking.pooja} booking has been approved...\n\n`;

            window.open(`https://wa.me/${booking.number}?text=${encodeURIComponent(paymentMessage)}`, "_blank");
          } else {
            const rejectMessage = isMarathi
              ? `प्रिय ${booking.name},\n\nतुमची ${booking.date} रोजी ${booking.time} वाजता ${booking.pooja} ची बुकिंग मंजूर होऊ शकली नाही.`
              : `Dear ${booking.name},\n\nYour ${booking.pooja} booking for ${booking.date} at ${booking.time} could not be approved.`;

            window.open(`https://wa.me/${booking.number}?text=${encodeURIComponent(rejectMessage)}`, "_blank");
          }
        }
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  // Filter bookings based on search
  const filterBookings = (bookingList) => {
    if (!searchTerm) return bookingList;
    return bookingList.filter(booking => 
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.number.includes(searchTerm) ||
      booking.pooja.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredPending = filterBookings(pendingBookings);
  const filteredConfirmed = filterBookings(bookings);

  return (
    <div className="online-booking-container">
      {/* Statistics Cards */}
      <div className="booking-stats">
        <div className="stat-card pending">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{pendingBookings.length}</h3>
            <p>{isMarathi ? "प्रलंबित बुकिंग" : "Pending Bookings"}</p>
          </div>
        </div>

        <div className="stat-card confirmed">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{bookings.length}</h3>
            <p>{isMarathi ? "मंजूर बुकिंग" : "Confirmed Bookings"}</p>
          </div>
        </div>

        <div className="stat-card total">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="stat-info">
            <h3>{pendingBookings.length + bookings.length}</h3>
            <p>{isMarathi ? "एकूण बुकिंग" : "Total Bookings"}</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="booking-controls">
        <div className="search-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={isMarathi ? "नाव, मोबाईल किंवा पूजा शोधा..." : "Search by name, mobile or pooja..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="refresh-btn" onClick={fetchBookings} disabled={isLoading}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isLoading ? "spin" : ""}>
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {isMarathi ? "रिफ्रेश" : "Refresh"}
        </button>
      </div>

      {/* Tabs */}
      <div className="booking-tabs">
        <button
          className={`tab-btn ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {isMarathi ? "प्रलंबित" : "Pending"}
          {pendingBookings.length > 0 && (
            <span className="badge">{pendingBookings.length}</span>
          )}
        </button>

        <button
          className={`tab-btn ${activeTab === "confirmed" ? "active" : ""}`}
          onClick={() => setActiveTab("confirmed")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {isMarathi ? "मंजूर" : "Confirmed"}
          {bookings.length > 0 && (
            <span className="badge">{bookings.length}</span>
          )}
        </button>
      </div>

      {/* Booking Cards */}
      {isLoading ? (
        <div className="loading-state">
          <div className="loader"></div>
          <p>{isMarathi ? "बुकिंग लोड करत आहे..." : "Loading bookings..."}</p>
        </div>
      ) : (
        <>
          {activeTab === "pending" && (
            <div className="bookings-grid">
              {filteredPending.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3>{isMarathi ? "प्रलंबित बुकिंग नाहीत" : "No Pending Bookings"}</h3>
                  <p>{searchTerm ? (isMarathi ? "शोध परिणाम आढळले नाहीत" : "No search results found") : (isMarathi ? "सर्व बुकिंग प्रक्रिया पूर्ण झाल्या आहेत" : "All bookings have been processed")}</p>
                </div>
              ) : (
                filteredPending.map((booking) => (
                  <div key={`pending-${booking.id}`} className="booking-card">
                    <div className="card-header">
                      <div className="user-info">
                        <div className="user-avatar">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                          </svg>
                        </div>
                        <div>
                          <h4>{booking.name}</h4>
                          <span className="phone">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {booking.number}
                          </span>
                        </div>
                      </div>
                      <span className="status-badge pending">
                        {isMarathi ? "प्रलंबित" : "Pending"}
                      </span>
                    </div>

                    <div className="card-body">
                      <div className="detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="label">{isMarathi ? "पूजा" : "Pooja"}</span>
                          <strong>{booking.pooja}</strong>
                        </div>
                      </div>

                      <div className="detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <span className="label">{isMarathi ? "तारीख आणि वेळ" : "Date & Time"}</span>
                          <strong>{booking.date} at {booking.time}</strong>
                        </div>
                      </div>

                      <div className="detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="label">{isMarathi ? "रक्कम" : "Amount"}</span>
                          <strong className="amount">{booking.cost}</strong>
                        </div>
                      </div>

                      <div className="detail-item full-width">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <span className="label">{isMarathi ? "पत्ता" : "Address"}</span>
                          <p>{booking.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="card-actions">
                      <button
                        className="action-btn approve"
                        onClick={() => updateBookingStatus(booking, "approved")}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {isMarathi ? "मंजूर करा" : "Approve"}
                      </button>
                      <button
                        className="action-btn reject"
                        onClick={() => updateBookingStatus(booking, "rejected")}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {isMarathi ? "नकार द्या" : "Reject"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "confirmed" && (
            <div className="bookings-grid">
              {filteredConfirmed.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3>{isMarathi ? "मंजूर बुकिंग नाहीत" : "No Confirmed Bookings"}</h3>
                  <p>{searchTerm ? (isMarathi ? "शोध परिणाम आढळले नाहीत" : "No search results found") : (isMarathi ? "अद्याप कोणतीही बुकिंग मंजूर केली नाही" : "No bookings have been approved yet")}</p>
                </div>
              ) : (
                filteredConfirmed.map((booking) => (
                  <div key={`confirmed-${booking.id}`} className="booking-card confirmed">
                    <div className="card-header">
                      <div className="user-info">
                        <div className="user-avatar">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                          </svg>
                        </div>
                        <div>
                          <h4>{booking.name}</h4>
                          <span className="phone">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {booking.number}
                          </span>
                        </div>
                      </div>
                      <span className="status-badge confirmed">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                        {isMarathi ? "मंजूर" : "Approved"}
                      </span>
                    </div>

                    <div className="card-body">
                      <div className="detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="label">{isMarathi ? "पूजा" : "Pooja"}</span>
                          <strong>{booking.pooja}</strong>
                        </div>
                      </div>

                      <div className="detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <span className="label">{isMarathi ? "तारीख आणि वेळ" : "Date & Time"}</span>
                          <strong>{booking.date} at {booking.time}</strong>
                        </div>
                      </div>

                      <div className="detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="label">{isMarathi ? "रक्कम" : "Amount"}</span>
                          <strong className="amount">{booking.cost}</strong>
                        </div>
                      </div>

                      <div className="detail-item full-width">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <span className="label">{isMarathi ? "पत्ता" : "Address"}</span>
                          <p>{booking.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OnlineBookingData;
