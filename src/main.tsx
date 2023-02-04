import { ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { ReactFlowContextProvider } from './contexts/reactflowContext'
import theme from './theme'
import './global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ReactFlowContextProvider>
        <App />
      </ReactFlowContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
