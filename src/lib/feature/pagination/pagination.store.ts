import { writable } from 'svelte/store'

function paginationStore() {
	const { subscribe, update, set } = writable<{ translateX }>({ translateX: 0 })

	let pageInner

	function calculatePagination() {
		console.log('pageInner width', pageInner.clientWidth)
		console.log('pageInner scrollWidth', pageInner.scrollWidth)
	}

	return {
		calculatePagination,
		pageInner,
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
