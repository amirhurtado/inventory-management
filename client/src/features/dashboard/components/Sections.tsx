import React from 'react'
import KeyParameters from './KeyParameters'

interface SectionsDashboardInterface {
  dataSections : {
    totalProducts: number,
    totalPrice: number,
    lowStock: number
  }
}

const SectionsDashboard = ({dataSections}: SectionsDashboardInterface) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full gap-4">


      <div className='flex flex-col gap-4'>

        <KeyParameters data={{
          totalProducts: dataSections.totalProducts,
          totalPrice: dataSections.totalPrice,
          lowStock: dataSections.lowStock
        }} />

        <div className='flex h-1/2 border-4'>
          Tabla
        </div>


      </div>

        <h2 className="">Hola</h2>
    
      </div>
  )
}

export default SectionsDashboard
