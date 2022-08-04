import React from "react";
import { Route, Switch } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import appRoutes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout/layout";
import PageNotFound from "./containers/HomeTemplate/PageNotFound";

const renderRoutes = (routes) => {
  return routes.map((route) => {
    return (
      <Route
        key={route.path}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    );
  });
};

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Switch>
          {appRoutes.map((item) => renderRoutes(item.routes))}
          <Route component={PageNotFound} />
        </Switch>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
