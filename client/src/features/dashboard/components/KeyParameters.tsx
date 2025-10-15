import { DollarSign, HandCoins, SquareKanban } from 'lucide-react'
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
    <div className='border-1 rounded-lg px-3 py-6  flex flex-col gap-6 md:gap-8'>
        
      <h2 className=''>Parámetros clave </h2>
      <div className='grid grid-cols-3'>

        <div className='flex items-center flex-col gap-3 bg-accent p-4 rounded-lg'>
            <h3 className='font-poppins text-2xl font-bold '>{data.totalProducts}</h3>
            <p className='text-xs text-gray-600 dark:text-gray-400'>Productos totales</p>
            <SquareKanban />
        </div>


         <div className='flex items-center flex-col gap-3 p-4'>
            <h3 className='font-poppins text-2xl font-bold'>${data.totalPrice.toFixed(2)}</h3>
            <p className='text-xs text-gray-600 dark:text-gray-400'>Valor total</p>
            <DollarSign />
        </div>


         <div className='flex items-center flex-col gap-3 bg-accent  p-4 rounded-lg'>
            <h3 className='font-poppins text-2xl font-bold '>{data.lowStock}</h3>
            <p className='text-xs text-gray-600 dark:text-gray-400'>Invetario bajo</p>
            <HandCoins />
        </div>

      </div>
    </div>
  )
}

export default KeyParameters
