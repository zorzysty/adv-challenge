import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { Heading, ListItem, UnorderedList, Link } from "@chakra-ui/react"

import { useHome } from "./useHome"

// todo: this is a temporary dummy component to test routing
export const Home = () => {
  const { campaigns, datasources } = useHome()

  return (
    <>
      <Heading as={"h1"}>HOMEss</Heading>

      <UnorderedList>
        <ListItem>
          <Link as={RouterLink} to="/?datasources=aaa">
            single datasource
          </Link>
        </ListItem>

        <ListItem>
          <Link as={RouterLink} to="/?datasources=aaa,bbb,ccc,aaa">
            only datasources
          </Link>
        </ListItem>

        <ListItem>
          <Link as={RouterLink} to="/?campaigns=xxx">
            single campaign
          </Link>
        </ListItem>

        <ListItem>
          <Link as={RouterLink} to="/?campaigns=xxx,yyy,zzz,yyy">
            only campaigns
          </Link>
        </ListItem>

        <ListItem>
          <Link
            as={RouterLink}
            to="/?datasources=aaa,bbb,ccc,aaa&campaigns=xxx,yyy,zzz,yyy"
          >
            both
          </Link>
        </ListItem>

        <ListItem>
          <Link as={RouterLink} to="/">
            none
          </Link>
        </ListItem>
      </UnorderedList>

      <Heading as={"h2"}>Selected datasources:</Heading>

      <UnorderedList>
        {datasources.map((datasource) => (
          <ListItem key={datasource}>{datasource}</ListItem>
        ))}
      </UnorderedList>

      <Heading as={"h2"}>Selected campaigns:</Heading>

      <UnorderedList>
        {campaigns.map((campaign) => (
          <ListItem key={campaign}>{campaign}</ListItem>
        ))}
      </UnorderedList>
    </>
  )
}
