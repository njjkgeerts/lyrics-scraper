import { initDb } from '../lib/db.js'
import upperFirst from 'lodash/upperFirst.js'

async function main() {
  const db = await initDb()
  const songs = db.getCollection('songs')
  const completedSongs = songs.find({ lyrics: { $ne: undefined } })
  const titles = completedSongs.map((song) => `${upperFirst(song.artist)} - ${song.title}`)

  console.log(titles)
  process.exit()
}

main()
