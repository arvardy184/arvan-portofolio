/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
        display: ['Playfair Display', 'Noto Serif JP', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Neo-Japanese Color Palette
        earth: {
          50: '#faf8f3',
          100: '#f4f0e6',
          200: '#e8dcc6', 
          300: '#d9c49f',
          400: '#c8a676',
          500: '#b8905a',
          600: '#a67c4f',
          700: '#8a6543',
          800: '#71533a',
          900: '#5c4530',
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        copper: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#da6f47',
          500: '#c2543a',
          600: '#a0442c',
          700: '#7f3724',
          800: '#6b2f1e',
          900: '#5a271a',
        },
        ink: {
          50: '#f8fafc',
          100: '#f1f5f9', 
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Washi paper texture colors
        washi: {
          cream: '#fefcf3',
          pearl: '#f7f3e9',
          bamboo: '#e8e2d4',
        }
      },
      animation: {
        'brush-stroke': 'brushStroke 2s ease-in-out infinite',
        'ink-drop': 'inkDrop 3s ease-out infinite',
        'zen-float': 'zenFloat 6s ease-in-out infinite',
        'magnetic': 'magnetic 0.3s ease-out',
        'paper-fold': 'paperFold 0.8s ease-in-out',
        'calligraphy': 'calligraphy 1.5s ease-in-out',
      },
      keyframes: {
        brushStroke: {
          '0%': { strokeDasharray: '0 100' },
          '50%': { strokeDasharray: '50 50' },
          '100%': { strokeDasharray: '100 0' }
        },
        inkDrop: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '30%': { transform: 'scale(1.2)', opacity: '0.7' },
          '70%': { transform: 'scale(0.9)', opacity: '0.4' },
          '100%': { transform: 'scale(1)', opacity: '0.1' }
        },
        zenFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' }
        },
        magnetic: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(var(--mouse-x), var(--mouse-y))' }
        },
        paperFold: {
          '0%': { transform: 'rotateY(-90deg)', opacity: '0' },
          '50%': { transform: 'rotateY(-45deg)', opacity: '0.5' },
          '100%': { transform: 'rotateY(0deg)', opacity: '1' }
        },
        calligraphy: {
          '0%': { strokeDasharray: '0 1000', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { strokeDasharray: '1000 0', opacity: '1' }
        }
      },
      backgroundImage: {
        'washi-texture': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><filter id=\"paper\"><feTurbulence baseFrequency=\"0.04\" numOctaves=\"5\" result=\"texture\"/><feColorMatrix in=\"texture\" type=\"saturate\" values=\"0\"/></filter></defs><rect width=\"100\" height=\"100\" filter=\"url(%23paper)\" opacity=\"0.4\"/></svg>')",
        'bamboo-grain': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 60 60\"><defs><pattern id=\"bamboo\" x=\"0\" y=\"0\" width=\"60\" height=\"60\" patternUnits=\"userSpaceOnUse\"><line x1=\"0\" y1=\"20\" x2=\"60\" y2=\"20\" stroke=\"%23d6d3d1\" stroke-width=\"0.5\" opacity=\"0.3\"/><line x1=\"0\" y1=\"40\" x2=\"60\" y2=\"40\" stroke=\"%23d6d3d1\" stroke-width=\"0.5\" opacity=\"0.3\"/></pattern></defs><rect width=\"60\" height=\"60\" fill=\"url(%23bamboo)\"/></svg>')",
        'zen-gradient': 'linear-gradient(135deg, #fefcf3 0%, #f7f3e9 25%, #e8e2d4 50%, #f7f3e9 75%, #fefcf3 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      }
    },
  },
  plugins: [],
};