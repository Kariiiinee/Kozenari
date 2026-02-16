import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
    isPlaying: boolean;
    togglePlay: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio
        const hour = new Date().getHours();
        const isMorning = hour >= 5 && hour < 12; // 5 AM - 11:59 AM
        const track = isMorning ? '/music/Morning_sound.mp3' : '/music/ForestRain3min.mp3';

        audioRef.current = new Audio(track);
        audioRef.current.loop = true;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audioRef.current.addEventListener('play', handlePlay);
        audioRef.current.addEventListener('pause', handlePause);

        // One-time interaction listener to handle browser autoplay policies
        const handleFirstInteraction = () => {
            if (audioRef.current) {
                audioRef.current.play().then(() => {
                    window.removeEventListener('click', handleFirstInteraction);
                    window.removeEventListener('touchstart', handleFirstInteraction);
                }).catch(err => {
                    console.log("Play failed on interaction:", err);
                });
            }
        };

        window.addEventListener('click', handleFirstInteraction);
        window.addEventListener('touchstart', handleFirstInteraction);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('play', handlePlay);
                audioRef.current.removeEventListener('pause', handlePause);
                audioRef.current = null;
            }
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => {
                    console.error("Autoplay prevented:", err);
                    // This is expected if user hasn't interacted yet
                });
            }
        }
    };

    return (
        <AudioContext.Provider value={{ isPlaying, togglePlay }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
