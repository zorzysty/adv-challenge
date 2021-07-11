import produce from "immer"
import { format } from "date-fns"

export type ArrayFromCsv = { [header: string]: number | string }[]

/**
 * Converts csv contents to an array of objects with keys representing header names
 */
export const csvToArrayOfObjects = (
  input: string,
  numberConversions?: Array<boolean>
): ArrayFromCsv => {
  try {
    const trimmedInput = input.trim()

    if (!trimmedInput) {
      return []
    }

    const [headersLine, ...itemLines] = trimmedInput.split("\n")

    const headers = headersLine
      .split(",")
      .map((header: string) => header.toLowerCase())

    return itemLines.map((itemLine) => {
      const itemArray = itemLine.split(",")

      // reduce itemArray to an object with headers as keys
      return itemArray.reduce((accu, curr, idx) => {
        return produce(accu, (draft: Record<string, unknown>) => {
          draft[headers[idx]] = numberConversions?.[idx] ? Number(curr) : curr
        })
      }, {})
    })
  } catch {
    return []
  }
}

export const positiveNumberToKMB = (number: number): string => {
  if (number >= 1_000_000_000) {
    return (number / 1_000_000_000).toString() + "B"
  }

  if (number >= 1_000_000) {
    return (number / 1_000_000).toString() + "M"
  }

  if (number >= 1_000) {
    return (number / 1_000).toString() + "K"
  }

  return number.toString()
}

export const dMMM = (date: string): string => {
  const [day, month, year] = date.split(".")
  const properDate = `${year}=${month}-${day}`

  return format(new Date(properDate), "d MMM")
}
