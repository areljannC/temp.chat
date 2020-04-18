import React, { createContext, useState } from 'react'

export const ChatrooomContext = createContext()

export const ChatrooomContextProvider = ({ children }) => {
  const [chatroom, setChatroom] = useState(null)
  return (
    <ChatrooomContext.Provider value={{ chatroom, setChatroom }}>
      {children}
    </ChatrooomContext.Provider>
  )
}