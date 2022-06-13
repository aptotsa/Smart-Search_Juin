import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function AutocompleteSearch({ options, onChange }) {
    return (
        <div className="searchField">
            <Autocomplete
                id={"customer-search"}
                multiple
                freeSolo
                options={[...options]}
                groupBy={(option) => option.id}
                getOptionLabel={(option) => option.label}
                filterSelectedOptions
                renderInput={(params) => {
                    params.InputProps.endAdornment = (
                        <>
                            <InputAdornment position="end">
                                <SearchOutlinedIcon />
                            </InputAdornment>
                            {params.InputProps.endAdornment}
                        </>
                    );

                    return (
                        <TextField
                            {...params}
                            placeholder="Recherche tournage"
                            InputProps={{
                                ...params.InputProps,
                                type: "search",
                            }}
                        />
                    );
                }}
                onChange={onChange}
            />
        </div>
    );
}
