<script context="module">
	import { browser, dev } from '$app/env'
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
</script>

<script lang="ts">
	import IconMail from '~icons/mdi/email'
	import IconMapMarker from '~icons/mdi/map-marker'
	import IconPhone from '~icons/mdi/phone'
	import resume from '../../../resume.json'
	import theme from '../../../theme.json'
	import Container from './components/container.svelte'
	import { themedResume } from './resume'

	// let resumes
	// ;(async () => {
	// 	try {
	// 		resumes = await nhost.graphql.request(
	// 			`
	//             {
	//                 resumes_by_pk(id: "fa69f955-ceab-4072-9e75-d25a07f27312") {
	//                     __typename
	//                     id
	//                     data
	//                 }
	//             }
	//         `
	// 		)
	// 	} catch (error) {
	// 		console.log('error', error)
	// 	}
	// })()
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="flex justify-center p-8">
	<div class="actualpage bg-white">
		<div class="page">
			<pre class="text-xs">{JSON.stringify(themedResume, null, 3)}</pre>
			<!-- NEW START -->
			<!-- {#each theme.containers as container, index}
				<Container
					class={container.class}
					tag={container.tag}
					key={container.key?.replace('{{index}}', index)}
					containers={container.containers}
				/>
			{/each} -->
			<!-- NEW END -->

			<!-- OLD -->
			<!-- <div class="grid [grid-template-areas:'header''content']">
				<header class="[grid-area:header] w-full flex flex-col gap-2 mb-8">
					<h1 class="uppercase text-gray-900 text-3xl font-semibold">
						{resume.basics.name}
					</h1>
					<div class="flex gap-8">
						<span class="text-gray-700">
							<IconMail class="inline text-gray-500 mr-1" />{resume.basics.email}
						</span>
						<span class="text-gray-700">
							<IconPhone class="inline text-gray-500 mr-1" />{resume.basics.phone}
						</span>
						<span class="text-gray-700">
							<IconMapMarker class="inline text-gray-500 mr-1" />
							{resume.basics.location.city}, {resume.basics.location.countryCode}
						</span>
					</div>
				</header>
				<div class="[grid-area:content] flex flex-col gap-8">
					<article>
						<header>
							<h2
								class="uppercase text-gray-600 font-medium tracking-wider text-lg w-full border-b border-gray-200"
							>
								Work Experience
							</h2>
						</header>
						<div class="flex flex-col gap-4">
							{#each resume.work as workExperience}
								<article class="flex flex-col">
									<header>
										<div class="flex justify-between">
											<h3 class="text-lg text-gray-900 font-bold">
												{workExperience.name}
											</h3>
											<span>
												{workExperience.startDate} - {workExperience.endDate}
											</span>
										</div>
										<div class="flex justify-between">
											<div class="text-base text-gray-900 italic">
												{workExperience.position}
											</div>
											<span class="text-base text-gray-500 italic">
												<IconMapMarker class="inline text-gray-400 mr-2" />
												{workExperience.location}
											</span>
										</div>
									</header>
									<section>
										<ul class="list-disc ml-8">
											{#each workExperience.highlights as highlight}
												<li>{highlight}</li>
											{/each}
										</ul>
									</section>
								</article>
							{/each}
						</div>
					</article>
				</div>
			</div> -->
		</div>
	</div>
</div>

<style>
	/* @media all { */ /* I like using these */
	div.actualpage {
		min-height: 297mm;
		height: 297mm; /* DIN A4 standard paper size */
		min-width: 210mm;
		width: 210mm;
	}
	div.page {
		/* margin: 0;  you don't really have to explicitly set it to 0 unless it's already set to something else */
	}
	/* } */

	@media screen {
		div.page {
			margin: 10mm 10mm 10mm 10mm; /* printers usually have a bigger bottom margin*/
		}
	}

	@media print {
		div.page {
			margin: 0mm; /* Browser will apply the correct margins when it prints */
		}
	}
</style>
