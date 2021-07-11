import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { FilterSelector } from "./FilterSelector"

const onSelect = jest.fn()
const onRemove = jest.fn()
const options = {
  selected: ["aaa", "bbb", "ccc"],
  available: ["ddd", "eee"],
}

describe("FilterSelector", () => {
  test("renders all the elements", () => {
    render(
      <FilterSelector
        options={options}
        placeholder={"Select option"}
        onSelect={onSelect}
        onRemove={onRemove}
      />
    )

    const selectElement = screen.getByRole("listbox")

    options.available.forEach((availableOption) => {
      expect(screen.getByText(availableOption)).toBeInTheDocument()
      expect(selectElement).toContainElement(screen.getByText(availableOption))
    })

    const listElement = screen.getByTestId("selected-filters")

    options.selected.forEach((selectedOption) => {
      expect(screen.getByText(selectedOption)).toBeInTheDocument()
      expect(listElement).toContainElement(screen.getByText(selectedOption))
    })
  })

  test("calls onRemove callback with proper argument", () => {
    render(
      <FilterSelector
        options={options}
        placeholder={"Select option"}
        onSelect={onSelect}
        onRemove={onRemove}
      />
    )

    userEvent.click(screen.getByTestId("remove-aaa"))

    expect(onRemove).toBeCalledWith("aaa")
  })

  test("calls onSelect callback with proper argument", () => {
    render(
      <FilterSelector
        options={options}
        placeholder={"Select option"}
        onSelect={onSelect}
        onRemove={onRemove}
      />
    )

    userEvent.selectOptions(screen.getByRole("listbox"), ["ddd"])

    expect(onSelect).toBeCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "ddd",
        }),
      })
    )
  })
})
