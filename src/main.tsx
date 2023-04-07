import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'

const AppComponent = React.lazy(() => import('./App'))


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppComponent />
    </ChakraProvider>
  </React.StrictMode>,
)
