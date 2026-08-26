'use client';

import { useAudio } from '@/context/AudioContext';
import { motion } from 'framer-motion';

interface SoundToggleProps {
  className?: string;
  compact?: boolean;
}

export function SoundToggle({ className = '', compact = false }: SoundToggleProps) {
  const { isMuted, toggleSound } = useAudio();

  return (
    <button
      onClick={toggleSound}
      type="button"
      aria-label={isMuted ? 'Enable background music' : 'Mute background music'}
      className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-dx-purple-bright/50 transition-all duration-300 cursor-pointer select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-dx-purple-bright ${
        !isMuted ? 'border-dx-purple-bright/40 shadow-[0_0_12px_rgba(124,42,232,0.25)]' : ''
      } ${className}`}
    >
      {/* Mini Analog Cassette Tape Icon with Rotating Spools */}
      <div
        className={`relative w-6 h-4 rounded-[3px] bg-[#121218] border transition-colors duration-300 flex items-center justify-between px-0.5 overflow-hidden ${
          !isMuted
            ? 'border-dx-purple-bright shadow-[0_0_8px_rgba(166,77,255,0.4)]'
            : 'border-white/20'
        }`}
      >
        {/* Left Spool */}
        <div
          className={`relative w-2 h-2 rounded-full border flex items-center justify-center ${
            !isMuted
              ? 'border-dx-purple-bright animate-tape-spin'
              : 'border-white/30'
          }`}
        >
          <div
            className={`w-0.5 h-0.5 rounded-full ${
              !isMuted ? 'bg-dx-purple-bright shadow-[0_0_4px_#A64DFF]' : 'bg-white/40'
            }`}
          />
        </div>

        {/* Center Tape Window Line */}
        <div className="w-1.5 h-[1.5px] bg-white/20 rounded-full" />

        {/* Right Spool */}
        <div
          className={`relative w-2 h-2 rounded-full border flex items-center justify-center ${
            !isMuted
              ? 'border-dx-purple-bright animate-tape-spin'
              : 'border-white/30'
          }`}
        >
          <div
            className={`w-0.5 h-0.5 rounded-full ${
              !isMuted ? 'bg-dx-purple-bright shadow-[0_0_4px_#A64DFF]' : 'bg-white/40'
            }`}
          />
        </div>
      </div>

      {/* State Text & Glow Indicator */}
      {!compact && (
        <div className="flex items-center gap-1.5">
          <span
            className={`font-mono text-[10px] uppercase tracking-widest font-semibold transition-colors duration-300 ${
              !isMuted
                ? 'text-white'
                : 'text-foreground-secondary/70 group-hover:text-white'
            }`}
          >
            {!isMuted ? 'SOUND ON' : 'SOUND OFF'}
          </span>
          {!isMuted && (
            <span className="w-1.5 h-1.5 rounded-full bg-dx-purple-bright shadow-[0_0_6px_#A64DFF] animate-pulse" />
          )}
        </div>
      )}
    </button>
  );
}
