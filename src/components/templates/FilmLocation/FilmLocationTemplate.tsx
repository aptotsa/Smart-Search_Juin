import { useEffect, useRef, useState } from "react";
import { getFilmingLocations } from "../../../api/FilmLocation";
import { FilterBar } from "../../molecules/FilterBar/FilterBar";
import { FilmLocationTable } from "../../molecules/FilmLocationTable/FilmLocationTable";
import { LoadingProgress } from "../../atom/LoadingProgress/LoadingProgress";
import {
  FilmLocationFilters,
  FilmLocationNormalizedField,
} from "../../../types";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

export const FilmLocationTemplate = () => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number>(0);
  const [filmingLocations, setFilmingLocations] = useState<
    FilmLocationNormalizedField[]
  >([]);
  const [filters, setFilters] = useState<FilmLocationFilters[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [hasFailed, setHasFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const { resetScroll } = useInfiniteScroll(
    tableContainerRef,
    () => {
      if (offset < count) {
        setOffset(filmingLocations.length);
      }
    },
    50
  );

  useEffect(() => {
    setOffset(0);
    resetScroll();
    setFilmingLocations([]);
    const getData = async () => {
      setIsLoading(true);
      try {
        const { records, filters, count } = await getFilmingLocations(
          0,
          selectedFilters
        );
        setFilmingLocations(records);
        setFilters(filters);
        setCount(count);
      } catch (error) {
        setHasFailed(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [selectedFilters]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { records } = await getFilmingLocations(offset, selectedFilters);
        setFilmingLocations([...filmingLocations, ...records]);
      } catch (error) {
        setHasFailed(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [offset]);

  if (hasFailed) {
    <p>Something went wrong, try reloading page</p>;
  }

  return (
    <div>
      {filters?.length > 0 && (
        <FilterBar
          filters={filters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      )}
      <LoadingProgress count={filmingLocations.length} total={count} />
      <FilmLocationTable
        records={filmingLocations}
        tableContainerRef={tableContainerRef}
        isLoading={isLoading}
      />
    </div>
  );
};
