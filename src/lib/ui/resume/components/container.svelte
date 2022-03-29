<script lang="ts">
	import cc from 'classcat'
	import Htmltag from '$lib/ui/shared/htmltag.svelte'
	import type { ContainerType } from './container.types'
	import { getHtmltag } from './container.helpers'

	let className: string
	export let id: string
	export { className as class }
	export let value: string
	export let tag: string
	export let containers: ContainerType[]

	const toDate = (value: string) => {
		const parsedDate = Date.parse(value)

		return isNaN(parsedDate)
			? value
			: new Date(value).toLocaleDateString('en-us', {
					weekday: 'long',
					year: 'numeric',
					month: 'short',
					day: 'numeric',
			  })
	}
</script>

{#if containers}
	<Htmltag
		tag={getHtmltag(tag)}
		class={cc({
			[className]: Boolean(className),
		})}
		{id}
	>
		{#each containers as container}
			<svelte:self
				class={container?.class}
				tag={container?.tag}
				value={container?.value}
				containers={container?.containers}
				id={container?.id}
			/>
		{/each}
	</Htmltag>
{:else if value}
	<Htmltag
		tag={getHtmltag(tag)}
		class={cc({
			[className]: Boolean(className),
		})}
		{id}
	>
		{toDate(value)}
	</Htmltag>
{/if}
