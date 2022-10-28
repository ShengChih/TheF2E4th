import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/sass/global.sass'

import TDXApi from '@api/TDXApi'

(function () {
  // for testing
  let client_id = localStorage.getItem('client_id') ?? ''
  let client_secret = localStorage.getItem('client_secret') ?? ''
  
  if (!!!client_id) {
    client_id = prompt('client_id') ?? ''
    localStorage.setItem('client_id', client_id)
  }

  if (!!!client_secret) {
    client_secret = prompt('client_secret') ?? ''
    localStorage.setItem('client_secret', client_secret)
  }

  const mainApi = TDXApi.getInstance();
  mainApi.setClientInfo(
    localStorage.getItem('client_id') ?? '',
    localStorage.getItem('client_secret') ?? '',
  )
} ())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
