import React from "react";
import { render } from '@testing-library/react'
import BubblePage from "./BubblePage";
import { fetchColors as mockFetchColors } from '../api/fetchColors'
jest.mock('../api/fetchColors')

const colorsFixture ={
  colorList: {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff"
    },
    id: 1
  },
}

test("Fetches data and renders the bubbles", () => {
  mockFetchColors.mockResolvedValueOnce(colorsFixture)
  const { getByText } = render (<BubblePage />)
});
