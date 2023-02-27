import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from "react-router-dom";
import App from './App'
import './index.css'

import { AuthStorageProvider } from '@contexts/AuthStorageContext';
import { AlertProvider } from '@contexts/AlertContext';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <AuthStorageProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </AuthStorageProvider>
    </Router>
  </React.StrictMode>,
)
