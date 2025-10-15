import HeaderAddProduct from '@/features/add-products/components/Header';
import AddProductForm from '@/features/add-products/components/AddProductForm';
import React from 'react'

const AddProductPage = () => {
  return (
    <div className="flex flex-col w-full overflow-y-auto md:max-h-dvh gap-4 md:gap-8 p-2">
      <HeaderAddProduct />
      <AddProductForm />
    </div>
  )
}

export default AddProductPage