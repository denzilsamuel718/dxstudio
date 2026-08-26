'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { CinematicIntro } from '@/components/intro/CinematicIntro';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { AboutSection } from '@/components/about/AboutSection';
import { ProcessSection } from '@/components/process/ProcessSection';
import { PhilosophySection } from '@/components/philosophy/PhilosophySection';
import { ContactSection } from '@/components/contact/ContactSection';
import { Footer } from '@/components/footer/Footer';

export default function Home() {
  // Initialize Lenis Smooth Scrolling and synchronize with GSAP ScrollTrigger
  useSmoothScroll();

  return (
    <main className="relative bg-[#050505] min-h-screen text-[#F5F5F5] overflow-x-hidden selection:bg-dx-purple selection:text-white">
      {/* Intro Experience */}
      <CinematicIntro />

      {/* Primary Navigation */}
      <Navbar />

      {/* 01: Hero Section with Transformed Typography & Cassette Artwork */}
      <HeroSection />

      {/* 02: Selected Projects with Alternate Editorial Layouts */}
      <ProjectsSection />

      {/* 03: About & Studio Personality */}
      <AboutSection />

      {/* 04: Process & Methodology */}
      <ProcessSection />

      {/* 05: The Philosophy Moment (Pinned fullscreen transition) */}
      <PhilosophySection />

      {/* 06: Contact & Conversion */}
      <ContactSection />

      {/* 07: Signature Footer */}
      <Footer />
    </main>
  );
}
