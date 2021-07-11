import path from "path"
import fs from "fs"

import { csvToArrayOfObjects, dMMM, positiveNumberToKMB } from "./formatters"

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

  test("returns empty array given an empty file", () => {
    const emptyResult = csvToArrayOfObjects("")

    expect(emptyResult).toEqual([])
  })

  test.each([
    [{}, []],
    [[], []],
    [122, []],
    [true, []],
    [null, []],
    [undefined, []],
    [function () {}, []],
  ])(
    "returns empty array given an invalid input type (%s)",
    (input, expected) => {
      // @ts-ignore purposeful wrong input type
      expect(csvToArrayOfObjects(input)).toEqual(expected)
    }
  )
})

describe("numberToKMB", () => {
  test.each([
    [0, "0"],
    [1, "1"],
    [10, "10"],
    [111, "111"],
    [999, "999"],
    [1_000, "1K"],
    [1_001, "1.001K"],
    [1_449, "1.449K"],
    [1_499, "1.499K"],
    [1_500, "1.5K"],
    [1_999, "1.999K"],
    [2_000, "2K"],
    [2_499, "2.499K"],
    [2_500, "2.5K"],
    [499_999, "499.999K"],
    [1_000_000, "1M"],
    [1_000_000_000, "1B"],
  ])("returns proper string (%s)", (input, expected) => {
    expect(positiveNumberToKMB(input)).toEqual(expected)
  })
})

describe("dateFormat", () => {
  test.each([
    ["31.01.2019", "31 Jan"],
    ["01.01.2019", "01 Jan"],
    ["29.10.2019", "29 Oct"],
    ["02.09.2035", "02 Sep"],
    ["04.12.2022", "04 Dec"],
  ])("returns proper date string (%s)", (input, expected) => {
    expect(dMMM(input)).toEqual(expected)
  })
})
