import axios from "axios";
import CONFIG from "../config.json";
import {
  formatFilters,
  getFilmingLocations,
  normalizeResult,
} from "./FilmLocation";

jest.mock("axios", () => ({
  request: jest.fn(),
}));

describe("api/FilmLocation", () => {
  describe("formatFilters()", () => {
    test("should add 'refine' prefix to each filter key", () => {
      const result = formatFilters({
        filter_key_one: ["value-1", "value-2", "value-3"],
        filter_key_two: ["value-4"],
        filter_key_three: ["value-5", "value-6"],
      });
      expect(result).toEqual({
        "refine.filter_key_one": ["value-1", "value-2", "value-3"],
        "refine.filter_key_three": ["value-5", "value-6"],
        "refine.filter_key_two": ["value-4"],
      });
    });
  });
  describe("normalizeResult()", () => {
    test("should format received data ", () => {
      const result = normalizeResult({
        nhits: 53,
        facet_groups: [
          {
            name: "field_one",
            facets: [
              {
                name: "field_one_value_one",
                count: 3,
                path: "field_one_value_one",
              },
              {
                name: "field_one_value_two",
                count: 3,
                path: "field_one_value_two",
              },
            ],
          },
          {
            name: "field_two",
            facets: [
              {
                name: "field_two_value_one",
                count: 3,
                path: "field_two_value_one",
              },
              {
                name: "field_two_value_two",
                count: 3,
                path: "field_two_value_two",
              },
            ],
          },
        ],
        records: [
          {
            datasetid: "datasetid",
            recordid: "recordid",
            fields: {
              coord_x: 0.25,
              coord_y: 1.53,
              type_tournage: "type_tournage",
              nom_producteur: "nom_producteur",
              date_fin: "date_fin",
              nom_tournage: "nom_tournage",
              ardt_lieu: "ardt_lieu",
              id_lieu: "id_lieu",
              nom_realisateur: "nom_realisateur",
              adresse_lieu: "adresse_lieu",
              date_debut: "date_debut",
              annee_tournage: "annee_tournage",
            },
            record_timestamp: "record_timestamp",
          },
        ],
      });
      expect(result).toEqual({
        count: 53,
        filters: [
          {
            id: "field_one",
            values: [
              {
                count: 3,
                name: "field_one_value_one",
                path: "field_one_value_one",
              },
              {
                count: 3,
                name: "field_one_value_two",
                path: "field_one_value_two",
              },
            ],
          },
          {
            id: "field_two",
            values: [
              {
                count: 3,
                name: "field_two_value_one",
                path: "field_two_value_one",
              },
              {
                count: 3,
                name: "field_two_value_two",
                path: "field_two_value_two",
              },
            ],
          },
        ],
        records: [
          {
            adresse_lieu: "adresse_lieu",
            annee_tournage: "annee_tournage",
            ardt_lieu: "ardt_lieu",
            coord_x: 0.25,
            coord_y: 1.53,
            date_debut: "date_debut",
            date_fin: "date_fin",
            id: "recordid",
            id_lieu: "id_lieu",
            nom_producteur: "nom_producteur",
            nom_realisateur: "nom_realisateur",
            nom_tournage: "nom_tournage",
            type_tournage: "type_tournage",
          },
        ],
      });
    });
  });
  describe("getFilmingLocations()", () => {
    test("should call api with good parameters", () => {
      const offset = 123;
      const mockedFilters = { filter_one: ["value_one", "value_two"] };
      getFilmingLocations(offset, mockedFilters);
      expect(axios.request).toHaveBeenCalledWith({
        method: "GET",
        params: {
          ...CONFIG.api.filmLocation.params,
          ...{ "refine.filter_one": ["value_one", "value_two"] },
          start: offset,
        },
        paramsSerializer: expect.any(Function),
        url: CONFIG.api.filmLocation.baseUrl,
      });
    });
  });
});
