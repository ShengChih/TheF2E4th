import React from 'react'
import ReactDOM from 'react-dom/client'
import store from '@/store'
import { Provider } from 'react-redux'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import router from '@/routes/router'

import './index.css'
import './styles/scss/global.scss'

const pageRouter = createBrowserRouter(router)
const root = document.getElementById('root')

root &&
  ReactDOM.createRoot(root).render(
    <Provider store={store}>
      <RouterProvider router={pageRouter} />
    </Provider>,
  )
