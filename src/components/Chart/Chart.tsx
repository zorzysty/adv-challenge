import React from "react"
import { Center, Spinner, Text } from "@chakra-ui/react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { AdsData } from "../../services/requests/ads"
import { dMMM, positiveNumberToKMB } from "../../utils/formatters"

type Props = {
  data?: AdsData
  isLoading: boolean
  isSuccess: boolean
}

export const Chart = ({ data, isLoading, isSuccess }: Props) => {
  if (isLoading) {
    return (
      <Center height={"100%"}>
        <Spinner />
      </Center>
    )
  }

  if (!isSuccess) {
    return <Text>Oops! Something went wrong</Text>
  }

  if (!data?.length) {
    return <Text>No data in the file :(</Text>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          right: 30,
          left: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={dMMM} />
        <YAxis
          yAxisId="left"
          label={{ value: "Clicks", angle: -90, position: "left" }}
          tickFormatter={positiveNumberToKMB}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{
            value: "Impressions",
            angle: 90,
            position: "right",
          }}
          tickFormatter={positiveNumberToKMB}
        />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          name="Clicks"
          type="monotone"
          dataKey="clicks"
          stroke="#8884d8"
          strokeWidth={2}
        />
        <Line
          yAxisId="right"
          type="monotone"
          name="Impressions"
          dataKey="impressions"
          stroke="#82ca9d"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
