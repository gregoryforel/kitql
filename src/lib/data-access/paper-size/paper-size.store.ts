import { derived, writable } from 'svelte/store'

export type PaperSize = 'A4' | 'Letter'

const paperFormat = {
	A4: { width: 210, height: 297 },
	Letter: { width: 216, height: 279 },
}

function paperSizeStore() {
	const paperSize = writable<PaperSize>('A4')
	const { subscribe, set } = paperSize

	return {
		subscribe,
		changeSize: (size: PaperSize) => set(size),
	}
}

export const paperSize = paperSizeStore()

export const paperWidth = derived(paperSize, ($paperSize) =>
	$paperSize === 'A4' ? paperFormat['A4'].width : paperFormat['Letter'].width
)

export const paperHeight = derived(paperSize, ($paperSize) =>
	$paperSize === 'A4' ? paperFormat['A4'].height : paperFormat['Letter'].height
)

export const paperWidthMm = derived(
	paperSize,
	($paperSize) =>
		`${$paperSize === 'A4' ? paperFormat['A4'].width : paperFormat['Letter'].width}mm`
)

export const paperHeightMm = derived(
	paperSize,
	($paperSize) =>
		`${$paperSize === 'A4' ? paperFormat['A4'].height : paperFormat['Letter'].height}mm`
)
