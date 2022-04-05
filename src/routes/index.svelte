<script context="module" lang="ts">
	export const prerender = true
</script>

<script lang="ts">
	import Resume from '$lib/ui/resume/resume.svelte'

	const data = fetch(
		'https://624b2ab96e2a700f6745cd02--sleekresumepdf.netlify.app/.netlify/functions/meta'
	)
	console.log('data', data)
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Resume />

<style>
</style>
