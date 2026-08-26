import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'knot',
    number: '01 / 03',
    title: 'KNOT',
    tagline: 'Your thoughts. Your device. Yours.',
    descriptor: 'A quiet, offline-first personal workspace for your notes, time capsules, and key decisions. No cloud. No tracking.',
    category: 'Offline Workspace / Native Product',
    year: '2026',
    role: 'Lead Product Architecture & Interaction Design',
    client: 'Knot Systems',
    featured: true,
    accentColor: '#7C2AE8',
    layoutVariant: 'sticky-hero',
    overview:
      'Knot is an offline-first private workspace engineered for extreme clarity, zero tracking, and complete user sovereignty. Built with local cryptographic storage, frictionless quick notes, and time-capsule archives.',
    challenge:
      'In a hyper-connected world overloaded with cloud bloat and invasive telemetry, how do you design a digital space that feels as private, permanent, and sacred as physical paper?',
    solution:
      'We designed an ultra-minimalist interface with local device encryption, zero-latency note capture, and tactile offline-first synchronization protocols.',
    results: [
      '100% offline functionality with zero external dependencies',
      'Instant sub-10ms note loading and state indexing',
      'Complete end-to-end user data sovereignty',
    ],
    deliverables: [
      'Design System & Component Framework',
      'Offline-First Workspace Architecture',
      'Android & Web Production Application',
      'Cryptographic Local Storage UX',
    ],
    technologies: ['React', 'Next.js', 'TailwindCSS', 'IndexedDB', 'PWA / Android'],
    liveUrl: 'https://knot-website-seven.vercel.app',
    image: '/assets/projects/knot.png',
    galleryImages: [
      '/assets/projects/knot.png',
    ],
  },
  {
    id: 'storyboard',
    number: '02 / 03',
    title: 'STORYBOARD',
    tagline: 'Give your story somewhere to go.',
    descriptor: 'A considered space to submit original scripts, stories, screenplays, films and pitches — then follow every step with confidence.',
    category: 'Creative Platform / Story Architecture',
    year: '2026',
    role: 'Creative Direction & Web Architecture',
    client: 'StoryBoard Collective',
    featured: true,
    accentColor: '#A64DFF',
    layoutVariant: 'editorial-split',
    overview:
      'StoryBoard is an editorial platform built specifically for writers, filmmakers, and storytellers. It transforms standard script submissions into a calm, guided, and transparent creative pipeline.',
    challenge:
      'Creative submissions are often chaotic, opaque, and intimidating. Writers rarely know where their screenplays go or how evaluation decisions are made.',
    solution:
      'Crafted a warm, publication-grade editorial interface with guided submission journeys, persistent reference IDs, and real-time review status tracking.',
    results: [
      'Guided 2-step saveable submission flow with zero cognitive friction',
      'Permanent cryptographic reference IDs for every work',
      'Publication-grade serif typography and editorial layout design',
    ],
    deliverables: [
      'Editorial Design System & Typography Engine',
      'Guided Multi-Step Submission Pipeline',
      'Real-time Review Status Tracking Portal',
      'Writer Dashboard & Draft Persistence',
    ],
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Vercel Edge'],
    liveUrl: 'https://storyboard-web-seven.vercel.app',
    image: '/assets/projects/storyboard.png',
    galleryImages: [
      '/assets/projects/storyboard.png',
    ],
  },
  {
    id: 'jokes',
    number: '03 / 03',
    title: 'JOKES',
    tagline: 'JOKES forever — Some people become a whole chapter.',
    descriptor: 'An intimate, interactive digital friendship archive celebrating shared memories, chapters, and lifelong bonds.',
    category: 'Interactive Archive / Digital Experience',
    year: '2026',
    role: 'Interactive Experience & Motion Design',
    client: 'Friendship Archive Labs',
    featured: true,
    accentColor: '#7C2AE8',
    layoutVariant: 'fullscreen-focus',
    overview:
      'Jokes is an emotional, card-stacked digital friendship memorial preserving unscripted moments, inside jokes, and personal milestones across rotating polaroid-style chapters.',
    challenge:
      'Translating messy, authentic human nostalgia and lifelong friendships into a web experience without making it feel like generic social media.',
    solution:
      'Engineered an interactive fanned card deck with tactile drag interactions, chapter milestones, and warm analog publication aesthetics.',
    results: [
      'Interactive 3D fanned card carousel with smooth physics',
      'Chapter-based storytelling with curated photo archives',
      'Deployed globally on ultra-fast Cloudflare Workers edge network',
    ],
    deliverables: [
      'Interactive Card Fan UI & Gesture Choreography',
      'Chapter Storytelling Framework',
      'Cloudflare Workers Edge Architecture',
      'Retro Polaroid Image Processing',
    ],
    technologies: ['JavaScript', 'Cloudflare Workers', 'HTML5 Canvas', 'CSS 3D Transforms'],
    liveUrl: 'https://jokes-friendship-story.denzilsamuel718.workers.dev/',
    image: '/assets/projects/jokes.png',
    galleryImages: [
      '/assets/projects/jokes.png',
    ],
  },
];
