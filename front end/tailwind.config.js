module.exports = {
  content: [
    "./pages/*.{html,js}",
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EBF4FD", // blue-50
          100: "#D1E7FA", // blue-100
          200: "#A3CEF5", // blue-200
          300: "#75B5F0", // blue-300
          400: "#5CA2E6", // blue-400
          500: "#4A90E2", // blue-500
          600: "#3B73B5", // blue-600
          700: "#2C5688", // blue-700
          800: "#1D395B", // blue-800
          900: "#0E1C2E", // blue-900
          DEFAULT: "#4A90E2" // blue-500
        },
        secondary: {
          50: "#F7F8F8", // gray-50
          100: "#EAECED", // gray-100
          200: "#D5D9DB", // gray-200
          300: "#C0C6C9", // gray-300
          400: "#96A0A4", // gray-400
          500: "#6C7B7F", // gray-500
          600: "#566266", // gray-600
          700: "#404A4C", // gray-700
          800: "#2A3133", // gray-800
          900: "#151919", // gray-900
          DEFAULT: "#6C7B7F" // gray-500
        },
        accent: {
          50: "#F3F1FE", // purple-50
          100: "#E6E1FD", // purple-100
          200: "#CCC3FB", // purple-200
          300: "#B3A5F9", // purple-300
          400: "#9986F3", // purple-400
          500: "#7B68EE", // purple-500
          600: "#6253BE", // purple-600
          700: "#4A3E8F", // purple-700
          800: "#31295F", // purple-800
          900: "#191430", // purple-900
          DEFAULT: "#7B68EE" // purple-500
        },
        background: "#FAFBFC", // slate-50
        surface: "#FFFFFF", // white
        text: {
          primary: "#2C3E50", // slate-700
          secondary: "#718096" // gray-500
        },
        success: {
          50: "#E8F5E8", // green-50
          100: "#C8E6C9", // green-100
          200: "#A5D6A7", // green-200
          300: "#81C784", // green-300
          400: "#66BB6A", // green-400
          500: "#4CAF50", // green-500
          600: "#43A047", // green-600
          700: "#388E3C", // green-700
          800: "#2E7D32", // green-800
          900: "#1B5E20", // green-900
          DEFAULT: "#4CAF50" // green-500
        },
        warning: {
          50: "#FFF3E0", // orange-50
          100: "#FFE0B2", // orange-100
          200: "#FFCC80", // orange-200
          300: "#FFB74D", // orange-300
          400: "#FFA726", // orange-400
          500: "#FF9800", // orange-500
          600: "#FB8C00", // orange-600
          700: "#F57C00", // orange-700
          800: "#EF6C00", // orange-800
          900: "#E65100", // orange-900
          DEFAULT: "#FF9800" // orange-500
        },
        error: {
          50: "#FEF2F2", // red-50
          100: "#FEE2E2", // red-100
          200: "#FECACA", // red-200
          300: "#FCA5A5", // red-300
          400: "#F87171", // red-400
          500: "#E53E3E", // red-500
          600: "#DC2626", // red-600
          700: "#B91C1C", // red-700
          800: "#991B1B", // red-800
          900: "#7F1D1D", // red-900
          DEFAULT: "#E53E3E" // red-500
        }
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
        caption: ['Nunito Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        inter: ['Inter', 'sans-serif'],
        'source-sans': ['Source Sans Pro', 'sans-serif'],
        'nunito-sans': ['Nunito Sans', 'sans-serif'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      borderRadius: {
        'sm': '4px',
        'base': '8px',
        'lg': '12px',
        'xl': '16px'
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 0 1px rgba(74, 144, 226, 0.2), 0 4px 6px rgba(0, 0, 0, 0.07)'
      },
      animation: {
        'micro-celebrate': 'micro-celebrate 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'breathe': 'breathe 3s ease-in-out infinite',
        'gentle-glow': 'gentle-glow 1s ease-in-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        'micro-celebrate': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        },
        'breathe': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' }
        },
        'gentle-glow': {
          '0%, 100%': { boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)' },
          '50%': { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(74, 144, 226, 0.2)' }
        }
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '500': '500ms'
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'base': '8px',
        'md': '12px',
        'lg': '16px'
      },
      gridTemplateRows: {
        'auto': 'repeat(auto-fit, minmax(0, 1fr))'
      }
    }
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.border-study': {
          borderColor: 'rgba(203, 213, 224, 0.6)'
        },
        '.shadow-study': {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
        },
        '.shadow-study-md': {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)'
        },
        '.text-study-primary': {
          color: '#2C3E50'
        },
        '.text-study-secondary': {
          color: '#718096'
        },
        '.bg-study': {
          backgroundColor: '#FAFBFC'
        }
      }
      addUtilities(newUtilities)
    }
  ]
}