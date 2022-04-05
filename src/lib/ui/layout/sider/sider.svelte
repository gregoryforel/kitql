<script lang="ts">
	import ArrowSmLeft from '~icons/heroicons-outline/arrow-sm-left'
	import ArrowSmRight from '~icons/heroicons-outline/arrow-sm-right'
	import cc from 'classcat'

	import { paperSize, type PaperSize } from '$lib/data-access/paper-size/paper-size.store'
	import { pagination } from '$lib/data-access/pagination/pagination.store'

	$: isMonopage = pagination.getPageCount() === 1
	const paperSizeBtnStyleCls = (btnType: PaperSize, paperSize) => {
		return cc({
			paperSizeBtnStyleCls: true,
			'rounded text-base px-2 py-1': true,
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

	// const downloadPdf = async () => {
	// 	const response = await fetch('/api/pdf', { headers: { 'Content-type': 'application/pdf' } })
	// 	const res = await response
	// 	// res.setHeader('Content-Type', 'application/pdf')
	// 	// res.setHeader('Content-Length', data.length)
	// 	// res.setHeader('Content-Disposition', 'attachment; filename=name.Pdf')
	// 	// return res.end(data)
	// 	const blob = await res.blob()
	// 	const newBlob = new Blob([blob])

	// 	const blobUrl = window.URL.createObjectURL(newBlob)

	// 	const link = document.createElement('a')
	// 	link.href = blobUrl
	// 	link.setAttribute('download', `test.pdf`)
	// 	document.body.appendChild(link)
	// 	link.click()
	// 	link.parentNode.removeChild(link)

	// 	// clean up Url
	// 	window.URL.revokeObjectURL(blobUrl)
	// }
	let loading = false

	$: openPdf = async () => {
		loading = true
		const response = await fetch(
			`https://sleekresumepdf.netlify.app/.netlify/functions/meta?format=${$paperSize}`
		)
		const buffer = await response.arrayBuffer()
		loading = false
		const blob = new Blob([buffer], { type: 'application/pdf' })
		const blobURL = URL.createObjectURL(blob)
		window.open(blobURL)
		window.URL.revokeObjectURL(blobURL)
	}
</script>

<sider
	class={cc({
		'app-sider': true,
		'h-full': true,
		'[grid-area:sider] print:hidden': true,
		'bg-slate-400 p-8': true,
		'flex flex-col gap-4': true,
	})}
>
	<section>
		<button class="rounded text-base text-slate-900 px-2 py-1 bg-white" on:click={openPdf}
			>View PDF</button
		>
		<button
			on:click={() => paperSize.changeSize('Letter')}
			class={paperSizeBtnStyleCls('Letter', $paperSize)}
		>
			Letter
		</button>
		<button
			on:click={() => paperSize.changeSize('A4')}
			class={paperSizeBtnStyleCls('A4', $paperSize)}
		>
			A4
		</button>
	</section>
	<section>
		<button on:click={pagination.goToPreviousPage} class={paginationBtnStyleCls}>
			<ArrowSmLeft />
		</button>
		<button on:click={pagination.goToNextPage} class={paginationBtnStyleCls}>
			<ArrowSmRight />
		</button>
	</section>
</sider>
