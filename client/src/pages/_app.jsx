import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import {
  ThemeContextProvider,
  UserContextProvider,
  ChatrooomContextProvider
} from '../context'
class CustomApp extends App {
  componentDidMount() {
    // Append class for Bulma's fixed top navbar.
    document.querySelector('body').classList.add('has-navbar-fixed-top')
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <div>
        <div>
          <Head>
            <link
              href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed&display=swap'
              rel='stylesheet'
            />
          </Head>
        </div>
        <ThemeContextProvider>
          <UserContextProvider>
            <ChatrooomContextProvider>
              <Component {...pageProps} />
            </ChatrooomContextProvider>
          </UserContextProvider>
        </ThemeContextProvider>
      </div>
    )
  }
}

export default CustomApp
