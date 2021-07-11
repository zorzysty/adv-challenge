import React from "react"
import { Link as RouterLink } from "react-router-dom"
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  ListItem,
  UnorderedList,
  VStack,
} from "@chakra-ui/react"

import { Chart } from "../../components/Chart"

import { useHome } from "./useHome"

// todo: this is a temporary dummy component to test routing
export const Home = () => {
  const { datasources, campaigns, isLoading, isSuccess, data } = useHome()

  return (
    <VStack alignItems={"stretch"} width={"100%"} spacing={6}>
      <Box>
        <Heading as={"h1"}>HOME</Heading>

        <HStack spacing={5} px={5} py={2}>
          <Link as={RouterLink} to="/?datasources=Google Analytics">
            single datasource
          </Link>

          <Link
            as={RouterLink}
            to="/?datasources=Google Analytics,Mailchimp,Facebook Ads"
          >
            only datasources
          </Link>

          <Link
            as={RouterLink}
            to="/?campaigns=New General Campaign - ROM - Desktop"
          >
            single campaign
          </Link>

          <Link
            as={RouterLink}
            to="/?campaigns=New General Campaign - ROM - Desktop,New General Campaign - Rest - Mobile"
          >
            only campaigns
          </Link>

          <Link
            as={RouterLink}
            to="/?datasources=Google Analytics,Mailchimp,Facebook Ads&campaigns=New General Campaign - ROM - Desktop,New General Campaign - Rest - Mobile"
          >
            both
          </Link>

          <Link as={RouterLink} to="/">
            none
          </Link>
        </HStack>
      </Box>

      <Box height={"600px"}>
        <Chart data={data} isLoading={isLoading} isSuccess={isSuccess} />
      </Box>

      <Flex mt={5}>
        <Box flex={1}>
          <Heading as={"h2"}>Selected datasources:</Heading>

          <UnorderedList>
            {datasources.map((datasource) => (
              <ListItem key={datasource}>{datasource}</ListItem>
            ))}
          </UnorderedList>
        </Box>

        <Box flex={1}>
          <Heading as={"h2"}>Selected campaigns:</Heading>

          <UnorderedList>
            {campaigns.map((campaign) => (
              <ListItem key={campaign}>{campaign}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Flex>
    </VStack>
  )
}
