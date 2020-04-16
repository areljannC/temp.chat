import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { UserContextProvider, ChatrooomContextProvider } from '../context'
class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <div>
        <div>
          <Head />
        </div>
        <UserContextProvider>
          <ChatrooomContextProvider>
            <Component {...pageProps} />
          </ChatrooomContextProvider>
        </UserContextProvider>
      </div>
    )
  }
}

export default CustomApp
