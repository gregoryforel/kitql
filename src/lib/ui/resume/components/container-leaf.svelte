<script lang="ts">
	import Htmltag from '$lib/ui/shared/htmltag.svelte'
	import { getHtmltag } from './container.helpers'

	export let value: string
	export let tag: string = null
</script>

<Htmltag tag={getHtmltag(tag)}>{value}</Htmltag>
