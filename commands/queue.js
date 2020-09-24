import { initDb } from '../lib/db.js'

async function main() {
  const db = await initDb()
  const songs = db.getCollection('songs')
  const urls = songs
    .find({ lyrics: undefined })
    .map((song) => song.url)
    .join('\n')

  console.log(urls)
  process.exit()
}

main()
