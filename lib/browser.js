import puppeteer from 'puppeteer'

let browser
let page

export async function initBrowser() {
  if (browser) return browser

  browser = await puppeteer.launch({
    headless: true,
    slowMo: 1000,
    args: ['--disable-setuid-sandbox'],
    ignoreHTTPSErrors: true
  })
  return browser
}

export async function initPage() {
  if (page) return page

  const browser = await initBrowser()
  page = await browser.newPage()
  return page
}
