import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiPlus, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { animeData } from '../../data/animeData';
import './Hero.css';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const featuredAnime = animeData.slice(0, 4);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredAnime.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [featuredAnime.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % featuredAnime.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + featuredAnime.length) % featuredAnime.length);
    };

    const current = featuredAnime[currentSlide];

    return (
        <section className="hero">
            {/* Background */}
            <div className="hero-backgrounds">
                {featuredAnime.map((anime, index) => (
                    <div
                        key={anime.id}
                        className={`hero-bg ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${anime.cover})` }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="hero-content">
                <div className="hero-info animate-slide-up">
                    <div className="hero-badges">
                        <span className="badge badge-primary">
                            <FiStar /> {current.rating}
                        </span>
                        <span className="badge badge-success">
                            {current.status === 'ongoing' ? 'Онгоинг' : 'Завершён'}
                        </span>
                        <span className="badge">{current.year}</span>
                    </div>

                    <h1 className="hero-title">{current.title}</h1>
                    <p className="hero-original">{current.titleOriginal}</p>

                    <div className="hero-meta">
                        <span>{current.episodes} эпизодов</span>
                        <span>•</span>
                        <span>{current.studio}</span>
                        <span>•</span>
                        <span>{current.genres.slice(0, 3).join(', ')}</span>
                    </div>

                    <p className="hero-description">{current.description}</p>

                    <div className="hero-actions">
                        <Link to={`/anime/${current.id}`} className="btn btn-primary">
                            <FiPlay /> Смотреть
                        </Link>
                        <button className="btn btn-secondary">
                            <FiPlus /> В закладки
                        </button>
                    </div>
                </div>

                {/* Card Preview */}
                <div className="hero-card animate-fade-in">
                    <img src={current.image} alt={current.title} />
                    <div className="hero-card-overlay">
                        <FiPlay className="play-icon" />
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="hero-nav">
                <button className="hero-nav-btn" onClick={prevSlide}>
                    <FiChevronLeft />
                </button>
                <div className="hero-dots">
                    {featuredAnime.map((_, index) => (
                        <button
                            key={index}
                            className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
                <button className="hero-nav-btn" onClick={nextSlide}>
                    <FiChevronRight />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="hero-progress">
                <div
                    className="hero-progress-bar"
                    style={{ animationDuration: '6s' }}
                    key={currentSlide}
                />
            </div>
        </section>
    );
};

export default Hero;