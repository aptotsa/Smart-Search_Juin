import { Autocomplete, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import CONFIG from "../../../config.json";
import { FilmLocationFilters } from "../../../types";
import "./style.css";

interface Props {
  filters: FilmLocationFilters[];
  selectedFilters: { [key: string]: string[] };
  setSelectedFilters: Dispatch<SetStateAction<{ [key: string]: string[] }>>;
}

export const MultipleFilterBar = ({
  filters,
  selectedFilters,
  setSelectedFilters,
}: Props) => {
  const filterableFields = CONFIG.api.filmLocation.fields.reduce(
    (previousValue, currentValue) =>
      currentValue.filterable
        ? [...previousValue, currentValue]
        : previousValue,
    [] as { id: string; label: string }[]
  );

  return (
    <div className={"FilterBar FilterBar--multiple"}>
      {filterableFields.map(({ id, label }) => {
        const options =
          filters
            ?.find((filter) => filter.id === id)
            ?.values.map((value) => value.name)
            .sort() || [];
        return (
          <Autocomplete
            multiple
            key={id}
            id={id}
            options={options}
            onChange={(event: any, newValue: string[]) => {
              setSelectedFilters({ ...selectedFilters, [id]: newValue });
            }}
            renderInput={(params) => <TextField {...params} label={label} />}
          />
        );
      })}
    </div>
  );
};
