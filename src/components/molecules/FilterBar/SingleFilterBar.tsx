import { Autocomplete, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CONFIG from "../../../config.json";
import { FilmLocationFilters } from "../../../types";
import "./style.css";

interface Props {
  filters: FilmLocationFilters[];
  setSelectedFilters: Dispatch<SetStateAction<{ [key: string]: string[] }>>;
}

export const SingleFilterBar = ({ filters, setSelectedFilters }: Props) => {
  const [options, setOptions] = useState<{ [key: string]: string[] }>({});
  const filterableFields = CONFIG.api.filmLocation.fields.reduce(
    (previousValue, currentValue) =>
      currentValue.filterable
        ? [...previousValue, currentValue]
        : previousValue,
    [] as { id: string; label: string }[]
  );

  const handleChange = (newValue: string[]) => {
    const newFilters: { [key: string]: string[] } = {};
    newValue.forEach((val) => {
      options[val]?.forEach((filter: string) => {
        if (newFilters[filter]) {
          if (newFilters[filter].indexOf(val) === -1) {
            newFilters[filter].push(val);
          }
        } else {
          newFilters[filter] = [val];
        }
      });
    });
    setSelectedFilters(newFilters);
  };

  useEffect(() => {
    const formatedOptions: { [key: string]: string[] } = {};

    filterableFields.forEach(({ id }) => {
      filters
        .find((filter) => filter.id === id)
        ?.values.forEach(({ name }) => {
          if (formatedOptions[name]) {
            if (formatedOptions[name].indexOf(id) === -1) {
              formatedOptions[name].push(id);
            }
          } else {
            formatedOptions[name] = [id];
          }
        });
    });

    setOptions(formatedOptions);
  }, []);

  return (
    <div className="FilterBar FilterBar--single">
      <Autocomplete
        multiple
        id={filterableFields.map((field) => field.label).join(", ")}
        options={Object.keys(options).sort()}
        onChange={(event: any, newValue: string[]) => handleChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={filterableFields.map((field) => field.label).join(", ")}
          />
        )}
      />
    </div>
  );
};
