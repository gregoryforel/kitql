<script lang="ts">
	import Sider from '$lib/ui/layout/sider/sider.svelte'

	import '../app.css'
</script>

<div class={`app bg-slate-200 grid w-full [grid-template-areas:'sider_content']`}>
	<Sider />
	<main class="[grid-area:content]">
		<slot />
	</main>
</div>
