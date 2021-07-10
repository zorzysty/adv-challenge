import { Api } from "../apiClient"
import { adsDataTransform } from "../dataTransformations/ads"

export const getAdsData = (): Promise<string> =>
  Api.get("/DAMKBAoDBwoDBAkOBAYFCw.csv").then(({ data }) =>
    adsDataTransform(data)
  )
