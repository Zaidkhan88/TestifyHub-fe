import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { LinkProvider } from './context/LinkContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <AuthProvider>
      <LinkProvider>
    <App />
    </LinkProvider>
    </AuthProvider>
    
   
  </StrictMode>,
)
