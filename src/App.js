import "./App.css";

import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import RecordsList from "./components/RecordsList";
import AutocompleteSearch from "./components/AutocompleteSearch";
import { filterRecords, getOptionsByGroup, fetchData } from "./functions";

function App() {
    const [allRecords, setAllRecords] = useState([]);
    const [filtredRecords, setFiltredRecords] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [facetGroups, setFacetGroups] = useState([]);

    useEffect(() => {
        fetchData()
            .then((response) => {
                setAllRecords(response.data.records);
                setFacetGroups(response.data.facet_groups);
            })
            .catch((error) => {
                console.error("Error", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const options = useMemo(() => {
        return getOptionsByGroup(facetGroups);
    }, [facetGroups]);

    const onChange = async (event, values) => {
        if (values.length > 0) {
            filterRecords(values, allRecords).then((res) => {
                setFiltredRecords(res);
            });
        } else {
            setFiltredRecords(null);
        }
    };

    const data = useMemo(() => {
        return filtredRecords || allRecords;
    }, [filtredRecords, allRecords]);

    return (
        <div className="App">
            <h1>&#x2728;Records smart search&#x2728;</h1>
            {isLoading ? (
                <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <AutocompleteSearch options={options} onChange={onChange} />
                    <RecordsList data={data} />
                </>
            )}
        </div>
    );
}

export default App;
