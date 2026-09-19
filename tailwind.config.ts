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
        cream:         'var(--cream)',
        'cream-light': 'var(--cream-light)',
        'cream-dark':  'var(--cream-dark)',
        espresso:      'var(--espresso)',
        gold:          'var(--gold)',
        'gold-light':  'var(--gold-light)',
        border:        'var(--border)',
      },
      fontFamily: {
        arabic: ['Cairo', 'Noto Sans Arabic', 'Tajawal', 'sans-serif'],
        serif:  ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        sm:   'var(--shadow-sm)',
        md:   'var(--shadow-md)',
        lg:   'var(--shadow-lg)',
        gold: 'var(--shadow-gold)',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
}
export default config
