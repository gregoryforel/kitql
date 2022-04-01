<script lang="ts">
	import { onMount } from 'svelte'

	import Resume from '$lib/ui/resume/resume.svelte'

	onMount(async () => {
		const originalContents = document.body.innerHTML
		const printReport = document.getElementById('my-cv').innerHTML
		document.body.innerHTML = printReport
		window.print()
		document.body.innerHTML = originalContents
	})
</script>

<Resume />
