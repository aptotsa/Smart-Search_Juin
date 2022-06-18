import { DataGrid, GridColDef } from "@mui/x-data-grid"

import data from "../../api/opendata.paris.fr.json"

import style from "./style.module.css"

interface Data {
  id: string
  typeTournage: string
  anneeTournage: string
  ardtLieu: string
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "typeTournage", headerName: "Type", width: 130 },
  { field: "anneeTournage", headerName: "Année", width: 130 },
  { field: "ardtLieu", headerName: "Arrondissement", width: 130 }
]

const createData = (id: string, typeTournage: string, anneeTournage: string, ardtLieu: string): Data => {
  return {
    id,
    typeTournage,
    anneeTournage,
    ardtLieu
  }
}
const rows = data.records.map((record, index) =>
  createData(record.recordid, record.fields.type_tournage, record.fields.annee_tournage, record.fields.ardt_lieu)
)

const DataTable = () => {
  return (
    <div className={style.container}>
      <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[5]} checkboxSelection />
    </div>
  )
}

export default DataTable
