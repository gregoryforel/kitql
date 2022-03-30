<script lang="ts">
	import type { HtmlTag } from './htmltag.types'
	export let tag: HtmlTag
</script>

{#if tag === 'article'}
	<article {...$$restProps}>
		<slot />
	</article>
{:else if tag === 'div'}
	<div {...$$restProps}><slot /></div>
{:else if tag === 'a'}
	<a {...$$restProps}><slot /></a>
{:else if tag === 'h1'}
	<h1 {...$$restProps}><slot /></h1>
{:else if tag === 'h2'}
	<h2 {...$$restProps}><slot /></h2>
{:else if tag === 'h3'}
	<h3 {...$$restProps}><slot /></h3>
{:else if tag === 'h4'}
	<h4 {...$$restProps}><slot /></h4>
{:else if tag === 'h5'}
	<h5 {...$$restProps}><slot /></h5>
{:else if tag === 'header'}
	<header {...$$restProps}><slot /></header>
{:else if tag === 'li'}
	<li {...$$restProps}>
		<slot />
	</li>
{:else if tag === 'section'}
	<section {...$$restProps}><slot /></section>
{:else if tag === 'span'}
	<span {...$$restProps}><slot /></span>
{:else if tag === 'ul'}
	<ul {...$$restProps}><slot /></ul>
{:else if tag === 'time'}
	<time {...$$restProps}><slot /></time>
{:else}
	<div {...$$restProps}><slot /></div>
{/if}
