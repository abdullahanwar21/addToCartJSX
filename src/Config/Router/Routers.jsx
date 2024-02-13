import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ShoppingCart from '../../Components/CartPage'
import Cards from '../../Components/Card'
import PrimarySearchAppBar from '../../Components/Navbar'

const Routers = () => {
  return (
    <div>
      <BrowserRouter>
      <PrimarySearchAppBar />
      <Routes>
        <Route path='/' element={<Cards />} />
        <Route path='/cart' element={<ShoppingCart />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routers
