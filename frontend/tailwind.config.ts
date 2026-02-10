import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f0f0f',
        'dark-card': '#1a1a1a',
        'dark-border': '#2a2a2a',
        'buzzer-red': '#dc2626',
        'buzzer-red-hover': '#ef4444',
        'buzzer-blue': '#2563eb',
        'buzzer-blue-hover': '#3b82f6',
        'status-idle': '#4a4a4a',
        'status-winner': '#fbbf24',
      },
      boxShadow: {
        'buzzer': '0 8px 0 rgba(0, 0, 0, 0.4), 0 12px 20px rgba(0, 0, 0, 0.3)',
        'buzzer-active': '0 4px 0 rgba(0, 0, 0, 0.4), 0 6px 10px rgba(0, 0, 0, 0.3)',
        'status-glow': '0 0 20px #fbbf24, 0 0 40px #fbbf24',
      },
    },
  },
  plugins: [],
}
export default config
