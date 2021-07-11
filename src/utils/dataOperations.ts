import { produce } from "immer"

type Reduced<DataType> = {
  aggregated: DataType
  lastPropertyValue: string | number
}

type BaseType = {
  [key: string]: number | string
}[]

type Unarray<T> = T extends Array<infer U> ? U : T

export const aggregateBy = <DataType extends BaseType>(
  data: DataType,
  property: keyof Unarray<DataType>,
  metrics: Array<keyof Unarray<DataType>>
): DataType => {
  const reducer = (accu: Reduced<DataType>, current: Unarray<DataType>) => {
    const aggregated = produce(accu.aggregated, (draft: DataType) => {
      // add current metrics to aggregated values for this property
      if (current[property] === accu.lastPropertyValue) {
        metrics.forEach((metric) => {
          ;(draft[draft.length - 1][metric] as number) += current[
            metric
          ] as number
        })
        return
      }

      // create an object if the new value of a property was reached
      const newEntryStub = {
        [property]: current[property],
      }

      const newEntry = produce(newEntryStub, (newEntryDraft) => {
        metrics.forEach((metric) => {
          ;(newEntryDraft[metric] as number) = current[metric] as number
        })
      })

      draft.push(newEntry)
    })

    return {
      aggregated,
      lastPropertyValue: current[property],
    }
  }

  // @ts-ignore todo: improve types
  const reduced: Reduced<DataType> = data.reduce(reducer, {
    aggregated: [],
    lastPropertyValue: null,
  })

  return reduced.aggregated
}

export const filterData = <DataType extends BaseType>(
  data: DataType,
  filters: { key: string; value: string[] }[]
): DataType => {
  const result = data.filter((entry) => {
    const fitsAnyFilter = filters.reduce((accu, curr) => {
      const fitsFilter =
        curr.value.length === 0 ||
        curr.value.includes(entry[curr.key] as string)

      return accu && fitsFilter
    }, true)

    return fitsAnyFilter
  })

  // todo: improve types
  return result as DataType
}

type GetUniqueEntriesArgs<DataType> = {
  data?: DataType
  property: keyof Unarray<DataType>
  without: Array<string | number>
}

export const getUniqueEntries = <DataType extends BaseType>({
  data,
  property,
  without,
}: GetUniqueEntriesArgs<DataType>): Array<string | number> => {
  if (!data?.length) {
    return []
  }

  // @ts-ignore todo: improve types
  const mapped = data.map((entry) => entry[property])

  const deDuplicated = [...new Set(mapped)]

  const withRemovedEntries = deDuplicated.filter(
    (entry: string | number) => !without.includes(entry)
  )

  return withRemovedEntries as string[]
}
