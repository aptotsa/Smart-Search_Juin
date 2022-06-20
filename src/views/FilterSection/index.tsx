import { IconButton } from "@mui/material"
import { SaveOutlined } from "@mui/icons-material"

import data from "../../api/opendata.paris.fr.json"
import SearchField from "../../components/SearchField"
import IDataset from "../../models/IDataset"

import { FavoritesActionTypes, useDispatchFavorites } from "../../contexts/FavoritesContext"
import { useSearch } from "../../contexts/SearchContext"

import style from "./style.module.css"

const FilterSection = () => {
  const dispatchFav = useDispatchFavorites()
  const search = useSearch()

  const loadFilters = (data: IDataset) => {
    let filtersList: string[] = []

    data.facet_groups.forEach((group) => {
      if (group.name === "type_tournage" || group.name === "annee_tournage" || group.name === "ardt_lieu")
        group.facets.map((facet) => filtersList.push(facet.name))
    })

    return filtersList
  }

  const saveFavorite = () => {
    if (!search.current) return

    dispatchFav({
      type: FavoritesActionTypes.ADD_TO_FAVORITES,
      payload: {
        id: new Date().getTime(),
        keys: search.current.keys
      }
    })
  }

  return (
    <div className={style.container}>
      <SearchField
        id="search"
        label="Rechercher par Année de tournage, Type de tournage et/ou Arrondissement"
        options={loadFilters(data)}
        className={style.searchBar}
      />
      <IconButton aria-label="delete" size="medium" sx={{ padding: "0 1rem" }} onClick={saveFavorite}>
        <SaveOutlined fontSize="inherit" />
      </IconButton>
    </div>
  )
}

export default FilterSection
