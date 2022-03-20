import React from 'react'

export default function Nav( { info }: any ) {
  return (
    <div>
      <p>Project</p>
      <p>{info.name}</p>
      <p>{info.description}</p>
    </div>
  )
}