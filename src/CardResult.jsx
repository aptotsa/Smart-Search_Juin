import { LocationOn } from "@mui/icons-material";
import MapIcon from "@mui/icons-material/Map";
import { Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function CardResult({ result }) {
  const {
    nom_tournage,
    date_debut,
    date_fin,
    type_tournage,
    nom_realisateur,
    adresse_lieu,
    ardt_lieu,
    nom_producteur,
    geo_shape: {
      coordinates: [longitude, latitude],
    },
  } = result;

  return (
    <Card sx={{ maxWidth: 800, margin: "0 auto" }}>
      <span
        style={{
          width: "auto",
          height: "25px",
          backgroundColor: "#19323C",
          float: "right",
          color: "white",
          padding: "5px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {type_tournage}
      </span>
      <CardHeader
        title={nom_tournage}
        subheader={`${date_debut} /  ${date_fin}`}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b> Réalisé par :</b> {nom_realisateur}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Produit par : </b>
          {nom_producteur}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ display: "flex", alignItems: "center", marginTop: 10 }}
        >
          <LocationOn />
          {adresse_lieu} {ardt_lieu}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Lieu du tournage (Google Maps)">
          <a
            style={{ color: "#8C5E58" }}
            target="_blank"
            href={`https://maps.google.com/?q=${latitude},${longitude}`}
            rel="noreferrer"
          >
            <IconButton aria-label="map">
              <MapIcon />
            </IconButton>
          </a>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
