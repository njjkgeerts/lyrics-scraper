import { initDb } from '../lib/db.js'
import { scrapeSongUrls, getArtist } from '../lib/scraper.js'

async function main() {
  const url = process.argv[2]
  if (!url) {
    console.log('Specify URL in argument')
    process.exit(0)
  }

  const db = initDb()
  const artist = getArtist(url)

  const songUrls = await scrapeSongUrls(url)
  for (const songUrl of songUrls) {
    const existingSong = db.get('songs').find({ url: songUrl }).value()
    if (!existingSong) {
      db.get('songs').push({ artist, url: songUrl }).write()
    }
  }

  console.log('Added song URLs:')
  for (const songUrl of songUrls) {
    console.log(songUrl)
  }
  process.exit(0)
}

main()
