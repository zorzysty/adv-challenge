export type ArrayFromCsv = { [header: string]: number | string }[]

/**
 * Converts csv contents to an array of objects with keys representing header names
 */
export const csvToArrayOfObjects = (
  input: string,
  numberConversions?: Array<boolean>
): ArrayFromCsv => {
  const [headersLine, ...itemLines] = input
    .split("\n")
    // filter out empty lines
    .filter((line) => Boolean(line.length))

  const headers = headersLine
    .split(",")
    .map((header: string) => header.toLowerCase())

  return itemLines.map((itemLine) => {
    const itemArray = itemLine.split(",")

    // reduce itemArray to an object with headers as keys
    return itemArray.reduce((accu, curr, idx) => {
      return {
        ...accu,
        [headers[idx]]: numberConversions?.[idx] ? Number(curr) : curr,
      }
    }, {})
  })
}
