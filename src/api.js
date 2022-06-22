import axios from "axios";

const BASE_API = "https://opendata.paris.fr/api";

export function getShootLocations({
  query = "",
  facets = [],
  offset = 0,
  rowsPerPage = 10,
}) {
  var params = new URLSearchParams();
  params.append("dataset", "lieux-de-tournage-a-paris");
  params.append("q", query);
  params.append("facet", "type_tournage");
  params.append("facet", "annee_tournage");
  params.append("facet", "ardt_lieu");
  params.append("rows", rowsPerPage);
  params.append("start", offset);

  facets.forEach((facet) => {
    params.append("refine." + facet.category, facet.path);
  });

  const response = axios.get(`${BASE_API}/records/1.0/search/`, {
    params: params,
  });
  return response;
}
