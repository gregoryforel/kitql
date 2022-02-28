<script context="module">
	import { browser, dev } from '$app/env'

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

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="actualpage bg-white">
	<div class="page print:none">
		<h1>Resume</h1>
	</div>
</div>

<style>
	/* @media all { */ /* I like using these */
	div.actualpage {
		height: 297mm; /* DIN A4 standard paper size */
		width: 210mm;
	}
	div.page {
		/* margin: 0;  you don't really have to explicitly set it to 0 unless it's already set to something else */
	}
	/* } */

	@media screen {
		div.page {
			margin: 5mm 5mm 5mm 10mm; /* printers usually have a bigger bottom margin*/
		}
	}

	@media print {
		div.page {
			margin: 0mm; /* Browser will apply the correct margins when it prints */
		}
	}
</style>
