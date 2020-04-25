import React, { useState, createContext } from 'react'
import { ThemeProvider as SCTP } from 'styled-components'
import { DARK, LIGHT } from '../constants'

const darkTheme = {
  black: '#333333',
  white: '#FCFCFE',
  background: '#333333',
  foreground: '#FCFCFE',
  primary: '#F45B5D',
  border: '#FCFCFE',
  font: `'IBM Plex Sans Condensed', sans-serif`,
  borderRadius: '0.2rem'
}

const lightTheme = {
  black: '#333333',
  white: '#FCFCFE',
  background: '#FCFCFE',
  foreground: '#333333',
  primary: '#F45B5D',
  border: '#333333',
  font: `'IBM Plex Sans Condensed', sans-serif`,
  borderRadius: '0.2rem'
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
      <SCTP
        theme={
          currentTheme === DARK
            ? darkTheme
            : currentTheme === LIGHT
            ? lightTheme
            : darkTheme
        }
      >
        {children}
      </SCTP>
    </ThemeContext.Provider>
  )
}
