
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
				},
				'flicker': {
					'0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { 
						opacity: '0.95',
						filter: 'brightness(1)'
					},
					'20%, 24%, 55%': { 
						opacity: '0.2',
						filter: 'brightness(1.5)' 
					}
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1',
						textShadow: '0 0 10px var(--neon-color), 0 0 20px var(--neon-color)'
					},
					'50%': { 
						opacity: '0.7',
						textShadow: '0 0 5px var(--neon-color), 0 0 10px var(--neon-color)'
					}
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
				'.flash': {
					animation: 'flash 0.5s',
				},
				'.glitch-text': {
					position: 'relative',
					'&::before, &::after': {
						content: 'attr(data-text)',
						position: 'absolute',
						top: '0',
						left: '0',
						width: '100%',
						height: '100%'
					},
					'&::before': {
						left: '2px',
						textShadow: '-2px 0 #ff00c1',
						animation: 'glitch-anim-1 2s infinite linear alternate-reverse'
					},
					'&::after': {
						left: '-2px',
						textShadow: '2px 0 #00fff9',
						animation: 'glitch-anim-2 3s infinite linear alternate-reverse'
					}
				}
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;
