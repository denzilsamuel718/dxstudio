'use client';

import React, { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from 'react';

interface AudioContextType {
  isMuted: boolean;
  isPlaying: boolean;
  playWithSound: () => Promise<void>;
  enterMuted: () => void;
  toggleSound: () => void;
  handleExternalProjectOpen: (url: string) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

const TARGET_VOLUME = 0.22;
const FADE_IN_DURATION = 750; // ms
const FADE_OUT_DURATION = 350; // ms
const EXTERNAL_OPEN_FADE = 250; // ms

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeAnimRef = useRef<number | null>(null);
  const userWantsSoundRef = useRef<boolean>(false);

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

  // Check saved session preference on mount & handle tab visibility
  useEffect(() => {
    try {
      const savedPreference = sessionStorage.getItem('dx-studio-sound');
      if (savedPreference === 'on') {
        setIsMuted(false);
        userWantsSoundRef.current = true;
      } else {
        setIsMuted(true);
        userWantsSoundRef.current = false;
      }
    } catch {
      // Ignore sessionStorage restrictions
    }

    // Handle tab visibility cleanly without resetting track position
    const handleVisibilityChange = () => {
      const currentAudio = audioRef.current;
      if (!currentAudio) return;

      if (document.hidden) {
        // Tab inactive / switched away -> Fade to 0 and pause
        if (!currentAudio.paused) {
          fadeVolume(0, 200, () => {
            currentAudio.pause();
            setIsPlaying(false);
          });
        }
      } else {
        // Tab active / returned -> Resume with gentle fade ONLY if user's sound preference is ON
        if (userWantsSoundRef.current) {
          setIsMuted(false);
          if (currentAudio.paused) {
            currentAudio.volume = 0;
            currentAudio.play().then(() => {
              setIsPlaying(true);
              fadeVolume(TARGET_VOLUME, FADE_IN_DURATION);
            }).catch(() => {});
          } else {
            fadeVolume(TARGET_VOLUME, FADE_IN_DURATION);
          }
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
  }, [fadeVolume]);

  // User selects "ENTER WITH SOUND"
  const playWithSound = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      sessionStorage.setItem('dx-studio-sound', 'on');
    } catch {}

    userWantsSoundRef.current = true;
    setIsMuted(false);

    try {
      audio.loop = true;
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
      userWantsSoundRef.current = false;
    }
  }, [fadeVolume]);

  // User selects "ENTER MUTED"
  const enterMuted = useCallback(() => {
    try {
      sessionStorage.setItem('dx-studio-sound', 'off');
    } catch {}

    userWantsSoundRef.current = false;
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
      userWantsSoundRef.current = true;
      try {
        sessionStorage.setItem('dx-studio-sound', 'on');
      } catch {}

      try {
        audio.loop = true;
        if (audio.paused) {
          audio.volume = 0;
          await audio.play();
        }
        setIsPlaying(true);
        fadeVolume(TARGET_VOLUME, FADE_IN_DURATION);
      } catch {
        setIsPlaying(false);
        setIsMuted(true);
        userWantsSoundRef.current = false;
      }
    } else {
      // Mute: Fade Out smoothly to 0, then pause (retaining currentTime)
      setIsMuted(true);
      userWantsSoundRef.current = false;
      try {
        sessionStorage.setItem('dx-studio-sound', 'off');
      } catch {}

      fadeVolume(0, FADE_OUT_DURATION, () => {
        audio.pause();
        setIsPlaying(false);
      });
    }
  }, [isMuted, fadeVolume]);

  // Handle Opening External Project Website (Fade out & pause DX soundtrack before opening external tab)
  const handleExternalProjectOpen = useCallback((url: string) => {
    const audio = audioRef.current;

    if (audio && !audio.paused && audio.volume > 0) {
      // Smooth short fade out before opening external site
      fadeVolume(0, EXTERNAL_OPEN_FADE, () => {
        audio.pause();
        setIsPlaying(false);
      });
    }

    // Open external URL in fresh tab
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [fadeVolume]);

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        isPlaying,
        playWithSound,
        enterMuted,
        toggleSound,
        handleExternalProjectOpen,
      }}
    >
      {/* Persistent Single DOM Audio Element with Continuous Looping */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          // Bulletproof loop fallback across mobile WebKit / Chrome
          if (audioRef.current && userWantsSoundRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
        }}
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
