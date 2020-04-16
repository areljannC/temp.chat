import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import fetch from 'isomorphic-unfetch'
import { Layout, Divider } from '../components'
import { UserContext, ChatrooomContext } from '../context'
import { SERVER_PATH, CREATE_CHATROOM, JOIN_CHATROOM } from '../constants'
import { urlify } from '../utils'

const Home = () => {
  const router = useRouter()
  const { register, errors, triggerValidation, getValues, reset } = useForm()
  const { user, setUser } = useContext(UserContext)
  const { chatroom, setChatroom } = useContext(ChatrooomContext)

  const onSubmitCreateChatroom = async (values) => {
    // 0. Get a UUID for user from server and set user info.
    let response = await fetch(`${SERVER_PATH}/uuid`).then((res) => res.json())
    setUser({ id: response.uuid, name: values.name })

    // 1. Get a UUID for chatroom from server and set chatroom info.
    response = await fetch(`${SERVER_PATH}/uuid`).then((res) => res.json())
    setChatroom({ id: response.uuid, name: values.chatroom, url: urlify(values.chatroom), type: CREATE_CHATROOM })

    // 2. Push user to '/chatroom' page.
    router.push('/chatroom')
  }

  const onSubmitJoinChatroom = async (values) => {
    // 0. Get a UUID for user from server and set user info.
    let response = await fetch(`${SERVER_PATH}/uuid`).then((res) => res.json())
    setUser({ id: response.uuid, name: values.name })

    // 1. Get a UUID for chatroom from server and set chatroom info.
    response = await fetch(`${SERVER_PATH}/uuid`).then((res) => res.json())
    setChatroom({ id: response.uuid, name: values.chatroom, url: urlify(values.chatroom), type: JOIN_CHATROOM })

    // 2. Push user to '/chatroom' page.
    router.push('/chatroom')
  }

  return (
    <Layout>
      <section className='hero is-fullheight'>
        <div className='hero-body'>
          <div className='container'>
            <h1 className='title has-text-centered'>Chatroom PWA</h1>
            <h2 className='subtitle has-text-centered'>
              A disposable and anonymous chatroom.
            </h2>
            <Divider />
            <div className='columns is-centered'>
              <div className='column is-4'>
                <div className='box'>
                  {user ? (
                    <div>
                      <div>
                        <strong>Name:</strong> {user.name}
                      </div>
                      <div>
                        <strong>ID:</strong> {user.id}
                      </div>
                      <div className='field'>
                        <div className='control'>
                          <button
                            className='button is-fullwidth is-dark'
                            onClick={() => {
                              router.push('/chatroom')
                            }}
                          >
                            Rejoin Chatroom
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form>
                      <div className='field'>
                        <label className='label'>Name</label>
                        <div className='control'>
                          <input
                            type='text'
                            className='input'
                            name='name'
                            ref={register({
                              required: true
                            })}
                            autoComplete='off'
                          />
                        </div>
                        <label
                          className='label has-text-danger is-size-7'
                          style={{ whiteSpace: 'pre-wrap' }}
                        >
                          {errors.name ? 'Please enter a name.' : ' '}
                        </label>
                      </div>
                      <div className='field'>
                        <label className='label'>Chatroom</label>
                        <div className='control'>
                          <input
                            type='text'
                            className='input'
                            name='chatroom'
                            ref={register({
                              required: true
                            })}
                            autoComplete='off'
                          />
                        </div>
                        <label
                          className='label has-text-danger is-size-7'
                          style={{ whiteSpace: 'pre-wrap' }}
                        >
                          {errors.chatroom
                            ? 'Please enter a chatroom name.'
                            : ' '}
                        </label>
                      </div>
                      <div className='field'>
                        <div className='control'>
                          <button
                            className='button is-fullwidth is-dark'
                            type='button'
                            onClick={async () => {
                              if (await triggerValidation()) {
                                onSubmitCreateChatroom(getValues())
                                reset()
                              }
                            }}
                          >
                            Create Chatroom
                          </button>
                        </div>
                      </div>
                      <div className='field'>
                        <div className='control'>
                        <button
                            className='button is-fullwidth is-link'
                            type='button'
                            onClick={async () => {
                              if (await triggerValidation()) {
                                onSubmitJoinChatroom(getValues())
                                reset()
                              }
                            }}
                          >
                            Join Chatroom
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home
