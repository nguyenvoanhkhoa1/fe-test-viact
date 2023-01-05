import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { RouteWithLayout, BrandLoading } from "../components";
import { Main as MainLayout } from "../layouts";
import { routeUrls } from "../configs";
import { ProjectTrackingView } from "./views";

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<BrandLoading />}>
        <Switch>
          <RouteWithLayout
            component={ProjectTrackingView}
            exact
            layout={MainLayout}
            path={`/${routeUrls.projectTracking.path}`}
          />
          <Redirect from="/*" to={`/${routeUrls.projectTracking.path}`} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
