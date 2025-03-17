
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['JetBrains Mono', 'monospace'],
				cyber: ['Share Tech Mono', 'monospace']
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				neon: {
					blue: '#0ea5e9',
					purple: '#8b5cf6',
					pink: '#d946ef',
					green: '#10b981',
					orange: '#f97316'
				},
				cyber: {
					dark: '#1A1F2C',
					darker: '#121419',
					light: '#403E43',
					accent: '#5A5766'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				typing: {
					'0%': { width: '0%' },
					'100%': { width: '100%' }
				},
				blink: {
					'0%, 100%': { 'border-color': 'transparent' },
					'50%': { 'border-color': 'hsl(var(--primary))' }
				},
				glitch: {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-5px, 5px)' },
					'40%': { transform: 'translate(-5px, -5px)' },
					'60%': { transform: 'translate(5px, 5px)' },
					'80%': { transform: 'translate(5px, -5px)' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'matrix-fall': {
					'0%': { top: '-50%' },
					'100%': { top: '110%' }
				},
				'pulse-neon': {
					'0%, 100%': { 'box-shadow': '0 0 10px 2px var(--neon-color)' },
					'50%': { 'box-shadow': '0 0 20px 5px var(--neon-color)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'typing': 'typing 2s steps(40, end)',
				'caret': 'blink 1s step-end infinite',
				'glitch': 'glitch 0.5s ease infinite',
				'float': 'float 3s ease-in-out infinite',
				'matrix-fall': 'matrix-fall 10s linear infinite',
				'pulse-neon': 'pulse-neon 2s ease-in-out infinite'
			},
			// Add backface-visibility utility
			backfaceVisibility: {
				hidden: 'hidden',
				visible: 'visible',
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }) {
			const newUtilities = {
				'.backface-hidden': {
					'backface-visibility': 'hidden',
				},
				'.backface-visible': {
					'backface-visibility': 'visible',
				},
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;
