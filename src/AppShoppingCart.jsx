import React from 'react'
import AppRoutes from './routes/AppRoutes'
import NavBar from './ui/NavBar'

export const AppShoppingCart = () => {
  const dia = 12;
  return (
    <>
        <NavBar titulo="ShoppingCart => Luis Miranda" subtitulo={dia}/>
        <AppRoutes/>
    </>
  )
}

export default AppShoppingCart
