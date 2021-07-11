import { useLocation } from "react-router-dom"
import { parse } from "query-string"
import { useQuery } from "react-query"

import { getQueryArray } from "../../utils/url"
import { getAdsData } from "../../services/requests/ads"

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

  return {
    datasources,
    campaigns,
    //todo: remove slicing
    data: data?.slice(0, 5),
    isLoading,
    isSuccess,
  }
}
