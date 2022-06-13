import axios from "axios";
import * as qs from "qs";
import CONFIG from "../config.json";
import {
  FilmLocationNormalizedResult,
  FilmLocationQueryResult,
} from "../types";

export const formatFilters = (filters: {
  [key: string]: string[];
}): { [key: string]: string[] } => {
  let formatedFilters = {} as { [key: string]: string[] };
  Object.keys(filters).forEach((key) => {
    formatedFilters[`refine.${key}`] = filters[key];
  });

  return formatedFilters;
};

export const normalizeResult = (
  result: FilmLocationQueryResult
): FilmLocationNormalizedResult => {
  return {
    count: result.nhits,
    filters: result.facet_groups?.map((elem) => ({
      id: elem.name,
      values: elem.facets,
    })),
    records: result.records?.map((record) => ({
      id: record.recordid,
      ...record.fields,
    })),
  };
};

export const getFilmingLocations = async (
  offset: number,
  filters?: {
    [key: string]: string[];
  }
) => {
  const formatedFilters = filters ? formatFilters(filters) : {};
  const result = await axios.request<FilmLocationQueryResult>({
    method: "GET",
    url: CONFIG.api.filmLocation.baseUrl,
    params: {
      ...CONFIG.api.filmLocation.params,
      ...formatedFilters,
      start: offset,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
  return result?.data
    ? normalizeResult(result.data)
    : { count: 0, filters: [], records: [] };
};
