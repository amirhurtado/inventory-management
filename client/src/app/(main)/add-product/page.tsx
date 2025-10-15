import HeaderAddProduct from '@/features/add-products/components/Header'
import React from 'react'

const AddProductPage = () => {
  return (
    <div className="flex flex-col w-full overflow-y-scroll md:max-h-dvh md:overflow-hidden gap-4 md:gap-8 p-2">
      <HeaderAddProduct />
    </div>
  )
}

export default AddProductPage