import React from "react"
import { BrowserRouter as Router } from "react-router-dom"

import { Home } from "./pages/Home"
import { Providers } from "./Providers"

export const App = () => (
  <Providers>
    <Router>
      <Home />
    </Router>
  </Providers>
)
