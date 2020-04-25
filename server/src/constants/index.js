const { NEW_MESSAGE, CREATE_CHATROOM, JOIN_CHATROOM, LEAVE_CHATROOM } = require('./socketEvents')
const { PORT } = require('./config')

module.exports = {
  NEW_MESSAGE,
  CREATE_CHATROOM,
  JOIN_CHATROOM,
  LEAVE_CHATROOM,
  PORT
}
