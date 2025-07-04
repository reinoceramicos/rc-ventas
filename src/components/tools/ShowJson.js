import React from 'react'

export default function ShowJson({data}) {
  return (
    <div className='p-4'>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Muestra el JSON con formato */}
    </div>
  )
}
