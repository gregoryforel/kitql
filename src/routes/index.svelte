<script context="module" lang="ts">
	export const prerender = true
</script>

<script lang="ts">
    import cc from 'classcat'
	import Resume from '$lib/ui/resume/resume.svelte'
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Resume />

<!-- fake div to pre-load tailwind styles -->
<div class={cc({
    'invisible': true,
    'flex flex-col':true,
    'grid': true,
    'block': true,
    'inline-block': true
})}/>

<style>
</style>
