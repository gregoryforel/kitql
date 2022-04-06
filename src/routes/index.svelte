<script context="module" lang="ts">
	import { browser, dev } from '$app/env'
	import { KQL_GetResumeById } from '$lib/data-access/graphql/_kitql/graphqlStores'

	const id = 'fa69f955-ceab-4072-9e75-d25a07f27312'
	// const id = 'ZmlsbXM6MQ=='

	// import { nhost } from '$lib/util/nhost'
	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser
	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true
	export async function load({ fetch }) {
		await KQL_GetResumeById.queryLoad({
			fetch,
			variables: { id },
		}) // Filling the store
		return {}
	}
</script>

<script lang="ts">
	import { KitQLInfo } from '@kitql/all-in'
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Test pulling data from https://swapi-graphql.netlify.app/.netlify/functions/index</h1>
<br />
<KitQLInfo store={KQL_GetResumeById} />
<pre>{JSON.stringify($KQL_GetResumeById.data, null, 2)}</pre>
