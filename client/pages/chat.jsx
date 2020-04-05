import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import styled from 'styled-components'

const Chat = () => {
  const [text, setText] = useState('')

  useEffect(() => {
    const socket = socketIOClient('http://localhost:4000/')
    socket.on('FromAPI', data => setText(data))
  }, [])

  return (
    <main>
      <Heading>Chat Page</Heading>
      <p>{text}</p>
    </main>
  )
}

const Heading = styled.h1`
  color: red;
`

export default Chat
