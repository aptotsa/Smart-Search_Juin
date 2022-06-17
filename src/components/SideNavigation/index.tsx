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
import History from "@mui/icons-material/History"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"

import { DRAWER_WIDTH } from "../../utils/constants"

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}))

type NavigationItemType = {
  index: number
  label: string
  icon: ReactNode
  action: () => void
}

const navigationItems: NavigationItemType[] = [
  {
    index: 0,
    label: "Favorites",
    icon: <StarBorder />,
    action: () => {}
  },
  {
    index: 1,
    label: "Previous Search",
    icon: <History />,
    action: () => {}
  }
]

interface SideNavigationProps {
  open?: boolean
  handleDrawerClose: () => void
}

const NavigationItem = ({ item }: { item: NavigationItemType }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>{/* <ListItemText primary={""} /> */}</ListItemButton>
        </List>
      </Collapse>
    </div>
  )
}

const SideNavigation = ({ open, handleDrawerClose }: SideNavigationProps) => {
  const theme = useTheme()

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
        {navigationItems.map((item) => (
          <NavigationItem item={item} />
        ))}
      </List>
    </Drawer>
  )
}

export default SideNavigation
