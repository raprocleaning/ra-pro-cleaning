import { test, expect } from '@playwright/test'

test.describe('smoke tests', () => {
  test('homepage loads and shows the hero', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/R A Pro Cleaning/i)
    await expect(page.locator('body')).toBeVisible()
  })

  test('services page lists services', async ({ page }) => {
    const response = await page.goto('/services')
    expect(response?.ok()).toBe(true)
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })

  test('contact page renders the form', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByRole('textbox', { name: /email/i }).first()).toBeVisible()
  })

  test('individual service page renders', async ({ page }) => {
    const response = await page.goto('/services/deep-cleaning')
    expect(response?.ok()).toBe(true)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('sitemap is served', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    expect(response.ok()).toBe(true)
    const body = await response.text()
    expect(body).toContain('<urlset')
    expect(body).toContain('raprocleaningservices.com')
  })
})
