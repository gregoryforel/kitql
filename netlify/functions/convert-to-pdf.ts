import chromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

exports.handler = async (event, context, callback) => {
	let browser = null
	let pdf = null
	console.log('spawning chrome headless')
	try {
		const executablePath = await chromium.executablePath

		// setup
		browser = await puppeteer.launch({
			args: chromium.args,
			executablePath: executablePath,
			headless: chromium.headless,
		})

		// Do stuff with headless chrome
		const page = await browser.newPage()
		const targetUrl = 'https://sleekcv.netlify.app/resumes'

		// Goto page and then do stuff
		await page.goto(targetUrl, {
			waitUntil: ['domcontentloaded', 'networkidle0'],
		})

		pdf = await page.pdf({
			margin: { bottom: '10mm', left: '10mm', right: '10mm', top: '10mm' },
		})
	} catch (error) {
		console.log('error', error)
		return callback(null, {
			statusCode: 500,
			body: JSON.stringify({
				error: error,
			}),
		})
	} finally {
		// close browser
		if (browser !== null) {
			await browser.close()
		}
	}

	return callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			pdf,
		}),
	})
}
