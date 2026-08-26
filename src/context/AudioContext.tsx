'use client';

import React, { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from 'react';

interface AudioContextType {
  isMuted: boolean;
  isPlaying: boolean;
  playWithSound: () => Promise<void>;
  enterMuted: () => void;
  toggleSound: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

const TARGET_VOLUME = 0.22;
const FADE_IN_DURATION = 850; // ms
const FADE_OUT_DURATION = 600; // ms

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeAnimRef = useRef<number | null>(null);

  // Check saved session preference on mount
  useEffect(() => {
    try {
      const savedPreference = sessionStorage.getItem('dx-studio-sound');
      if (savedPreference === 'on') {
        setIsMuted(false);
      } else {
        setIsMuted(true);
      }
    } catch {
      // Ignore sessionStorage restrictions
    }

    // Handle tab visibility cleanly without resetting track position
    const handleVisibilityChange = () => {
      const currentAudio = audioRef.current;
      if (!currentAudio) return;

      if (document.hidden) {
        if (!currentAudio.paused && currentAudio.volume > 0) {
          currentAudio.volume = Math.min(currentAudio.volume, 0.05);
        }
      } else {
        const pref = sessionStorage.getItem('dx-studio-sound');
        if (pref === 'on' && !currentAudio.paused) {
          currentAudio.volume = TARGET_VOLUME;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (fadeAnimRef.current) {
        cancelAnimationFrame(fadeAnimRef.current);
      }
    };
  }, []);

  // Smooth Volume Ramping Helper using requestAnimationFrame
  const fadeVolume = useCallback((targetVol: number, duration: number, onComplete?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeAnimRef.current) {
      cancelAnimationFrame(fadeAnimRef.current);
    }

    const startVol = audio.volume;
    const startTime = performance.now();

    const animateFade = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      audio.volume = Math.max(0, Math.min(1, startVol + (targetVol - startVol) * progress));

      if (progress < 1) {
        fadeAnimRef.current = requestAnimationFrame(animateFade);
      } else {
        audio.volume = targetVol;
        fadeAnimRef.current = null;
        if (onComplete) onComplete();
      }
    };

    fadeAnimRef.current = requestAnimationFrame(animateFade);
  }, []);

  // User selects "ENTER WITH SOUND"
  const playWithSound = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      sessionStorage.setItem('dx-studio-sound', 'on');
    } catch {}

    setIsMuted(false);

    try {
      audio.volume = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
        fadeVolume(TARGET_VOLUME, FADE_IN_DURATION);
      }
    } catch {
      setIsPlaying(false);
      setIsMuted(true);
    }
  }, [fadeVolume]);

  // User selects "ENTER MUTED"
  const enterMuted = useCallback(() => {
    try {
      sessionStorage.setItem('dx-studio-sound', 'off');
    } catch {}

    setIsMuted(true);
    setIsPlaying(false);
  }, []);

  // Global Sound Toggle (SOUND ON / SOUND OFF)
  const toggleSound = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted || audio.paused || audio.volume === 0) {
      // Unmute: Fade In from current position
      setIsMuted(false);
      try {
        sessionStorage.setItem('dx-studio-sound', 'on');
      } catch {}

      try {
        if (audio.paused) {
          audio.volume = 0;
          await audio.play();
        }
        setIsPlaying(true);
        fadeVolume(TARGET_VOLUME, FADE_IN_DURATION);
      } catch {
        setIsPlaying(false);
        setIsMuted(true);
      }
    } else {
      // Mute: Fade Out smoothly to 0, then pause (retaining currentTime)
      setIsMuted(true);
      try {
        sessionStorage.setItem('dx-studio-sound', 'off');
      } catch {}

      fadeVolume(0, FADE_OUT_DURATION, () => {
        audio.pause();
        setIsPlaying(false);
      });
    }
  }, [isMuted, fadeVolume]);

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        isPlaying,
        playWithSound,
        enterMuted,
        toggleSound,
      }}
    >
      {/* Persistent Single DOM Audio Element with Multiple Fallback Sources */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden pointer-events-none"
        aria-hidden="true"
      >
        <source src="/assets/audio/dx-music.mp4" type="audio/mp4" />
        <source src="/assets/audio/dx-music.m4a" type="audio/mp4" />
      </audio>

      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
