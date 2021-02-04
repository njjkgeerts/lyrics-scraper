import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync.js'

let db

export function initDb() {
  if (db) return db

  const adapter = new FileSync('db.json')
  db = lowdb(adapter)
  db.defaults({ songs: [] }).write()
  return db
}
