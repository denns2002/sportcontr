import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['var(--font-roboto)'],
				montserrat: ['var(--font-montserrat))'],
				notosans: ['var(--font-notosans)'],
				onest: ['var(--font-onest)'],
			},
			colors: {
				primary: 'var(--primary-color)',
				hover: 'var(--hover-color)',
				active: 'var(--active-color)',
				background: 'var(--background-color)',
				error: 'var(--error-color)',
				warning: 'var(--warning-color)',
			},
		},
	},
	plugins: [],
}
export default config
