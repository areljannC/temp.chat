import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeToggler } from '../components'

// Component
const Layout = ({ children }) => (
  <Container>
    <main>{children}</main>
    <ThemeToggler />
  </Container>
)

// Styles
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  position: relative;
`

export default Layout
