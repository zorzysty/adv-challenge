import { useLocation } from "react-router-dom"
import { parse } from "query-string"
import { useQuery } from "react-query"

import { getQueryArray } from "../../utils/url"
import { getAdsData } from "../../services/requests/ads"
import { aggregateBy, filterData } from "../../utils/dataOperations"

export const useHome = () => {
  const location = useLocation()

  const queryStringData = parse(location.search, {
    arrayFormat: "separator",
    arrayFormatSeparator: ",",
  })

  const datasources = getQueryArray(queryStringData, "datasources")
  const campaigns = getQueryArray(queryStringData, "campaigns")

  const { isLoading, isSuccess, data } = useQuery("adsData", getAdsData, {
    retry: 1,
  })

  const filteredData = data
    ? filterData(data, [
        { key: "datasource", value: datasources },
        { key: "campaign", value: campaigns },
      ])
    : []

  const dataCombinedByDate = aggregateBy(filteredData, "date", [
    "clicks",
    "impressions",
  ])

  return {
    datasources,
    campaigns,
    data: dataCombinedByDate,
    isLoading,
    isSuccess,
  }
}
