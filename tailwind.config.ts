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
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
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
					'50%': { transform: 'translate(-2px, 2px)' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'matrix-fall': {
					'0%': { top: '-50%' },
					'100%': { top: '110%' }
				},
				'pulse-neon': {
					'0%, 100%': { 'box-shadow': '0 0 5px 1px var(--neon-color)' },
					'50%': { 'box-shadow': '0 0 10px 2px var(--neon-color)' }
				},
				'flicker': {
					'0%, 100%': { opacity: '0.95' },
					'50%': { opacity: '0.7' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
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
				'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
				'flicker': 'flicker 4s linear infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
			},
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
				'.flash': {
					animation: 'flash 0.5s',
				},
				'.glitch-text': {
					position: 'relative',
					'&::before': {
						content: 'attr(data-text)',
						position: 'absolute',
						top: '0',
						left: '2px',
						width: '100%',
						height: '100%',
						textShadow: '-2px 0 #ff00c1'
					}
				},
				'.gpu': {
					transform: 'translateZ(0)',
					willChange: 'transform'
				},
				'.contain-paint': {
					contain: 'paint'
				},
				'.contain-content': {
					contain: 'content'
				},
				'.contain-strict': {
					contain: 'strict'
				}
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;
