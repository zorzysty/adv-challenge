import { ChakraProvider } from "@chakra-ui/react"
import { QueryClientProvider, QueryClient } from "react-query"
import React, { ReactNode } from "react"
import { ReactQueryDevtools } from "react-query/devtools"

import { theme } from "./theme/theme"

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

type Props = {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}
