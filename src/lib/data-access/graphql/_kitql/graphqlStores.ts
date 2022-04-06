import { browser } from '$app/env';
import { defaultStoreValue, RequestStatus, ResponseResultType, type PatchType, type RequestParameters, type RequestQueryParameters, type RequestResult } from '@kitql/client';
import { get, writable } from 'svelte/store';
import { kitQLClient } from '../kitQLClient';
 
/**
 * Init KitQL (to have clientStarted = true!)
 *
 * Waiting for: https://github.com/sveltejs/kit/issues/4447
 */
export function KQL__Init() {}
 
/* Internal. To skip await on a client side navigation in the load function (from queryLoad)! */
let clientStarted = false; // Will be true on a client side navigation
if (browser) {
	addEventListener('sveltekit:start', () => {
		clientStarted = true;
	});
}
 
/**
 * ResetAllCaches in One function!
 */
export function KQL__ResetAllCaches() {
}
 
/* Operations 👇 */
function KQL_ModifyCvStore() {
	const operationName = 'KQL_ModifyCv';
	const operationType = ResponseResultType.Mutation;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<ModifyCvMutation, ModifyCvMutationVariables>>({...defaultStoreValue, operationName, operationType});

		async function mutateLocal(
			params?: RequestParameters<ModifyCvMutationVariables>
		): Promise<RequestResult<ModifyCvMutation, ModifyCvMutationVariables>> {
			let { fetch, variables } = params ?? {};

			const storedVariables = get(KQL_ModifyCv).variables;
			variables = variables ?? storedVariables;

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<ModifyCvMutation, ModifyCvMutationVariables>({
				skFetch: fetch,
				document: ModifyCvDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		mutate: mutateLocal,

	};
}
/**
 * KitQL Svelte Store with the latest `ModifyCv` Operation
 */
export const KQL_ModifyCv = KQL_ModifyCvStore();
