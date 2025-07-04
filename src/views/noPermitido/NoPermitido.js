import React from 'react'
import NoPermitidoImage from './NoPermitidoImage'

export default function NoPermitido() {
  return (
    <div className='w-full h-full flex flex-col gap-2 items-center justify-center'>
      <br />
      <br />
      <br />
      <NoPermitidoImage/>
      <strong>No tenes acceso para este portal.</strong>
    </div>
  )
}
