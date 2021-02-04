import { initDb } from '../lib/db.js'
import upperFirst from 'lodash/upperFirst.js'

function songOutput(song) {
  const header = `# ${upperFirst(song.artist)} - ${song.title}`
  return `${header}\n\n${song.lyrics}\n\n`
}

async function main() {
  const artist = process.argv[2]
  const db = initDb()
  let completedSongs

  if (artist) {
    completedSongs = db
      .get('songs')
      .filter((song) => song.lyrics)
      .filter({ artist })
      .value()
  } else {
    completedSongs = db
      .get('songs')
      .filter((song) => song.lyrics)
      .value()
  }
  const output = completedSongs.map((song) => songOutput(song)).join('')

  console.log(output)
  process.exit(0)
}

main()
