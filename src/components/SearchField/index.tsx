import { Autocomplete, Chip, TextField } from "@mui/material"
import { SearchActionTypes, SearchType, useDispatchSearch, useSearch } from "../../contexts/SearchContext"

interface SearchFieldProps {
  id: string
  label: string
  placeholder?: string
  options: SearchType[]
  className?: string
}

const SearchField = ({ id, label, placeholder = "", options, className }: SearchFieldProps) => {
  const search = useSearch()
  const dispatchSearch = useDispatchSearch()

  const handleChange = (value: SearchType[]) => {
    dispatchSearch({
      type: SearchActionTypes.NEW_SEARCH,
      payload: {
        id: new Date().getTime(),
        search: value
      }
    })
  }

  return (
    <Autocomplete
      multiple
      freeSolo
      id={`search-${id}`}
      options={options}
      className={className}
      onChange={(event, newValue) => {
        handleChange(newValue as SearchType[])
      }}
      getOptionLabel={(option) => (option as SearchType).keyword}
      renderTags={(_, getTagProps) =>
        search.current?.search.map((option, index) => <Chip label={option.keyword} {...getTagProps({ index })} />)
      }
      renderInput={(params) => <TextField variant="filled" {...params} label={label} placeholder={placeholder} />}
    />
  )
}

export default SearchField
