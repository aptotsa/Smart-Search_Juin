export const mockedFilmLocationRecords = [
  {
    id: "id_1",
    coord_x: 1.1,
    coord_y: 1.2,
    type_tournage: "type_tournage_1",
    nom_producteur: "nom_producteur_1",
    date_fin: "date_fin_1",
    nom_tournage: "nom_tournage_1",
    ardt_lieu: "ardt_lieu_1",
    id_lieu: "id_lieu_1",
    nom_realisateur: "nom_realisateur_1",
    adresse_lieu: "adresse_lieu_1",
    date_debut: "date_debut_1",
    annee_tournage: "annee_tournage_1",
  },
  {
    id: "id_2",
    coord_x: 2.1,
    coord_y: 2.2,
    type_tournage: "type_tournage_2",
    nom_producteur: "nom_producteur_2",
    date_fin: "date_fin_2",
    nom_tournage: "nom_tournage_2",
    ardt_lieu: "ardt_lieu_2",
    id_lieu: "id_lieu_2",
    nom_realisateur: "nom_realisateur_2",
    adresse_lieu: "adresse_lieu_2",
    date_debut: "date_debut_2",
    annee_tournage: "annee_tournage_2",
  },
];

export const mockedFilmLocationFilters = [
  {
    id: "filter_1",
    values: [
      { name: "filter_1_1", count: 2 },
      { name: "filter_1_2", count: 7 },
      { name: "filter_1_3", count: 5 },
    ],
  },
  {
    id: "filter_2",
    values: [
      { name: "filter_2_1", count: 8 },
      { name: "filter_2_2", count: 1 },
      { name: "filter_2_3", count: 6 },
      { name: "filter_2_4", count: 3 },
    ],
  },
];

export const mockedFilmLocationSelectedFilters = {
  filter_2: ["filter_2_2"],
};
