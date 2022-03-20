import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import ProjectCard from '../components/ProjectCard'
import '../styles/App.css'

function Home(props: any) {
  const [projects, setProjects] = useState([])

  const getProjects = async () => {
    const res = await axios.get(`${BASE_URL}/project/all`)
    setProjects(res.data)
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <div>
      Home page!
      <p>Here's all the projects:</p>
      {projects.length > 0 ? (
        projects.map((item: any) => (
          <ProjectCard 
            key={`Card-${item.name}-${item.id}`}
            info={item} 
          />
        ))
      ) : (
        <p>Oops no projects.</p>
      )}
    </div>
  )
}

export default Home