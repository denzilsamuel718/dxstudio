import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: {
          DEFAULT: '#0B0B0D',
          elevated: '#121216',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(166, 77, 255, 0.3)',
        },
        foreground: {
          DEFAULT: '#F5F5F5',
          secondary: '#96969D',
          muted: '#5A5A64',
          subtle: '#383842',
        },
        dx: {
          purple: '#7C2AE8',
          'purple-bright': '#A64DFF',
          'purple-deep': '#4A1596',
          'purple-glow': 'rgba(124, 42, 232, 0.25)',
          'purple-subtle': 'rgba(166, 77, 255, 0.12)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-syne)', 'var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        handwritten: ['var(--font-caveat)', 'cursive'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.03em',
        normal: '0em',
        wide: '0.05em',
        wider: '0.12em',
        widest: '0.25em',
        mega: '0.4em',
      },
      transitionTimingFunction: {
        'dx-expo': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'dx-smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'tape-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'tape-spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(0.5deg)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'tape-spin': 'tape-spin 12s linear infinite',
        'tape-spin-reverse': 'tape-spin-reverse 12s linear infinite',
        float: 'float 6s ease-in-out infinite',
        grain: 'grain 8s steps(10) infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
