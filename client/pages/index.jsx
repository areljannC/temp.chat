import React from 'react'
import Link from 'next/link'
import { Layout } from '../components'

const Home = () => {
  return (
    <Layout>
      <section className='hero is-fullheight'>
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <h1 className='title'>Chatroom PWA</h1>
            <h2 className='subtitle'>A disposable and anonymous chatroom.</h2>
            <Link href='/chatroom'>
              <button className='button'>Create Chatroom</button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home
