import React, { createContext, useContext, useState } from 'react';

const AnnouncementContext = createContext();

export const AnnouncementProvider = ({ children }) => {
  const [announcement, setAnnouncement] = useState("Default announcement text");

  return (
    <AnnouncementContext.Provider value={{ announcement, setAnnouncement }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

// Custom hook for easier context usage
export const useAnnouncement = () => {
  return useContext(AnnouncementContext);
}