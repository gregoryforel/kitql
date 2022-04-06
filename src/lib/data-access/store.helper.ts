import type { Readable } from 'svelte/store'

// https://github.com/sveltejs/svelte/issues/2060
// How to get the value of a store.
export function get<T>(subscribe: Readable<T>['subscribe']) {
	let $val: T
	subscribe(($) => ($val = $))()
	return $val
}
