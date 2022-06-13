import { render } from "@testing-library/react";
import {
  mockedFilmLocationFilters,
  mockedFilmLocationSelectedFilters,
} from "../../../mocks/FilmLocationMocks";
import { FilterBar } from "./FilterBar";

describe("<FilterBar/>", () => {
  test("should render correctly", () => {
    const { container } = render(
      <FilterBar
        filters={mockedFilmLocationFilters}
        selectedFilters={mockedFilmLocationSelectedFilters}
        setSelectedFilters={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
