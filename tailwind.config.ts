/* eslint-disable ts/no-require-imports */
import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', 'Roboto', 'Google Sans Text', 'system-ui', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'Roboto Mono', 'Google Sans Code', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'blob': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.95)' },
        },
        'float-clip': {
          '0%': { transform: 'translateY(0) rotate(-2deg)', opacity: '0' },
          '8%': { opacity: '0.9' },
          '85%': { opacity: '0.9' },
          '100%': { transform: 'translateY(-120vh) rotate(2deg)', opacity: '0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.35', transform: 'translateX(-50%) scale(1)' },
          '50%': { opacity: '0.7', transform: 'translateX(-50%) scale(1.15)' },
        },
        'drift': {
          '0%, 100%': { translate: '0 0', rotate: '-1.2deg' },
          '50%': { translate: '0 -18px', rotate: '1.2deg' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(300%)' },
        },
        'progress': {
          '0%': { width: '5%' },
          '60%': { width: '85%' },
          '100%': { width: '5%' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'blob': 'blob 18s ease-in-out infinite',
        'float-clip': 'float-clip linear infinite',
        'glow-pulse': 'glow-pulse 6s ease-in-out infinite',
        'drift': 'drift ease-in-out infinite',
        'scanline': 'scanline 4s linear infinite',
        'progress': 'progress ease-in-out infinite',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
