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
	import cc from 'classcat'
	import IconMail from '~icons/mdi/email'
	import IconMapMarker from '~icons/mdi/map-marker'
	import IconPhone from '~icons/mdi/phone'
	import resume from '../../../resume.json'
	import theme from '../../../theme.json'
	import Container from './components/container.svelte'
	import { buildResumeWithTheme } from './resume'

	import { onMount } from 'svelte'
	let b

	// define what element should be observed by the observer
	// and what types of mutations trigger the callback

	onMount(() => {
		measure()
		let observer = new MutationObserver(function (mutations, observer) {
			// fired when a mutation occurs
			// console.log('obs', mutations, observer)
			// console.log('obs', mutations[0].target.getBoundingClientRect().bottom)
			// ...
			mutations.forEach(function (mutation) {
				// console.log(mutation)
				// console.log(mutation.target.parentNode.getBoundingClientRect().bottom)
			})
		})
		observer.observe(document, {
			attributes: true,
			characterData: true,
			childList: true,
			subtree: true,
			attributeOldValue: true,
			characterDataOldValue: true,
		})
	})

	function measure() {
		let box = document.querySelectorAll('h2')
		// let width = box.clientWidth
		// let height = box.clientHeight
		// console.log(box[0].getBoundingClientRect().top)
		b = box[0].getBoundingClientRect()
	}

	let transfer = 0
	function toggle() {
		transfer = transfer === 0 ? -4210 : 0
	}
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
	const themedResume = buildResumeWithTheme({ resume, theme })
	console.log(themedResume?.containers && themedResume?.containers[0])
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="flex mx-auto justify-center p-8 flex-col w-fit gap-8">
	<button on:click={toggle} class="bg-white rounded text-base text-gray-900">Toggle</button>
	<div class="page bg-white shadow-2xl print:shadow-none">
		<div
			class={cc({
				'page-inner': true,
				a: transfer !== 0,
				b: transfer === 0,
			})}
		>
			{#each themedResume.containers as container}
				<Container
					class={container.class}
					id={container.id}
					tag={container.tag}
					value={container.value}
					containers={container.containers}
				/>
			{/each}
			{#each themedResume.containers as container}
				<Container
					class={container.class}
					id={container.id}
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
	.page-inner {
		column-count: 2;
		column-width: 277mm;
		column-gap: 4000mm;
		/* margin: 0;  you don't really have to explicitly set it to 0 unless it's already set to something else */
	}

	.a {
		transform: translateX(-4210mm);
	}

	.b {
		transform: translateX(0mm);
	}

	@media screen {
		.page-inner {
			min-height: 297mm;
			height: 297mm;
			min-width: 210mm;
			width: 210mm;
			margin: 10mm 10mm 10mm 10mm; /* printers usually have a bigger bottom margin*/
		}
	}

	@media print {
		div.page-inner {
			margin: 0mm; /* Browser will apply the correct margins when it prints */
		}
	}

	HTML CSS JSResult Skip Results Iframe EDIT ON .grow-wrap {
		/* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
		display: grid;
	}
	.grow-wrap::after {
		/* Note the weird space! Needed to preventy jumpy behavior */
		content: attr(data-replicated-value) ' ';

		/* This is how textarea text behaves */
		white-space: pre-wrap;

		/* Hidden from view, clicks, and screen readers */
		visibility: hidden;
	}
	.grow-wrap > textarea {
		/* You could leave this, but after a user resizes, then it ruins the auto sizing */
		resize: none;

		/* Firefox shows scrollbar on growth, you can hide like this. */
		overflow: hidden;
	}
	.grow-wrap > textarea,
	.grow-wrap::after {
		/* Identical styling required!! */
		border: 1px solid black;
		padding: 0.5rem;
		font: inherit;

		/* Place on top of each other */
		grid-area: 1 / 1 / 2 / 2;
	}

	body {
		margin: 2rem;
		font: 1rem/1.4 system-ui, sans-serif;
	}

	label {
		display: block;
	}
</style>
