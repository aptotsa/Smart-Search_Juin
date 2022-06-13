import {Box} from "@mui/material"

export default function HeaderTotal({total}){
    return <Box className="totalBox" sx={{ padding: "10px", display: "flex" }}>Total : {total}</Box>
}