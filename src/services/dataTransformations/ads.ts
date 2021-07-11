import { ArrayFromCsv, csvToArrayOfObjects } from "../../utils/data"

export const adsDataTransform = (input: string): ArrayFromCsv => {
  return csvToArrayOfObjects(input, [false, false, false, true, true])
}
