import type { Metadata } from 'next';
import { Inter, Syne, JetBrains_Mono, Caveat } from 'next/font/google';
import './globals.css';
import { FilmGrain } from '@/components/ui/FilmGrain';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { AudioProvider } from '@/context/AudioContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '700', '800'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'DX Studio — Designed with a Purpose',
  description:
    'Independent digital studio crafting purposeful products, interfaces and digital experiences at the intersection of design, technology, and storytelling.',
  keywords: [
    'DX Studio',
    'Creative Studio',
    'Digital Experiences',
    'Product Design',
    'Interactive Design',
    'Awwwards',
    'Bengaluru',
  ],
  authors: [{ name: 'DX Studio' }],
  creator: 'DX Studio',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'DX Studio — Designed with a Purpose',
    description:
      'Independent digital studio crafting purposeful products, interfaces and digital experiences.',
    url: 'https://dxstudio.design',
    siteName: 'DX Studio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DX Studio — Designed with a Purpose',
    description:
      'Independent digital studio crafting purposeful products, interfaces and digital experiences.',
    creator: '@dxstudio_dsgn',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${mono.variable} ${caveat.variable} dark`}
    >
      <body className="bg-[#050505] text-[#F5F5F5] antialiased selection:bg-dx-purple selection:text-white min-h-screen">
        <AudioProvider>
          <FilmGrain />
          <ScrollProgress />
          <CustomCursor />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
