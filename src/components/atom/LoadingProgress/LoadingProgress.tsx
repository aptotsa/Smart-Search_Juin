import { CircularProgress, LinearProgress, Typography } from "@mui/material";
import "./style.css";

interface Props {
  count: number;
  total: number;
}

export const LoadingProgress = ({ count, total }: Props) => {
  return (
    <div className={"LoadingProgress"}>
      {count > 0 ? (
        <>
          <Typography variant="subtitle2" display="block">
            {`${count} résultat${count > 0 && "s"} chargé${
              count > 0 && "s"
            } sur ${total}`}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(count / total) * 100 || 0}
          />
        </>
      ) : (
        <Typography variant="subtitle2" display="block">
          Aucun résultat
        </Typography>
      )}
    </div>
  );
};
