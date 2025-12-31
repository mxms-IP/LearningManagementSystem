/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 🎨 Creative & Playful Color Palette (Educational-friendly)
      colors: {
        // Primary - Vibrant Purple (Trust + Creativity)
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',  // Main brand color
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Secondary - Warm Coral (Energy + Approachability)
        secondary: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',  // Accent color
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        // Accent - Sunshine Yellow (Optimism + Learning)
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',  // Highlight color
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        // Success - Fresh Green
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Info - Sky Blue (Trustworthy)
        info: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Neutrals - Warm Grays
        neutral: {
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
      },

      // 📐 Typography Scale
      fontSize: {
        // Display sizes (Hero sections)
        'display-xl': ['72px', { lineHeight: '90px', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg': ['60px', { lineHeight: '72px', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-md': ['48px', { lineHeight: '60px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['36px', { lineHeight: '44px', letterSpacing: '-0.01em', fontWeight: '700' }],
        
        // Headings
        'h1': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'h2': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'h5': ['18px', { lineHeight: '26px', fontWeight: '600' }],
        'h6': ['16px', { lineHeight: '24px', fontWeight: '600' }],
        
        // Body text
        'body-xl': ['20px', { lineHeight: '32px', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-xs': ['12px', { lineHeight: '18px', fontWeight: '400' }],
        
        // Legacy support
        "course-details-heading-small": ["26px", "36px"],
        "course-details-heading-large": ["36px", "44px"],
        "home-heading-small": ["36px", "44px"],
        "home-heading-large": ["48px", "60px"],
        default: ["16px", "24px"],
      },

      // 📏 Spacing Scale (Consistent rhythm)
      spacing: {
        '18': '4.5rem',    // 72px
        '22': '5.5rem',    // 88px
        '26': '6.5rem',    // 104px
        '30': '7.5rem',    // 120px
        '34': '8.5rem',    // 136px
        '38': '9.5rem',    // 152px
        'section-sm': '60px',
        'section-md': '80px',
        'section-lg': '120px',
        'section-xl': '160px',
        'section-height': '500px', // Legacy support
      },

      // 🎭 Border Radius (Playful but professional)
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        'full': '9999px',
        'card': '16px',
        'button': '12px',
      },

      // 🌟 Box Shadows (Depth and elevation)
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'float': '0 12px 40px rgba(0, 0, 0, 0.15)',
        'glow-primary': '0 0 20px rgba(168, 85, 247, 0.3)',
        'glow-secondary': '0 0 20px rgba(244, 63, 94, 0.3)',
        'glow-accent': '0 0 20px rgba(234, 179, 8, 0.3)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
        'custom-card': '0px 4px 15px 2px rgba(0, 0, 0, 0.1)', // Legacy support
      },

      // 🎬 Animations
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },

      // 📱 Grid Systems
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(200px, 1fr))",
        'auto-sm': "repeat(auto-fit, minmax(150px, 1fr))",
        'auto-md': "repeat(auto-fit, minmax(250px, 1fr))",
        'auto-lg': "repeat(auto-fit, minmax(300px, 1fr))",
      },

      // 📐 Max Widths
      maxWidth: {
        'course-card': '380px',
        'content': '1200px',
        'content-narrow': '800px',
        'content-wide': '1400px',
      },

      // 🎨 Backdrop Blur
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};