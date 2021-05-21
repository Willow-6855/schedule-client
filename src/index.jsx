import React from 'react';
import ReactDOM from 'react-dom';

import { ColorModeScript, ChakraProvider } from "@chakra-ui/react"

import App from './App';
import theme from './Hooks/theme'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
      </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

