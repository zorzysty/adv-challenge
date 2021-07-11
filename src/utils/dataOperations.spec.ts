import { adsData } from "../mocks/tests/dataOperations"

import { aggregateBy } from "./dataOperations"

describe("aggregateBy", () => {
  test("aggregates counts by the given property value", () => {
    expect(aggregateBy(adsData, "date", ["clicks", "impressions"])).toEqual([
      {
        clicks: 10526,
        date: "01.01.2019",
        impressions: 767050,
      },
      {
        clicks: 20497,
        date: "02.03.2020",
        impressions: 1529698,
      },
      {
        clicks: 7,
        date: "08.10.2021",
        impressions: 444,
      },
    ])
  })
})
