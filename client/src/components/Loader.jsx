import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import PropagateLoader from 'react-spinners/PropagateLoader'

// Container
const Loader = ({ size = '0.5rem' }) => {
  const theme = useContext(ThemeContext)
  return (
    <Container>
      <PropagateLoader size={size} color={theme.foreground} />
    </Container>
  )
}

// Styles
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Loader
