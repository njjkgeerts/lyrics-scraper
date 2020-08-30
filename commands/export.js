import { initDb } from '../lib/db.js'
import upperFirst from 'lodash/upperFirst.js'

function songOutput(song) {
  const header = `# ${upperFirst(song.artist)} - ${song.title}`
  return `${header}\n\n${song.lyrics}\n\n`
}

async function main() {
  const artist = process.argv[2]
  const db = await initDb()
  const songs = db.getCollection('songs')
  let completedSongs

  if (artist) {
    completedSongs = songs.find({ artist, lyrics: { $ne: undefined } })
  } else {
    completedSongs = songs.find({ lyrics: { $ne: undefined } })
  }
  const output = completedSongs.map((song) => songOutput(song)).join('')

  console.log(output)
  process.exit()
}

main()
