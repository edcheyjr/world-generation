const express = require('express')
const path = require('path')
const { fileURLToPath } = require('url')
const app = express()

const hostname = '127.0.0.1'
const port = 5004

// instead of public folder being public since this a frontend app atleast for now make the all dir public
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname)))

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/test', (req, res, next) => {
  // show the page
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const _retfile = path.join(__dirname, 'test.html')

  res.sendFile(_retfile)
})

// Serve up the pages
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
