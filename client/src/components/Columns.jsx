import React, { Children } from 'react'
import styled from 'styled-components'
import { DEVICE } from '../constants'

// Components
const Columns = ({ children }) => {
  return (
    <Container>
      {Children.toArray(children).filter(
        (child) => child.type === Columns.Column
      )}
    </Container>
  )
}

Columns.Column = ({
  children,
  heightM = '100%',
  heightL = '100%',
  heightD = '100%'
}) => (
  <Column heightM={heightM} heightL={heightL} heightD={heightD}>
    {children}
  </Column>
)

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
  height: ${({ heightM }) => heightM};

  @media ${DEVICE.laptop} {
    height: ${({ heightL }) => heightL};
  }

  @media ${DEVICE.desktop} {
    height: ${({ heightD }) => heightD};
  }
`

export default Columns
