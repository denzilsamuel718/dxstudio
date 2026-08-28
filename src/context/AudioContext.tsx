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

const DEFAULT_VOLUME = 0.22;
const ENTER_FADE_DURATION = 400; // ms subtle cinematic fade-in
const EXIT_FADE_DURATION = 350; // ms subtle fast fade-out
const MANUAL_FADE_DURATION = 300; // ms

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeAnimRef = useRef<number | null>(null);

  // Authoritative State Tracking Refs to eliminate race conditions & stale closures
  const userWantsSoundRef = useRef<boolean>(false);
  const userManuallyPausedRef = useRef<boolean>(true);
  const wasPlayingBeforeHiddenRef = useRef<boolean>(false);
  const isAutoPausedRef = useRef<boolean>(false);
  const previousVolumeRef = useRef<number>(DEFAULT_VOLUME);

  // Synchronize React state
  const updatePlaybackState = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  const updateMuteState = useCallback((muted: boolean) => {
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
        userManuallyPausedRef.current = false;
        updateMuteState(false);
      } else {
        userWantsSoundRef.current = false;
        userManuallyPausedRef.current = true;
        updateMuteState(true);
      }
    } catch {
      // Safe fallback
    }

    // Gracefully fade out & pause when tab/window is hidden or backgrounded
    const handlePauseOnHidden = () => {
      const audio = audioRef.current;
      if (!audio) return;

      // If user had sound active and not manually paused, record that it was auto-paused
      if (userWantsSoundRef.current && !userManuallyPausedRef.current) {
        wasPlayingBeforeHiddenRef.current = true;
        isAutoPausedRef.current = true;

        if (audio.volume > 0.01) {
          previousVolumeRef.current = audio.volume;
        }

        // Fast subtle 350ms fade-out down to 0, then pause
        fadeVolume(0, EXIT_FADE_DURATION, () => {
          // Only pause if still hidden or auto-paused (prevents pausing if user quickly returned)
          if (document.hidden || isAutoPausedRef.current) {
            audio.pause();
            updatePlaybackState(false);
          }
        });
      } else {
        if (fadeAnimRef.current) {
          cancelAnimationFrame(fadeAnimRef.current);
          fadeAnimRef.current = null;
        }
        if (!audio.paused) {
          audio.pause();
        }
        updatePlaybackState(false);
      }
    };

    // Smoothly fade back in when tab/window becomes visible again ONLY IF it was playing before leaving
    const handleResumeOnVisible = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (
        (wasPlayingBeforeHiddenRef.current || isAutoPausedRef.current) &&
        userWantsSoundRef.current &&
        !userManuallyPausedRef.current
      ) {
        // Cancel any pending fade-out immediately
        if (fadeAnimRef.current) {
          cancelAnimationFrame(fadeAnimRef.current);
          fadeAnimRef.current = null;
        }

        wasPlayingBeforeHiddenRef.current = false;
        isAutoPausedRef.current = false;

        const targetVol = previousVolumeRef.current > 0 ? previousVolumeRef.current : DEFAULT_VOLUME;

        if (audio.paused) {
          audio.loop = true;
          audio.volume = 0;
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                updatePlaybackState(true);
                fadeVolume(targetVol, ENTER_FADE_DURATION);
              })
              .catch(() => {
                // Autoplay restrictions safety catch
              });
          }
        } else {
          // If audio was in the middle of fading out when user returned, smoothly ramp volume back up
          updatePlaybackState(true);
          fadeVolume(targetVol, ENTER_FADE_DURATION);
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handlePauseOnHidden();
      } else if (document.visibilityState === 'visible') {
        handleResumeOnVisible();
      }
    };

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
    userManuallyPausedRef.current = false;
    wasPlayingBeforeHiddenRef.current = false;
    isAutoPausedRef.current = false;
    previousVolumeRef.current = DEFAULT_VOLUME;
    updateMuteState(false);

    try {
      audio.loop = true;
      audio.volume = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        updatePlaybackState(true);
        fadeVolume(DEFAULT_VOLUME, ENTER_FADE_DURATION);
      }
    } catch {
      updatePlaybackState(false);
      updateMuteState(true);
      userWantsSoundRef.current = false;
      userManuallyPausedRef.current = true;
    }
  }, [fadeVolume, updateMuteState, updatePlaybackState]);

  // User selects "ENTER MUTED"
  const enterMuted = useCallback(() => {
    try {
      sessionStorage.setItem('dx-studio-sound', 'off');
    } catch {}

    userWantsSoundRef.current = false;
    userManuallyPausedRef.current = true;
    wasPlayingBeforeHiddenRef.current = false;
    isAutoPausedRef.current = false;
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

    if (userManuallyPausedRef.current || audio.paused || audio.volume === 0) {
      // User explicitly turns sound ON
      updateMuteState(false);
      userWantsSoundRef.current = true;
      userManuallyPausedRef.current = false;
      wasPlayingBeforeHiddenRef.current = false;
      isAutoPausedRef.current = false;
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
        fadeVolume(previousVolumeRef.current || DEFAULT_VOLUME, ENTER_FADE_DURATION);
      } catch {
        updatePlaybackState(false);
        updateMuteState(true);
        userWantsSoundRef.current = false;
        userManuallyPausedRef.current = true;
      }
    } else {
      // User explicitly turns sound OFF (Manual Pause)
      updateMuteState(true);
      userWantsSoundRef.current = false;
      userManuallyPausedRef.current = true;
      wasPlayingBeforeHiddenRef.current = false;
      isAutoPausedRef.current = false;
      try {
        sessionStorage.setItem('dx-studio-sound', 'off');
      } catch {}

      fadeVolume(0, MANUAL_FADE_DURATION, () => {
        audio.pause();
        updatePlaybackState(false);
      });
    }
  }, [fadeVolume, updateMuteState, updatePlaybackState]);

  // Handle Opening External Project Website (Smooth asynchronous fade-out while preserving navigation)
  const handleExternalProjectOpen = useCallback((url: string) => {
    const audio = audioRef.current;

    // If audio is active, mark it as auto-paused so it resumes upon return
    if (userWantsSoundRef.current && !userManuallyPausedRef.current) {
      wasPlayingBeforeHiddenRef.current = true;
      isAutoPausedRef.current = true;

      if (audio && audio.volume > 0.01) {
        previousVolumeRef.current = audio.volume;
      }

      // Smooth asynchronous 300ms fade-out before pausing
      if (audio && !audio.paused) {
        fadeVolume(0, EXIT_FADE_DURATION, () => {
          if (isAutoPausedRef.current) {
            audio.pause();
            updatePlaybackState(false);
          }
        });
      }
    }

    // Open external URL immediately in new tab exactly as existing behavior
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [fadeVolume, updatePlaybackState]);

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
          if (audioRef.current && userWantsSoundRef.current && !userManuallyPausedRef.current) {
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
