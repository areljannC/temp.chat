import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { useForm } from 'react-hook-form'
import { Layout, Divider } from '../components'
import {
  SERVER_PATH,
  WEB_SOCKET_PATH,
  CREATE_CHATROOM,
  JOIN_CHATROOM,
  NEW_MESSAGE,
} from '../constants'

const Chatroom = () => {
  const [username, setUsername] = useState(null)
  const [chatroom, setChatroom] = useState(null)
  const [messages, setMessages] = useState([])
  const [ws, setWs] = useState(null) // WebSocket

  const { register, handleSubmit, watch, errors, reset } = useForm()

  useEffect(() => {
    if (!ws) {
      setWs(new WebSocket(WEB_SOCKET_PATH))
    }

    if (ws) {
      ws.onmessage = (event) => {
        const { type, data } = JSON.parse(event.data)
        switch (type) {
          case NEW_MESSAGE:
            setMessages((prevMessages) => [...prevMessages, data.message])
            break
          default:
            break
        }
      }

      return () => {
        ws.close()
      }
    }
  }, [ws])

  const onSubmitUsername = async ({ username }) => {
    setUsername(username)
  }

  const onSubmitCreateChatroom = async ({ createChatroom }) => {
    ws.send(
      JSON.stringify({
        type: CREATE_CHATROOM,
        data: {
          username,
          chatroom: createChatroom,
        },
      })
    )
    setChatroom(createChatroom)
  }

  const onSubmitJoinChatroom = async ({ joinChatroom }) => {
    ws.send(
      JSON.stringify({
        type: JOIN_CHATROOM,
        data: {
          username,
          chatroom: joinChatroom,
        },
      })
    )
    setChatroom(joinChatroom)
  }

  const onSubmitMessage = async ({ message }, event) => {
    ws.send(
      JSON.stringify({
        type: NEW_MESSAGE,
        data: { username, chatroom, message },
      })
    )
    event.target.reset()
  }

  return (
    <Layout>
      <div className='section'>
        <div className='columns is-centered'>
          <div className='column is-4'>
            <div className='box section'>
              <form onSubmit={handleSubmit(onSubmitUsername)}>
                <div className='field' style={{ margin: 0 }}>
                  <label htmlFor='username' className='label'>
                    Set Username
                  </label>
                </div>
                <div className='field has-addons'>
                  <div className='control is-expanded'>
                    <input
                      className='input'
                      type='text'
                      name='username'
                      ref={register}
                      readOnly={username ? true : false}
                    />
                  </div>
                  {!username ? (
                    <div className='control'>
                      <button className='button' type='submit'>
                        Enter
                      </button>
                    </div>
                  ) : null}
                </div>
              </form>
              <Divider />
              <form onSubmit={handleSubmit(onSubmitCreateChatroom)}>
                <div className='field' style={{ margin: 0 }}>
                  <label htmlFor='username' className='label'>
                    Create Chatroom
                  </label>
                </div>
                <div className='field has-addons'>
                  <div className='control is-expanded'>
                    <input
                      className='input'
                      type='text'
                      name='createChatroom'
                      ref={register}
                      readOnly={chatroom ? true : false}
                    />
                  </div>
                  {!chatroom ? (
                    <div className='control'>
                      <button className='button' type='submit'>
                        Enter
                      </button>
                    </div>
                  ) : null}
                </div>
              </form>
              <Divider />
              <form onSubmit={handleSubmit(onSubmitJoinChatroom)}>
                <div className='field' style={{ margin: 0 }}>
                  <label htmlFor='username' className='label'>
                    Join Chatroom
                  </label>
                </div>
                <div className='field has-addons'>
                  <div className='control is-expanded'>
                    <input
                      className='input'
                      type='text'
                      name='joinChatroom'
                      ref={register}
                      readOnly={chatroom ? true : false}
                    />
                  </div>
                  {!chatroom ? (
                    <div className='control'>
                      <button className='button' type='submit'>
                        Enter
                      </button>
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
          {username && chatroom ? (
            <div className='column is-4'>
              <div className='box section'>
                <div
                  style={{
                    height: '12rem',
                    border: '1px red solid',
                    overflowY: 'auto',
                    margin: '0 0 2rem 0',
                  }}
                >
                  {messages.map((message, index) => (
                    <div style={{ border: '1px blue dashed' }} key={index}>
                      <span>{message}</span>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSubmit(onSubmitMessage)}>
                  <div className='field has-addons'>
                    <div className='control is-expanded'>
                      <input
                        className='input'
                        type='text'
                        name='message'
                        ref={register}
                      />
                    </div>
                    <div className='control'>
                      <button className='button' type='submit'>
                        Enter
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  )
}

export default Chatroom
