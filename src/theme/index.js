import { createTheme } from "@mui/material";

import palette from "./palette";

const theme = createTheme({
  palette,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
