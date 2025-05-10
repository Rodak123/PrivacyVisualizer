import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import './styles/index.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "./provider/ThemeProvider";
import { LocaleProvider } from "./provider/LocaleProvider";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
