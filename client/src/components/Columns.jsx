import React, { Children } from 'react'
import styled from 'styled-components'
import { DEVICE } from '../constants'

// Components
const Columns = ({ children }) => {
  const components = ['Columns.Column']
  return (
    <Container>
      {Children.toArray(children).filter((child) =>
        components.includes(child.type?.displayName)
      )}
    </Container>
  )
}

Columns.Column = ({ children }) => <Column>{children}</Column>

// Set component display names
Columns.Column.displayName = 'Columns.Column'

// Styles
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media ${DEVICE.laptop} {
    flex-direction: row;
  }
`

const Column = styled.div`
  width: 100%;
  height: 100%;
`

export default Columns
