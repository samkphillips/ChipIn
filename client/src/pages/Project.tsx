import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { useParams, useNavigate } from 'react-router'
import '../styles/App.css'
import { Button } from '@material-ui/core'

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
  publishReady: false,
  createdAt: '',
  updatedAt: '',
  Pledges: []
}

function Project( { user }: any ) {
  const [projectInfo, setProjectInfo] = useState(iStateInfo)
  const [isOwner,setIsOwner] = useState(false)
  let params = useParams()
  let navigate = useNavigate()

  const getInfo = async () => {
    const res = await axios.get(`${BASE_URL}/project/search/id/${params.project_id}`)
    setProjectInfo(res.data)
    setIsOwner( Number(user.id) === projectInfo.userId)
  }

  const moveToEdit = () => {
    navigate(`/editproject/${projectInfo.id}`)
  }

  const moveToBack = () => {
    navigate(`/backproject/${projectInfo.id}`)
  }

  let pledgeSum = 0

  const updatePledgeSum = () => {
    pledgeSum = 0

    projectInfo.Pledges.forEach((p: any) => {
      pledgeSum += p.amount
    })
  }

  useEffect(() => {
    getInfo()
  }, [])

  useEffect(() => {
    setIsOwner( Number(user.id) === projectInfo.userId )
    updatePledgeSum()
  }, [projectInfo])

  return (
    <div>
      {isOwner && ( <Button color="primary" variant="contained" onClick={moveToEdit}>Edit</Button> )}
      <h1>{projectInfo.name}</h1>
      <p>{projectInfo.campaign}</p>
      <h3>Funding: ${pledgeSum} / ${projectInfo.goal}</h3>
      <Button color="primary" variant="contained" onClick={moveToBack}>Back This Project</Button>
    </div>
  )
}

export default Project