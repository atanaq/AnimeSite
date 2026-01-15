import React from 'react';
import AnimeCard from '../AnimeCard/AnimeCard';
import './AnimeGrid.css';

const AnimeGrid = ({
                       title,
                       animeList,
                       showViewAll = true,
                       columns = 5,
                       loading = false
                   }) => {
    if (loading) {
        return (
            <section className="anime-grid-section">
                <div className="section-header">
                    <div className="skeleton" style={{ width: 200, height: 30 }} />
                </div>
                <div className={`anime-grid cols-${columns}`}>
                    {[...Array(columns)].map((_, i) => (
                        <div key={i} className="anime-card-skeleton">
                            <div className="skeleton" style={{ aspectRatio: '3/4' }} />
                            <div className="skeleton" style={{ height: 20, marginTop: 16 }} />
                            <div className="skeleton" style={{ height: 14, marginTop: 8, width: '60%' }} />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="anime-grid-section">
            <div className="section-header">
                <h2 className="section-title">
                    {title}
                    <span className="title-accent" />
                </h2>
                {showViewAll && (
                    <button className="view-all-btn">
                        Смотреть все
                        <span className="arrow">→</span>
                    </button>
                )}
            </div>

            <div className={`anime-grid cols-${columns}`}>
                {animeList.map((anime, index) => (
                    <AnimeCard
                        key={anime.id}
                        anime={anime}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
};

export default AnimeGrid;