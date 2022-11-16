import React from 'react'
import ReactDOM from 'react-dom/client'
import store from '@/store'
import { Provider } from 'react-redux'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import router from '@routes/router'

import './index.css'
import './styles/scss/global.scss'

const pageRouter = createBrowserRouter(router)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={pageRouter} />
  </Provider>
)
