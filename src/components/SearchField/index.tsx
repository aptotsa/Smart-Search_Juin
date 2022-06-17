import { Autocomplete, TextField } from "@mui/material"

interface SearchFieldProps {
  id: string
  label: string
  placeholder?: string
  options: string[]
  className?: string
}

const SearchField = ({ id, label, placeholder = "", options, className }: SearchFieldProps) => {
  return (
    <Autocomplete
      disablePortal
      id={`search-${id}`}
      options={options}
      renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
      className={className}
    />
  )
}

export default SearchField
