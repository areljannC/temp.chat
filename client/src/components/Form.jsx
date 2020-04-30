import React, { forwardRef, Children } from 'react'
import styled from 'styled-components'
import { DEVICE } from '../constants'

// Components
const Form = ({ children, widthM = '80%', widthL = '80%', widthD = '80%' }) => {
  return (
    <Container
      widthM={widthM}
      widthL={widthL}
      widthD={widthD}
      onSubmit={(e) => e.preventDefault()}
    >
      {Children.toArray(children).filter((child) => Form.Field)}
    </Container>
  )
}

Form.Field = ({ children }) => {
  return (
    <Field>
      {Children.toArray(children).filter(
        (child) =>
          child.type === Form.Label ||
          child.type === Form.Input ||
          child.type === Form.Error ||
          child.type === Form.Button
      )}
    </Field>
  )
}

Form.Label = ({ children }) => <Label>{children}</Label>

Form.Input = forwardRef((props, ref) => <Input ref={ref} {...props} />)

Form.Error = ({ children }) => <Error>{children}</Error>

Form.Button = ({ children, ...props }) => <Button {...props}>{children}</Button>

// Styles
const Container = styled.form`
  width: ${({ widthM }) => widthM};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${DEVICE.laptop} {
    width: ${({ widthL }) => widthL};
  }

  @media ${DEVICE.desktop} {
    width: ${({ widthD }) => widthD};
  }
`

const Field = styled.div`
  width: 100%;
  height: fit-content;
  margin: 0.2rem 0;
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  color: ${({ theme }) => theme.foreground};
  font-family: ${({ theme }) => theme.font};
  font-size: ${({ theme }) => theme.font};
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
`

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  box-sizing: border-box;
  padding: 0 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  font-family: ${({ theme }) => theme.font};
  font-size: ${({ theme }) => theme.font};
  color: ${({ theme }) => theme.background};
  background-color: ${({ theme }) => theme.foreground};
  border: 1px solid ${({ theme, hasError }) => hasError ? theme.primary : theme.foreground};
  border-radius: ${({ theme }) => theme.borderRadius};
`
const Error = styled.span`
  color: ${({ theme }) => theme.primary};
  font-family: ${({ theme }) => theme.font};
  font-size: ${({ theme }) => theme.font};
  font-size: 1rem;
  font-weight: 400;
  margin: 0.2rem 0 0.5rem 0;
  white-space: pre-wrap;
`

const Button = styled.button`
  width: 100%;
  height: 2.5rem;
  box-sizing: border-box;
  padding: 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.font};
  background-color: ${({ theme, isSubmit }) => isSubmit ? theme.primary : theme.foreground};
  color: ${({ theme, isSubmit }) => isSubmit ? theme.white : theme.background};
  border: 1px solid ${({ theme }) => theme.background};
  border-radius: ${({ theme }) => theme.borderRadius};
`

export default Form
