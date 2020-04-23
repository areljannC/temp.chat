import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import fetch from 'isomorphic-unfetch'
import { Layout, Divider } from '../components'
import { ThemeContext, UserContext, ChatrooomContext } from '../context'
import {
  SERVER_PATH,
  CREATE_CHATROOM,
  JOIN_CHATROOM,
  DARK,
  LIGHT
} from '../constants'
import { urlify } from '../utils'

const Home = () => {
  const router = useRouter()
  const { register, errors, triggerValidation, getValues, reset } = useForm()
  const { theme } = useContext(ThemeContext)
  const { user, setUser } = useContext(UserContext)
  const { chatroom, setChatroom } = useContext(ChatrooomContext)

  const onSubmitCreateChatroom = async (values) => {
    // 0. Get a UUID for user from server and set user info.
    let response = await fetch(`${SERVER_PATH}/uuid`).then((res) => res.json())
    setUser({ id: response.uuid, name: values.name })

    // 1. Get a UUID for chatroom from server and set chatroom info.
    response = await fetch(`${SERVER_PATH}/uuid`).then((res) => res.json())
    setChatroom({
      id: response.uuid,
      name: values.chatroom,
      url: urlify(values.chatroom),
      type: CREATE_CHATROOM
    })

    // 2. Push user to '/chatroom' page.
    router.push('/chatroom')
  }

  const onSubmitJoinChatroom = async (values) => {
    // 0. Get a UUID for user from server and set user info.
    let response = await fetch(`${SERVER_PATH}/uuid`).then((res) => res.json())
    setUser({ id: response.uuid, name: values.name })

    // 1. Get a UUID for chatroom from server and set chatroom info.
    response = await fetch(`${SERVER_PATH}/uuid`).then((res) => res.json())
    setChatroom({
      id: response.uuid,
      name: values.chatroom,
      url: urlify(values.chatroom),
      type: JOIN_CHATROOM
    })

    // 2. Push user to '/chatroom' page.
    router.push('/chatroom')
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
              <div
                className='column is-6'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <h1
                  className={`title is-size-1-desktop is-size-2-touch has-text-centered-mobile ${
                    theme === DARK
                      ? 'has-text-light'
                      : theme === LIGHT
                      ? 'has-text-dark'
                      : null
                  }`}
                >
                  temp.chat
                </h1>
                <h2
                  className={`subtitle is-size-4-desktop is-size-5-touch has-text-centered-mobile ${
                    theme === DARK
                      ? 'has-text-light'
                      : theme === LIGHT
                      ? 'has-text-dark'
                      : null
                  }`}
                >
                  Temporary chatrooms for anonymous use.
                </h2>
              </div>
              <div className='column is-4'>
                <form>
                  <div className='field'>
                    <label
                      className={`label is-size-5-desktop is-size-6-touch ${
                        theme === DARK
                          ? 'has-text-light'
                          : theme === LIGHT
                          ? 'has-text-dark'
                          : null
                      }`}
                    >
                      Name
                    </label>
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
                      className='label has-text-danger is-size-6-desktop is-size-7-touch'
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {errors.name ? 'Please enter a name.' : ' '}
                    </label>
                  </div>
                  <div className='field'>
                    <label
                      className={`label is-size-5-desktop is-size-6-touch ${
                        theme === DARK
                          ? 'has-text-light'
                          : theme === LIGHT
                          ? 'has-text-dark'
                          : null
                      }`}
                    >
                      Chatroom
                    </label>
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
                      className='label has-text-danger is-size-6-desktop is-size-7-touch'
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {errors.chatroom ? 'Please enter a chatroom name.' : ' '}
                    </label>
                  </div>
                  <Divider />
                  <div className='field'>
                    <div className='control'>
                      <button
                        className='button is-fullwidth is-danger has-text-weight-semibold is-size-5-desktop is-size-6-touch'
                        type='button'
                        onClick={async () => {
                          if (await triggerValidation()) {
                            onSubmitCreateChatroom(getValues())
                            reset()
                          }
                        }}
                      >
                        <span className='is-size-5-desktop is-size-6-touch'>
                          Create
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className='field'>
                    <div className='control'>
                      <button
                        className={`button is-fullwidth has-text-weight-semibold is-size-5-desktop is-size-6-touch
                          ${
                            theme === DARK
                              ? 'is-dark'
                              : theme === LIGHT
                              ? 'is-light'
                              : null
                          }
                        `}
                        type='button'
                        onClick={async () => {
                          if (await triggerValidation()) {
                            onSubmitJoinChatroom(getValues())
                            reset()
                          }
                        }}
                      >
                        <span className='is-size-5-desktop is-size-6-touch'>
                          Join
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home
