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
  Breadcrumbs,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
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
    <Box
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        paddingTop: { xs: "64px", md: 0 },
        paddingBottom: "20px",
      }}
    >
      <Box sx={{ width: "100%", padding: "4px 20px" }}>
        <img
          className="w-auto h-20"
          src="/images/workpuls-logo.png"
          alt="Logo"
        />
      </Box>
      <Divider />
      <List
        component="nav"
        style={{ padding: "20px", height: "100%", overflowY: "auto" }}
      >
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
          // position: "absolute",
          // bottom: 10,
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
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          height: { sx: "64px", md: "88px" },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          display: { md: "" },
          background: { sx: "unset", md: "none" },
          boxShadow: { sx: "unset", md: "none" },
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sx: "block", md: "none" }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link fontSize={16} fontWeight={600} underline="hover" key="1">
                Projects
              </Link>
              <Typography
                fontSize={20}
                fontWeight={800}
                color="text.primary"
                key="2"
              >
                Design System
              </Typography>
            </Breadcrumbs>
            <Box display={"flex"} alignItems={"end"} gap={2}>
              <Typography fontSize={28} fontWeight={900} color="text.primary">
                Design System
              </Typography>
              <Button sx={{ fontSize: "16px", fontWeight: 600, padding: 0 }}>
                Edit
              </Button>
            </Box>
          </Box>
          <IconButton
            sx={{
              display: { xs: "none", md: "block" },
            }}
            variant="outlined"
          >
            <NotificationsNoneOutlinedIcon
              sx={{
                color: "blue",
                width: 40,
                height: 40,
              }}
            />
          </IconButton>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
            }}
          >
            <Typography textAlign={"center"}>Joe Geller</Typography>
            <Avatar
              alt="Remy Sharp"
              src="https://i.pravatar.cc/300"
              sx={{ marginLeft: 2 }}
            />
          </Box>
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
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          paddingTop: { xs: 10, md: 13 },
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
