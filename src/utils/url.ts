import { ParsedQuery } from "query-string"

export const getQueryArray = (
  queryStringData: ParsedQuery,
  param: string
): string[] => {
  const value = queryStringData[param]

  if (!value) {
    return []
  }

  return typeof value === "string" ? [value] : [...new Set(value)]
}
