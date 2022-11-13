import React from 'react'
import ReactDOM from 'react-dom/client'
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
  <React.StrictMode>
    <RouterProvider router={pageRouter} />
  </React.StrictMode>
)
