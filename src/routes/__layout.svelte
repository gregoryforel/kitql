<script lang="ts">
	import Sider from '$lib/ui/layout/sider/sider.svelte'

	import '../app.css'
</script>

<svelte:head>
	<style>
		@import url('https://rsms.me/inter/inter.css');
		html {
			font-family: 'Inter', sans-serif;
		}
		@supports (font-variation-settings: normal) {
			html {
				font-family: 'Inter var', sans-serif;
			}
		}
	</style>
</svelte:head>

<div
	class={`app bg-slate-200 grid w-full h-screen overflow-hidden [grid-template-areas:'sider_content'] [grid-template-columns:auto_1fr]`}
>
	<Sider />
	<main class="[grid-area:content] overflow-y-auto overflow-x-hidden print:overflow-hidden">
		<slot />
	</main>
</div>
