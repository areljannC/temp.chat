import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../context'
import { DARK, LIGHT } from '../constants'
import { getDateDistanceFromToday } from '../utils'

const MessageBubble = ({ message, timestamp, name, isReceived = false }) => {
  const { theme } = useContext(ThemeContext)
  const [elapsedTimestamp, setElapsedTimestamp] = useState(
    getDateDistanceFromToday(timestamp)
  )

  useEffect(() => {
    setInterval(() => {
      setElapsedTimestamp(getDateDistanceFromToday(timestamp))
    }, 60000)
  }, [timestamp])

  return (
    <Container isReceived={isReceived}>
      <Bubble isReceived={isReceived} theme={theme}>
        {message}
      </Bubble>
      <NameTimestamp isReceived={isReceived} theme={theme}>
        {name} - {elapsedTimestamp} ago
      </NameTimestamp>
    </Container>
  )
}

const Container = styled.div`
  width: 80%;
  height: fit-content;
  margin: ${({ isReceived }) => (isReceived ? '0 auto 8px 0' : '0 0 8px auto')};
  display: flex;
  flex-direction: column;
  /* border: 1px red solid; */
`

const Bubble = styled.div`
  width: 100%;
  height: fit-content;
  padding: 0.5rem;
  box-sizing: border-box;
  border: ${({ isReceived, theme }) =>
    isReceived && theme === LIGHT
      ? '1px #333333 solid'
      : isReceived
      ? '1px #333333 solid'
      : null};
  border-radius: ${({ isReceived, theme }) =>
    isReceived ? '16px 16px 16px 0' : '16px 16px 0 16px'};
  background-color: ${({ isReceived }) => (isReceived ? '#FCFCFE' : '#F45B5D')};
  color: ${({ isReceived }) => (isReceived ? '#333333' : '#FCFCFE')};
`

const NameTimestamp = styled.span`
  text-align: ${({ isReceived }) => (isReceived ? 'left' : 'right')};
  font-size: 0.9rem;
`

export default MessageBubble
