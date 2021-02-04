import { initDb } from '../lib/db.js'
import uniq from 'lodash/uniq.js'

async function main() {
  const db = initDb()
  const songs = db.get('songs').value()
  const artists = uniq(songs.map((song) => song.artist))

  console.log('Artists:')
  for (const artist of artists) {
    console.log(artist)
  }
  process.exit(0)
}

main()
