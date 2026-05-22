// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect } from 'react';

// Components
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import AboutTemple from './Components/AboutTemple/AboutTemple';
import Templar from './Components/Templar/Templar';
import ImportantDates from './Components/ImportantDates/ImportantDates';
import TempleSchedule from './Components/TempleSchedule/TempleSchedule';
import Activities from './Components/Tempact/Tempact';
import Board from './Components/Board/Board';
import Pooja from './Components/Pooja/Pooja';
import Details from './Components/Details/Details';
import Gabhara from './Components/Gabhara/Gabhara';
import Donation from './Components/Donation/Donation';
import Admin from './Components/Admin/Admin';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import AboutTempleData from './Components/AboutTempleData/AboutTempleData';
import Footer from './Components/Footer/Footer';
import HistorySection from './Components/HistorySection/HistorySection';
import LiveDarshan from './Components/Live-Darshan/LiveDarshan';

// 🔒 PrivateRoute: restrict access to admin panel
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/Admin" />;
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

// Shared layout component
const Layout = ({ children }) => {
  const location = useLocation();
  const adminRoutes = ["/Admin", "/admin-panel"];
  const hideNavbarAndFooter = adminRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="App">
      {!hideNavbarAndFooter && <Navbar />}
      <main className="main-content">{children}</main>
      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
};

// Combine Home + About section
const HomeWithAbout = () => (
  <>
    <Home />
    <HistorySection />
    <AboutTempleData />
  </>
);

// Main app content
function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><HomeWithAbout /></Layout>} />
        <Route path="/live-darshan" element={<Layout><LiveDarshan /></Layout>} />
        <Route path="/about-temple" element={<Layout><AboutTemple /></Layout>} />
        <Route path="/temple-architecture" element={<Layout><Templar /></Layout>} />
        <Route path="/important-dates" element={<Layout><ImportantDates /></Layout>} />
        <Route path="/temple-schedule" element={<Layout><TempleSchedule /></Layout>} />
        <Route path="/Activities" element={<Layout><Activities /></Layout>} />
        <Route path="/Board" element={<Layout><Board /></Layout>} />
        <Route path="/Pooja" element={<Layout><Pooja /></Layout>} />
        <Route path="/Details" element={<Layout><Details /></Layout>} />
        <Route path="/Gabhara" element={<Layout><Gabhara /></Layout>} />
        <Route path="/Donation" element={<Layout><Donation /></Layout>} />

        {/* Admin Routes */}
        <Route path="/Admin" element={<Admin />} />
        <Route
          path="/admin-panel"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

// Root App component
function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
