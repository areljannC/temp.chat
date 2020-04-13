const express = require('express')
const server = express()
const http = require('http')
const cors = require('cors')
const uuidv4 = require('uuid').v4
const WebSocket = require('ws')

const serverPort = 4001
const webSocketPort = 4002

// middleware
server.use(cors())
server.use(express.json())

// Express endpoints
server.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hi' })
})

// expose Express server
server.listen(serverPort, () => console.log(`Listening at ${serverPort}`))

// setup WebSockets
const wss = new WebSocket.Server({ port: webSocketPort })

let chatrooms = new Map()

wss.on('connection', (ws) => {
  console.log('INFO: A user has connected.')
  ws.send(
    JSON.stringify({
      type: 'NEW_MESSAGE',
      data: {
        message: 'Connected!',
      },
    })
  )

  ws.on('message', (event) => {
    const { type, data } = JSON.parse(event)
    let users, chatroom
    switch (type) {
      case 'CREATE_CHATROOM':
        users = new Map()
        users.set(data.username, ws)
        chatrooms.set(data.chatroom, users)
        break
      case 'JOIN_CHATROOM':
        chatroom = chatrooms.get(data.chatroom)
        chatroom.set(data.username, ws)
        break
      case 'NEW_MESSAGE':
        chatroom = chatrooms.get(data.chatroom)
        chatroom.forEach((ws) => {
          ws.send(
            JSON.stringify({
              type: 'NEW_MESSAGE',
              data: {
                message: data.message,
              },
            })
          )
        })
        break
      default:
        break
    }
    // wss.clients.forEach((client) => {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(message)
    //   }
    // })
  })
})
