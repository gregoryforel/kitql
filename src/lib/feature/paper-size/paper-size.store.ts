import { derived, writable } from 'svelte/store'
import { get } from '../helpers/store.helper'

type PaperSize = 'A4' | 'US Letter'

const paperFormat = {
	A4: { width: '210mm', height: '297mm' },
	'US Letter': { width: '216mm', height: '279mm' },
}

function paperSizeStore(size?: PaperSize) {
	const paperSize = writable<PaperSize>(size || 'A4')
	const { subscribe, update, set } = paperSize

	const width = derived(paperSize, ($paperSize) =>
		$paperSize === 'A4' ? paperFormat['A4'].width : paperFormat['US Letter'].width
	)

	const height = derived(paperSize, ($paperSize) =>
		$paperSize === 'A4' ? paperFormat['A4'].height : paperFormat['US Letter'].height
	)

	return {
		size: get(paperSize.subscribe),
		width,
		height,
		set,
		subscribe,
		changeSize: (size: PaperSize) => update(() => size),
	}
}

export const paperSize = (size?: PaperSize) => paperSizeStore(size)
