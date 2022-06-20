import { ReactNode, useState } from "react"
import { Collapse } from "@mui/material"
import { styled, useTheme } from "@mui/material/styles"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import StarBorder from "@mui/icons-material/StarBorder"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import Delete from "@mui/icons-material/Delete"

import { DRAWER_WIDTH } from "../../utils/constants"
import { FavoritesActionTypes, useDispatchFavorites, useFavorites } from "../../contexts/FavoritesContext"
import { SearchActionTypes, useDispatchSearch } from "../../contexts/SearchContext"

import style from "./style.module.css"

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}))

interface NavigationItemProps {
  label: string
  icon: ReactNode
  children: ReactNode
}

interface NavigationSubItemProps {
  label: string
  action?: () => void
  icon?: ReactNode
  iconAction?: () => void
}

interface SideNavigationProps {
  open?: boolean
  handleDrawerClose: () => void
}

const NavigationSubItem = ({ label, action, icon, iconAction }: NavigationSubItemProps) => {
  return (
    <List component="div" className={style.subItem} disablePadding>
      <ListItemButton sx={{ pl: 4 }} onClick={action}>
        <ListItemText primary={label} />
      </ListItemButton>
      {icon && <ListItemIcon onClick={iconAction}>{icon}</ListItemIcon>}
    </List>
  )
}

const NavigationItem = ({ label, icon, children }: NavigationItemProps) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </div>
  )
}

const SideNavigation = ({ open, handleDrawerClose }: SideNavigationProps) => {
  const theme = useTheme()
  const favorites = useFavorites()
  const dispatchFav = useDispatchFavorites()
  const dispatchSearch = useDispatchSearch()

  const selectFavoriteSearch = (favoriteId: number) => {
    const favorite = favorites.find((fav) => fav.id === favoriteId)

    if (!favorite) return

    dispatchSearch({ type: SearchActionTypes.SAVE_SEARCH, payload: { ...favorite, id: new Date().getTime() } })
  }

  const deleteFavoriteSearch = (favoriteId: number) => {
    const favorite = favorites.find((fav) => fav.id === favoriteId)

    if (!favorite) return

    dispatchFav({ type: FavoritesActionTypes.REMOVE_FROM_FAVORITES, payload: favorite })
  }

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box"
        }
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <NavigationItem label="Favorites" icon={<StarBorder />}>
          {favorites.map((favorite) => (
            <NavigationSubItem
              key={favorite.id}
              label={favorite.keys.join(",")}
              action={() => selectFavoriteSearch(favorite.id)}
              icon={<Delete />}
              iconAction={() => deleteFavoriteSearch(favorite.id)}
            />
          ))}
        </NavigationItem>
      </List>
    </Drawer>
  )
}

export default SideNavigation
