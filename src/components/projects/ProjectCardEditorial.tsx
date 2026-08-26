'use client';

import { Project } from '@/types/project';
import Image from 'next/image';

interface ProjectCardEditorialProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCardEditorial({ project, onSelect }: ProjectCardEditorialProps) {
  return (
    <div
      data-cursor="view"
      className="group relative w-full rounded-3xl bg-[#09090C] border border-white/[0.08] hover:border-dx-purple-bright/40 transition-all duration-700 p-6 md:p-12 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Visual on the Left for editorial variation */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <a
            href={project.liveUrl || '#'}
            target={project.liveUrl ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="block relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.1] bg-[#121218] group-hover:border-dx-purple-bright/50 transition-all duration-500 shadow-2xl"
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
            <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-widest text-white flex items-center gap-2 shadow-lg group-hover:bg-dx-purple transition-colors">
              <span>Open {project.title}</span>
              <span className="text-dx-purple-bright group-hover:text-white">↗</span>
            </div>
          </a>
        </div>

        {/* Text & Meta on Right */}
        <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
          <div className="flex items-center gap-3 font-mono text-xs text-foreground-secondary">
            <span className="font-bold text-dx-purple-bright">{project.number}</span>
            <span>•</span>
            <span className="uppercase tracking-widest">{project.category}</span>
          </div>

          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tight text-white group-hover:text-dx-purple-bright transition-colors duration-500 leading-tight">
            {project.title}
          </h3>

          <p className="text-base md:text-lg text-foreground-secondary leading-relaxed font-sans">
            {project.tagline}
          </p>

          <p className="text-xs md:text-sm text-foreground-secondary/70 leading-relaxed font-sans">
            {project.descriptor}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-6 py-3 rounded-full bg-dx-purple hover:bg-dx-purple-bright text-xs font-mono uppercase tracking-wider text-white font-bold transition-all duration-300 shadow-[0_0_20px_rgba(124,42,232,0.4)] flex items-center gap-2"
              >
                <span>Launch Live Site</span>
                <span>↗</span>
              </a>
            )}
            <button
              onClick={() => onSelect(project)}
              className="px-5 py-3 rounded-full border border-white/10 hover:border-white/30 text-xs font-mono uppercase tracking-wider text-foreground-secondary hover:text-white transition-colors"
            >
              Case Study Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
