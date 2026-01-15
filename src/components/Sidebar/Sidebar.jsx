import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FiHome, FiGrid, FiCalendar, FiBookmark, FiClock,
    FiTrendingUp, FiStar, FiFilm, FiSettings, FiHelpCircle,
    FiMoon, FiLogOut
} from 'react-icons/fi';
import { genres } from '../../data/animeData';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const mainMenu = [
        { path: '/', label: 'Главная', icon: <FiHome /> },
        { path: '/catalog', label: 'Каталог', icon: <FiGrid /> },
        { path: '/schedule', label: 'Расписание', icon: <FiCalendar /> },
        { path: '/bookmarks', label: 'Закладки', icon: <FiBookmark /> },
        { path: '/history', label: 'История', icon: <FiClock /> },
    ];

    const categories = [
        { path: '/popular', label: 'Популярное', icon: <FiTrendingUp /> },
        { path: '/top-rated', label: 'Топ рейтинга', icon: <FiStar /> },
        { path: '/movies', label: 'Фильмы', icon: <FiFilm /> },
    ];

    return (
        <>
            <div
                className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
                onClick={onClose}
            />

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-content">
                    {/* Main Menu */}
                    <nav className="sidebar-section">
                        <h3 className="sidebar-title">Меню</h3>
                        <ul className="sidebar-menu">
                            {mainMenu.map(item => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                                        onClick={onClose}
                                    >
                                        <span className="sidebar-icon">{item.icon}</span>
                                        <span className="sidebar-label">{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Categories */}
                    <nav className="sidebar-section">
                        <h3 className="sidebar-title">Категории</h3>
                        <ul className="sidebar-menu">
                            {categories.map(item => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                                        onClick={onClose}
                                    >
                                        <span className="sidebar-icon">{item.icon}</span>
                                        <span className="sidebar-label">{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Genres */}
                    <nav className="sidebar-section">
                        <h3 className="sidebar-title">Жанры</h3>
                        <div className="genres-grid">
                            {genres.slice(0, 8).map(genre => (
                                <Link
                                    key={genre}
                                    to={`/genre/${genre.toLowerCase()}`}
                                    className="genre-tag"
                                    onClick={onClose}
                                >
                                    {genre}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Bottom Section */}
                    <div className="sidebar-bottom">
                        <button className="sidebar-link">
                            <span className="sidebar-icon"><FiMoon /></span>
                            <span className="sidebar-label">Тёмная тема</span>
                            <span className="theme-toggle active" />
                        </button>
                        <Link to="/settings" className="sidebar-link">
                            <span className="sidebar-icon"><FiSettings /></span>
                            <span className="sidebar-label">Настройки</span>
                        </Link>
                        <Link to="/help" className="sidebar-link">
                            <span className="sidebar-icon"><FiHelpCircle /></span>
                            <span className="sidebar-label">Помощь</span>
                        </Link>
                        <button className="sidebar-link logout">
                            <span className="sidebar-icon"><FiLogOut /></span>
                            <span className="sidebar-label">Выйти</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;