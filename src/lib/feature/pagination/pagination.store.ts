import { writable } from 'svelte/store'
import { get } from '../helpers/store.helper'

interface PaginationStore {
	page: HTMLElement
	translateX: number
	currentPage: number
}

const paginationStore = () => {
	const { subscribe, update, set } = writable<PaginationStore>({
		currentPage: 0,
		page: null,
		translateX: 0,
	})

	const getPageCount = (): number => {
		const pageScrollWidth = get<PaginationStore>(subscribe)?.page?.scrollWidth
		const pageWidth = get<PaginationStore>(subscribe)?.page?.clientWidth
		return isNaN(pageWidth) || isNaN(pageScrollWidth)
			? 1
			: Math.round((pageScrollWidth % 100000) / pageWidth)
	}

	return {
		set,
		subscribe,
		toggle: () =>
			update((s) =>
				s.translateX === 0 ? { ...s, translateX: -4210 } : { ...s, translateX: 0 }
			),
		goToFirst: () => update((s) => ({ ...s, currentPage: 0, translateX: 0 })),
		goToLast: () => update((s) => ({ ...s, currentPage: getPageCount() - 1 })),
		goToNextPage: () =>
			update((s) =>
				s.currentPage < getPageCount() - 1 ? { ...s, currentPage: s.currentPage + 1 } : s
			),
		goToPreviousPage: () =>
			update((s) => (s.currentPage > 0 ? { ...s, currentPage: s.currentPage - 1 } : s)),
		getPageCount: () => getPageCount(),
	}
}

export const pagination = paginationStore()
