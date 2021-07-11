import React, { ChangeEvent } from "react"
import {
  Box,
  Button,
  ListItem,
  Select,
  Text,
  UnorderedList,
} from "@chakra-ui/react"

type Props = {
  availableOptions: (string | number)[]
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => void
  selectedOptions: (string | number)[]
  onRemove: (option: string | number) => void
  placeholder: string
}

export const FilterSelector = ({
  availableOptions,
  selectedOptions,
  onSelect,
  onRemove,
  placeholder,
}: Props) => {
  return (
    <>
      <Select
        placeholder={placeholder}
        onChange={onSelect}
        bg={"white"}
        mb={1}
        disabled={availableOptions.length < 1}
      >
        {availableOptions.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Select>

      <Box
        borderRadius={4}
        border={"1px solid"}
        borderColor={"blue.300"}
        maxHeight={"300px"}
        minHeight={"150px"}
        overflowY={"auto"}
        mb={10}
      >
        <UnorderedList listStyleType={"none"} margin={0} spacing={1} p={2}>
          {selectedOptions.map((option) => (
            <ListItem
              key={option}
              borderRadius={3}
              border={"1px solid"}
              bg={"blue.50"}
              borderColor={"blue.300"}
              pl={2}
              pr={10}
              py={1}
              position={"relative"}
              _hover={{
                button: {
                  opacity: 100,
                },
              }}
            >
              <Text>{option}</Text>

              <Box
                position={"absolute"}
                top={0}
                right={1}
                height={"100%"}
                display={"flex"}
                alignItems={"center"}
              >
                <Button
                  size={"xs"}
                  opacity={0}
                  transform={"opacity 0.15s linear"}
                  onClick={() => {
                    onRemove(option)
                  }}
                >
                  &times;
                </Button>
              </Box>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </>
  )
}
