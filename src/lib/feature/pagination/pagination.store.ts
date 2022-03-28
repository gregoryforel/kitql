import { writable } from 'svelte/store'
import { get } from '../helpers/store.helper'

interface PaginationStore {
	page: HTMLElement
	translateX: number
}

function paginationStore() {
	const { subscribe, update, set } = writable<PaginationStore>({
		page: null,
		translateX: 0,
	})

	function calculatePagination() {
		const pageScrollWidth = get(subscribe).page.scrollWidth
		const pageWidth = get<PaginationStore>(subscribe).page.clientWidth
		console.log('page width', pageWidth)
		console.log('page scrollWidth', pageScrollWidth)
		console.log(Math.round((pageScrollWidth % 100000) / pageWidth))
	}

	const getMaxPageCount = (): number => {
		const pageScrollWidth = get(subscribe).page.scrollWidth
		const pageWidth = get<PaginationStore>(subscribe).page.clientWidth
		return Math.round((pageScrollWidth % 100000) / pageWidth)
	}

	return {
		calculatePagination,
		set,
		subscribe,
		toggle: () =>
			update((s) =>
				s.translateX === 0 ? { ...s, translateX: -4210 } : { ...s, translateX: 0 }
			),
		goToFirst: () => update((s) => ({ ...s, translateX: 0 })),
		goToLast: () =>
			update((s) => ({ ...s, translateX: s.translateX - 4210 * (getMaxPageCount() - 1) })),
		nextPage: () =>
			update((s) => {
				return s.translateX - 4210 < s.translateX - 4210 * (getMaxPageCount() - 1)
					? { ...s, translateX: s.translateX - 4210 }
					: s
			}),
		previousPage: () => {
			return update((s) =>
				s.translateX === 0 ? s : { ...s, translateX: s.translateX + 4210 }
			)
		},
	}
}

export const pagination = paginationStore()
