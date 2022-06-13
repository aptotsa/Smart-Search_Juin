import { Switch } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { FilmLocationFilters } from "../../../types";
import { MultipleFilterBar } from "./MultipleFilterBar";
import { SingleFilterBar } from "./SingleFilterBar";

interface Props {
  filters: FilmLocationFilters[];
  selectedFilters: { [key: string]: string[] };
  setSelectedFilters: Dispatch<SetStateAction<{ [key: string]: string[] }>>;
}

export const FilterBar = ({
  filters,
  selectedFilters,
  setSelectedFilters,
}: Props) => {
  const [isMultipleFilterBar, setIsMultipleFilterBar] = useState(false);

  return (
    <>
      <div className="FilterBar__toggle">
        <Switch
          checked={isMultipleFilterBar}
          onChange={() => {
            setIsMultipleFilterBar(!isMultipleFilterBar);
            setSelectedFilters({});
          }}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
      {isMultipleFilterBar ? (
        <MultipleFilterBar
          filters={filters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      ) : (
        <SingleFilterBar
          filters={filters}
          setSelectedFilters={setSelectedFilters}
        />
      )}
    </>
  );
};
