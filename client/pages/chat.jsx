import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'

const Chat = () => {
  const [text, setText] = useState('')

  useEffect(() => {
    const socket = socketIOClient('http://localhost:4000/')
    socket.on('FromAPI', data => setText(data))
  }, [])

  return (
    <main>
      <h1>Chat Page</h1>
      <p>{text}</p>
    </main>
  )
}

export default Chat
