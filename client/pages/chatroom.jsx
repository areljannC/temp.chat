import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import socketIOC from 'socket.io-client'
import { useForm } from 'react-hook-form'
import { Layout, Divider } from '../components'
import { API_PATH } from '../constants'

const Chatroom = () => {
  const [username, setUsername] = useState(null)
  const [chatroom, setChatroom] = useState(null)
  const [messages, addMessages] = useState([])
  let socket = null
  if (chatroom) {
    socket = socketIOC(API_PATH)
  }

  const { register, handleSubmit, watch, errors, reset } = useForm()

  const onSubmitUsername = async ({ username }) => {
    const response = await fetch(`${API_PATH}/username`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    }).then((res) => res.json())
    setUsername(response.username)
  }

  const onSubmitCreateChatroom = async ({ createChatroom }) => {
    const response = await fetch(`${API_PATH}/chatroom`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatroom: createChatroom }),
    }).then((res) => res.json())
    setChatroom(response.chatroom)
  }

  const onSubmitJoinChatroom = async ({ joinChatroom }) => {
    setChatroom(joinChatroom)
  }

  const onSubmitMessage = async ({ message }) => {
    socket.emit('message', { message })
    reset()
  }

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socket.emit('room', chatroom)
      })

      socket.on('message', ({ message }) => {
        console.log(message, messages)
        addMessages(previousMessages => [...previousMessages, message])
        // addMessages([...messages, message])
      })
    }
  }, [chatroom])

  return (
    <Layout>
      <section className='hero is-fullheight'>
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <div className='columns is-centered'>
              <div className='column box is-4'>
                {username ? (
                  <span>
                    Your username is <strong>{username}</strong>
                  </span>
                ) : (
                  <form onSubmit={handleSubmit(onSubmitUsername)}>
                    <div className='field'>
                      <label className='label'>Enter Username</label>
                      <div className='control'>
                        <input
                          className='input'
                          name='username'
                          ref={register}
                          style={{ textAlign: 'center' }}
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <div className='control'>
                        <button className='button is-fullwidth' type='submit'>
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
            <Divider />
            <div className='columns is-centered'>
              <div className='column box is-4'>
                {chatroom ? (
                  <span>
                    Your chatroom is <strong>{chatroom}</strong>
                  </span>
                ) : (
                  <form onSubmit={handleSubmit(onSubmitCreateChatroom)}>
                    <div className='field'>
                      <label className='label'>Create Chatroom</label>
                      <div className='control'>
                        <input
                          className='input'
                          name='createChatroom'
                          ref={register}
                          style={{ textAlign: 'center' }}
                          placeholder={username ? '' : 'Enter a username first'}
                          disabled={username ? false : true}
                        />
                      </div>
                    </div>
                    <div className='field'>
                      <div className='control'>
                        <button
                          className='button is-fullwidth'
                          type='submit'
                          disabled={username ? false : true}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
            <Divider />
            <div className='columns is-centered'>
              <div className='column box is-4'>
                <form onSubmit={handleSubmit(onSubmitJoinChatroom)}>
                  <div className='field'>
                    <label className='label'>Join Chatroom</label>
                    <div className='control'>
                      <input
                        className='input'
                        name='joinChatroom'
                        ref={register}
                        style={{ textAlign: 'center' }}
                      />
                    </div>
                  </div>
                  <div className='field'>
                    <div className='control'>
                      <button
                        className='button is-fullwidth'
                        type='submit'
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <Divider />
            <div className='columns is-centered'>
              {username && chatroom ? (
                <>
                  <div className='column box is-4'>
                    <form onSubmit={handleSubmit(onSubmitMessage)}>
                      <div className='field'>
                        <label className='label'></label>
                        <div className='control'>
                          <input
                            className='input'
                            name='message'
                            ref={register}
                            style={{ textAlign: 'center' }}
                          />
                        </div>
                      </div>
                      <div className='field'>
                        <div className='control'>
                          <button className='button is-fullwidth' type='submit'>
                            Enter
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className='column is-4'>
                    {messages.map((message, index) => (
                      <div className='box' key={index}>
                        <span>{message}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Chatroom

/*
  0. create username
  1. send username to back-end
  2. wait for response with UUID
  3. continue
*/
