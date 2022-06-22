import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getShootLocations } from "./api";
import useDebounce from "./hooks/useDebounce";
import Results from "./Results";
import Searchbar from "./Searchbar";

export default function Search() {
  const [searchbarValue, setSearchbarValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchbarValue, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const [offset, setOffset] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);

  function buildOptions(options) {
    const buildedOptions = [];
    options.forEach(({ name, facets }) => {
      const facetsWithCategory = facets.map((facet) => ({
        ...facet,
        category: name,
      }));
      buildedOptions.push(...facetsWithCategory);
    });
    return buildedOptions;
  }

  useEffect(() => {
    setIsSearching(true);
    getShootLocations({
      query: debouncedSearchTerm,
      facets: selectedFilters,
    }).then((results) => {
      setIsSearching(false);
      setResults(results.data.records);
      setResultsCount(results.data.nhits);
      if (options.length === 0) {
        setOptions(buildOptions(results.data.facet_groups));
      }

      setIsSearching(false);
    });
  }, [debouncedSearchTerm, selectedFilters, options]);

  function handleSearchbarChange({ target }) {
    setSearchbarValue(target.value);
  }

  function handleMoreLocations() {
    setIsSearching(true);
    getShootLocations({
      query: debouncedSearchTerm,
      facets: selectedFilters,
      offset: offset + 10,
    }).then((results) => {
      setResults((oldResults) => [...oldResults, ...results.data.records]);
      setIsSearching(false);
    });
    setOffset((offset) => offset + 10);
  }

  return (
    <>
      <Searchbar
        onInputChange={handleSearchbarChange}
        inputValue={searchbarValue}
        value={selectedFilters}
        onChange={setSelectedFilters}
        options={options}
        resultsCount={resultsCount}
      />
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Results loading={isSearching} results={results} />
        </Grid>
        <Grid item xs={5}>
          {resultsCount > offset && (
            <Button
              style={{ margin: "10px 0" }}
              onClick={() => handleMoreLocations()}
              variant="contained"
              fullWidth
            >
              Voir plus
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
}
