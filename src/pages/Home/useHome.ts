import { useLocation } from "react-router-dom"
import { parse } from "query-string"

import { getQueryArray } from "../../utils/url"

export const useHome = () => {
  const location = useLocation()

  const queryStringData = parse(location.search, {
    arrayFormat: "separator",
    arrayFormatSeparator: "|",
  })

  const datasources = getQueryArray(queryStringData, "datasources")
  const campaigns = getQueryArray(queryStringData, "campaigns")

  return {
    datasources,
    campaigns,
  }
}
