import { initDb } from '../lib/db.js'
import upperFirst from 'lodash/upperFirst.js'

async function main() {
  const db = initDb()
  const completedSongs = db
    .get('songs')
    .filter((song) => song.lyrics)
    .value()
  const titles = completedSongs.map((song) => `${upperFirst(song.artist)} - ${song.title}`)

  console.log('Completed:')
  for (const title of titles) {
    console.log(title)
  }
  process.exit(0)
}

main()
