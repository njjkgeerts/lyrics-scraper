import { initDb } from '../lib/db.js'

async function main() {
  const db = initDb()
  const songs = db
    .get('songs')
    .filter((song) => !song.lyrics)
    .value()

  console.log('Queue:')
  for (const song of songs) {
    console.log(song.url)
  }
  process.exit(0)
}

main()
