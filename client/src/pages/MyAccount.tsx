import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import '../styles/App.css'
import { BASE_URL } from '../globals'
import ProjectCard from '../components/ProjectCard'
import { CreateNewProject } from '../services/ProtectedServices'
import { Card } from '@material-ui/core'

function MyAccount( { user }: any ) {
  const [myProjects, setMyProjects] = useState([])
  const navigate = useNavigate()

  const getMyProjects = async () => {
    const res = await axios.get(`${BASE_URL}/project/search/user/${user.id}`)
    console.log(res.data)
    setMyProjects(res.data)
  }

  const createProject = async () => {
    //create new project
    const res = await CreateNewProject({ "user_id": user.id })
    //navigate to edit that project
    navigate(`/editproject/${res.id}`)
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
      <Card variant="outlined" onClick={createProject}>
        Create New Project
      </Card>
    </div>
  )
}

export default MyAccount