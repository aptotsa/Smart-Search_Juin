import { Autocomplete, Chip, TextField } from "@mui/material"
import { SearchActionTypes, useDispatchSearch, useSearch } from "../../contexts/SearchContext"

interface SearchFieldProps {
  id: string
  label: string
  placeholder?: string
  options: string[]
  className?: string
}

const SearchField = ({ id, label, placeholder = "", options, className }: SearchFieldProps) => {
  const search = useSearch()
  const dispatchSearch = useDispatchSearch()

  return (
    <Autocomplete
      multiple
      freeSolo
      id={`search-${id}`}
      options={options}
      className={className}
      value={search.current?.keys}
      onChange={(event, newValue) => {
        dispatchSearch({
          type: SearchActionTypes.SAVE_SEARCH,
          payload: {
            id: new Date().getTime(),
            keys: newValue
          }
        })
      }}
      getOptionLabel={(option) => option}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)
      }
      renderInput={(params) => <TextField variant="filled" {...params} label={label} placeholder={placeholder} />}
    />
  )
}

export default SearchField
