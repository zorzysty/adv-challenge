import React from "react"
import ReactDOM from "react-dom"

import { App } from "./App"
import { config } from "./config"

if (process.env.NODE_ENV === "development" && config.enableResponseMocking) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require("./mocks/browser")

  worker.start()
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
