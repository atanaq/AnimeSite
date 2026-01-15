import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiPlus, FiStar, FiCheck } from 'react-icons/fi';
import './AnimeCard.css';

const AnimeCard = ({ anime, index = 0 }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleBookmark = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsBookmarked(!isBookmarked);
    };

    return (
        <article
            className="anime-card"
            style={{ animationDelay: `${index * 0.05}s` }}
        >
            <Link to={`/anime/${anime.id}`} className="anime-card-link">
                {/* Image Container */}
                <div className="anime-card-image">
                    {!imageLoaded && <div className="skeleton card-skeleton" />}
                    <img
                        src={anime.image}
                        alt={anime.title}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        style={{ opacity: imageLoaded ? 1 : 0 }}
                    />

                    {/* Overlay */}
                    <div className="anime-card-overlay">
                        <button className="play-btn">
                            <FiPlay />
                        </button>
                    </div>

                    {/* Top Badges */}
                    <div className="anime-card-badges">
                        <span className="badge-rating">
                            <FiStar /> {anime.rating}
                        </span>
                        {anime.status === 'ongoing' && (
                            <span className="badge-status">Онгоинг</span>
                        )}
                    </div>

                    {/* Episodes Badge */}
                    <div className="anime-card-episodes">
                        {anime.currentEpisode} / {anime.episodes} эп.
                    </div>

                    {/* Bookmark Button */}
                    <button
                        className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
                        onClick={handleBookmark}
                        aria-label={isBookmarked ? 'Удалить из закладок' : 'Добавить в закладки'}
                    >
                        {isBookmarked ? <FiCheck /> : <FiPlus />}
                    </button>
                </div>

                {/* Info */}
                <div className="anime-card-info">
                    <h3 className="anime-card-title">{anime.title}</h3>
                    <p className="anime-card-genres">
                        {anime.genres.slice(0, 2).join(' • ')}
                    </p>
                    <div className="anime-card-meta">
                        <span>{anime.year}</span>
                        <span>•</span>
                        <span>{anime.studio}</span>
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default AnimeCard;