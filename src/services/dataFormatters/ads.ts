import { csvToArrayOfObjects } from "../../utils/formatters"
import { AdsData } from "../requests/ads"

export const adsDataTransform = (input: string): AdsData => {
  return csvToArrayOfObjects(input, [
    false,
    false,
    false,
    true,
    true,
  ]) as AdsData
}
