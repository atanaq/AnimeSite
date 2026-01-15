import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram, FiYoutube, FiMail } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        navigation: [
            { label: 'Главная', path: '/' },
            { label: 'Каталог', path: '/catalog' },
            { label: 'Расписание', path: '/schedule' },
            { label: 'Случайное', path: '/random' },
        ],
        genres: [
            { label: 'Экшен', path: '/genre/action' },
            { label: 'Романтика', path: '/genre/romance' },
            { label: 'Комедия', path: '/genre/comedy' },
            { label: 'Драма', path: '/genre/drama' },
        ],
        support: [
            { label: 'FAQ', path: '/faq' },
            { label: 'Контакты', path: '/contacts' },
            { label: 'Правила', path: '/rules' },
            { label: 'DMCA', path: '/dmca' },
        ],
    };

    const socialLinks = [
        { icon: <FiGithub />, url: '#', label: 'GitHub' },
        { icon: <FiTwitter />, url: '#', label: 'Twitter' },
        { icon: <FiInstagram />, url: '#', label: 'Instagram' },
        { icon: <FiYoutube />, url: '#', label: 'YouTube' },
    ];

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Top Section */}
                <div className="footer-top">
                    {/* Brand */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <span className="logo-icon">🎌</span>
                            <span className="logo-text">
                                Anime<span className="logo-highlight">Hub</span>
                            </span>
                        </Link>
                        <p className="footer-description">
                            Смотрите аниме онлайн бесплатно в высоком качестве.
                            Новинки аниме, популярные сериалы и фильмы с русской озвучкой.
                        </p>
                        <div className="footer-social">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className="social-link"
                                    aria-label={link.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Навигация</h4>
                            <ul>
                                {footerLinks.navigation.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.path}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>Жанры</h4>
                            <ul>
                                {footerLinks.genres.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.path}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>Поддержка</h4>
                            <ul>
                                {footerLinks.support.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.path}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="footer-newsletter">
                        <h4>Подписка на новости</h4>
                        <p>Получайте уведомления о новых сериях</p>
                        <form className="newsletter-form">
                            <input
                                type="email"
                                placeholder="Ваш email"
                                aria-label="Email для подписки"
                            />
                            <button type="submit">
                                <FiMail />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <p className="copyright">
                        © {currentYear} AnimeHub. Все права защищены.
                    </p>
                    <div className="footer-legal">
                        <Link to="/privacy">Конфиденциальность</Link>
                        <Link to="/terms">Условия использования</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;