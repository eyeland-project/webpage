/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	safelist: [
		'font-sans',
		'font-serif',
		'font-mono',
		'border-black',
		'tracking-normal',
		'tracking-wide'
	],
	theme: {
		extend: {
			keyframes: {
				'animate-entrance': {
					'0%': { opacity: 0, transform: 'translateX(-200px)' },
					'100%': { opacity: 1, transform: 'translateX(0px)' }
				},
				appear: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				}
			},
			animation: {
				'entrance-1': 'animate-entrance 0.5s 0.5s backwards',
				'entrance-2': 'animate-entrance 0.5s 0.6s backwards',
				'entrance-3': 'animate-entrance 0.5s 0.7s backwards',
				appear: 'appear 0.5s'
			},
			boxShadow: {
				lateralNavbar: '4px 0px 4px rgba(0, 0, 0, 0.25)'
			},
			fontFamily: {
				Poppins: ['Poppins', 'sans-serif']
			},
			colors: {
				'green-primary': '#0D9748',
				'green-secondary': '#41FB99',
				'green-tertiary': '#9BE931',
				'yellow-primary': '#FBFF48',
				'red-primary': '#DB3A3A',
				'orange-primary': '#FC8507',
				whitish: '#F8F8F8'
			}
		}
	},
	plugins: [],
	safelist: [
		{
			pattern:
				/(bg|text|border)-(green|yellow|red|blue|orange|whitish|gray|black|white|purple|pink|indigo|teal|cyan|lime|emerald|fuchsia|violet|rose)-(primary|secondary|tertiary)/
		}
	]
};
