import axios from "axios"

import IDataset from "../models/IDataset"

export const getFilmSets = async (rows: number = 10): Promise<IDataset> => {
  const url = `https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q=&facet=annee_tournage&facet=type_tournage&facet=nom_tournage&facet=nom_realisateur&facet=ardt_lieu&rows=${rows}`
  const result = await axios.get(url)
  return result.data
}
