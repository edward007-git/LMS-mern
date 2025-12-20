import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import AppContextProvider from './Context/AppContextProvider';
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'


// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
const root = createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} 
  afterSignOutUrl={'/'}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
    </ClerkProvider>
  </BrowserRouter>
)
