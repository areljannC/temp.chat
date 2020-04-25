import styled from 'styled-components'

export const H1 = styled.h1`
  text-align: ${({ textAlign = 'center' }) => textAlign};
  color: ${({ theme }) => theme.foreground};
  font-family: ${({ theme }) => theme.font};
  font-size: 3rem;
  font-weight: 700;
  display: inline-block;
`

export const H2 = styled.h2`
  text-align: ${({ textAlign = 'center' }) => textAlign};
  color: ${({ theme }) => theme.foreground};
  font-family: ${({ theme }) => theme.font};
  font-size: 1.5rem;
  font-weight: 700;
`
