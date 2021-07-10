import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import { BrowserRouter as Router } from "react-router-dom"

import { Home } from "./pages/Home"
import { theme } from "./theme/theme"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Home />
    </Router>
  </ChakraProvider>
)
