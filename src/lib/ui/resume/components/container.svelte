<script lang="ts">
	import cc from 'classcat'
	import Htmltag from '$lib/ui/shared/htmltag.svelte'

	import type { ContainerType } from './container.types'
	import { getHtmltag } from './container.helpers'
	import ContainerLeaf from './container-leaf.svelte'

	let className: string
	export { className as class }
	export let value: string
	export let tag: string
	export let containers: ContainerType[]
</script>

<Htmltag
	tag={getHtmltag(tag)}
	class={cc({
		[className]: Boolean(className),
	})}
>
	{#if containers}
		{#each containers as container, index}
			<svelte:self
				class={container?.class}
				tag={container?.tag}
				value={container?.value}
				containers={container?.containers}
			/>
		{/each}
	{:else if value}
		<ContainerLeaf {value} {tag} />
	{/if}
</Htmltag>
