import React from "react"
import { BrowserRouter as Router } from "react-router-dom"

import { Home } from "./pages/Home"

export const App = () => (
  <Router>
    <Home />
  </Router>
)
