const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      m: '15px',
      base: '16px',
      lg: '20px',
      xl: '24px',
      '2xl': '32px',
      '3xl': '40px',
      '4xl': '48px',
      '5xl': '96px',
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
        primary: {
          50: '#E6EBFB',
          100: '#CCD7F7',
          200: '#99B0EF',
          300: '#6688E7',
          400: '#3361DF',
          500: '#0039D7',
          600: '#002EAC',
          700: '#002281',
          800: '#001756',
          900: '#000B2B',
        },
        secondary: {
          50: '#E6F4FB',
          100: '#CCE9F7',
          200: '#99D2EF',
          300: '#66BCE7',
          400: '#33A5DF',
          500: '#008FD7',
          600: '#0072AC',
          700: '#005681',
          800: '#003956',
          900: '#001D2B',
        },
        tertiary: {
          50: '#FFF9EA',
          100: '#FFF4D4',
          200: '#FFE8A9',
          300: '#FFDD7E',
          400: '#FFD153',
          500: '#FFC628',
          600: '#CC9E20',
          700: '#997718',
          800: '#664F10',
          900: '#332808',
        },
        grey: {
          25: '#F9F9F9',
          50: '#F3F3F3',
          100: '#E7E7E7',
          200: '#CFCFCF',
          300: '#B6B6B6',
          400: '#9E9E9E',
          500: '#868686',
          600: '#6B6B6B',
          700: '#505050',
          800: '#363636',
          900: '#1B1B1B',
        },
        transWhite: {
          5: '#FFFFFF0D',
          10: '#FFFFFF1A',
          20: '#FFFFFF33',
          30: '#FFFFFF4D',
          40: '#FFFFFF66',
          50: '#FFFFFF80',
          60: '#FFFFFF99',
          70: '#FFFFFFB2',
          80: '#FFFFFFCC',
          90: '#FFFFFFE5',
        },
        transBlack: {
          5: '#1B1B1B0D',
          10: '#1B1B1B1A',
          20: '#1B1B1B33',
          30: '#1B1B1B4D',
          40: '#1B1B1B66',
          50: '#1B1B1B80',
          60: '#1B1B1B99',
          70: '#1B1B1BB2',
          80: '#1B1B1BCC',
          90: '#1B1B1BE5',
          100: '#1B1B1B',
        },
        danger: {
          50: '#FEECEB',
          100: '#FDD9D7',
          200: '#FBB4AF',
          300: '#F88E86',
          400: '#F6695E',
          500: '#F44336',
          600: '#C4362B',
          700: '#932820',
          800: '#631B16',
          900: '#320D0B'
        },
        success: {
          50: '#F0FAF2',
          100: '#E0F6E6',
          200: '#C2ECCC',
          300: '#A3E3B3',
          400: '#85D999',
          500: '#66D080',
          600: '#52A967',
          700: '#3E814F',
          800: '#2B5A36',
          900: '#17321E'
        },
        warning: {
          50: '#FFF4EB',
          100: '#FFE9D7',
          200: '#FFD2B0',
          300: '#FFBC88',
          400: '#FFA561',
          500: '#FF8F39',
          600: '#CF742E',
          700: '#9F5922',
          800: '#703D17',
          900: '#40220B',
        }
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
