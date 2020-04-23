import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../context'
import { DARK, LIGHT } from '../constants'
import { Icon } from '@iconify/react'
import crescentMoon from '@iconify/icons-emojione/crescent-moon'
import sun from '@iconify/icons-emojione/sun'

// Component
const ThemeToggler = () => {
  const { currentTheme, toggleTheme } = useContext(ThemeContext)

  return (
    <Container onClick={toggleTheme}>
      {currentTheme === DARK ? <Icon icon={sun} width='3rem' /> : null}
      {currentTheme === LIGHT ? <Icon icon={crescentMoon} width='3rem' /> : null}
    </Container>
  )
}

// Styles
const Container = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.foreground};
  position: absolute;
  right: 10%;
  bottom: 10%;
`

export default ThemeToggler
