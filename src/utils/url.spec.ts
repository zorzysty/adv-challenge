import { parse } from "query-string"

import { getQueryArray } from "./url"

const locationBase = {
  hash: "",
  pathname: "/",
  search: "",
}

const mockQueryStringData = (
  property?: {
    [key in keyof typeof locationBase]?: string
  }
) => {
  const location = {
    ...locationBase,
    ...property,
  }

  return parse(location.search, {
    arrayFormat: "separator",
    arrayFormatSeparator: ",",
  })
}

describe("getQueryArray", () => {
  test.each([
    ["?val=x", ["x"]],
    ["?val=x sdsa sass ", ["x sdsa sass"]],
    ["?val=x&other=1,as,vdas", ["x"]],
    ["?other=dsa&val=x", ["x"]],
    ["?val=123", ["123"]],
  ])("returns single value as an array (%s)", (search, expected) => {
    const queryStringData = mockQueryStringData({ search })

    const testValue = getQueryArray(queryStringData, "val")

    expect(testValue).toEqual(expected)
  })

  test.each([
    ["?val=x,y,z", ["x", "y", "z"]],
    ["?val=x sdsa sass ,uu,, aa", ["x sdsa sass ", "uu", " aa"]],
    ["?val=x,y&other=1,as,vdas", ["x", "y"]],
    ["?other=dsa&val=x,y, z", ["x", "y", " z"]],
    ["?val=123,x,[a]", ["123", "x", "[a]"]],
  ])("returns multiple values as an array (%s)", (search, expected) => {
    const queryStringData = mockQueryStringData({ search })

    const testValue = getQueryArray(queryStringData, "val")

    expect(testValue).toEqual(expected)
  })

  test.each([
    ["?val=", []],
    ["?other=x,y,,val", []],
    ["?other=x,y,val&val", []],
    ["?other=x,y,val&val=", []],
    ["", []],
    ["?", []],
  ])("returns empty array of val for (%s)", (search, expected) => {
    const queryStringData = mockQueryStringData({ search })

    const testValue = getQueryArray(queryStringData, "val")

    expect(testValue).toEqual(expected)
  })

  test.each([
    ["?val=x,y,z,y,x,,,,z", ["x", "y", "z"]],
    ["?val=x sdsa sass ,uu, aa,uu", ["x sdsa sass ", "uu", " aa"]],
    ["?val=x,y,x,x,y&other=1,as,vdas", ["x", "y"]],
    ["?other=dsa&val=x,y, z,y, z", ["x", "y", " z"]],
    ["?val=123,123,x,[a],123,[a]", ["123", "x", "[a]"]],
  ])("removes duplicated values (%s)", (search, expected) => {
    const queryStringData = mockQueryStringData({ search })

    const testValue = getQueryArray(queryStringData, "val")

    expect(testValue).toEqual(expected)
  })
})
