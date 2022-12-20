import React from 'react'

const AlertaError = ({mensaje}) => {
    console.log(mensaje)
  return (
    <div className="mb-1  text-red-500 font-medium p-2 uppercase rounded-2xl text-sm">
            <h1 className='text-red-500'>{mensaje}  <i className="fa fa-eye">    </i></h1>
    </div>
  )
}

export default AlertaError