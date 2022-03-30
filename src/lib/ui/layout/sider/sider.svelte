<script lang="ts">
	import ArrowSmLeft from '~icons/heroicons-outline/arrow-sm-left'
	import ArrowSmRight from '~icons/heroicons-outline/arrow-sm-right'
	import cc from 'classcat'

	import { pagination } from '$lib/feature/pagination/pagination.store'
	import { paperSize, type PaperSize } from '$lib/feature/paper-size/paper-size.store'

	$: isMonopage = pagination.getPageCount() === 1
	const paperSizeBtnStyleCls = (btnType: PaperSize, paperSize) => {
		return cc({
			paperSizeBtnStyleCls: true,
			'rounded text-base text-slate-900 px-2 py-1': true,
			'bg-white text-slate-900': paperSize !== btnType,
			'bg-slate-800 text-white': paperSize === btnType,
		})
	}
	const paginationBtnStyleCls = cc({
		paginationBtnSizeCls: true,
		'rounded text-base px-2 py-1': true,
		'bg-white text-slate-900': !isMonopage,
		'cursor-not-allowed': isMonopage,
		'bg-slate-300 text-slate-500': isMonopage,
	})
</script>

<sider
	class={cc({
		'app-sider': true,
		'fixed h-full': true,
		'[grid-area:sider] print:hidden': true,
		'bg-slate-400 p-8': true,
		'flex flex-col gap-4': true,
	})}
>
	<section>
		<button
			on:click={() => paperSize.changeSize('US Letter')}
			class={paperSizeBtnStyleCls('US Letter', $paperSize)}
		>
			US Letter
		</button>
		<button
			on:click={() => paperSize.changeSize('A4')}
			class={paperSizeBtnStyleCls('A4', $paperSize)}
		>
			A4
		</button>
	</section>
	<section>
		<button
			on:click={pagination.goToPreviousPage}
			class={paginationBtnStyleCls}
			disabled={isMonopage}
		>
			<ArrowSmLeft />
		</button>
		<button
			on:click={pagination.goToNextPage}
			class={paginationBtnStyleCls}
			disabled={isMonopage}
		>
			<ArrowSmRight />
		</button>
	</section>
</sider>
