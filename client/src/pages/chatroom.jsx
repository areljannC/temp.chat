import React, { useState, useEffect, useContext, useRef } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Layout, Columns, Flex, Chat } from '../components'
import { UserContext, ChatrooomContext } from '../context'
import { WEBSOCKET_PATH, NEW_MESSAGE, ENV } from '../constants'

const Chatroom = () => {
  // enforce HTTPS
  if (ENV !== 'development' && location.protocol !== 'https:') {
    location.replace(
      `https:${location.href.substring(location.protocol.length)}`
    )
  }

  const { register, handleSubmit } = useForm()
  const router = useRouter()
  const { user } = useContext(UserContext)
  const { chatroom } = useContext(ChatrooomContext)
  const [messages, setMessages] = useState([])
  const ws = useRef(null)
  const chatBoxRef = useRef(null)

  useEffect(() => {
    if (!user && !chatroom) {
      router.push('/')
    } else {
      ws.current = new WebSocket(WEBSOCKET_PATH)
      ws.current.onopen = (event) => {
        ws.current.send(
          JSON.stringify({
            type: chatroom.type,
            data: { user, chatroom }
          })
        )
      }

      ws.current.onclose = (event) => {}

      ws.current.onmessage = (event) => {
        const { type, data } = JSON.parse(event.data)
        switch (type) {
          case NEW_MESSAGE:
            setMessages((prevMessages) => [...prevMessages, data])
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
            break
        }
      }

      return () => ws.current.close()
    }
  }, [user, chatroom])

  const onSubmitMessage = async (data, event) => {
    const message = data.message.trim()
    if (message) {
      if (ws.current) {
        ws.current.send(
          JSON.stringify({
            type: NEW_MESSAGE,
            data: { user, chatroom, message, sentTimestamp: new Date() }
          })
        )
      }
    }
    event.target.reset()
  }

  return (
    <Layout>
      <Head>
        <title>temp.chat</title>
        <meta
          name='description'
          content='Temporary chatrooms for anonymous use.'
        />
      </Head>
      <Columns>
        <Columns.Column>
          <Flex>
            <Chat widthM='90%' widthL='60%' widthD='50%'>
              <Chat.Box ref={chatBoxRef}>
                {messages.map((sm, index) => (
                  <Chat.Message
                    key={index}
                    name={user?.id === sm.user.id ? 'You' : sm.user.name}
                    isReceived={!(user?.id === sm.user.id)}
                    timestamp={new Date(sm.sentTimestamp)}
                  >
                    {sm.message}
                  </Chat.Message>
                ))}
              </Chat.Box>
              <Chat.InputBar
                name='message'
                ref={register}
                type='text'
                autoComplete='off'
                onSubmit={handleSubmit(onSubmitMessage)}
              />
            </Chat>
          </Flex>
        </Columns.Column>
      </Columns>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Chatroom), { ssr: false })
/*
  https://www.grapecity.com/blogs/moving-from-react-components-to-react-hooks
  https://stackoverflow.com/a/58433356
*/
