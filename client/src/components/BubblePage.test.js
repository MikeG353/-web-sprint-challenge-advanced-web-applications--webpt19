import React from "react";
import { render, wait } from '@testing-library/react'
import BubblePage from "./BubblePage";
import { fetchColors as mockFetchColors } from '../api/fetchColors'
jest.mock('../api/fetchColors')

const colorsFixture = [
  {
    color: 'aliceblue',
    code: {
      hex: '#f0f8ff'
    },
    id: 1
  }
]

test("Fetches data and renders the bubbles", async () => {
  mockFetchColors.mockResolvedValueOnce(colorsFixture)
  const { getByText, debug, rerender } = render(<BubblePage />)
  await wait()
  rerender(<BubblePage/>)
  expect(getByText(/aliceblue/i)).toBeInTheDocument()
  debug()
});
