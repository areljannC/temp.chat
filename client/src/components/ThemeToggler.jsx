import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../context'
import { DARK, LIGHT, DEVICE } from '../constants'
import { Icon } from '@iconify/react'
import crescentMoon from '@iconify/icons-emojione/crescent-moon'
import sun from '@iconify/icons-emojione/sun'

// Component
const ThemeToggler = () => {
  const { currentTheme, toggleTheme } = useContext(ThemeContext)
  return (
    <Container onClick={toggleTheme}>
      {currentTheme === DARK ? <Icon icon={sun} width='70%' /> : null}
      {currentTheme === LIGHT ? <Icon icon={crescentMoon} width='70%' /> : null}
    </Container>
  )
}

// Styles
const Container = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.foreground};
  cursor: pointer;
  position: absolute;
  right: 2%;
  top: 2%;

  @media ${DEVICE.tablet} {
    width: 4rem;
    height: 4rem;
    right: 2%;
    top: 2%;
  }

  @media ${DEVICE.laptop} {
    right: 2%;
    top: 2%;
  }
  
  @media ${DEVICE.laptopL} {
    right: 2%;
    top: 2%;
  }

  @media ${DEVICE.desktop} {
    right: 1%;
    top: 2%;
  }
`

export default ThemeToggler
