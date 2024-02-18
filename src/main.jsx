import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextsProvider } from './useContext/ContextsProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextsProvider>
      <App />
    </ContextsProvider>
  </React.StrictMode>,
)
