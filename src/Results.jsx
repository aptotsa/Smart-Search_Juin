import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import CardResult from "./CardResult";

export default function Results({ results, loading, error }) {
  const boxStyles = {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  };
  return (
    <>
      {error ? (
        <Box sx={boxStyles}>
          <Typography>Une erreur est survenu</Typography>
        </Box>
      ) : results.length > 0 ? (
        <>
          {results.map((result) => (
            <div key={result.recordid} style={{ margin: 5 }}>
              <CardResult result={result.fields} />
            </div>
          ))}
        </>
      ) : (
        <Box sx={boxStyles}>
          <Typography>Aucun résultat</Typography>
        </Box>
      )}
      {loading && (
        <Box sx={boxStyles}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
