import React, { useState, createContext } from 'react'
import { ThemeProvider as SCTP } from 'styled-components'
import { DARK, LIGHT } from '../constants'

const darkTheme = {
  background: '#333333',
  foreground: '#FCFCFE',
  primary: '#F45B5D',
  border: '#FCFCFE'
}

const lightTheme = {
  background: '#FCFCFE',
  foreground: '#333333',
  primary: '#F45B5D',
  border: '#333333'
}

export const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(DARK)

  const toggleTheme = () => {
    switch (currentTheme) {
      case DARK:
        setCurrentTheme(LIGHT)
        break
      case LIGHT:
      default:
        setCurrentTheme(DARK)
        break
    }
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {currentTheme === DARK ? <SCTP theme={darkTheme}>{children}</SCTP> : null}
      {currentTheme === LIGHT ? <SCTP theme={lightTheme}>{children}</SCTP> : null}
    </ThemeContext.Provider>
  )
}
