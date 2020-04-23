import React, { useState, useEffect, useContext, useRef } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import fetch from 'isomorphic-unfetch'
import { useForm } from 'react-hook-form'
import { Layout, Divider, MessageBubble } from '../components'
import { ThemeContext, UserContext, ChatrooomContext } from '../context'
import {
  SERVER_PATH,
  WEB_SOCKET_PATH,
  CREATE_CHATROOM,
  JOIN_CHATROOM,
  NEW_MESSAGE,
  LEAVE_CHATROOM,
  DARK,
  LIGHT
} from '../constants'
import { InlineIcon } from '@iconify/react'
import sendIcon from '@iconify/icons-ion/send'

const Chatroom = () => {
  const { register, handleSubmit, errors } = useForm()
  const router = useRouter()
  const { theme } = useContext(ThemeContext)
  const { user } = useContext(UserContext)
  const { chatroom } = useContext(ChatrooomContext)
  const [messages, setMessages] = useState([])
  const ws = useRef(null)
  const chatContainerRef = useRef(null)

  useEffect(() => {
    if (!user && !chatroom) {
      router.push('/')
    } else {
      ws.current = new WebSocket(WEB_SOCKET_PATH)

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
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
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
      <section
        className={`hero is-fullheight-with-navbar ${
          theme === DARK ? 'is-dark' : theme === LIGHT ? 'is-light' : null
        }`}
      >
        <div className='hero-body'>
          <div className='container'>
            <div className='columns is-centered'>
              <div className='column is-4'>
                <div
                  className={
                    theme === DARK
                      ? 'has-background-dark'
                      : theme === LIGHT
                      ? 'has-background-light'
                      : null
                  }
                >
                  <div
                    style={{
                      width: '100%',
                      height: '500px',
                      padding: '1rem',
                      overflowY: 'scroll'
                    }}
                    ref={chatContainerRef}
                    id='chat'
                  >
                    {messages.map((sm, index) => (
                      <MessageBubble
                        key={index}
                        message={sm.message}
                        name={user?.id === sm.user.id ? 'You' : sm.user.name}
                        isReceived={!(user?.id === sm.user.id)}
                        timestamp={new Date(sm.sentTimestamp)}
                      />
                    ))}
                  </div>
                  <Divider />
                  <form onSubmit={handleSubmit(onSubmitMessage)}>
                    <div className='field has-addons'>
                      <div className='control is-expanded'>
                        <input
                          type='text'
                          className='input'
                          name='message'
                          ref={register}
                          autoComplete='off'
                        />
                      </div>
                      <div className='control'>
                        <button className='button is-danger' type='submit'>
                          <span className='icon has-text-light' >
                            <InlineIcon icon={sendIcon} />
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Chatroom), { ssr: false })
/*
  https://www.grapecity.com/blogs/moving-from-react-components-to-react-hooks
  https://stackoverflow.com/a/58433356
*/
