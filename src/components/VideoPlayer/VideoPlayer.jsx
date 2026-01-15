import React, { useState, useRef, useEffect } from 'react';
import {
    FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize,
    FiMinimize, FiSettings, FiSkipBack, FiSkipForward,
    FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import './VideoPlayer.css';

const VideoPlayer = ({
                         videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                         poster,
                         title,
                         currentEpisode = 1,
                         totalEpisodes = 24,
                         onEpisodeChange
                     }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const progressRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [quality, setQuality] = useState('1080p');
    const [buffered, setBuffered] = useState(0);

    // Hide controls after inactivity
    useEffect(() => {
        let timeout;
        const handleMouseMove = () => {
            setShowControls(true);
            clearTimeout(timeout);
            if (isPlaying) {
                timeout = setTimeout(() => setShowControls(false), 3000);
            }
        };

        const player = playerRef.current;
        player?.addEventListener('mousemove', handleMouseMove);

        return () => {
            player?.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timeout);
        };
    }, [isPlaying]);

    // Play/Pause
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Time update
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);

            // Update buffered
            if (videoRef.current.buffered.length > 0) {
                setBuffered(
                    (videoRef.current.buffered.end(0) / videoRef.current.duration) * 100
                );
            }
        }
    };

    // Duration loaded
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    // Seek
    const handleProgressClick = (e) => {
        const rect = progressRef.current.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const time = percent * duration;
        videoRef.current.currentTime = time;
        setCurrentTime(time);
    };

    // Volume
    const handleVolumeChange = (e) => {
        const value = parseFloat(e.target.value);
        setVolume(value);
        videoRef.current.volume = value;
        setIsMuted(value === 0);
    };

    const toggleMute = () => {
        if (isMuted) {
            videoRef.current.volume = volume || 1;
            setIsMuted(false);
        } else {
            videoRef.current.volume = 0;
            setIsMuted(true);
        }
    };

    // Fullscreen
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            playerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Skip
    const skip = (seconds) => {
        videoRef.current.currentTime += seconds;
    };

    // Playback speed
    const changeSpeed = (speed) => {
        setPlaybackSpeed(speed);
        videoRef.current.playbackRate = speed;
        setShowSettings(false);
    };

    // Format time
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Episode navigation
    const prevEpisode = () => {
        if (currentEpisode > 1 && onEpisodeChange) {
            onEpisodeChange(currentEpisode - 1);
        }
    };

    const nextEpisode = () => {
        if (currentEpisode < totalEpisodes && onEpisodeChange) {
            onEpisodeChange(currentEpisode + 1);
        }
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'ArrowLeft':
                    skip(-10);
                    break;
                case 'ArrowRight':
                    skip(10);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setVolume(v => Math.min(1, v + 0.1));
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setVolume(v => Math.max(0, v - 0.1));
                    break;
                case 'f':
                    toggleFullscreen();
                    break;
                case 'm':
                    toggleMute();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, volume]);

    return (
        <div
            ref={playerRef}
            className={`video-player ${showControls ? 'show-controls' : ''} ${isFullscreen ? 'fullscreen' : ''}`}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={videoUrl}
                poster={poster}
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />

            {/* Big Play Button */}
            {!isPlaying && (
                <button className="big-play-btn" onClick={togglePlay}>
                    <FiPlay />
                </button>
            )}

            {/* Top Bar */}
            <div className="player-top">
                <div className="player-title">
                    <span className="episode-badge">Эпизод {currentEpisode}</span>
                    <h3>{title}</h3>
                </div>
            </div>

            {/* Controls */}
            <div className="player-controls">
                {/* Progress Bar */}
                <div
                    className="progress-container"
                    ref={progressRef}
                    onClick={handleProgressClick}
                >
                    <div className="progress-buffered" style={{ width: `${buffered}%` }} />
                    <div
                        className="progress-played"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                    <div
                        className="progress-thumb"
                        style={{ left: `${(currentTime / duration) * 100}%` }}
                    />
                </div>

                {/* Controls Row */}
                <div className="controls-row">
                    {/* Left Controls */}
                    <div className="controls-left">
                        <button
                            className="control-btn episode-nav"
                            onClick={prevEpisode}
                            disabled={currentEpisode <= 1}
                        >
                            <FiChevronLeft />
                        </button>

                        <button className="control-btn" onClick={() => skip(-10)}>
                            <FiSkipBack />
                        </button>

                        <button className="control-btn play-pause" onClick={togglePlay}>
                            {isPlaying ? <FiPause /> : <FiPlay />}
                        </button>

                        <button className="control-btn" onClick={() => skip(10)}>
                            <FiSkipForward />
                        </button>

                        <button
                            className="control-btn episode-nav"
                            onClick={nextEpisode}
                            disabled={currentEpisode >= totalEpisodes}
                        >
                            <FiChevronRight />
                        </button>

                        {/* Volume */}
                        <div className="volume-control">
                            <button className="control-btn" onClick={toggleMute}>
                                {isMuted ? <FiVolumeX /> : <FiVolume2 />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="volume-slider"
                            />
                        </div>

                        {/* Time */}
                        <div className="time-display">
                            <span>{formatTime(currentTime)}</span>
                            <span>/</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Right Controls */}
                    <div className="controls-right">
                        {/* Settings */}
                        <div className="settings-container">
                            <button
                                className="control-btn"
                                onClick={() => setShowSettings(!showSettings)}
                            >
                                <FiSettings />
                            </button>

                            {showSettings && (
                                <div className="settings-menu">
                                    <div className="settings-section">
                                        <h4>Скорость</h4>
                                        <div className="settings-options">
                                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                                                <button
                                                    key={speed}
                                                    className={playbackSpeed === speed ? 'active' : ''}
                                                    onClick={() => changeSpeed(speed)}
                                                >
                                                    {speed}x
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="settings-section">
                                        <h4>Качество</h4>
                                        <div className="settings-options">
                                            {['480p', '720p', '1080p'].map(q => (
                                                <button
                                                    key={q}
                                                    className={quality === q ? 'active' : ''}
                                                    onClick={() => {
                                                        setQuality(q);
                                                        setShowSettings(false);
                                                    }}
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Fullscreen */}
                        <button className="control-btn" onClick={toggleFullscreen}>
                            {isFullscreen ? <FiMinimize /> : <FiMaximize />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;