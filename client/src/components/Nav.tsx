import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav( { authenticated, user, handleLogOut }: any ) {
  let authenticatedOptions

  if (user) {
    authenticatedOptions = (
      <nav>
        <h3>Welcome {user.email}!</h3>
        <NavLink to="/" className="navlinks">Home</NavLink>
        <NavLink to="/aboutus" className="navlinks about-nav">About Us</NavLink>
        <h3>|</h3>
        <NavLink onClick={handleLogOut} to="/" className="navlinks">
          Sign Out
        </NavLink>
      </nav>
    )
  }

  const publicOptions = (
    <nav>
      <NavLink to="/" className="navlinks">Home</NavLink>
      <NavLink to="/aboutus" className="navlinks">About Us</NavLink>
      <NavLink to="/signin" className="navlinks">Sign In</NavLink>
    </nav>
  )

  return (
    <header>
      <NavLink to="/" className="fake-logo">ChipIn</NavLink>
      {authenticated && user ? authenticatedOptions : publicOptions}
    </header>
  )
}
