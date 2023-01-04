import { ChakraProvider } from '@chakra-ui/react';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css';
import { theme } from './theme/theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
<BrowserRouter>
<React.StrictMode>
    <App />
  </React.StrictMode>
</BrowserRouter>
  </ChakraProvider>,
)
