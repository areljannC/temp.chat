import React, { useContext, memo } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import fetch from 'isomorphic-unfetch'
import { Layout, Flex, Columns, H1, H2, Form } from '../components'
import { UserContext, ChatrooomContext } from '../context'
import {
  SERVER_PATH,
  CREATE_CHATROOM,
  JOIN_CHATROOM,
} from '../constants'
import { urlify } from '../utils'

// Component
const Home = () => {
  const router = useRouter()
  const { register, errors, triggerValidation, getValues, reset } = useForm()
  const { setUser } = useContext(UserContext)
  const { setChatroom } = useContext(ChatrooomContext)

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
      <Columns>
        <Columns.Column>
          <Flex
            flexDirectionM='column'
            flexDirectionL='column'
            flexDirectionD='column'
            alignItemsL='center'
            alignItemsD='center'
          >
            <H1>temp.chat</H1>
            <H2>Temporary chatrooms for anonymous use.</H2>
          </Flex>
        </Columns.Column>
        <Columns.Column>
          <Flex
            flexDirectionM='column'
            flexDirectionL='column'
            alignItemsM='center'
          >
            <Form widthL='60%' widthD='50%'>
              <Form.Field>
                <Form.Label>Name</Form.Label>
                <Form.Input
                  name='name'
                  ref={register({ required: true })}
                  type='text'
                  autoComplete='off'
                  hasError={errors.name ? true : false}
                />
                <Form.Error>
                  {errors.name ? 'Please enter a name.' : ' '}
                </Form.Error>
              </Form.Field>
              <Form.Field>
                <Form.Label>Chatroom</Form.Label>
                <Form.Input
                  name='chatroom'
                  ref={register({ required: true })}
                  type='text'
                  autoComplete='off'
                  hasError={errors.chatroom ? true : false}
                />
                <Form.Error>
                  {errors.chatroom ? 'Please enter a chatroom name.' : ' '}
                </Form.Error>
              </Form.Field>
              <Form.Field>
                <Form.Button
                  isSubmit
                  onClick={async () => {
                    if (await triggerValidation()) {
                      onSubmitCreateChatroom(getValues())
                      reset()
                    }
                  }}
                >
                  Create
                </Form.Button>
              </Form.Field>
              <Form.Field>
                <Form.Button
                  onClick={async () => {
                    if (await triggerValidation()) {
                      onSubmitJoinChatroom(getValues())
                      reset()
                    }
                  }}
                >
                  Join
                </Form.Button>
              </Form.Field>
            </Form>
          </Flex>
        </Columns.Column>
      </Columns>
    </Layout>
  )
}

export default memo(Home)
