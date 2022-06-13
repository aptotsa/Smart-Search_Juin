import { render } from "@testing-library/react";
import {
  mockedFilmLocationFilters,
  mockedFilmLocationSelectedFilters,
} from "../../../mocks/FilmLocationMocks";
import { SingleFilterBar } from "./SingleFilterBar";

describe("<FilterBar/>", () => {
  test("should render correctly", () => {
    const { container } = render(
      <SingleFilterBar
        filters={mockedFilmLocationFilters}
        setSelectedFilters={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
