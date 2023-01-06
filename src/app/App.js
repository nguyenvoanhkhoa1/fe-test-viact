import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Routes from "../routes";
import { AppStore } from "../stores";
import { ThemeProvider } from "@mui/material";
import theme from "theme";

const browserHistory = createBrowserHistory();

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <AppStore.Provider>
            <Routes />
          </AppStore.Provider>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
