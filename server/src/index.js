const express = require('express')
const server = express()
const http = require('http').createServer(server)
const io = require('socket.io')(http)
const port = 4000
const cors = require('cors')
const uuidv4 = require('uuid').v4

// middleware
server.use(cors())
server.use(express.json())

// set username endpoint
server.post('/username', async (req, res) => {
  const { username } = req.body
  const uuid = uuidv4()
  res.status(200).json({ username: `${username}-${uuid}` })
})

// create chatroom endpoint
server.post('/chatroom', async (req, res) => {
  const { chatroom } = req.body
  const uuid = uuidv4()
  res.status(200).json({ chatroom: `${chatroom}-${uuid}` })
})

io.on('connect', (socket) => {
  let roomName = 'test'
  socket.on('room', (room) => { 
    console.log('user joined room: ' + room)
    socket.join(roomName) 
    socket.emit('message', ({ message: 'more messages' }))
  })
  socket.on('message', ({ message }) => { 
    console.log(message, roomName)
    // io.to(roomName).emit('message', ({ message }))
    io.sockets.in(roomName).emit('message', ({ message }))
  })
})

http.listen(port, () => {
  console.log(`Listening on port ${port}.`)
})
