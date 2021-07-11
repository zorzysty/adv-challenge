import React from "react"
import { Link as RouterLink } from "react-router-dom"
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react"

import { useHome } from "./useHome"

// todo: this is a temporary dummy component to test routing
export const Home = () => {
  const { datasources, campaigns, isLoading, isSuccess, data } = useHome()

  if (isLoading) {
    return <Spinner />
  }

  if (!isSuccess) {
    return <Text>Oops! Something went wrong</Text>
  }

  return (
    <VStack alignItems={"stretch"} width={"100%"} spacing={6}>
      <Box>
        <Heading as={"h1"}>HOME</Heading>

        <HStack spacing={5} px={5} py={2}>
          <Link as={RouterLink} to="/?datasources=aaa">
            single datasource
          </Link>

          <Link as={RouterLink} to="/?datasources=aaa,bbb,ccc,aaa">
            only datasources
          </Link>

          <Link as={RouterLink} to="/?campaigns=xxx">
            single campaign
          </Link>

          <Link as={RouterLink} to="/?campaigns=xxx,yyy,zzz,yyy">
            only campaigns
          </Link>

          <Link
            as={RouterLink}
            to="/?datasources=aaa,bbb,ccc,aaa&campaigns=xxx,yyy,zzz,yyy"
          >
            both
          </Link>

          <Link as={RouterLink} to="/">
            none
          </Link>
        </HStack>
      </Box>

      <Box>
        <Heading as={"h2"}>Fetched data slice:</Heading>

        <Box
          border={"1px solid"}
          borderColor={"purple.100"}
          borderRadius={5}
          px={5}
          pt={5}
        >
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Box>
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
