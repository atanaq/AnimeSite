import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import AnimePage from './pages/AnimePage';
import Catalog from './pages/Catalog';
import Profile from './pages/Profile';
import './styles/global.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
      <Router>
        <div className="app">
          <Header
              toggleSidebar={toggleSidebar}
              sidebarOpen={sidebarOpen}
          />
          <Sidebar
              isOpen={sidebarOpen}
              onClose={closeSidebar}
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:id" element={<AnimePage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/schedule" element={<Home />} />
            <Route path="/bookmarks" element={<Profile />} />
            <Route path="/history" element={<Profile />} />
            <Route path="/genre/:genre" element={<Catalog />} />
            <Route path="*" element={<Home />} />
          </Routes>

          <Footer />
        </div>
      </Router>
  );
}

export default App;