
import { BrowserRouter } from 'react-router'
import AppShoppingCart from './AppShoppingCart'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppShoppingCart />
      </BrowserRouter>

    </Provider>
  </React.StrictMode>,
)
