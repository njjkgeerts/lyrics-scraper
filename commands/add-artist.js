import { initDb } from '../lib/db.js'
import { scrapeSongUrls, getArtist } from '../lib/scraper.js'

async function main() {
  const url = process.argv[2]
  if (!url) {
    console.log('Specify URL in argument')
    process.exit()
  }

  const db = await initDb()
  const artist = getArtist(url)
  const songs = db.getCollection('songs')

  const songUrls = await scrapeSongUrls(url)
  for (let songUrl of songUrls) {
    const existingSong = songs.findOne({ url: songUrl })
    if (!existingSong) {
      songs.insert({ artist, url: songUrl })
    }
  }

  console.log('Added song URLs:')
  console.log(songUrls)
  await db.saveAsync()
  process.exit()
}

main()
