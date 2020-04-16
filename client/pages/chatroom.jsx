import React, { useState, useEffect, useContext, useRef } from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { useForm } from 'react-hook-form'
import { Layout, Divider } from '../components'
import { UserContext, ChatrooomContext } from '../context'
import {
  SERVER_PATH,
  WEB_SOCKET_PATH,
  CREATE_CHATROOM,
  JOIN_CHATROOM,
  NEW_MESSAGE,
  LEAVE_CHATROOM
} from '../constants'

const Chatroom = () => {
  const { register, handleSubmit, errors } = useForm()
  const { user } = useContext(UserContext)
  const { chatroom } = useContext(ChatrooomContext)
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user])
  
  const ws = useRef(new WebSocket(WEB_SOCKET_PATH))

  useEffect(() => {
    if (!ws.current) {
      router.push('/')
    }
  }, [ws])
  

  useEffect(() => {
    ws.current.onopen = (event) => {
      ws.current.send(JSON.stringify({
        type: chatroom.type,
        data: { user, chatroom }
      }))
    }

    ws.current.onclose = (event) => {
      console.log('Socket closed!')
    }

    ws.current.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data)
      switch (type) {
        case NEW_MESSAGE:
          setMessages(prevMessages => [...prevMessages, data])
      }
    }
  })

  useEffect(() => () => ws.current.close(), [ws])

  const onSubmitMessage = async (data, event) => {
    const message = data.message.trim()
    if (message) {
      if (ws.current) {
        ws.current.send(
          JSON.stringify({
            type: NEW_MESSAGE,
            data: { user, chatroom, message }
          })
        )
      }
    }
    event.target.reset()
  }

  return (
    <Layout>
      <section className='hero is-fullheight'>
        <div className='hero-body'>
          <div className='container'>
            <div className='columns is-centered'>
              <div className='column is-4'>
                <div className='box'>
                  <div
                    style={{
                      width: '100%',
                      height: '500px',
                      padding: '1rem',
                      overflow: 'auto'
                    }}
                  >
                    {messages.map((sm, index) => (
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          marginBottom: '1rem'
                        }}
                        key={index}
                      >
                        <div className='box' style={{ marginBottom: '0.5rem' }}>
                          <span>{sm.message}</span>
                        </div>
                        <span
                          style={{ textAlign: user.id === sm.user.id ? 'right' : 'left', margin: '0 1rem' }}
                        >
                          {sm.user.name}
                        </span>
                      </div>
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
                        <button className='button' type='submit'>
                          👍
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

export default Chatroom

/*
  https://www.grapecity.com/blogs/moving-from-react-components-to-react-hooks
*/
