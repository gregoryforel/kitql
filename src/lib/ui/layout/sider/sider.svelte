<script lang="ts">
	import ArrowSmLeft from '~icons/heroicons-outline/arrow-sm-left'
	import ArrowSmRight from '~icons/heroicons-outline/arrow-sm-right'
	import cc from 'classcat'
	import streamSaver from 'streamsaver'

	import { paperSize, type PaperSize } from '$lib/data-access/paper-size/paper-size.store'
	import { pagination } from '$lib/data-access/pagination/pagination.store'

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

	const downloadPdf = async () => {
		const response = await fetch('/api/pdf')
		const res = await response

		const fileStream = streamSaver.createWriteStream(`test.pdf`)
		const writer = fileStream.getWriter()

		const reader = res.body.getReader()

		const pump = () =>
			reader.read().then(({ value, done }) => {
				if (done) writer.close()
				else {
					writer.write(value)
					return writer.ready.then(pump)
				}
			})

		await pump()
			.then(() => console.log('Closed the stream, Done writing'))
			.catch((err) => console.log(err))

		// const blob = await res.blob()
		// const newBlob = new Blob([blob])

		// const blobUrl = window.URL.createObjectURL(newBlob)

		// const link = document.createElement('a')
		// link.href = blobUrl
		// link.setAttribute('download', `test.pdf`)
		// document.body.appendChild(link)
		// link.click()
		// link.parentNode.removeChild(link)

		// // clean up Url
		// window.URL.revokeObjectURL(blobUrl)
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
		<button on:click={downloadPdf} type="submit">Download PDF</button>
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
		<button on:click={pagination.goToPreviousPage} class={paginationBtnStyleCls}>
			<ArrowSmLeft />
		</button>
		<button on:click={pagination.goToNextPage} class={paginationBtnStyleCls}>
			<ArrowSmRight />
		</button>
	</section>
</sider>
