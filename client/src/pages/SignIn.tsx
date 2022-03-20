import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { SignInUser, RegisterUser } from '../services/Auth'
import { Button } from '@material-ui/core'

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
            <label htmlFor="email">Email</label>
            <input
              onChange={signInHandleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={signInFormValues.email}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={signInHandleChange}
              type="password"
              name="password"
              value={signInFormValues.password}
              required
            />
          </div>
          <button
            disabled={!signInFormValues.email || !signInFormValues.password}
          >
            Sign In
          </button>
        </form>
      </div>

      <div className="sign-up-split">
        <h1>Sign Up</h1>
        <form onSubmit={registerHandleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              onChange={registerHandleChange}
              name="username"
              type="text"
              placeholder="John Smith"
              value={registerFormValues.username}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={registerHandleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={registerFormValues.email}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={registerHandleChange}
              type="password"
              name="password"
              value={registerFormValues.password}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={registerHandleChange}
              type="password"
              name="confirmPassword"
              value={registerFormValues.confirmPassword}
              required
            />
          </div>
          <button
            disabled={
              !registerFormValues.username ||
              !registerFormValues.email ||
              !registerFormValues.password ||
              registerFormValues.confirmPassword !== registerFormValues.password
            }
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}
