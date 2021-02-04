# Lyrics Scraper

Tool for scraping lyrics from a certain well-known lyrics website.

## Commands:

- `yarn add-artist <url>`
- `yarn artists`
- `yarn completed`
- `yarn export [artist]`
- `yarn process [limit]`
- `yarn queue`
- `yarn songs`

## Usage

Run `yarn add-artist <url>` to add all songs of an artist to the queue.

Run `yarn process` to start downloading lyrics from the song queue. There is a 10 second wait between songs to prevent IP banning.

Run `yarn export` to export the lyrics to the standard output.

## Stack

- Node.js 13+
- Lowdb for JSON document file storage
- Puppeteer for scraping
