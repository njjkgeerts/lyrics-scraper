import { initDb } from '../lib/db.js'
import upperFirst from 'lodash/upperFirst.js'

function buildTitle(song) {
  if (song.title) {
    return `${upperFirst(song.artist)} - ${song.title}`
  } else {
    return `${upperFirst(song.artist)} - ${song.url}`
  }
}

async function main() {
  const db = initDb()
  const songs = db.get('songs').value()
  const titles = songs.map((song) => buildTitle(song))

  console.log('Songs:')
  for (const title of titles) {
    console.log(title)
  }
  process.exit(0)
}

main()
