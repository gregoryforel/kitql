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
	import cc from 'classcat'
	import { onMount } from 'svelte'

	import resume from '../../../resume.json'
	import theme from '../../../theme.json'
	import Container from './components/container.svelte'
	import { buildResumeWithTheme } from './resume'

	let pageInner
	let pageSize: 'A4' | 'US Letter' = 'A4'
	let pageWidth = pageSize === 'A4' ? '210mm' : '216mm'
	let pageHeight = pageSize === 'A4' ? '297mm' : '279mm'

	onMount(() => {
		calculatePagination()
	})

	function calculatePagination() {
		console.log('pageInner width', pageInner.clientWidth)
		console.log('pageInner scrollWidth', pageInner.scrollWidth)
	}

	export let transfer = 0
	function toggle() {
		transfer = transfer === 0 ? -4210 : 0
	}

	const themedResume = buildResumeWithTheme({ resume, theme })
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="flex mx-auto justify-center p-8 flex-col w-fit gap-8">
	<div class="page bg-white shadow-2xl print:shadow-none">
		<div
			class={cc({
				'page-inner': true,
				// [`[column-count:${10};]`]: true,
				[`[column-width:277mm;]`]: true,
				[`[column-gap:100000px;]`]: true,
				a: transfer !== 0,
				// a: transfer !== 0,
				b: transfer === 0,
			})}
			bind:this={pageInner}
			style="--page-width: {pageWidth}; --page-height: {pageHeight}"
		>
			<Container
				class={themedResume.class}
				id={themedResume.id}
				tag={themedResume.tag}
				value={themedResume.value}
				containers={themedResume.containers}
			/>
		</div>
	</div>
</div>

<style>
	/* :root {
		--page-width: 210mm;
	} */
	/* @media all { */ /* I like using these */
	/* div.actualpage {
		min-height: 297mm;
		height: 297mm;
		min-width: 210mm;
		width: 210mm;
	} */
	.page-inner {
		/* column-width: 277mm;
		column-gap: 100000px; */
		/* margin: 0;  you don't really have to explicitly set it to 0 unless it's already set to something else */
	}

	.a {
		transform: translateX(calc(-100000px - var(--page-width)));
	}

	.b {
		transform: translateX(0mm);
	}

	@media screen {
		.page-inner {
			min-height: var(--page-height);
			height: var(--page-height);
			min-width: var(--page-width);
			width: var(--page-width);
			margin: 10mm 10mm 10mm 10mm; /* printers usually have a bigger bottom margin*/
		}
	}

	@media print {
		div.page-inner {
			margin: 0mm; /* Browser will apply the correct margins when it prints */
		}
	}
</style>
