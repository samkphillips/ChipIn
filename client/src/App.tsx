import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import SignIn from './pages/SignIn'
import { CheckSession } from './services/Auth'
import './styles/App.css'

function App() {
  const initializeAuth = () => {
    let storedAuth = localStorage.getItem('authenticated')

    if (storedAuth === null || storedAuth === '0') {
      return false
    } else {
      return true
    }
  }

  const [loading, setLoading] = useState(true)
  const [authenticated, toggleAuthenticated] = useState( initializeAuth() )
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    //Reset all auth related state and clear localstorage
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    const session = await CheckSession()
    setUser(session)
    toggleAuthenticated(true)
    localStorage.setItem('authenticated', '1')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken().then(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <div className="App">
      {loading ? (
        <div>
          <h3>Loading</h3>
        </div>
      ) : (
        <div>
          <header>
            <Nav authenticated={authenticated} user={user} handleLogOut={handleLogOut} />
            <p>Howdy</p>
          </header>

          <main>
            <Routes>
              <Route 
                path="/"
                element={<Home />}
              />
              <Route 
                path="/aboutus"
                element={<AboutUs />}
              />
              <Route 
                path="/signin"
                element={<SignIn setUser={setUser} toggleAuthenticated={toggleAuthenticated} />}
              />
            </Routes>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
