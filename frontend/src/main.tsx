import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App.tsx'
import './index.css'

// Configure axios once for the whole app
axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin
axios.defaults.withCredentials = false

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

