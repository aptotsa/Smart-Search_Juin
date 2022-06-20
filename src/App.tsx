import { useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { styled } from "@mui/material/styles"

import FilterSection from "./views/FilterSection"
import TopBar from "./components/TopBar"
import SideNavigation from "./components/SideNavigation"
import DataTable from "./views/DataTable"
import { FavoritesProvider } from "./contexts/FavoritesContext"
import { SearchProvider } from "./contexts/SearchContext"
import { DRAWER_WIDTH } from "./utils/constants"

import style from "./App.module.css"

const queryClient = new QueryClient()

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
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <FavoritesProvider>
          <div>
            <TopBar open={open} handleDrawerOpen={handleDrawerOpen} />
            <SideNavigation open={open} handleDrawerClose={handleDrawerClose} />
            <Main open={open} className={style.main}>
              <FilterSection />
              <DataTable />
            </Main>
          </div>
        </FavoritesProvider>
      </SearchProvider>
    </QueryClientProvider>
  )
}

export default App
