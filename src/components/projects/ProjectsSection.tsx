'use client';

import { useState, useRef } from 'react';
import { projects } from '@/data/projects';
import { Project } from '@/types/project';
import { ProjectCardSticky } from './ProjectCardSticky';
import { ProjectCardEditorial } from './ProjectCardEditorial';
import { ProjectCardMinimal } from './ProjectCardMinimal';
import { ProjectModal } from './ProjectModal';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const knotProject = projects.find((p) => p.id === 'knot') || projects[0];
  const storyboardProject = projects.find((p) => p.id === 'storyboard') || projects[1];
  const jokesProject = projects.find((p) => p.id === 'jokes') || projects[2];

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full py-24 md:py-36 px-6 md:px-12 max-w-[1540px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8 mb-16 md:mb-24">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-dx-purple-bright mb-3">
            <span className="inline-block w-2 h-2 rounded-sm bg-dx-purple-bright" />
            <span>01 / SELECTED WORK</span>
          </div>
          <h2 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tight text-white">
            FEATURED PRODUCTIONS
          </h2>
        </div>

        <div className="font-mono text-xs md:text-sm uppercase tracking-widest text-foreground-secondary/70">
          <span>2026 — PRESENT</span>
          <div className="text-[11px] text-foreground-secondary/40 mt-1">
            3 LIVE DIGITAL EXPERIENCES
          </div>
        </div>
      </div>

      {/* Projects Showcase Container */}
      <div className="space-y-12 md:space-y-20">
        {/* Project 01: Knot */}
        <div>
          <ProjectCardSticky
            project={knotProject}
            onSelect={(proj) => setSelectedProject(proj)}
          />
        </div>

        {/* Project 02: StoryBoard */}
        <div>
          <ProjectCardEditorial
            project={storyboardProject}
            onSelect={(proj) => setSelectedProject(proj)}
          />
        </div>

        {/* Project 03: Jokes */}
        <div>
          <ProjectCardMinimal
            project={jokesProject}
            onSelect={(proj) => setSelectedProject(proj)}
          />
        </div>
      </div>

      {/* Case Study Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
