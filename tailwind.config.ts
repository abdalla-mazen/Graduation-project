import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			maroon: {
  				'50': '#FBEAEA',
  				'100': '#f3c5c7',
  				'200': '#ea9fa2',
  				'300': '#e07a7d',
  				'400': '#d75458',
  				'500': '#cd2e33',
  				'600': '#a5252a',
  				'700': '#741c21',
  				'800': '#501419',
  				'900': '#2c0c10',
  				'950': '#20090c'
  			},
  			softPink: {
  				'50': '#fff1f5',
  				'100': '#ffe8ef',
  				'200': '#ffc2d0',
  				'300': '#ffa3b9',
  				'400': '#ff85a2',
  				'500': '#ff668b',
  				'600': '#e65073',
  				'700': '#cc3a5b',
  				'800': '#b32443',
  				'900': '#99102c',
  				'950': '#590414'
  			},
  			mainColor: 'hsla(209, 100%, 50%, 1)',
  			mainColorDark: 'hsla(209, 100%, 65%, 1)',
  			secondaryColor: 'hsla(0, 0%, 44%, 0.8)',
  			secondaryColordark: 'hsla(240, 1%, 63%, 1)',
  			tertiaryColor: 'hsla(209, 100%, 91%, 1)',
  			tertiaryColorDark: 'hsla(209, 100%, 83%, 0.5)',
  			whiteColor: 'hsl(0, 0%, 100%)',
  			blackColor: 'hsl(0, 0%, 0%)',
  			sidebarBackground: 'hsla(0, 0%, 89%, 1)',
  			sidebarBackgroundDark: 'hsla(225, 11%, 7%, 1)',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			edwardian: [
  				'Edwardian Script ITCn',
  				'cursive'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		width: {
  			'406': '406px',
  			'954': '954px'
  		},
  		height: {
  			'272': '272px'
  		},
  		spacing: {
  			'wheel-left': '7.3px',
  			'wheel-right': '4.3px',
  			'wheel-bottom': '2px'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [animate],
};

export default config;
