import { render, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

test("calls onSearch with the correct query when the search button is clicked", () => {
  const mockOnSearch = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <SearchBar onSearch={mockOnSearch} />
  );
  const inputElement = getByPlaceholderText("Search movies...");
  const searchButton = getByText("Search");

  const query = "Batman";
  fireEvent.change(inputElement, { target: { value: query } });
  fireEvent.click(searchButton);

  expect(mockOnSearch).toHaveBeenCalledWith(query);
});
