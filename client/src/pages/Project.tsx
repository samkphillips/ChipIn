import React from 'react'
import { useParams } from 'react-router'
import '../styles/App.css'

function Project() {
  let params = useParams()

  console.log(params)

  return (
    <div>
      Project detail page.
    </div>
  )
}

export default Project