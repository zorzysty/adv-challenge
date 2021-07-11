import { adsData } from "../mocks/tests/dataOperations"

import { aggregateBy, filterData, getUniqueEntries } from "./dataOperations"

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

describe("filterData", () => {
  test("returns the input data if empty arrays are provided", () => {
    const result = filterData(adsData, [
      { key: "datasource", value: [] },
      { key: "campaign", value: [] },
    ])

    expect(result).toEqual(adsData)
  })

  test("returns filtered data by array values", () => {
    const result = filterData(adsData, [
      { key: "datasource", value: ["Facebook Ads"] },
      { key: "campaign", value: ["Offer Campaigns - Conversions"] },
    ])

    expect(result).toEqual([
      {
        date: "01.01.2019",
        datasource: "Facebook Ads",
        campaign: "Offer Campaigns - Conversions",
        clicks: 10245,
        impressions: 764627,
      },
      {
        date: "02.03.2020",
        datasource: "Facebook Ads",
        campaign: "Offer Campaigns - Conversions",
        clicks: 10245,
        impressions: 764627,
      },
      {
        date: "02.03.2020",
        datasource: "Facebook Ads",
        campaign: "Offer Campaigns - Conversions",
        clicks: 10245,
        impressions: 764627,
      },
    ])
  })

  test("returns filtered data by array values if multiple provided", () => {
    const result = filterData(adsData, [
      { key: "datasource", value: ["Facebook Ads"] },
      { key: "campaign", value: ["Offer Campaigns - Conversions", "Like Ads"] },
    ])

    expect(result).toEqual([
      {
        date: "01.01.2019",
        datasource: "Facebook Ads",
        campaign: "Like Ads",
        clicks: 274,
        impressions: 1979,
      },
      {
        date: "01.01.2019",
        datasource: "Facebook Ads",
        campaign: "Offer Campaigns - Conversions",
        clicks: 10245,
        impressions: 764627,
      },
      {
        date: "02.03.2020",
        datasource: "Facebook Ads",
        campaign: "Offer Campaigns - Conversions",
        clicks: 10245,
        impressions: 764627,
      },
      {
        date: "02.03.2020",
        datasource: "Facebook Ads",
        campaign: "Offer Campaigns - Conversions",
        clicks: 10245,
        impressions: 764627,
      },
    ])
  })

  test("includes all values for a given property if empty array is provided", () => {
    const result = filterData(adsData, [
      { key: "datasource", value: [] },
      { key: "campaign", value: ["B2B - Leads"] },
    ])

    expect(result).toEqual([
      {
        date: "01.01.2019",
        datasource: "Google Adwords",
        campaign: "B2B - Leads",
        clicks: 7,
        impressions: 444,
      },
      {
        date: "02.03.2020",
        datasource: "Google Adwords",
        campaign: "B2B - Leads",
        clicks: 7,
        impressions: 444,
      },
      {
        date: "08.10.2021",
        datasource: "Google Adwords",
        campaign: "B2B - Leads",
        clicks: 7,
        impressions: 444,
      },
    ])
  })

  test("does not include entries where one of the filters is not met", () => {
    const result = filterData(adsData, [
      { key: "datasource", value: ["Facebook Ads"] },
      {
        key: "campaign",
        value: ["Offer Campaigns - Conversions", "Like Ads", "B2B - Leads"],
      },
    ])

    expect(result).toEqual([
      {
        date: "01.01.2019",
        datasource: "Facebook Ads",
        campaign: "Like Ads",
        clicks: 274,
        impressions: 1979,
      },
      {
        date: "01.01.2019",
        datasource: "Facebook Ads",
        campaign: "Offer Campaigns - Conversions",
        clicks: 10245,
        impressions: 764627,
      },
      {
        date: "02.03.2020",
        datasource: "Facebook Ads",
        campaign: "Offer Campaigns - Conversions",
        clicks: 10245,
        impressions: 764627,
      },
      {
        date: "02.03.2020",
        datasource: "Facebook Ads",
        campaign: "Offer Campaigns - Conversions",
        clicks: 10245,
        impressions: 764627,
      },
    ])
  })
})

describe("getUniqueEntries", () => {
  test.each([
    ["campaign", ["Like Ads", "Offer Campaigns - Conversions", "B2B - Leads"]],
    ["datasource", ["Facebook Ads", "Google Adwords"]],
  ])(
    "returns unique entries by property (%s)",
    // @ts-ignore this is all right for the given cases of "campaign" and "datasource"
    (input: "campaign" | "datasource", expected) => {
      const result = getUniqueEntries({
        data: adsData,
        property: input,
        without: [],
      })

      expect(result).toEqual(expected)
    }
  )

  test.each([
    [[], ["Like Ads", "Offer Campaigns - Conversions", "B2B - Leads"]],
    [["Like Ads"], ["Offer Campaigns - Conversions", "B2B - Leads"]],
    [["Offer Campaigns - Conversions", "B2B - Leads"], ["Like Ads"]],
    [["Like Ads", "Offer Campaigns - Conversions", "B2B - Leads"], []],
  ])("removes values from the without array (%s)", (input, expected) => {
    const result = getUniqueEntries({
      data: adsData,
      property: "campaign",
      without: input,
    })

    expect(result).toEqual(expected)
  })
})
