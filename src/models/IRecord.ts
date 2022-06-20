interface IRecord {
  datasetid: string
  recordid: string
  fields: {
    coord_y: number
    type_tournage: string
    nom_producteur: string
    date_fin: string
    geo_point_2d: number[]
    nom_tournage: string
    ardt_lieu: string
    geo_shape: {
      coordinates: number[]
      type: string
    }
    id_lieu: string
    nom_realisateur: string
    adresse_lieu: string
    date_debut: string
    annee_tournage: string
    coord_x: number
  }
  geometry: {
    type: string
    coordinates: number[]
  }
  record_timestamp: string
}

export default IRecord
