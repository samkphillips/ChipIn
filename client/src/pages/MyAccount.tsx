import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/App.css'
import { BASE_URL } from '../globals'
import ProjectCard from '../components/ProjectCard'

function MyAccount( { user }: any ) {
  const [myProjects, setMyProjects] = useState([])

  const getMyProjects = async () => {
    const res = await axios.get(`${BASE_URL}/project/search/user/${user.id}`)
    console.log(res.data)
    setMyProjects(res.data)
  }

  useEffect(() => {
    getMyProjects()
  }, [])

  return (
    <div>
      <h3>My Account page</h3>
      <h4>My Projects</h4>
      {myProjects.length > 0 ? (
        myProjects.map((item: any) => (
          <ProjectCard 
            key={`Card-${item.name}-${item.id}`}
            info={item} 
          />
        ))
      ) : (
        <p>Looks like you have no projects yet. Click to start one! +</p>
      )}
    </div>
  )
}

export default MyAccount