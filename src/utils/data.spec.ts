import path from "path"
import fs from "fs"

import { csvToArrayOfObjects } from "./data"

const file = path.join(__dirname, "../", "mocks/adsData.test.csv")
const csvContents = fs.readFileSync(file, "utf8")

const result = csvToArrayOfObjects(csvContents)

describe("csvToArrayOfObjects", () => {
  test("returns array of proper length", () => {
    expect(result.length).toBe(123)
  })

  test("returns array of objects with key as in first line", () => {
    result.forEach((dataItem) => {
      const keys = Object.keys(dataItem)

      expect(keys).toEqual([
        "date",
        "datasource",
        "campaign",
        "clicks",
        "impressions",
      ])
    })
  })

  test("each object has string values if not otherwise requested", () => {
    result.forEach((dataItem) => {
      const values = Object.values(dataItem)

      values.forEach((value) => {
        expect(typeof value).toBe("string")
      })
    })
  })

  test("converts values to numbers according if requested", () => {
    const conversions = [false, false, false, true, true]
    const resultWithConversion = csvToArrayOfObjects(csvContents, conversions)

    resultWithConversion.forEach((dataItem) => {
      const values = Object.values(dataItem)

      expect(typeof values[0]).toBe("string")
      expect(typeof values[1]).toBe("string")
      expect(typeof values[2]).toBe("string")
      expect(typeof values[3]).toBe("number")
      expect(typeof values[4]).toBe("number")
    })
  })
})
