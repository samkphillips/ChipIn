import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { useParams } from 'react-router'
import '../styles/App.css'

const iStateInfo = {
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

function Project() {
  const [projectInfo, setProjectInfo] = useState(iStateInfo)
  let params = useParams()

  const getInfo = async () => {
    const res = await axios.get(`${BASE_URL}/project/search/id/${params.project_id}`)
    setProjectInfo(res.data)
  }

  const parseCampaignMarkdown = () => {
    //do some fancy parsing here
    // setProjectInfo({...projectInfo, campaign: parsedCampaign})
  }

  useEffect(() => {
    getInfo()
    // parseCampaignMarkdown()
  }, [])

  return (
    <div>
      Project detail page.
      This is project ID : {params.project_id}
      <p>{projectInfo.name}</p>
      <p>{projectInfo.campaign}</p>
    </div>
  )
}

export default Project