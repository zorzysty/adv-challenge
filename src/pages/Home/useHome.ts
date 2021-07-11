import { useHistory, useLocation } from "react-router-dom"
import { parse, stringify } from "query-string"
import { useQuery } from "react-query"
import { ChangeEvent } from "react"

import { config } from "../../config"
import { getQueryArray } from "../../utils/url"
import { getAdsData } from "../../services/requests/ads"
import {
  aggregateBy,
  filterData,
  getUniqueEntries,
} from "../../utils/dataOperations"

export const useHome = () => {
  const location = useLocation()
  const history = useHistory()

  const { isLoading, isSuccess, data } = useQuery("adsData", getAdsData, {
    retry: 1,
  })

  const queryStringData = parse(location.search, config.queryStringOptions)

  const selectedDatasources = getQueryArray(queryStringData, "datasources")
  const selectedCampaigns = getQueryArray(queryStringData, "campaigns")

  const availableDatasources = getUniqueEntries({
    data,
    property: "datasource",
    without: selectedDatasources,
  })

  const availableCampaigns = getUniqueEntries({
    data,
    property: "campaign",
    without: selectedCampaigns,
  })

  const filteredData = data
    ? filterData(data, [
        { key: "datasource", value: selectedDatasources },
        { key: "campaign", value: selectedCampaigns },
      ])
    : []

  const dataCombinedByDate = aggregateBy(filteredData, "date", [
    "clicks",
    "impressions",
  ])

  const pushToSelected = (
    e: ChangeEvent<HTMLSelectElement>,
    selectedArray: "datasources" | "campaigns"
  ) => {
    if (!e.target.value) {
      return
    }

    const search = stringify(
      {
        datasources:
          selectedArray === "datasources"
            ? [...selectedDatasources, e.target.value]
            : selectedDatasources,
        campaigns:
          selectedArray === "campaigns"
            ? [...selectedCampaigns, e.target.value]
            : selectedCampaigns,
      },
      config.queryStringOptions
    )

    history.push(`/?${search}`)
  }

  const removeFromSelected = (
    option: string | number,
    selectedArray: "datasources" | "campaigns"
  ) => {
    if (!option) {
      return
    }

    const search = stringify(
      {
        datasources:
          selectedArray === "datasources"
            ? selectedDatasources.filter((datasource) => datasource !== option)
            : selectedDatasources,
        campaigns:
          selectedArray === "campaigns"
            ? selectedCampaigns.filter((campaign) => campaign !== option)
            : selectedCampaigns,
      },
      config.queryStringOptions
    )

    history.push(`/?${search}`)
  }

  return {
    selectedDatasources,
    selectedCampaigns,
    data: dataCombinedByDate,
    isLoading,
    isSuccess,
    availableDatasources,
    availableCampaigns,
    pushToSelected,
    removeFromSelected,
  }
}
