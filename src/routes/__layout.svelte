<script lang="ts">
	import Sider from '$lib/ui/layout/sider/sider.svelte'

	import '../app.css'
</script>

<div class={`app h-screen bg-slate-200 grid w-full [grid-template-areas:'sider_content']`}>
	<Sider />
	<main class="[grid-area:content] overflow-y-auto overflow-x-hidden">
		<slot />
	</main>
</div>
