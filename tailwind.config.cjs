const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts,json}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000',
			white: '#fff',
			slate: colors.slate,
			gray: colors.gray,
			neutral: colors.neutral,
			stone: colors.stone,
			zinc: colors.zinc,
			red: colors.red,
			orange: colors.orange,
			amber: colors.amber,
			yellow: colors.yellow,
			lime: colors.lime,
			green: colors.green,
			emerald: colors.emerald,
			teal: colors.teal,
			cyan: colors.cyan,
			sky: colors.sky,
			blue: colors.blue,
			indigo: colors.indigo,
			violet: colors.violet,
			purple: colors.purple,
			fuchsia: colors.fuchsia,
			pink: colors.pink,
			rose: colors.rose,
		},
		extend: {
			transitionProperty: {
				width: 'width',
			},
			typography: {
				DEFAULT: {
					css: {
						'code::before': {
							content: '"',
							display: 'none',
						},
						'code::after': {
							content: '"',
							display: 'none',
						},
					},
				},
			},
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
			screens: {
				print: { raw: 'print' },
			},
			cursor: {
				...defaultTheme.cursor,
				grab: 'grab',
				grabbing: 'grabbing',
			},
			maxHeight: {
				'h-max': 'max-content',
			},
			minWidth: {
				'1/4': '25%',
				'1/2': '50%',
				'3/4': '75%',
				none: 'none',
				xs: '20rem',
				sm: '24rem',
				md: '28rem',
				lg: '32rem',
				xl: '36rem',
				'2xl': '42rem',
				'3xl': '48rem',
				'4xl': '56rem',
				'5xl': '64rem',
				'6xl': '72rem',
				'7xl': '80rem',
				prose: '65ch',
				'screen-sm': '640px',
				'screen-md': '768px',
				'screen-lg': '1024px',
				'screen-xl': '1280px',
				'screen-2xl': '1536px',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
	],
}
