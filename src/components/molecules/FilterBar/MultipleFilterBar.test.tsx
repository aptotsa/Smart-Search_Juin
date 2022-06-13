import { render } from "@testing-library/react";
import {
  mockedFilmLocationFilters,
  mockedFilmLocationSelectedFilters,
} from "../../../mocks/FilmLocationMocks";
import { MultipleFilterBar } from "./MultipleFilterBar";

describe("<FilterBar/>", () => {
  test("should render correctly", () => {
    const { container } = render(
      <MultipleFilterBar
        filters={mockedFilmLocationFilters}
        selectedFilters={mockedFilmLocationSelectedFilters}
        setSelectedFilters={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
