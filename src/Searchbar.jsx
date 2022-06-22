import { CheckBox, CheckBoxOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50ch",
      "&:focus": {
        width: "55ch",
      },
    },
  },
}));

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&. MuiOutlinedInput-input": {
    color: "white !important",
  },
});

export default function Searchbar({
  onInputChange,
  onChange,
  inputValue,
  values,
  options = [],
  resultsCount,
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#404040" }}>
        <Toolbar
          style={{
            display: "flex",
            gap: "10px",
            margin: "0 auto",
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Rechercher..."
              inputProps={{ "aria-label": "search" }}
              onChange={onInputChange}
              value={inputValue}
            />
          </Search>
          <p>{resultsCount} résultats</p>
          <StyledAutocomplete
            fullWidth
            options={options}
            multiple
            freeSolo
            renderTags={() => null}
            style={{ minWidth: "200px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                color="primary"
                label="Ajouter des filtres..."
              />
            )}
            groupBy={(option) => option.category}
            onChange={(e, newval) => {
              onChange(newval);
            }}
            value={values}
            getOptionLabel={(option) => option.name}
            disableCloseOnSelect
            size="small"
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxOutlined fontSize="small" />}
                  checkedIcon={<CheckBox fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </li>
            )}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
