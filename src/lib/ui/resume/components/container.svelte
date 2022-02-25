<script lang="ts">
	import cc from 'classcat'
	import { JSONPath } from 'jsonpath-plus'

	import resume from '../../../../resume.json'
	import type { ContainerType } from './container.types'

	let className: string
	export { className as class }
	export let resumeKey: string
	export let htmlTag: string
	export let containers: ContainerType[]
</script>

<div
	class={cc({
		container: true,
		[className]: Boolean(className),
	})}
>
	{#if containers}
		{#each containers as container, index}
			<svelte:self
				class={container?.class}
				htmlTag={container?.htmlTag}
				resumeKey={container?.resumeKey?.replace('{{index}}', index.toString())}
				containers={container?.containers}
			/>
		{/each}
	{:else if resumeKey}
		<div>{JSONPath({ path: resumeKey, json: resume })}</div>
		<div class="text-sm">{resumeKey}</div>
	{/if}
</div>
