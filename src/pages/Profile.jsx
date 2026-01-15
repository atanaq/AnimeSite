import React, { useState } from 'react';
import {
    FiUser, FiSettings, FiBookmark, FiClock, FiHeart,
    FiStar, FiEdit2, FiCamera
} from 'react-icons/fi';
import AnimeCard from '../components/AnimeCard/AnimeCard';
import { animeData } from '../data/animeData';
import './Pages.css';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('watching');

    const user = {
        name: "АнимеФан",
        email: "user@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anime",
        joinDate: "Декабрь 2023",
        stats: {
            watching: 5,
            completed: 42,
            planned: 18,
            favorites: 12
        }
    };

    const tabs = [
        { id: 'watching', label: 'Смотрю', icon: <FiClock />, count: user.stats.watching },
        { id: 'completed', label: 'Просмотрено', icon: <FiStar />, count: user.stats.completed },
        { id: 'planned', label: 'Запланировано', icon: <FiBookmark />, count: user.stats.planned },
        { id: 'favorites', label: 'Любимые', icon: <FiHeart />, count: user.stats.favorites },
    ];

    const getAnimeForTab = () => {
        const count = user.stats[activeTab];
        return animeData.slice(0, Math.min(count, 8));
    };

    return (
        <main className="main-content profile-page">
            <div className="container">
                {/* Profile Header */}
                <section className="profile-header">
                    <div className="profile-cover">
                        <button className="edit-cover">
                            <FiCamera />
                        </button>
                    </div>

                    <div className="profile-info">
                        <div className="avatar-container">
                            <img src={user.avatar} alt={user.name} className="profile-avatar" />
                            <button className="edit-avatar">
                                <FiCamera />
                            </button>
                        </div>

                        <div className="profile-details">
                            <h1>{user.name}</h1>
                            <p className="profile-email">{user.email}</p>
                            <p className="profile-joined">На сайте с {user.joinDate}</p>
                        </div>

                        <div className="profile-actions">
                            <button className="btn btn-secondary">
                                <FiEdit2 /> Редактировать
                            </button>
                            <button className="btn btn-secondary btn-icon">
                                <FiSettings />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Stats Cards */}
                <section className="profile-stats">
                    {tabs.map(tab => (
                        <div
                            key={tab.id}
                            className={`stat-card ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="stat-icon">{tab.icon}</span>
                            <span className="stat-count">{tab.count}</span>
                            <span className="stat-label">{tab.label}</span>
                        </div>
                    ))}
                </section>

                {/* Content Tabs */}
                <section className="profile-content">
                    <div className="content-header">
                        <h2>
                            {tabs.find(t => t.id === activeTab)?.label}
                            <span className="count-badge">{user.stats[activeTab]}</span>
                        </h2>
                    </div>

                    <div className="catalog-grid grid">
                        {getAnimeForTab().map((anime, index) => (
                            <AnimeCard key={anime.id} anime={anime} index={index} />
                        ))}
                    </div>

                    {getAnimeForTab().length === 0 && (
                        <div className="empty-state">
                            <span className="empty-icon">📺</span>
                            <h3>Список пуст</h3>
                            <p>Добавьте аниме в этот список</p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Profile;