import React from 'react'
import { useNavigate } from 'react-router'
import { Card, LinearProgress } from '@material-ui/core'

export default function Nav( { info }: any ) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/project/${info.id}`)
  }

  return (
    <Card variant="outlined" onClick={handleClick}>
      <div>
        <p>Project</p>
        <p>{info.name}</p>
        <p>{info.description}</p>
        <LinearProgress variant="determinate" value={50} />
        <p>Funding: $XXX / $YYY</p>
      </div>
    </Card>
  )
}