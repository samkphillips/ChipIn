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
  createdAt: '',
  updatedAt: ''
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

  const parseMarkdown = (mark: string) => {
    //do some fancy parsing here
    // setProjectInfo({...projectInfo, campaign: parsedCampaign}) ???
    return mark
  }

  const moveToEdit = () => {
    navigate(`/editproject/${projectInfo.id}`)
  }

  useEffect(() => {
    getInfo()
    // parseCampaignMarkdown()
  }, [])

  useEffect(() => {
    setIsOwner( Number(user.id) === projectInfo.userId )
  }, [projectInfo])

  return (
    <div>
      Project detail page.
      This is project ID : {params.project_id}
      <p>{projectInfo.name}</p>
      <p>{parseMarkdown(projectInfo.campaign)}</p>
      {isOwner && ( <Button color="primary" variant="contained" onClick={moveToEdit}>Edit</Button> )}
    </div>
  )
}

export default Project