import React from 'react'

interface KeyParametersInterface {
    data: {
        totalProducts: number
        totalPrice: number
        lowStock: number
    }
}

const KeyParameters = ({data} : KeyParametersInterface) => {
  return (
    <div className='border-1 rounded-lg px-3 py-6 bg-accent h-1/2'>
        
      <h2 className=''>Parámetros clave </h2>
    </div>
  )
}

export default KeyParameters
