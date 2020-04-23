import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import {
  ThemeContextProvider,
  UserContextProvider,
  ChatrooomContextProvider
} from '../context'
import '../stylesheets/reset.scss'

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed&display=swap'
            rel='stylesheet'
          />
        </Head>
        <ThemeContextProvider>
          <UserContextProvider>
            <ChatrooomContextProvider>
              <Component {...pageProps} />
            </ChatrooomContextProvider>
          </UserContextProvider>
        </ThemeContextProvider>
      </>
    )
  }
}

export default CustomApp
