/* eslint-disable import/no-anonymous-default-export */

import { colors } from "@mui/material";

const white = "#FFFFFF";
const black = "#000000";

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: "#191D24",
    main: "#102346",
    light: "#E1E3E3",
    background: "#ebf6ff",
  },
  secondary: {
    contrastText: white,
    dark: "#3a4f77",
    main: "#f2b648",
    light: "#FFE08B",
    background: "#f47e1e21",
  },
  success: {
    contrastText: white,
    dark: "#024F42",
    main: "#3ac47d",
    light: "#76C2A3",
  },
  info: {
    contrastText: white,
    dark: "#021C52",
    main: "#007bff",
    light: "#00BEF7",
  },
  warning: {
    contrastText: white,
    dark: "#3B2101",
    main: "#faad14",
    light: "#F5B880",
  },
  error: {
    contrastText: white,
    dark: "#611302",
    main: "#f5162d",
    light: "#ff6878",
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
  },
  background: {
    default: "#F4F6F8",
    paper: white,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
};
