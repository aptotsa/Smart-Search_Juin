export type FilmLocationResultField = {
  coord_x: number;
  coord_y: number;
  type_tournage: string;
  nom_producteur: string;
  date_fin: string;
  nom_tournage: string;
  ardt_lieu: string;
  id_lieu: string;
  nom_realisateur: string;
  adresse_lieu: string;
  date_debut: string;
  annee_tournage: string;
};

export type FilmLocationNormalizedField = FilmLocationResultField & {
  id: string;
};

export type FilmLocationFilters = {
  id: string;
  values: { name: string; count: number }[];
};

export type FilmLocationQueryResult = {
  nhits: number;
  facet_groups: {
    name: string;
    facets: { name: string; count: number; path: string }[];
  }[];
  records: {
    datasetid: string;
    recordid: string;
    fields: FilmLocationResultField;
    record_timestamp: string;
  }[];
};

export type FilmLocationNormalizedResult = {
  count: number;
  filters: FilmLocationFilters[];
  records: FilmLocationNormalizedField[];
};

export type FilmLocationOffset = {
  start: number;
};
