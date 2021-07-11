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
  counts: Array<keyof Unarray<DataType>>
): DataType | [] => {
  const reducer = (accu: Reduced<DataType>, current: Unarray<DataType>) => {
    const aggregated = produce(accu.aggregated, (draft: DataType) => {
      // add current counts to aggregated values for this property
      if (current[property] === accu.lastPropertyValue) {
        counts.forEach((count) => {
          ;(draft[draft.length - 1][count] as number) += current[
            count
          ] as number
        })
        return
      }

      // create an object if the new value of a property was reached
      const newEntryStub = {
        [property]: current[property],
      }

      const newEntry = produce(newEntryStub, (newEntryDraft) => {
        counts.forEach((count) => {
          ;(newEntryDraft[count] as number) = current[count] as number
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
