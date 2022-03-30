<script lang="ts">
	import cc from 'classcat'
	import dayjs from 'dayjs'

	import Htmltag from '$lib/ui/shared/htmltag.svelte'

	import type { ContainerType } from './container.types'
	import { getHtmltag } from './container.helpers'

	let className: string
	export let id: string
	export { className as class }
	export let value: string
	export let tag: string
	export let containers: ContainerType[]
	export let attributes: ContainerType['attributes']

	const toDate = (value: string) => {
		return dayjs(value).format('MMM. YYYY')
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
				attributes={container?.attributes}
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
		datetime={dayjs(value).isValid() ? value : undefined}
		href={attributes?.href ? attributes.href : undefined}
		{...attributes}
	>
		{#if dayjs(value).isValid()}
			{toDate(value)}
		{:else}
			{value}
		{/if}
	</Htmltag>
{/if}
