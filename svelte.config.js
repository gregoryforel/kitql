// https://github.com/sveltejs/language-tools/issues/1228
import adapter from '@sveltejs/adapter-netlify'
import path from 'path'
import preprocess from 'svelte-preprocess'
import Icons from 'unplugin-icons/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true, // <- Set this to enable PostCSS
		}),
	],

	kit: {
		adapter: adapter(),
		vite: () => {
			return {
				build: {
					rollupOptions: {
						external: ['chrome-aws-lambda', 'playwright-aws-lambda'],
						// makeAbsoluteExternalsRelative: 'ifRelativeSource'
					},
				},
				optimizeDeps: {
					include: ['broadcast-channel'],
				},
				plugins: [
					Icons({
						compiler: 'svelte',
					}),
				],
				resolve: {
					alias: {
						$utils: path.resolve('./src/utils'),
						$routes: path.resolve('./src/routes'),
					},
				},
			}
		},
		// prerender: {
		// 	enabled: true,
		// 	onError: (e) => console.log(e),
		// },
	},
}

export default config
