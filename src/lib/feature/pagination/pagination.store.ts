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
		console.log('page width', get<PaginationStore>(subscribe).page.clientWidth)
		console.log('page scrollWidth', get(subscribe).page.scrollWidth)
	}

	return {
		calculatePagination,
		set,
		subscribe,
		toggle: () =>
			update((s) =>
				s.translateX === 0 ? { ...s, translateX: -4210 } : { ...s, translateX: 0 }
			),
		nextPage: () => update((s) => ({ ...s, translateX: s.translateX - 4210 })),
	}
}

export const pagination = paginationStore()
