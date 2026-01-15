import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    FiPlay, FiPlus, FiShare2, FiHeart, FiStar,
    FiCalendar, FiFilm, FiClock, FiUsers
} from 'react-icons/fi';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import AnimeGrid from '../components/AnimeGrid/AnimeGrid';
import { animeData } from '../data/animeData';
import './Pages.css';

const AnimePage = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [currentEpisode, setCurrentEpisode] = useState(1);
    const [activeTab, setActiveTab] = useState('episodes');
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const found = animeData.find(a => a.id === parseInt(id));
        setAnime(found || animeData[0]);
        window.scrollTo(0, 0);
    }, [id]);

    if (!anime) {
        return <div className="loading">Загрузка...</div>;
    }

    const episodes = Array.from({ length: anime.episodes }, (_, i) => ({
        number: i + 1,
        title: `Эпизод ${i + 1}`,
        released: i < anime.currentEpisode
    }));

    const relatedAnime = animeData.filter(a =>
        a.id !== anime.id &&
        a.genres.some(g => anime.genres.includes(g))
    ).slice(0, 4);

    return (
        <main className="main-content anime-page">
            {/* Hero Banner */}
            <div
                className="anime-banner"
                style={{ backgroundImage: `url(${anime.cover})` }}
            >
                <div className="banner-overlay" />
            </div>

            <div className="container anime-container">
                <div className="anime-layout">
                    {/* Sidebar */}
                    <aside className="anime-sidebar">
                        <div className="anime-poster">
                            <img src={anime.image} alt={anime.title} />
                            <div className="poster-badges">
                                <span className="badge-rating">
                                    <FiStar /> {anime.rating}
                                </span>
                            </div>
                        </div>

                        <div className="anime-actions">
                            <button
                                className={`btn ${isBookmarked ? 'btn-secondary' : 'btn-primary'}`}
                                onClick={() => setIsBookmarked(!isBookmarked)}
                            >
                                {isBookmarked ? <FiHeart fill="currentColor" /> : <FiPlus />}
                                {isBookmarked ? 'В закладках' : 'Добавить'}
                            </button>
                            <button className="btn btn-secondary btn-icon">
                                <FiShare2 />
                            </button>
                        </div>

                        <div className="anime-stats">
                            <div className="stat-item">
                                <FiCalendar />
                                <span>{anime.year}</span>
                            </div>
                            <div className="stat-item">
                                <FiFilm />
                                <span>{anime.episodes} эп.</span>
                            </div>
                            <div className="stat-item">
                                <FiClock />
                                <span>~24 мин.</span>
                            </div>
                            <div className="stat-item">
                                <FiUsers />
                                <span>{(anime.views / 1000000).toFixed(1)}M</span>
                            </div>
                        </div>

                        <div className="anime-info-list">
                            <div className="info-row">
                                <span className="info-label">Студия</span>
                                <span className="info-value">{anime.studio}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Статус</span>
                                <span className={`info-value status-${anime.status}`}>
                                    {anime.status === 'ongoing' ? 'Онгоинг' : 'Завершён'}
                                </span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Жанры</span>
                                <div className="genres-list">
                                    {anime.genres.map(genre => (
                                        <Link key={genre} to={`/genre/${genre}`} className="genre-link">
                                            {genre}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="anime-main">
                        <header className="anime-header">
                            <h1 className="anime-title">{anime.title}</h1>
                            <p className="anime-original">{anime.titleOriginal}</p>
                        </header>

                        {/* Video Player */}
                        <section className="player-section">
                            <VideoPlayer
                                title={anime.title}
                                currentEpisode={currentEpisode}
                                totalEpisodes={anime.episodes}
                                onEpisodeChange={setCurrentEpisode}
                            />
                        </section>

                        {/* Tabs */}
                        <div className="anime-tabs">
                            <button
                                className={`tab-btn ${activeTab === 'episodes' ? 'active' : ''}`}
                                onClick={() => setActiveTab('episodes')}
                            >
                                Эпизоды
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                                onClick={() => setActiveTab('description')}
                            >
                                Описание
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'comments' ? 'active' : ''}`}
                                onClick={() => setActiveTab('comments')}
                            >
                                Комментарии
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="tab-content">
                            {activeTab === 'episodes' && (
                                <div className="episodes-grid">
                                    {episodes.map(ep => (
                                        <button
                                            key={ep.number}
                                            className={`episode-btn ${
                                                currentEpisode === ep.number ? 'active' : ''
                                            } ${!ep.released ? 'disabled' : ''}`}
                                            onClick={() => ep.released && setCurrentEpisode(ep.number)}
                                            disabled={!ep.released}
                                        >
                                            <span className="ep-number">{ep.number}</span>
                                            {currentEpisode === ep.number && <FiPlay />}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'description' && (
                                <div className="description-content">
                                    <p>{anime.description}</p>
                                </div>
                            )}

                            {activeTab === 'comments' && (
                                <div className="comments-section">
                                    <div className="comment-form">
                                        <textarea placeholder="Написать комментарий..." />
                                        <button className="btn btn-primary">Отправить</button>
                                    </div>
                                    <div className="comments-list">
                                        <div className="comment">
                                            <div className="comment-avatar">
                                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" alt="" />
                                            </div>
                                            <div className="comment-content">
                                                <div className="comment-header">
                                                    <span className="comment-author">АнимеФан123</span>
                                                    <span className="comment-date">2 часа назад</span>
                                                </div>
                                                <p>Отличное аниме! Смотрю уже третий раз 🔥</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Related */}
                        <AnimeGrid
                            title="Похожие аниме"
                            animeList={relatedAnime}
                            columns={4}
                            showViewAll={false}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AnimePage;