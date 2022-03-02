import { derived, writable } from 'svelte/store'

type PaperSize = 'A4' | 'US Letter'

const paperFormat = {
	A4: { width: '210mm', height: '297mm' },
	'US Letter': { width: '216mm', height: '279mm' },
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

export const width = derived(paperSize, ($paperSize) =>
	$paperSize === 'A4' ? paperFormat['A4'].width : paperFormat['US Letter'].width
)

export const height = derived(paperSize, ($paperSize) =>
	$paperSize === 'A4' ? paperFormat['A4'].height : paperFormat['US Letter'].height
)
