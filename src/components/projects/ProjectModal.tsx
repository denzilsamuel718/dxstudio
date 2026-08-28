'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/project';
import { TRANSITION_EASE } from '@/utils/animations';
import Image from 'next/image';
import { useAudio } from '@/context/AudioContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { handleExternalProjectOpen } = useAudio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const handleOpenLive = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    handleExternalProjectOpen(url);
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050505]/92 backdrop-blur-2xl"
          />

          {/* Modal Content Container */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.45, ease: TRANSITION_EASE }}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0B0B0E] border border-white/[0.12] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-[0_40px_120px_rgba(0,0,0,0.9)] z-10 custom-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer z-20"
              aria-label="Close Project Modal"
            >
              ✕
            </button>

            {/* Header Meta */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-[11px] sm:text-xs text-foreground-secondary mb-3 uppercase tracking-widest pr-10">
              <span className="text-dx-purple-bright font-bold">{project.number}</span>
              <span>•</span>
              <span>{project.category}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>

            <h2 className="font-display text-[clamp(1.75rem,5.5vw,3.75rem)] font-black uppercase tracking-tight text-white mb-3 pr-10 break-words">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-foreground-secondary font-medium mb-6 sm:mb-8">
              {project.tagline}
            </p>

            {/* Featured Hero Image */}
            <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden mb-8 sm:mb-10 border border-white/[0.08] bg-[#121218]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-transparent to-transparent opacity-50" />
            </div>

            {/* Editorial Grid: Overview + Challenge + Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-white/[0.08]">
              {/* Left Column: Story */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-dx-purple-bright mb-2">
                    Overview
                  </h3>
                  <p className="text-foreground text-sm sm:text-base leading-relaxed font-sans">
                    {project.overview}
                  </p>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-dx-purple-bright mb-2">
                    The Challenge &amp; Solution
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm text-foreground-secondary leading-relaxed font-sans">
                    <p>
                      <strong className="text-white">Challenge:</strong> {project.challenge}
                    </p>
                    <p>
                      <strong className="text-white">Solution:</strong> {project.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Meta & Stack */}
              <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-white/[0.08] lg:pl-8">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-1">
                    Role &amp; Client
                  </h4>
                  <p className="text-sm text-white font-medium">{project.role}</p>
                  {project.client && (
                    <p className="text-xs text-foreground-secondary mt-1">{project.client}</p>
                  )}
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-foreground-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-2">
                    Key Outcomes
                  </h4>
                  <ul className="space-y-1.5 text-xs text-foreground-secondary list-disc list-inside">
                    {project.results.map((res, i) => (
                      <li key={i}>{res}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={onClose}
                className="text-xs font-mono uppercase tracking-widest text-foreground-secondary hover:text-white transition-colors cursor-pointer order-2 sm:order-1"
              >
                ← Back to Projects
              </button>

              <div className="flex gap-4 w-full sm:w-auto justify-end order-1 sm:order-2">
                {project.liveUrl && (
                  <button
                    onClick={(e) => handleOpenLive(e, project.liveUrl!)}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-dx-purple hover:bg-dx-purple-bright text-xs font-mono uppercase tracking-wider text-white font-bold transition-colors shadow-[0_0_15px_rgba(124,42,232,0.5)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Live Preview</span>
                    <span>↗</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
