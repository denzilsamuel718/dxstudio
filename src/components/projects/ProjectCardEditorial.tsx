'use client';

import { Project } from '@/types/project';
import Image from 'next/image';
import { useAudio } from '@/context/AudioContext';

interface ProjectCardEditorialProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCardEditorial({ project, onSelect }: ProjectCardEditorialProps) {
  const { handleExternalProjectOpen } = useAudio();

  const handleOpenLive = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    handleExternalProjectOpen(url);
  };

  return (
    <div
      data-cursor="view"
      className="group relative w-full rounded-2xl sm:rounded-3xl bg-[#09090C] border border-white/[0.08] hover:border-dx-purple-bright/40 transition-all duration-700 p-5 sm:p-8 md:p-12 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
        {/* Visual on the Left on Desktop, Bottom on Mobile */}
        <div className="lg:col-span-6 order-2 lg:order-1 mt-2 lg:mt-0">
          <div
            onClick={(e) => project.liveUrl && handleOpenLive(e, project.liveUrl)}
            className="block relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.1] bg-[#121218] group-hover:border-dx-purple-bright/50 transition-all duration-500 shadow-2xl cursor-pointer"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter group-hover:brightness-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090C]/60 via-transparent to-transparent opacity-30 group-hover:opacity-0 transition-opacity duration-500" />

            {/* Floating Pill on image */}
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white flex items-center gap-1.5 sm:gap-2 shadow-lg group-hover:bg-dx-purple transition-colors">
              <span>Open {project.title}</span>
              <span className="text-dx-purple-bright group-hover:text-white">↗</span>
            </div>
          </div>
        </div>

        {/* Text & Meta on Right */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-5 order-1 lg:order-2">
          <div className="flex items-center gap-2.5 sm:gap-3 font-mono text-[11px] sm:text-xs text-foreground-secondary flex-wrap">
            <span className="font-bold text-dx-purple-bright">{project.number}</span>
            <span>•</span>
            <span className="uppercase tracking-widest">{project.category}</span>
          </div>

          {/* Perfectly Clamped Title so STORYBOARD Never Clips on 360px-390px Viewports */}
          <h3 className="font-display text-[clamp(1.75rem,6.8vw,3.25rem)] font-black uppercase tracking-tight text-white group-hover:text-dx-purple-bright transition-colors duration-500 leading-tight break-words max-w-full">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base md:text-lg text-foreground-secondary leading-relaxed font-sans">
            {project.tagline}
          </p>

          <p className="text-xs md:text-sm text-foreground-secondary/70 leading-relaxed font-sans">
            {project.descriptor}
          </p>

          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row sm:items-center gap-3">
            {project.liveUrl && (
              <button
                onClick={(e) => handleOpenLive(e, project.liveUrl!)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-dx-purple hover:bg-dx-purple-bright text-xs font-mono uppercase tracking-wider text-white font-bold transition-all duration-300 shadow-[0_0_20px_rgba(124,42,232,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch Live Site</span>
                <span>↗</span>
              </button>
            )}
            <button
              onClick={() => onSelect(project)}
              className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/10 hover:border-white/30 text-xs font-mono uppercase tracking-wider text-foreground-secondary hover:text-white transition-colors cursor-pointer text-center"
            >
              Case Study Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
