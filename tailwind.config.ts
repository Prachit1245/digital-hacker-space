
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
				'button-pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'button-glow': {
					'0%, 100%': { 'box-shadow': '0 0 5px 0px var(--neon-color)' },
					'50%': { 'box-shadow': '0 0 8px 2px var(--neon-color)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'typing': 'typing 2s steps(40, end)',
				'caret': 'blink 1s step-end infinite',
				'button-pulse': 'button-pulse 0.5s ease-in-out',
				'button-glow': 'button-glow 1.5s ease-in-out infinite'
			},
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
				'.contain-layout': {
					contain: 'layout'
				},
				'.button-hover-effect': {
					'transition': 'all 0.3s ease',
					'&:hover': {
						'transform': 'translateY(-2px)',
						'box-shadow': '0 5px 15px rgba(0, 0, 0, 0.1)'
					}
				}
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;
