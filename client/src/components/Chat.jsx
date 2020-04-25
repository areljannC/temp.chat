import React, { useEffect, useState, Children, forwardRef } from 'react'
import styled from 'styled-components'
import { DEVICE } from '../constants'
import { InlineIcon } from '@iconify/react'
import sendIcon from '@iconify/icons-ion/send'
import { getDateDistanceFromToday } from '../utils'

// Components
const Chat = ({ children, widthM = '80%', widthL = '80%', widthD = '80%' }) => {
  const components = ['Chat.Box', 'Chat.InputBar']
  return (
    <Container widthM={widthM} widthL={widthL} widthD={widthD}>
      {Children.toArray(children).filter((child) =>
        components.includes(child.type?.displayName)
      )}
    </Container>
  )
}

Chat.Box = forwardRef(({ children }, ref) => {
  const components = ['Chat.Message']
  return (
    <Box ref={ref}>
      {Children.toArray(children).filter((child) =>
        components.includes(child.type?.displayName)
      )}
    </Box>
  )
})

Chat.Message = ({ children, name, timestamp, isReceived }) => {
  const [elapsedTimestamp, setElapsedTimestamp] = useState(
    getDateDistanceFromToday(timestamp)
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTimestamp(getDateDistanceFromToday(timestamp))
    }, 60000)

    return () => clearInterval(timer)
  }, [timestamp])

  return (
    <Message isReceived={isReceived}>
      <Bubble isReceived={isReceived}>{children}</Bubble>
      <Info isReceived={isReceived}>
        <Name>{name}</Name>
        <span> - </span>
        <Timestamp>{elapsedTimestamp} ago</Timestamp>
      </Info>
    </Message>
  )
}

Chat.InputBar = forwardRef(({ onSubmit, ...props }, ref) => {
  return (
    <InputBar onSubmit={onSubmit}>
    <Input ref={ref} {...props} />
    <Button type='submit'>
      <InlineIcon icon={sendIcon} />
      </Button>
    </InputBar>
  )
})

Chat.Input = forwardRef((props, ref) => <Input ref={ref} {...props} />)

// Set component display names
Chat.Box.displayName = 'Chat.Box'
Chat.Message.displayName = 'Chat.Message'
Chat.InputBar.displayName = 'Chat.InputBar'

// Styles
const Container = styled.div`
  width: ${({ widthM }) => widthM};
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /* border: 1px solid ${({ theme }) => theme.foreground}; */
  border-radius: ${({ theme }) => theme.borderRadius};

  @media ${DEVICE.laptop} {
    width: ${({ widthL }) => widthL};
  }

  @media ${DEVICE.desktop} {
    width: ${({ widthD }) => widthD};
  }
`

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
`

const Message = styled.div`
  width: 80%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-self: ${({ isReceived }) => (isReceived ? 'flex-start' : 'flex-end')};
  margin: 0 0 1rem 0;
  word-break: break-all;

  @media ${DEVICE.tablet} {
    width: 70%;
  }
`

const Bubble = styled.div`
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 1rem;
  border: 1px solid
    ${({ theme, isReceived }) => (isReceived ? theme.black : theme.primary)};
  background-color: ${({ theme, isReceived }) =>
    isReceived ? theme.white : theme.primary};
  border-radius: ${({ isReceived }) =>
    isReceived ? `1rem 1rem 1rem 0` : `1rem 1rem 0 1rem`};
  font-size: 1rem;
  font-weight: 400;
  font-family: ${({ theme }) => theme.font};
  font-size: ${({ theme }) => theme.font};
  color: ${({ theme, isReceived }) => (isReceived ? theme.black : theme.white)};
`

const Info = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 0.2rem 0 0 0;
  font-size: 1rem;
  font-weight: 400;
  font-family: ${({ theme }) => theme.font};
  font-size: ${({ theme }) => theme.font};
  color: ${({ theme }) => theme.foreground};
  align-self: ${({ isReceived }) => (isReceived ? 'flex-start' : 'flex-end')};
`

const Name = styled.span`
`

const Timestamp = styled.span``

const InputBar = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  box-sizing: border-box;
`

const Input = styled.input`
  width: 85%;
  height: 2.5rem;
  box-sizing: border-box;
  padding: 0 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  font-family: ${({ theme }) => theme.font};
  font-size: ${({ theme }) => theme.font};
  color: ${({ theme }) => theme.background};
  background-color: ${({ theme }) => theme.foreground};
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? theme.primary : theme.foreground)};
  border-radius: ${({ theme }) => `${theme.borderRadius} 0 0 ${theme.borderRadius}`};
`

const Button = styled.button`
  width: 15%;
  height: 2.5rem;
  box-sizing: border-box;
  padding: 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.font};
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: ${({ theme }) => `0 ${theme.borderRadius} ${theme.borderRadius} 0`};
`

export default Chat
