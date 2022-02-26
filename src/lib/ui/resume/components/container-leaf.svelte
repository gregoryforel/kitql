<script lang="ts">
	import Htmltag from '$lib/ui/shared/htmltag.svelte'
	import { JSONPath } from 'jsonpath-plus'
	import { getHtmltag } from './container.helpers'
	import resume from '../../../../resume.json'

	export let resumeKey: string
	export let tag: string = null
</script>

<Htmltag tag={getHtmltag(tag)}>{JSONPath({ path: resumeKey, json: resume })}</Htmltag>
