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

	import { pagination } from '$lib/feature/pagination/pagination.store'
	import { paperHeight, paperWidth } from '$lib/feature/paper-size/paper-size.store'

	import resume from '../../../resume.json'
	import theme from '../../../theme.json'
	import Container from './components/container.svelte'
	import { buildResumeWithTheme } from './resume'

	const themedResume = buildResumeWithTheme({ resume, theme })
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="flex mx-auto justify-center px-8 py-2 flex-col w-fit gap-8">
	<div class="page bg-white shadow-2xl print:shadow-none">
		<div
			class={cc({
				'page-inner': true,
				[`[column-width:277mm;]`]: true,
				[`[column-gap:100000px;]`]: true,
				[`translate-x-[calc(-100000px-var(--page-width))]`]: $pagination.translateX !== 0,
				[`translate-x-0`]: $pagination.translateX === 0,
			})}
			bind:this={$pagination.page}
			style="--page-width: {$paperWidth}; --page-height: {$paperHeight}"
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
		.page-inner {
			margin: 0mm; /* Browser will apply the correct margins when it prints */
		}
	}
</style>
