import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode> {/** Note: Due to this Strict mode the render and API call would happen twice in the dev mode. But not in the Prod */}
    <App />
  /* </StrictMode>, */
)
