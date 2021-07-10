import React from "react"
import { Link } from "react-router-dom"

import { useHome } from "./useHome"

// todo: this is a temporary dummy component to test routing
export const Home = () => {
  const { campaigns, datasources } = useHome()

  return (
    <div>
      <h1>HOME</h1>

      <h2>Selected datasources:</h2>
      <ul>
        {datasources.map((datasource) => (
          <li key={datasource}>{datasource}</li>
        ))}
      </ul>

      <h2>Selected campaigns:</h2>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign}>{campaign}</li>
        ))}
      </ul>

      <ul>
        <li>
          <Link to="/?datasources=aaa">single datasource</Link>
        </li>

        <li>
          <Link to="/?datasources=aaa|bbb|ccc|aaa">only datasources</Link>
        </li>

        <li>
          <Link to="/?campaigns=xxx">single campaign</Link>
        </li>

        <li>
          <Link to="/?campaigns=xxx|yyy|zzz|yyy">only campaigns</Link>
        </li>

        <li>
          <Link to="/?datasources=aaa|bbb|ccc|aaa&campaigns=xxx|yyy|zzz|yyy">
            both
          </Link>
        </li>

        <li>
          <Link to="/">none</Link>
        </li>
      </ul>
    </div>
  )
}
