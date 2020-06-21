require('dotenv').config()
const express = require('express')
const next = require('next')
const userRoute = require('./user/index')
const bodyParser = require('body-parser')
const compression = require('compression')



const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(compression())

  server.use("/api/user", userRoute)



  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})


