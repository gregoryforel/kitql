<script context="module" lang="ts">
	import { browser, dev } from '$app/env'
	import {
		KQL_GetResumeById,
		KQL_UpdateResumeData,
	} from '$lib/data-access/graphql/_kitql/graphqlStores'

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
		const id = 'fa69f955-ceab-4072-9e75-d25a07f27312'

		await KQL_GetResumeById.queryLoad({
			fetch,
			variables: { id },
		}) // Filling the store
		return {}
	}
</script>

<script lang="ts">
	// import { KitQLInfo } from '@kitql/all-in'
	import Resume from '$lib/ui/resume/resume.svelte'

	const fill = () =>
		KQL_UpdateResumeData.mutate({
			fetch,
			variables: { id: 'fa69f955-ceab-4072-9e75-d25a07f27312', data: null },
		})
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<button on:click={fill}>Fill CV</button>
<Resume resume={$KQL_GetResumeById.data.resumes_by_pk.data} />

<style>
</style>
