import { render } from "@testing-library/react";
import { mockedFilmLocationRecords } from "../../../mocks/FilmLocationMocks";
import { FilmLocationTable } from "./FilmLocationTable";

describe("<FilmLocationTable/>", () => {
  test("should render correctly", () => {
    const { container } = render(
      <FilmLocationTable records={mockedFilmLocationRecords} />
    );
    expect(container).toMatchSnapshot();
  });
});
