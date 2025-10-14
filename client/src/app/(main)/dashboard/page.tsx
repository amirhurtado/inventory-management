import { getTotalProductsAction } from '@/actions/products/getProduct'
import React from 'react'

const DashboardPage = async () => {

  const [countTotalProducts] = await Promise.all([getTotalProductsAction()]);

  console.log(countTotalProducts)


  return (
    <div className='flex max-h-svh overflow-y-auto'>

      <div>
        <h1 className='text-xl md:text-2xl font-bold'>Panel Principal</h1>
        <p className='font-poppins mt-2 text-gray-500'>Bienvenido de nuevo! Aquí está una vista previa de tu inventario.</p>
      </div>
     
    </div>
  )
}

export default DashboardPage

