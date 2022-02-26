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
	const isArray = resumeKey
		? Array.isArray(JSONPath({ path: resumeKey, json: resume })[0])
		: false
	const getHtmltag = (tag: string): HtmlTag => {
		return tag as unknown as HtmlTag
	}
</script>

{#if isArray}
	{#each JSONPath({ path: resumeKey, json: resume })[0] as _, index}
		<Htmltag
			tag={getHtmltag(tag)}
			class={cc({
				[className]: Boolean(className),
			})}
		>
			<!-- <pre>{JSON.stringify(
					containers.map((c) => ({ ...c, containers: null })),
					null,
					2
				)}</pre> -->
			{#each containers as container, i2}
				<!-- <div class="w-72 flex justify-between bg-yellow-100">
					<pre class="inline text-red-500">{getHtmltag(container.tag)}</pre>
					<pre class="inline">{container.class.split(' ')[0]}</pre>
				</div> -->
				<Htmltag
					tag={getHtmltag(container.tag)}
					class={cc({
						[container.class]: Boolean(container.class),
					})}
				>
					<!-- {container.class}
					{container.resumeKey}
					{container?.resumeKey?.replace('{{index}}', i2.toString())}
					{container.tag}
					{container.containers?.length}
					{i2} -->
					<svelte:self
						class={container?.class}
						tag={getHtmltag(container.tag)}
						resumeKey={container?.resumeKey?.replace('{{index}}', i2.toString())}
						containers={container?.containers}
					/>
					<div>Fc</div>
				</Htmltag>
			{/each}
			<!-- {#each containers as container}
				<Htmltag
					tag={getHtmltag(container.tag)}
					class={cc({
						[container.class]: Boolean(container.class),
					})}>{container.class}</Htmltag
				>
			{/each} -->
			<!-- <Htmltag
				tag={htmltag}
				class={cc({
					
					[className]: Boolean(className),
				})}
			>
				<pre>{JSON.stringify(containers, null, 2)}</pre>
			</Htmltag> -->
		</Htmltag>
	{/each}
{:else}
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
					resumeKey={container?.resumeKey?.replace('{{index}}', index.toString())}
					containers={container?.containers}
				/>
			{/each}
		{:else if resumeKey}
			<Htmltag tag={getHtmltag(tag)}>{JSONPath({ path: resumeKey, json: resume })}</Htmltag>
		{/if}
	</Htmltag>
{/if}
