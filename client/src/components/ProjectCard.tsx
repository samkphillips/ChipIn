import React from 'react'
import { useNavigate } from 'react-router'
import { Card, LinearProgress } from '@material-ui/core'

export default function Nav( { info }: any ) {
  const navigate = useNavigate()

  let pledgeSum = 0

  info.Pledges.forEach((p: any) => {
    pledgeSum += p.amount
  })

  const handleClick = () => {
    navigate(`/project/${info.id}`)
  }

  return (
    <Card className="project-card" variant="outlined" onClick={handleClick}>
      <p>Project</p>
      <p>{info.name}</p>
      <p>{info.description}</p>
      <LinearProgress className="progress-bar" variant="determinate" value={ (pledgeSum / Number(info.goal)) * 100 } />
      <p>Funding: ${pledgeSum} / ${info.goal}</p>
    </Card>
  )
}