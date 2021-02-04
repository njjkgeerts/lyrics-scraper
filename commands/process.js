import { initDb } from '../lib/db.js'
import { scrapeSongLyrics } from '../lib/scraper.js'
import { sleep } from '../lib/sleep.js'

async function processSong(song) {
  console.log(`Scraping ${song.url}`)
  const { title, lyrics } = await scrapeSongLyrics(song.url)
  return { title, lyrics }
}

async function main() {
  const limit = process.argv[2] || -1
  const db = initDb()
  const queuedSongs = db
    .get('songs')
    .filter((song) => !song.lyrics)
    .value()
  let count = 0

  for (let song of queuedSongs) {
    const { title, lyrics } = await processSong(song)
    db.get('songs').find({ url: song.url }).assign({ title, lyrics }).write()
    count += 1

    if (limit === -1 || count < limit) {
      await sleep(10_000)
    } else {
      break
    }
  }

  process.exit(0)
}

main()
