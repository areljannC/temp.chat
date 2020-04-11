import React from 'react'
import Link from 'next/link'
import { Layout } from '../components'

const Home = () => {
  return (
    <Layout>
      <section class='hero is-fullheight'>
        <div class='hero-body'>
          <div class='container has-text-centered'>
            <h1 class='title'>Chatroom PWA</h1>
            <h2 class='subtitle'>A disposable and anonymous chatroom.</h2>
            <Link href='/chatroom'>
              <button class='button'>Create Chatroom</button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home
