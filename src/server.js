require('dotenv').config()
const http = require('http')
const app = require('./app')

const server = http.createServer(app)

const PORT = process.env.PORT || 9999

server.listen(PORT, () => {
  console.log(`SERVER IS ON ${PORT}`)
})
