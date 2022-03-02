<script lang="ts">
	import cc from 'classcat'
</script>

<sider
	class={cc({
		'app-sider': true,
		'[grid-area:sider] print:hidden': true,
		'bg-slate-400 p-8': true,
	})}
>
	<button on:click={null} class="bg-white rounded text-base text-slate-900 px-2 py-1"
		>Toggle</button
	>
</sider>
