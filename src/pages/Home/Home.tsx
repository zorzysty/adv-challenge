import React from "react"
import { Box, Grid } from "@chakra-ui/react"

import { Chart } from "../../components/Chart"
import { FilterSelector } from "../../components/FilterSelector"

import { useHome } from "./useHome"

export const Home = () => {
  const {
    datasources,
    campaigns,
    isLoading,
    isSuccess,
    data,
    pushToSelected,
    removeFromSelected,
  } = useHome()

  return (
    <Grid templateColumns="400px 1fr" height={"100vh"}>
      <Box
        as={"aside"}
        py={6}
        px={4}
        borderRight={"1px solid"}
        borderColor={"gray.300"}
        backgroundColor={"gray.50"}
      >
        <FilterSelector
          placeholder={"Select datasource to add"}
          options={datasources}
          onSelect={(e) => {
            pushToSelected(e, "datasources")
          }}
          onRemove={(option) => {
            removeFromSelected(option, "datasources")
          }}
        />

        <FilterSelector
          placeholder={"Select campaign to add"}
          options={campaigns}
          onSelect={(e) => {
            pushToSelected(e, "campaigns")
          }}
          onRemove={(option) => {
            removeFromSelected(option, "campaigns")
          }}
        />
      </Box>

      <Box as={"main"} height={"100%"} py={6}>
        <Chart data={data} isLoading={isLoading} isSuccess={isSuccess} />
      </Box>
    </Grid>
  )
}
