import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import './styles/App.css'

function App() {
  //

  return (
    <div className="App">
      <header>
        {/* <Nav /> */}
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
        </Routes>
      </main>
    </div>
  );
}

export default App;
