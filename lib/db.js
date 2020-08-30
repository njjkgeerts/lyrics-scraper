import loki from 'lokijs'
import { sleep } from './sleep.js'

let db
let ready = false

export async function initDb() {
  db = new loki('loki.db', {
    autoload: true,
    autoloadCallback: () => {
      ready = true
      initCollections()
    },
    autosave: true,
    autosaveInterval: 1000
  })

  await waitForReady()
  db.saveAsync = saveAsync
  return db
}

function initCollections() {
  if (!db.getCollection('songs')) db.addCollection('songs', { indices: ['artist'] })
}

async function waitForReady() {
  return new Promise(async (resolve, reject) => {
    try {
      while (!ready) await sleep(100)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

function saveAsync() {
  return new Promise((resolve, reject) => {
    try {
      db.save(() => resolve())
    } catch (error) {
      reject(error)
    }
  })
}
