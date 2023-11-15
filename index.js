const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  let filePath = ''

  switch (req.url) {
    case '/':
      filePath = path.join(__dirname, 'views', 'index.html')
      break
    case '/about-me':
      filePath = path.join(__dirname, 'views', 'about-me.html')
      break
    case '/contact-me':
      filePath = path.join(__dirname, 'views', 'contact-me.html')

      break
    default:
      filePath = path.join(__dirname, 'views', '404.html')
      break
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        filePath = path.join(__dirname, 'views', '404.html')
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end('Internal Server Error')
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' })
            res.end(data)
          }
        })
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end('Internal Server Error')
      }
      return
    }
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(data)
  })
})

const port = 8080

server.listen(port, () => {
  console.log('Survhor Ronnin')
})
