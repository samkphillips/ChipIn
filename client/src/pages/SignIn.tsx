import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { SignInUser, RegisterUser } from '../services/Auth'
import { Button, TextField } from '@material-ui/core'

const iStateSignIn = {
  email: '',
  password: ''
}

const iStateRegister = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export default function SignIn(props: any) {
  const [signInFormValues, setSignInFormValues] = useState(iStateSignIn)
  let navigate = useNavigate()

  const signInHandleChange = (e: any) => {
    setSignInFormValues({
      ...signInFormValues,
      [e.target.name]: e.target.value
    })
  }

  const signInHandleSubmit = async (e: any) => {
    e.preventDefault()
    const payload = await SignInUser(signInFormValues)
    setSignInFormValues(iStateSignIn)
    props.setUser(payload)
    props.toggleAuthenticated(true)
    navigate('/')
  }

  const [registerFormValues, setRegisterFormValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const registerHandleChange = (e: any) => {
    setRegisterFormValues({
      ...registerFormValues,
      [e.target.name]: e.target.value
    })
  }

  const registerHandleSubmit = async (e: any) => {
    e.preventDefault()
    await RegisterUser({
      username: registerFormValues.username,
      email: registerFormValues.email,
      password: registerFormValues.password
    })
    setRegisterFormValues(iStateRegister)
    navigate('/signin')
  }

  const signInGuest = async (e: any) => {
    e.preventDefault()
    const payload = await SignInUser({
      email: 'example@fakemail.com',
      password: '1234'
    })
    setSignInFormValues(iStateSignIn)
    props.setUser(payload)
    props.toggleAuthenticated(true)
    navigate('/')
  }

  return (
    <div className="sign-in-page">
      <Button color="primary" variant="contained" onClick={signInGuest}>Guest Sign-In</Button>
      <div className="sign-in-split">
        <h1>Sign In</h1>
        <form onSubmit={signInHandleSubmit}>
          <div>
            <TextField
              onChange={signInHandleChange}
              name="email"
              label="Email"
              type="email"
              placeholder="example@example.com"
              value={signInFormValues.email}
              required
              variant="filled"
            />
          </div>
          <div>
            <TextField
              onChange={signInHandleChange}
              type="password"
              name="password"
              label="Password"
              value={signInFormValues.password}
              required
              variant="filled"
            />
          </div>
          <Button
            type='submit'
            color="primary" variant="contained"
            disabled={!signInFormValues.email || !signInFormValues.password}
          >
            Sign In
          </Button>
        </form>
      </div>

      <div className="sign-up-split">
        <h1>Sign Up</h1>
        <form onSubmit={registerHandleSubmit}>
          <div>
            <TextField
              onChange={registerHandleChange}
              name="username"
              type="text"
              placeholder="JohnSmith"
              label="Username"
              value={registerFormValues.username}
              required
              variant="filled"
            />
          </div>
          <div>
            <TextField
              onChange={registerHandleChange}
              name="email"
              type="email"
              label="Email"
              placeholder="example@example.com"
              value={registerFormValues.email}
              required
              variant="filled"
            />
          </div>

          <div>
            <TextField
              onChange={registerHandleChange}
              type="password"
              name="password"
              label="Password"
              value={registerFormValues.password}
              required
              variant="filled"
            />
          </div>
          <div>
            <TextField
              onChange={registerHandleChange}
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              value={registerFormValues.confirmPassword}
              required
              variant="filled"
            />
          </div>
          <Button
            type='submit'
            color="primary" variant="contained"
            disabled={
              !registerFormValues.username ||
              !registerFormValues.email ||
              !registerFormValues.password ||
              registerFormValues.confirmPassword !== registerFormValues.password
            }
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  )
}
