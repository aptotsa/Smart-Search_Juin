import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { memo, RefObject } from "react";
import CONFIG from "../../../config.json";
import { FilmLocationNormalizedField } from "../../../types";
import { TableRowLoader } from "../../atom/TableRowLoader/TableRowLoader";
import "./style.css";

interface RowProps {
  record: FilmLocationNormalizedField;
  fieldList: {
    id: string;
    label: string;
    filterable?: boolean;
  }[];
}

interface TableProps {
  records: FilmLocationNormalizedField[];
  isLoading?: boolean;
  tableContainerRef?: RefObject<HTMLDivElement>;
}
const FilmLocationRow = ({ record, fieldList }: RowProps) => (
  <TableRow>
    {fieldList.map((field) => (
      <TableCell key={`${record.id}_${field.id}`}>
        {record[field.id as keyof FilmLocationNormalizedField]}
      </TableCell>
    ))}
  </TableRow>
);

export const MemoizedRow = memo(FilmLocationRow);

export const FilmLocationTable = ({
  records,
  isLoading,
  tableContainerRef,
}: TableProps) => {
  const fieldList = CONFIG.api.filmLocation.fields;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        ref={tableContainerRef || null}
        className={"FilmLocationTable__container"}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {fieldList.map((field) => (
                <TableCell key={field.id}>{field.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <MemoizedRow
                record={record}
                fieldList={fieldList}
                key={record.id}
              />
            ))}
          </TableBody>
        </Table>
        {isLoading && <TableRowLoader />}
      </TableContainer>
    </Paper>
  );
};
