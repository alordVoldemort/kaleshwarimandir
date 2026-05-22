import React, { useState } from "react";
import OnlineBookingData from "../OnlineBookingData/OnlineBookingData";
import Donationdata from "../Donationdata/Donationdata";
import { useAnnouncement } from "../../context/AnnouncementContext";
import "./AdminPanel.css";
import Addimg from "../AddImg/AddImg";

const AdminPanel = () => {
  const [selectedTab, setSelectedTab] = useState("booking");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { announcement, setAnnouncement } = useAnnouncement();
  const [tempAnnouncement, setTempAnnouncement] = useState(announcement);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveAnnouncement = () => {
    setAnnouncement(tempAnnouncement);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const menuItems = [
    {
      id: "booking",
      label: "Online Booking",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      id: "donation",
      label: "Donation Data",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12M6 8h12M8 13h3.5a2.5 2.5 0 1 0 0-5H9m0 5v5m0-5H6m3 0l7 8" />
        </svg>
      ),
    },
    {
      id: "add-img",
      label: "Gallery Images",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "booking":
        return <OnlineBookingData />;
      case "donation":
        return <Donationdata />;
      case "add-img":
        return <Addimg />;
      case "announcement":
        return (
          <div className="announcement-editor">
            <h3>Edit Announcement</h3>
            <textarea
              value={tempAnnouncement}
              onChange={(e) => setTempAnnouncement(e.target.value)}
              rows={5}
              className="announcement-textarea"
              placeholder="Enter announcement message..."
            />
            <button className="save-button" onClick={handleSaveAnnouncement}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Save Announcement
            </button>
            {showSuccess && (
              <div className="success-message">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Announcement saved successfully!
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const getTabTitle = () => {
    const tab = menuItems.find((item) => item.id === selectedTab);
    return tab ? tab.label : "Admin Panel";
  };

  return (
    <div className="admin-panel-container">
      {/* Mobile Menu Toggle */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {sidebarOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="admin-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2>Admin Panel</h2>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-button ${selectedTab === item.id ? "active" : ""}`}
              onClick={() => {
                setSelectedTab(item.id);
                setSidebarOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {selectedTab === item.id && <span className="active-indicator"></span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>© 2026 Kaleshwari Mandir</p>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-header">
          <h1>{getTabTitle()}</h1>
          <div className="header-actions">
            <div className="user-info">
              <div className="user-avatar">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </div>
              <span>Admin</span>
            </div>
          </div>
        </div>

        <div className="admin-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;
