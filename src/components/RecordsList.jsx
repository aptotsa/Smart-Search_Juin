import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";
import HeaderTotal from "./HeaderTotal";

export default function RecordsList({ data }) {
    const columns = [
        { field: "nom_tournage", headerName: "Nom tournage", width: 300 },
        { field: "nom_realisateur", headerName: "Nom réalisateur", width: 230 },
        { field: "nom_producteur", headerName: "Nom producteur", width: 230 },
        { field: "annee_tournage", headerName: "Année tournage", width: 130 },
        {
            field: "type_tournage",
            headerName: "Type Tournage",
            width: 130,
        },
        {
            field: "ardt_lieu",
            headerName: "Lieu Tournage",
            width: 130,
        },
    ];

    const rows = data.map((row) => row.fields);
    const total = React.useMemo(() => {
        return rows.length;
    }, [rows]);

    return (
        <div style={{ height: 600, width: "100%" }} className="data-grid">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={50}
                rowsPerPageOptions={[50]}
                getRowId={(row) => row.id_lieu}
                rowCount={rows.length}
                components={{
                    Header: HeaderTotal,
                }}
                componentsProps={{
                    header: { total },
                }}
            />
        </div>
    );
}
