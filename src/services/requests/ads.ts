import { Api } from "../apiClient"
import { adsDataTransform } from "../dataFormatters/ads"

export type AdsData = {
  date: string
  datasource: string
  campaign: string
  clicks: number
  impressions: number
}[]

export const getAdsData = (): Promise<AdsData> =>
  Api.get("/DAMKBAoDBwoDBAkOBAYFCw.csv").then(({ data }) =>
    adsDataTransform(data)
  )
