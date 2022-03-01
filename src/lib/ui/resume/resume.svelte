<script context="module">
	import { browser, dev } from '$app/env'
	// import { nhost } from '$lib/util/nhost'
	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true
</script>

<script lang="ts">
	import IconMail from '~icons/mdi/email'
	import IconMapMarker from '~icons/mdi/map-marker'
	import IconPhone from '~icons/mdi/phone'
	import resume from '../../../resume.json'
	import theme from '../../../theme.json'
	import Container from './components/container.svelte'
	import { buildResumeWithTheme } from './resume'

	// let resumes
	// ;(async () => {
	// 	try {
	// 		resumes = await nhost.graphql.request(
	// 			`
	//             {
	//                 resumes_by_pk(id: "fa69f955-ceab-4072-9e75-d25a07f27312") {
	//                     __typename
	//                     id
	//                     data
	//                 }
	//             }
	//         `
	// 		)
	// 	} catch (error) {
	// 		console.log('error', error)
	// 	}
	// })()
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="flex justify-center p-8">
	<div class="actualpage bg-white">
		<div class="page">
			<!-- <pre>{JSON.stringify(buildResumeWithTheme({ resume, theme }).containers, null, 2)}</pre> -->
			{#each buildResumeWithTheme({ resume, theme }).containers as container}
				<Container
					class={container.class}
					tag={container.tag}
					value={container.value}
					containers={container.containers}
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	/* @media all { */ /* I like using these */
	/* div.actualpage {
		min-height: 297mm;
		height: 297mm;
		min-width: 210mm;
		width: 210mm;
	} */
	div.page {
		/* margin: 0;  you don't really have to explicitly set it to 0 unless it's already set to something else */
	}

	@media screen {
		.page {
			min-height: 297mm;
			height: 297mm;
			min-width: 210mm;
			width: 210mm;
			margin: 10mm 10mm 10mm 10mm; /* printers usually have a bigger bottom margin*/
		}
	}

	@media print {
		div.page {
			margin: 0mm; /* Browser will apply the correct margins when it prints */
		}
	}
</style>
