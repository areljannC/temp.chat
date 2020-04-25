import React from 'react'
import styled from 'styled-components'
import { ThemeToggler } from '../components'
import { DEVICE } from '../constants'

// Component
const Layout = ({ children }) => (
  <Container>
    <Main>{children}</Main>
    <ThemeToggler />
  </Container>
)

// Styles
const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 2rem 2rem;
  background-color: ${({ theme }) => theme.background};
  position: relative;

  @media ${DEVICE.laptop} {
    padding: 2rem 4rem;
  }

  @media ${DEVICE.laptopL} {
    padding: 2rem 10rem;
  }
`

const Main = styled.main`
  width: 100%;
  height: 100%;
`

export default Layout
