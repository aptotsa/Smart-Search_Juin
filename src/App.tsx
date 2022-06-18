import { useState } from "react"
import { styled } from "@mui/material/styles"

import FilterSection from "./views/FilterSection"
import TopBar from "./components/TopBar"
import SideNavigation from "./components/SideNavigation"
import DataTable from "./views/DataTable"
import { DRAWER_WIDTH } from "./utils/constants"

import style from "./App.module.css"

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: `${DRAWER_WIDTH}px`
  })
}))

const App = () => {
  const [open, setOpen] = useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <TopBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideNavigation open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open} className={style.main}>
        <FilterSection />
        <DataTable />
      </Main>
    </div>
  )
}

export default App
