
import { BrowserRouter } from 'react-router'
import AppShoppingCart from './AppShoppingCart'
import ReactDOM from 'react-dom/client'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppShoppingCart />
    </BrowserRouter>
  </React.StrictMode>,
)
