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

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeAnimRef = useRef<number | null>(null);

  // Explicit state refs to prevent stale closures in lifecycle event listeners
  const userWantsSoundRef = useRef<boolean>(false);
  const isPlayingRef = useRef<boolean>(false);
  const wasPlayingBeforeHiddenRef = useRef<boolean>(false);
  const isMutedRef = useRef<boolean>(true);

  // Synchronize state and refs safely
  const updatePlaybackState = useCallback((playing: boolean) => {
    isPlayingRef.current = playing;
    setIsPlaying(playing);
  }, []);

  const updateMuteState = useCallback((muted: boolean) => {
    isMutedRef.current = muted;
    setIsMuted(muted);
  }, []);

  // Smooth Volume Ramping Helper using requestAnimationFrame
  const fadeVolume = useCallback((targetVol: number, duration: number, onComplete?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeAnimRef.current) {
      cancelAnimationFrame(fadeAnimRef.current);
      fadeAnimRef.current = null;
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

  // Primary Page Visibility & Lifecycle Event Listeners
  useEffect(() => {
    // Read user sound preference from session on mount
    try {
      const savedPreference = sessionStorage.getItem('dx-studio-sound');
      if (savedPreference === 'on') {
        userWantsSoundRef.current = true;
        updateMuteState(false);
      } else {
        userWantsSoundRef.current = false;
        updateMuteState(true);
      }
    } catch {
      // Safe fallback
    }

    // Immediately pause when tab is hidden, app switched, or page minimized
    const handlePauseOnHidden = () => {
      const audio = audioRef.current;
      if (!audio) return;

      // Cancel any active volume animation immediately
      if (fadeAnimRef.current) {
        cancelAnimationFrame(fadeAnimRef.current);
        fadeAnimRef.current = null;
      }

      // Check if audio was actively playing before becoming hidden
      const isCurrentlyPlaying = !audio.paused && audio.currentTime > 0 && !audio.ended && audio.readyState > 2;
      wasPlayingBeforeHiddenRef.current = isCurrentlyPlaying || isPlayingRef.current;

      // Immediately pause without background leak
      if (!audio.paused) {
        audio.pause();
      }
      updatePlaybackState(false);
    };

    // Resume when tab is visible again ONLY IF it was playing before being hidden
    const handleResumeOnVisible = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.visibilityState === 'visible') {
        if (
          wasPlayingBeforeHiddenRef.current &&
          userWantsSoundRef.current &&
          !isMutedRef.current
        ) {
          audio.loop = true;
          audio.volume = 0;
          audio.play()
            .then(() => {
              updatePlaybackState(true);
              fadeVolume(TARGET_VOLUME, FADE_IN_DURATION);
            })
            .catch(() => {
              // Browser autoplay policy prevented playback
              updatePlaybackState(false);
            });
        }
        wasPlayingBeforeHiddenRef.current = false;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handlePauseOnHidden();
      } else if (document.visibilityState === 'visible') {
        handleResumeOnVisible();
      }
    };

    // pagehide handles mobile browser minimization, app switching, lock screen
    const handlePageHide = () => {
      handlePauseOnHidden();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      if (fadeAnimRef.current) {
        cancelAnimationFrame(fadeAnimRef.current);
      }
    };
  }, [fadeVolume, updateMuteState, updatePlaybackState]);

  // User selects "ENTER WITH SOUND"
  const playWithSound = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      sessionStorage.setItem('dx-studio-sound', 'on');
    } catch {}

    userWantsSoundRef.current = true;
    updateMuteState(false);

    try {
      audio.loop = true;
      audio.volume = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        updatePlaybackState(true);
        fadeVolume(TARGET_VOLUME, FADE_IN_DURATION);
      }
    } catch {
      updatePlaybackState(false);
      updateMuteState(true);
      userWantsSoundRef.current = false;
    }
  }, [fadeVolume, updateMuteState, updatePlaybackState]);

  // User selects "ENTER MUTED"
  const enterMuted = useCallback(() => {
    try {
      sessionStorage.setItem('dx-studio-sound', 'off');
    } catch {}

    userWantsSoundRef.current = false;
    wasPlayingBeforeHiddenRef.current = false;
    updateMuteState(true);
    updatePlaybackState(false);

    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  }, [updateMuteState, updatePlaybackState]);

  // Global Sound Toggle (SOUND ON / SOUND OFF)
  const toggleSound = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMutedRef.current || audio.paused || audio.volume === 0) {
      // Unmute: Fade in from current position
      updateMuteState(false);
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
        updatePlaybackState(true);
        fadeVolume(TARGET_VOLUME, FADE_IN_DURATION);
      } catch {
        updatePlaybackState(false);
        updateMuteState(true);
        userWantsSoundRef.current = false;
      }
    } else {
      // Mute: Fade out smoothly to 0, then pause
      updateMuteState(true);
      userWantsSoundRef.current = false;
      wasPlayingBeforeHiddenRef.current = false;
      try {
        sessionStorage.setItem('dx-studio-sound', 'off');
      } catch {}

      fadeVolume(0, FADE_OUT_DURATION, () => {
        audio.pause();
        updatePlaybackState(false);
      });
    }
  }, [fadeVolume, updateMuteState, updatePlaybackState]);

  // Handle Opening External Project Website (Immediate audio pause before opening external tab)
  const handleExternalProjectOpen = useCallback((url: string) => {
    const audio = audioRef.current;

    // Immediately cancel any fade animation and pause audio
    if (fadeAnimRef.current) {
      cancelAnimationFrame(fadeAnimRef.current);
      fadeAnimRef.current = null;
    }

    if (audio && !audio.paused) {
      audio.pause();
      updatePlaybackState(false);
    }
    wasPlayingBeforeHiddenRef.current = false;

    // Open external URL in new tab exactly as existing behavior
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [updatePlaybackState]);

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
        onPlay={() => updatePlaybackState(true)}
        onPause={() => updatePlaybackState(false)}
        onEnded={() => {
          // Bulletproof loop fallback
          if (audioRef.current && userWantsSoundRef.current && !isMutedRef.current) {
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
