import { writable } from 'svelte/store'

function paginationStore() {
	const { subscribe, update, set } = writable<number>(0)

	return {
		set,
		subscribe,
		toggle: () => update((s) => (s === 0 ? -4210 : 0)),
		nextPage: () => update((s) => s - 4210),
	}
}

export const pagination = paginationStore()
