import { initDb } from '../lib/db.js'

async function main() {
  const db = await initDb()
  const songs = db.getCollection('songs')

  console.log(songs.find())
  process.exit()
}

main()
