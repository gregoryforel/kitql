import playwright from 'playwright'

export const get = async ({ request }) => {
	// Do dynamc fetching or computing here
	// @ts-check

	const browser = await playwright.chromium.launch()
	const context = await browser.newContext({ acceptDownloads: true })
	const page = await context.newPage()
	await page.goto('https://sleekcv.netlify.app/resumes')
	const pdf = await page.pdf({
		path: `document.pdf`,

		margin: { bottom: '10mm', left: '10mm', right: '10mm', top: '10mm' },
	})

	await browser.close()

	return {
		body: pdf,
	}
}
