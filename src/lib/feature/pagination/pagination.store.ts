import { writable, type Readable } from 'svelte/store'

interface PaginationStore {
	page: HTMLElement
	translateX: number
}

function paginationStore() {
	const { subscribe, update, set } = writable<PaginationStore>({
		page: null,
		translateX: 0,
	})

	// https://github.com/sveltejs/svelte/issues/2060
	// How to get the value of a store.
	function get__store<T>(subscribe: Readable<T>['subscribe']) {
		let $val: T
		subscribe(($) => ($val = $))()
		return $val
	}

	function calculatePagination() {
		console.log('page width', get__store<PaginationStore>(subscribe).page.clientWidth)
		console.log('page scrollWidth', get__store(subscribe).page.scrollWidth)
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
