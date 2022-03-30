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

	import { pagination } from '$lib/data-access/pagination/pagination.store'
	import { paperHeightMm, paperWidthMm } from '$lib/data-access/paper-size/paper-size.store'

	import { resume } from '../../../resume'
	import { theme } from '../../../theme'
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
				translate: $pagination.currentPage > 0,
				[`translate-x-0`]: $pagination.currentPage === 0,
			})}
			style="--page-width: {$paperWidthMm}; --page-height: {$paperHeightMm}; --current-page: {$pagination.currentPage}"
			bind:this={$pagination.page}
		>
			<Container
				attributes={themedResume.attributes}
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
		.translate {
			transform: translateX(
				calc(
					-1 * (var(--current-page) * 100000px) - var(--current-page) * var(--page-width)
				)
			);
		}
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

		/* https://stackoverflow.com/questions/11604726/embed-font-face-fonts-when-printing-to-pdf-with-chrome */
	}
</style>
