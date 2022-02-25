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
	const isArray = resumeKey
		? Array.isArray(JSONPath({ path: resumeKey, json: resume })[0])
		: false
</script>

<!-- <span class="text-xs bg-blue-100 w-fit flex">{tag}|{resumeKey}|{isArray}</span> -->

{#if isArray}
	{#each JSONPath({ path: resumeKey, json: resume })[0] as stuf}
		<!-- <pre>{JSON.stringify(stuf, null, 2)}</pre> -->
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
					/>
				{/each}
			{:else if resumeKey}
				<Htmltag tag={htmltag}>{JSONPath({ path: resumeKey, json: resume })}</Htmltag>
			{/if}
		</Htmltag>
	{/each}
	<!-- {JSONPath({ path: resumeKey, json: resume })[0].map(tag => )} -->
	<!-- {#each JSONPath({ path: resumeKey, json: resume })[0] as stuf}
		<pre>{JSON.stringify(stuf, null, 2)}</pre>
	{/each} -->
{:else}
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
				/>
			{/each}
		{:else if resumeKey}
			<Htmltag tag={htmltag}>{JSONPath({ path: resumeKey, json: resume })}</Htmltag>
		{/if}
	</Htmltag>
{/if}
