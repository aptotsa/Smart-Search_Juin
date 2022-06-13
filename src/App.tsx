import { Typography } from "@mui/material";
import "./styles.css";
import { FilmLocationTemplate } from "./components/templates/FilmLocation/FilmLocationTemplate";

export default function App() {
  return (
    <div className="App">
      <Typography variant="h3" component="h1" gutterBottom>
        Lieux de tournage à Paris
      </Typography>
      <FilmLocationTemplate />
    </div>
  );
}
