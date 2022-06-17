import { styled } from "@mui/material/styles"
import { IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"

import { DRAWER_WIDTH } from "../../utils/constants"

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: `${DRAWER_WIDTH}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

interface TopBarProps {
  open?: boolean
  handleDrawerOpen: () => void
}

const TopBar = ({ open, handleDrawerOpen }: TopBarProps) => {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Smart Search
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
