import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { BASE_URL } from '../globals'
import '../styles/App.css'

import { Button, TextField } from '@material-ui/core'

const iStateInfo = {
  id: 0,
  name: '',
  startDate: '',
  endDate: '',
  goal: 1.0,
  campaign: '',
  description: '',
  tags: '',
  userId: 0,
  createdAt: '',
  updatedAt: ''
}

function EditProject( { user }: any ) {
  const [projectInfo, setProjectInfo] = useState(iStateInfo)
  const [projectFormValues, setProjectFormValues] = useState(iStateInfo)
  let params = useParams()
  let navigate = useNavigate()

  const getInfo = async () => {
    const res = await axios.get(`${BASE_URL}/project/search/id/${params.project_id}`)
    setProjectInfo(res.data)
    setProjectFormValues(res.data)
  }

  const projectHandleChange = (e: any) => {
    setProjectFormValues({
      ...projectFormValues,
      [e.target.name]: e.target.value
    })
  }

  const projectHandleSubmit = async (e: any) => {
    e.preventDefault()
    await axios.put(`${BASE_URL}/project/update/${params.project_id}`, {
      name: projectFormValues.name,
      goal: projectFormValues.goal,
      campaign: projectFormValues.campaign,
      description: projectFormValues.description
    })
    navigate('/myaccount')
    console.log("Submitted.")
  }

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <div>
      <h2>Edit Project</h2>

      <form onSubmit={projectHandleSubmit}>
        <div className="project-form">
          <TextField
            onChange={projectHandleChange}
            name="name"
            label="Title"
            value={projectFormValues.name}
            required
            variant="filled"
          />
          <TextField
            onChange={projectHandleChange}
            name="goal"
            label="Goal"
            type="number"
            value={projectFormValues.goal}
            required
            variant="filled"
          />
          <TextField
            onChange={projectHandleChange}
            name="campaign"
            label="Campaign Information"
            value={projectFormValues.campaign}
            required
            variant="filled"
            multiline
          />
          <TextField
            onChange={projectHandleChange}
            name="description"
            label="Brief Description"
            value={projectFormValues.description}
            required
            variant="filled"
          />
          <Button type='submit'>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProject