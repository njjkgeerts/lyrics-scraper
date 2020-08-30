import { initPage } from './browser.js'

export function getDomain(url) {
  const regex = /^https:\/\/[\w\.]+\//
  const match = url.match(regex)
  return match[0]
}

export function getArtist(url) {
  const regex = /^https:\/\/[\w\.]+\/\w\/(\w+).html$/
  const match = url.match(regex)
  return match[1]
}

export async function scrapeSongUrls(url) {
  const page = await initPage()
  const domain = getDomain(url)
  await page.goto(url)

  // Wait for DOM
  await page.waitForSelector('#listAlbum')

  // Scrape song URLs
  const links = await page.evaluate(() => {
    const items = [...document.querySelectorAll('.listalbum-item > a')]
    return items.map((link) => link.getAttribute('href'))
  })
  return links.map((link) => `${domain}${link.slice(3)}`)
}

export async function scrapeSongLyrics(url) {
  const page = await initPage()
  await page.goto(url)

  // Wait for DOM
  await page.waitForSelector('.main-page')

  // Scrape title and lyrics
  const { title, lyrics } = await page.evaluate(() => {
    const titleEl = document.querySelector('.text-center > b')
    const title = titleEl.innerText.slice(1, titleEl.innerText.length - 1)
    const lyricsEl = titleEl.nextElementSibling.nextElementSibling.nextElementSibling
    const lyrics = lyricsEl.innerText

    return { title, lyrics }
  })

  return { title, lyrics }
}
