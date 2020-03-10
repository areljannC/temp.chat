const server = require('express')()
const http = require('http').createServer(server)
const io = require('socket.io')(http)
const port = 4000

server.get('/', (req, res) => res.send('hi'))

io.on('connection', socket => {
  console.log('user connected')
  socket.emit('FromAPI', 'this emit is from the server')
})

http.listen(port, () => {
  console.log(`Listening on port ${port}.`)
})
