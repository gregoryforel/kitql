<script lang="ts">
	import { pagination } from '$lib/feature/pagination/pagination.store'
	import { paperSize } from '$lib/feature/paper-size/paper-size.store'

	import cc from 'classcat'
</script>

<sider
	class={cc({
		'app-sider': true,
		'[grid-area:sider] print:hidden': true,
		'bg-slate-400 p-8': true,
	})}
>
	<button on:click={pagination.toggle} class="bg-white rounded text-base text-slate-900 px-2 py-1"
		>Toggle</button
	>
	<button
		on:click={() => paperSize.changeSize('US Letter')}
		class="bg-white rounded text-base text-slate-900 px-2 py-1">Toggle</button
	>
</sider>
