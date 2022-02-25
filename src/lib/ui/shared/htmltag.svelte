<script lang="ts">
	import type { HtmlTag } from './htmltag.types'
	export let tag: HtmlTag
</script>

{#if tag === 'article'}
	<article {...$$props}><slot /></article>
{:else if tag === 'div'}
	<div {...$$props}><slot /></div>
{:else if tag === 'h1'}
	<h1 {...$$props}><slot /></h1>
{:else if tag === 'h2'}
	<h2 {...$$props}><slot /></h2>
{:else if tag === 'h3'}
	<h3 {...$$props}><slot /></h3>
{:else if tag === 'h4'}
	<h4 {...$$props}><slot /></h4>
{:else if tag === 'h5'}
	<h5 {...$$props}><slot /></h5>
{:else if tag === 'header'}
	<header {...$$props}><slot /></header>
{:else if tag === 'li'}
	<li {...$$props}><slot /></li>
{:else if tag === 'section'}
	<section {...$$props}><slot /></section>
{:else if tag === 'span'}
	<span {...$$props}><slot /></span>
{/if}
