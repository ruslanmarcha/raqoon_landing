import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n/index'
import './design-system/tokens.css'
import './design-system/base.css'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
