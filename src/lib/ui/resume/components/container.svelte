<script lang="ts">
	import cc from 'classcat'
	import { JSONPath } from 'jsonpath-plus'

	import type { HtmlTag } from '$lib/ui/shared/htmltag.types'
	import Htmltag from '$lib/ui/shared/htmltag.svelte'
	import resume from '../../../../resume.json'

	import type { ContainerType } from './container.types'

	let className: string
	export { className as class }
	export let resumeKey: string
	export let tag: string
	export let containers: ContainerType[]
	const htmltag: HtmlTag = tag as unknown as HtmlTag
</script>

<Htmltag
	tag={htmltag}
	class={cc({
		container: true,
		[className]: Boolean(className),
	})}
>
	{#if containers}
		{#each containers as container, index}
			<svelte:self
				class={container?.class}
				tag={container?.tag}
				resumeKey={container?.resumeKey?.replace('{{index}}', index.toString())}
				containers={container?.containers}
			/>|{htmltag}
		{/each}
	{:else if resumeKey}
		<Htmltag tag={htmltag}>{JSONPath({ path: resumeKey, json: resume })}</Htmltag>
		<div class="text-sm">{resumeKey}</div>
	{/if}
</Htmltag>
