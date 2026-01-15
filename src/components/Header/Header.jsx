import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FiSearch, FiUser, FiBell, FiMenu, FiX,
    FiHome, FiGrid, FiCalendar, FiBookmark, FiSettings
} from 'react-icons/fi';
import './Header.css';

const Header = ({ toggleSidebar, sidebarOpen }) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [notifications, setNotifications] = useState(3);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/', label: 'Главная', icon: <FiHome /> },
        { path: '/catalog', label: 'Каталог', icon: <FiGrid /> },
        { path: '/schedule', label: 'Расписание', icon: <FiCalendar /> },
        { path: '/bookmarks', label: 'Закладки', icon: <FiBookmark /> },
    ];

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                {/* Logo & Menu Toggle */}
                <div className="header-left">
                    <button
                        className="menu-toggle"
                        onClick={toggleSidebar}
                        aria-label="Toggle menu"
                    >
                        {sidebarOpen ? <FiX /> : <FiMenu />}
                    </button>

                    <Link to="/" className="logo">
                        <span className="logo-icon">🎌</span>
                        <span className="logo-text">
                            Anime<span className="logo-highlight">Hub</span>
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="header-nav">
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Right Section */}
                <div className="header-right">
                    {/* Search */}
                    <div className={`search-container ${searchOpen ? 'open' : ''}`}>
                        <button
                            className="search-toggle"
                            onClick={() => setSearchOpen(!searchOpen)}
                        >
                            <FiSearch />
                        </button>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Поиск аниме..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                className="search-clear"
                                onClick={() => setSearchQuery('')}
                            >
                                <FiX />
                            </button>
                        )}
                    </div>

                    {/* Notifications */}
                    <button className="header-btn notifications">
                        <FiBell />
                        {notifications > 0 && (
                            <span className="notification-badge">{notifications}</span>
                        )}
                    </button>

                    {/* User */}
                    <Link to="/profile" className="user-menu">
                        <div className="user-avatar">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=anime"
                                alt="Avatar"
                            />
                        </div>
                        <span className="user-name">Пользователь</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;