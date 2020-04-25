const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const uuidv4 = require('uuid').v4
const WebSocketServer = require('ws').Server
const { NEW_MESSAGE, CREATE_CHATROOM, JOIN_CHATROOM, LEAVE_CHATROOM, PORT } = require('./constants')

// middleware
app.use(cors())
app.use(express.json())

// Express endpoints
app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hi' })
})

app.get('/uuid', async (req, res) => {
  const uuid = uuidv4()
  res.status(200).json({ uuid })
})

// Setup http server
const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

// setup WebSockets
const wss = new WebSocketServer({ server })

let chatrooms = new Map()

wss.on('connection', (ws, req, client) => {
  console.log('INFO: A user has connected.')

  ws.on('message', (event) => {
    const { type, data } = JSON.parse(event)
    let users, chatroom
    switch (type) {
      case CREATE_CHATROOM:
        // Check if chatroom already exists.
        if (chatrooms.has(data.chatroom.name)) {
          // If it exists, add user's socket to that chatroom.
          chatroom = chatrooms.get(data.chatroom.name)
          chatroom.set(data.user.id, ws)
        } else {
          // If it doesn't, create new chatroom and add user's socket to it.
          users = new Map()
          users.set(data.user.id, ws)
          chatrooms.set(data.chatroom.name, users)
        }
        break
      case JOIN_CHATROOM:
        // Check if chatroom already exists.
        if (chatrooms.has(data.chatroom.name)) {
          // If it exists, add user's socket to that chatroom.
          chatroom = chatrooms.get(data.chatroom.name)
          chatroom.set(data.user.id, ws)
        } else {
          // If it doesn't, create new chatroom and add user's socket to it.
          users = new Map()
          users.set(data.user.id, ws)
          chatrooms.set(data.chatroom.name, users)
        }
        break
      case NEW_MESSAGE:
        // Get chatroom that the message belongs to.
        chatroom = chatrooms.get(data.chatroom.name)
        // Send message to all connected user sockets.
        chatroom.forEach((ws) => {
          ws.send(
            JSON.stringify({
              type: NEW_MESSAGE,
              data: {
                user: data.user,
                message: data.message,
                sentTimestamp: data.sentTimestamp,
              },
            })
          )
        })
        break
      case LEAVE_CHATROOM:
        console.log(`INFO: ${data.username} has left the chatroom.`)
        break
      default:
        break
    }
  })

  ws.on('open', () => {
    console.log('INFO: A user has connected.')
  })

  ws.on('close', () => {
    console.log('INFO: A user has disconnected.')
  })
})
