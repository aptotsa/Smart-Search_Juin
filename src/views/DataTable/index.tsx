import { useQuery } from "react-query"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

import { getFilmSets } from "../../api/lieuDeTournageParis"
import IDataset from "../../models/IDataset"

import style from "./style.module.css"

interface Data {
  id: string
  typeTournage: string
  anneeTournage: string
  ardtLieu: string
  nomTournage: string
  nomRealisateur: string
  dateDebut: string
  dateFin: string
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "typeTournage", headerName: "Type", width: 160 },
  { field: "anneeTournage", headerName: "Année", width: 100 },
  { field: "ardtLieu", headerName: "Code Postal", width: 100 },
  { field: "nomTournage", headerName: "Nom Tournage", width: 200 },
  { field: "nomRealisateur", headerName: "Nom Réalisateur", width: 200 },
  { field: "dateDebut", headerName: "Date Début", width: 150 },
  { field: "dateFin", headerName: "Date Fin", width: 150 }
]

const createData = (
  id: string,
  typeTournage: string,
  anneeTournage: string,
  ardtLieu: string,
  nomTournage: string,
  nomRealisateur: string,
  dateDebut: string,
  dateFin: string
): Data => {
  return {
    id,
    typeTournage,
    anneeTournage,
    ardtLieu,
    nomTournage,
    nomRealisateur,
    dateDebut,
    dateFin
  }
}
const rows = (data: IDataset) => {
  return data.records.map((record, index) =>
    createData(
      index.toString(),
      record.fields.type_tournage,
      record.fields.annee_tournage,
      record.fields.ardt_lieu,
      record.fields.nom_tournage,
      record.fields.nom_realisateur,
      record.fields.date_debut,
      record.fields.date_fin
    )
  )
}

const DataTable = () => {
  const { isLoading, data, error } = useQuery<IDataset, Error>("lieuDeTournage", () => getFilmSets(100))

  if (isLoading) return <div>Loading...</div>
  if (error || !data) return <div>An error occurred...</div>

  return (
    <div className={style.container}>
      <DataGrid rows={rows(data)} columns={columns} pageSize={10} rowsPerPageOptions={[10]} checkboxSelection />
    </div>
  )
}

export default DataTable
