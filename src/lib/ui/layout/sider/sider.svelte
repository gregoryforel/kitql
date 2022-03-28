<script lang="ts">
	import cc from 'classcat'

	import { pagination } from '$lib/feature/pagination/pagination.store'
	import { paperSize, type PaperSize } from '$lib/feature/paper-size/paper-size.store'

	const btnStyleCls = (btnType: PaperSize, paperSize) => {
		return cc({
			btnSizeCls: true,
			'rounded text-base text-slate-900 px-2 py-1': true,
			'bg-white text-slate-900': paperSize !== btnType,
			'bg-slate-700 text-white': paperSize === btnType,
		})
	}
</script>

<sider
	class={cc({
		'app-sider': true,
		'fixed h-full': true,
		'[grid-area:sider] print:hidden': true,
		'bg-slate-400 p-8': true,
	})}
>
	<button
		on:click={pagination.toggle}
		class="bg-white rounded text-base text-slate-900 px-2 py-1"
	>
		Toggle
	</button>
	<!-- {currentPaperSize.subscribe} -->
	<button
		on:click={() => paperSize.changeSize('US Letter')}
		class={btnStyleCls('US Letter', $paperSize)}
	>
		US Letter
	</button>
	<button on:click={() => paperSize.changeSize('A4')} class={btnStyleCls('A4', $paperSize)}>
		A4
	</button>
</sider>
