import { initDb } from '../lib/db.js'
import { scrapeSongLyrics } from '../lib/scraper.js'
import { sleep } from '../lib/sleep.js'

async function processSong(song) {
  console.log(`Scraping ${song.url}`)
  const { title, lyrics } = await scrapeSongLyrics(song.url)
  song.title = title
  song.lyrics = lyrics
  return song
}

async function main() {
  const limit = process.argv[2] || -1
  const db = await initDb()
  const songs = db.getCollection('songs')
  const queuedSongs = songs.find({ lyrics: undefined })
  let count = 0

  for (let song of queuedSongs) {
    song = await processSong(song)
    songs.update(song)
    count += 1

    if (limit === -1 || count < limit) {
      await sleep(10_000)
    } else {
      break
    }
  }

  await db.saveAsync()
  process.exit()
}

main()
