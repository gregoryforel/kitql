<script lang="ts">
	import cc from 'classcat'

	let className: string
	export { className as class }
</script>

<div
	class={cc({
		'cv-section': true,
		grid: true,
		[className]: Boolean(className),
	})}
>
	<slot />
</div>
