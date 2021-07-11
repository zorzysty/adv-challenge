import { Api } from "../apiClient"
import { adsDataTransform } from "../dataTransformations/ads"
import { ArrayFromCsv } from "../../utils/data"

export const getAdsData = (): Promise<ArrayFromCsv> =>
  Api.get("/DAMKBAoDBwoDBAkOBAYFCw.csv").then(({ data }) =>
    adsDataTransform(data)
  )
