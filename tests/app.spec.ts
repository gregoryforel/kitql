import { test, expect } from '@playwright/test'

test('basic test', async ({ page }) => {
	await page.goto('https://playwright.dev/')
	const title = page.locator('.navbar__inner .navbar__title')
	await expect(title).toHaveText('Playwright')
})

// import { expect, test } from '@playwright/test';

// test('about page has expected h1', async ({ page }) => {
// 	await page.goto('/about');
// 	expect(await page.textContent('h1')).toBe('About this app');
// });
