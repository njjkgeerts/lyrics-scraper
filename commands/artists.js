import { initDb } from '../lib/db.js'
import uniq from 'lodash/uniq.js'

async function main() {
  const db = await initDb()
  const songs = db.getCollection('songs').find()
  const artists = uniq(songs.map((song) => song.artist))

  console.log(artists)
  process.exit()
}

main()
