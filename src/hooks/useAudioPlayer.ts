
import { useState, useEffect, useRef } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

export const useAudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        setProgress(progressPercent);
        setCurrentTime(audio.currentTime);
      }
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      // Clean up interval on unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [currentTrack]);

  const playTrack = (track: Track) => {
    if (!audioRef.current) return;

    if (currentTrack?.id !== track.id) {
      // New track - simulate loading by using a demo audio file
      audioRef.current.src = '/placeholder.svg'; // Placeholder - in real app would be track.audioUrl
      setCurrentTrack(track);
    }

    setIsPlaying(true);
    
    // Simulate audio playback for demo purposes
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {
        // If real audio fails, simulate progress
        simulateProgress();
      });
    }
  };

  const simulateProgress = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 0.5; // Increment by 0.5% every 100ms
        if (newProgress >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsPlaying(false);
          return 0;
        }
        return newProgress;
      });
      
      setCurrentTime(prev => prev + 0.1);
    }, 100);
  };

  const togglePlayPause = () => {
    if (!currentTrack) return;

    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current?.pause();
      // Stop the simulation interval when pausing
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      playTrack(currentTrack);
    }
  };

  const seekTo = (percentage: number) => {
    if (!audioRef.current || !duration) return;
    
    const newTime = (percentage / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(percentage);
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    currentTrack,
    isPlaying,
    progress,
    currentTime,
    duration,
    playTrack,
    togglePlayPause,
    seekTo,
    formatTime,
    setCurrentTrack,
    setIsPlaying
  };
};
