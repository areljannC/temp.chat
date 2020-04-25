import React from 'react'
import styled from 'styled-components'
import { DEVICE } from '../constants'

// Component
const Flex = ({
  children,
  flexDirectionM = 'row',
  justifyContentM = 'center',
  alignItemsM = 'center',
  flexDirectionL = 'row',
  justifyContentL = 'center',
  alignItemsL = 'center',
  flexDirectionD = 'row',
  justifyContentD = 'center',
  alignItemsD = 'center'
}) => (
  <Container
    flexDirectionM={flexDirectionM}
    justifyContentM={justifyContentM}
    alignItemsM={alignItemsM}
    flexDirectionL={flexDirectionL}
    justifyContentL={justifyContentL}
    alignItemsL={alignItemsL}
    flexDirectionD={flexDirectionD}
    justifyContentD={justifyContentD}
    alignItemsD={alignItemsD}
  >
    {children}
  </Container>
)

// Styles
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${({ flexDirectionM }) => flexDirectionM};
  justify-content: ${({ justifyContentM }) => justifyContentM};
  align-items: ${({ alignItemsM }) => alignItemsM};

  @media ${DEVICE.laptop} {
    flex-direction: ${({ flexDirectionL }) => flexDirectionL};
    justify-content: ${({ justifyContentL }) => justifyContentL};
    align-items: ${({ alignItemsL }) => alignItemsL};
  }

  @media ${DEVICE.desktop} {
    flex-direction: ${({ flexDirectionD }) => flexDirectionD};
    justify-content: ${({ justifyContentD }) => justifyContentD};
    align-items: ${({ alignItemsD }) => alignItemsD};
  }
`

export default Flex
