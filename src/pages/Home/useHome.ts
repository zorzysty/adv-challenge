import { useHistory, useLocation } from "react-router-dom"
import { parse, stringify } from "query-string"
import { useQuery } from "react-query"
import { ChangeEvent } from "react"

import { config } from "../../config"
import { getQueryArray } from "../../utils/url"
import { AdsData, getAdsData } from "../../services/requests/ads"
import {
  aggregateBy,
  filterData,
  getUniqueEntries,
} from "../../utils/dataOperations"

function prepareData({
  data,
  selectedDatasources,
  selectedCampaigns,
}: {
  data?: AdsData
  selectedDatasources: string[]
  selectedCampaigns: string[]
}) {
  if (!data?.length) {
    return []
  }

  const filteredData = filterData(data, [
    { key: "datasource", value: selectedDatasources },
    { key: "campaign", value: selectedCampaigns },
  ])

  return aggregateBy(filteredData, "date", ["clicks", "impressions"])
}

export const useHome = () => {
  const location = useLocation()
  const history = useHistory()

  const { isLoading, isSuccess, data } = useQuery("adsData", getAdsData, {
    retry: 1,
  })

  const queryStringData = parse(location.search, config.queryStringOptions)

  const selectedDatasources = getQueryArray(queryStringData, "datasources")
  const selectedCampaigns = getQueryArray(queryStringData, "campaigns")

  const datasources = {
    selected: selectedDatasources,
    available: getUniqueEntries({
      data,
      property: "datasource",
      without: selectedDatasources,
    }),
  }

  const campaigns = {
    selected: selectedCampaigns,
    available: getUniqueEntries({
      data,
      property: "campaign",
      without: selectedCampaigns,
    }),
  }

  const preparedData = prepareData({
    data,
    selectedDatasources,
    selectedCampaigns,
  })

  const pushToSelected = (
    e: ChangeEvent<HTMLSelectElement>,
    selectedArray: "datasources" | "campaigns"
  ) => {
    if (!e.target.value) {
      return
    }

    const current = {
      datasources: selectedDatasources,
      campaigns: selectedCampaigns,
    }

    const updated = {
      ...current,
      [selectedArray]: current[selectedArray].concat(e.target.value),
    }

    const search = stringify(updated, config.queryStringOptions)

    history.push(`/?${search}`)
  }

  const removeFromSelected = (
    option: string | number,
    selectedArray: "datasources" | "campaigns"
  ) => {
    if (!option) {
      return
    }

    const current = {
      datasources: selectedDatasources,
      campaigns: selectedCampaigns,
    }

    const updated = {
      ...current,
      [selectedArray]: current[selectedArray].filter((item) => item !== option),
    }

    const search = stringify(updated, config.queryStringOptions)

    history.push(`/?${search}`)
  }

  return {
    datasources,
    campaigns,
    data: preparedData,
    isLoading,
    isSuccess,
    pushToSelected,
    removeFromSelected,
  }
}
