import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Favicon from "react-favicon";
import { useAppStore } from "../../stores";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import CollectionsIcon from "@mui/icons-material/Collections";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Diversity2OutlinedIcon from "@mui/icons-material/Diversity2Outlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;
const buttonList = [
  { icon: DashboardIcon, name: "Dashboard", path: "" },
  { icon: AvTimerIcon, name: "Real-time Tracking", path: "" },
  { icon: CollectionsIcon, name: "Screenshots", path: "" },
  { icon: PeopleOutlineIcon, name: "Employees", path: "" },
  { icon: WorkOutlineIcon, name: "Projects Tracking", path: "" },
  { icon: Diversity2OutlinedIcon, name: "Teams", path: "" },
  { icon: CalendarMonthOutlinedIcon, name: "Time and Attendance", path: "" },
  { icon: DvrOutlinedIcon, name: "Apps and Websites", path: "" },
  { icon: SettingsIcon, name: "Setting", path: "" },
];

const Main = (props) => {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(4);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const drawer = (
    <div>
      <Toolbar
        sx={{
          display: { xs: "block", md: "none" },
        }}
      />
      <Box sx={{ width: "100%", padding: "20px" }}>
        <img
          className="w-full h-auto"
          src="/images/workpuls-logo.png"
          alt="Logo"
        />
      </Box>
      <Divider />
      <List component="nav" style={{ padding: "20px" }}>
        {buttonList.map((item, index) => (
          <ListItemButton
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
            style={
              (selectedIndex === index
                ? { borderLeft: "5px solid #6573c3", background: "unset" }
                : {},
              { padding: 4 })
            }
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          bottom: 10,
          width: "100%",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="https://i.pravatar.cc/300"
          sx={{ marginInline: "auto" }}
        />
        <Typography textAlign={"center"}>Joe Geller</Typography>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          display: { md: "none" },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"></Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          paddingTop: { xs: 9, md: 2 },
        }}
      >
        <CssBaseline></CssBaseline>
        {children}
      </Box>
    </Box>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
