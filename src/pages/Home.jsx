import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero/Hero';
import AnimeGrid from '../components/AnimeGrid/AnimeGrid';
import { animeData, schedule } from '../data/animeData';
import './Pages.css';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [popularAnime, setPopularAnime] = useState([]);
    const [recentAnime, setRecentAnime] = useState([]);
    const [topRatedAnime, setTopRatedAnime] = useState([]);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setPopularAnime(animeData.slice(0, 5));
            setRecentAnime([...animeData].sort(() => Math.random() - 0.5).slice(0, 5));
            setTopRatedAnime([...animeData].sort((a, b) => b.rating - a.rating).slice(0, 5));
            setLoading(false);
        }, 500);
    }, []);

    const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long' });
    const todaySchedule = schedule.find(s =>
        s.day.toLowerCase() === today.toLowerCase()
    );

    return (
        <main className="main-content">
            <Hero />

            <div className="container home-container">
                {/* Today's Schedule */}
                <section className="schedule-section">
                    <h2 className="section-title">
                        Сегодня выходят
                        <span className="title-accent" />
                    </h2>
                    <div className="schedule-list">
                        {todaySchedule?.anime.map((title, index) => (
                            <div key={index} className="schedule-item">
                                <span className="schedule-time">~18:00</span>
                                <span className="schedule-title">{title}</span>
                                <span className="badge badge-primary">Новая серия</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Popular */}
                <AnimeGrid
                    title="Популярное сейчас"
                    animeList={popularAnime}
                    loading={loading}
                />

                {/* Updates */}
                <AnimeGrid
                    title="Последние обновления"
                    animeList={recentAnime}
                    loading={loading}
                />

                {/* Top Rated */}
                <AnimeGrid
                    title="Лучшее по рейтингу"
                    animeList={topRatedAnime}
                    loading={loading}
                />
            </div>
        </main>
    );
};

export default Home;