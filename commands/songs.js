import { initDb } from '../lib/db.js'
import upperFirst from 'lodash/upperFirst.js'

function title(song) {
  if (song.title) {
    return `${upperFirst(song.artist)} - ${song.title}`
  } else {
    return `${upperFirst(song.artist)} - ${song.url}`
  }
}

async function main() {
  const db = await initDb()
  const songs = db.getCollection('songs')
  const titles = songs
    .find()
    .map((song) => title(song))
    .join('\n')

  console.log(titles)
  process.exit()
}

main()
