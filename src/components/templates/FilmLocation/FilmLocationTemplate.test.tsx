import { act, render, waitFor } from "@testing-library/react";
import {
  mockedFilmLocationFilters,
  mockedFilmLocationRecords,
} from "../../../mocks/FilmLocationMocks";
import { FilmLocationTemplate } from "./FilmLocationTemplate";

jest.mock("../../molecules/FilterBar/FilterBar", () => {
  return {
    FilterBar: () => {
      return <div>Mocked FilterBar</div>;
    },
  };
});

jest.mock("../../../hooks/useInfiniteScroll", () => ({
  useInfiniteScroll: () => ({
    resetScroll: () => {},
  }),
}));

jest.mock("../../../api/FilmLocation", () => ({
  getFilmingLocations: () => ({
    records: mockedFilmLocationRecords,
    filters: mockedFilmLocationFilters,
    count: mockedFilmLocationRecords.length,
  }),
}));

describe("<FilmLocationTemplate/>", () => {
  test("should render correctly", async () => {
    let component: ReturnType<typeof render>;
    await act(async () => {
      component = await render(<FilmLocationTemplate />);
    });

    await waitFor(() => {
      expect(
        component.getByText(mockedFilmLocationRecords[0].nom_producteur)
      ).toBeTruthy();
      expect(component.container).toMatchSnapshot();
    });
  });
});
