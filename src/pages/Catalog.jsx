import React, { useState, useEffect } from 'react';
import { FiFilter, FiGrid, FiList, FiSearch, FiX } from 'react-icons/fi';
import AnimeCard from '../components/AnimeCard/AnimeCard';
import { animeData, genres } from '../data/animeData';
import './Pages.css';

const Catalog = () => {
    const [filteredAnime, setFilteredAnime] = useState(animeData);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [sortBy, setSortBy] = useState('popular');
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [yearRange, setYearRange] = useState([2000, 2024]);
    const [status, setStatus] = useState('all');

    useEffect(() => {
        let result = [...animeData];

        // Search filter
        if (searchQuery) {
            result = result.filter(anime =>
                anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                anime.titleOriginal.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Genre filter
        if (selectedGenres.length > 0) {
            result = result.filter(anime =>
                selectedGenres.some(g => anime.genres.includes(g))
            );
        }

        // Status filter
        if (status !== 'all') {
            result = result.filter(anime => anime.status === status);
        }

        // Year filter
        result = result.filter(anime =>
            anime.year >= yearRange[0] && anime.year <= yearRange[1]
        );

        // Sort
        switch (sortBy) {
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                result.sort((a, b) => b.year - a.year);
                break;
            case 'name':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                result.sort((a, b) => b.views - a.views);
        }

        setFilteredAnime(result);
    }, [searchQuery, selectedGenres, sortBy, yearRange, status]);

    const toggleGenre = (genre) => {
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedGenres([]);
        setSortBy('popular');
        setYearRange([2000, 2024]);
        setStatus('all');
    };

    return (
        <main className="main-content catalog-page">
            <div className="container">
                {/* Page Header */}
                <header className="page-header">
                    <h1>Каталог аниме</h1>
                    <p>Найдено: {filteredAnime.length} тайтлов</p>
                </header>

                {/* Toolbar */}
                <div className="catalog-toolbar">
                    <div className="search-bar">
                        <FiSearch />
                        <input
                            type="text"
                            placeholder="Поиск аниме..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')}>
                                <FiX />
                            </button>
                        )}
                    </div>

                    <div className="toolbar-actions">
                        <button
                            className={`filter-toggle ${showFilters ? 'active' : ''}`}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <FiFilter />
                            Фильтры
                            {(selectedGenres.length > 0 || status !== 'all') && (
                                <span className="filter-count">
                                    {selectedGenres.length + (status !== 'all' ? 1 : 0)}
                                </span>
                            )}
                        </button>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="popular">По популярности</option>
                            <option value="rating">По рейтингу</option>
                            <option value="newest">По новизне</option>
                            <option value="name">По названию</option>
                        </select>

                        <div className="view-modes">
                            <button
                                className={viewMode === 'grid' ? 'active' : ''}
                                onClick={() => setViewMode('grid')}
                            >
                                <FiGrid />
                            </button>
                            <button
                                className={viewMode === 'list' ? 'active' : ''}
                                onClick={() => setViewMode('list')}
                            >
                                <FiList />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="filters-panel animate-slide-up">
                        <div className="filter-section">
                            <h3>Жанры</h3>
                            <div className="filter-tags">
                                {genres.map(genre => (
                                    <button
                                        key={genre}
                                        className={`filter-tag ${selectedGenres.includes(genre) ? 'active' : ''}`}
                                        onClick={() => toggleGenre(genre)}
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3>Статус</h3>
                            <div className="filter-options">
                                <button
                                    className={status === 'all' ? 'active' : ''}
                                    onClick={() => setStatus('all')}
                                >
                                    Все
                                </button>
                                <button
                                    className={status === 'ongoing' ? 'active' : ''}
                                    onClick={() => setStatus('ongoing')}
                                >
                                    Онгоинг
                                </button>
                                <button
                                    className={status === 'completed' ? 'active' : ''}
                                    onClick={() => setStatus('completed')}
                                >
                                    Завершён
                                </button>
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3>Год выхода</h3>
                            <div className="year-range">
                                <input
                                    type="number"
                                    min="1990"
                                    max="2024"
                                    value={yearRange[0]}
                                    onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                                />
                                <span>—</span>
                                <input
                                    type="number"
                                    min="1990"
                                    max="2024"
                                    value={yearRange[1]}
                                    onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                                />
                            </div>
                        </div>

                        <button className="clear-filters" onClick={clearFilters}>
                            Сбросить фильтры
                        </button>
                    </div>
                )}

                {/* Results */}
                {filteredAnime.length > 0 ? (
                    <div className={`catalog-grid ${viewMode}`}>
                        {filteredAnime.map((anime, index) => (
                            <AnimeCard key={anime.id} anime={anime} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <span className="no-results-icon">😕</span>
                        <h3>Ничего не найдено</h3>
                        <p>Попробуйте изменить параметры поиска</p>
                        <button className="btn btn-primary" onClick={clearFilters}>
                            Сбросить фильтры
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Catalog;