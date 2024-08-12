import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import  CssBaseline  from '@mui/material/CssBaseline'
import { ContextProvider } from './contexts/ContextProvider.tsx'
import { ThemeProvider } from '@emotion/react'
import { LayoutContextProvider } from './contexts/LayoutContextProvider.tsx'
import App from './App.tsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import "dayjs/locale/es"
import theme from './services/theme.service.ts'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
        <ContextProvider>
            <LayoutContextProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </LayoutContextProvider>
        </ContextProvider>
    </LocalizationProvider>
  </React.StrictMode>,
)
