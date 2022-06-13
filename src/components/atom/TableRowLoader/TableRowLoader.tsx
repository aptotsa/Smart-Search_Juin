import { CircularProgress } from "@mui/material";
import "./style.css";

export const TableRowLoader = () => {
  return (
    <div className="TableRowLoader">
      <CircularProgress />
    </div>
  );
};
