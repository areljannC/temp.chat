import React from 'react'
import '../stylesheets/custom-bulma.scss'
import Navbar from './Navbar'

const Layout = ({ children }) => (
  <div>
    <Navbar />
    <main>
      {children}
    </main>
  </div>
)

export default Layout
