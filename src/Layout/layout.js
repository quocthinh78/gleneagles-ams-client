import { find, isArray } from "lodash";
import React, { Fragment } from "react";
import { matchPath, useLocation } from "react-router";
import { appRouteWithPaths, getMatchPath } from "../routes";

const Layout = ({ children }) => {
  const location = useLocation();

  // Categorize the pages of each layout.
  // Return null if the page is not existed
  const routeObj = find(appRouteWithPaths, function ({ paths }) {
    return matchPath(location.pathname, { path: paths, exact: true })
      ? true
      : false;
  });

  if (routeObj && routeObj.layout) {
    // Every route go to this scope has a defined/valid pathname
    const { layout: Layout, routes, paths } = routeObj;
    const Wrapper = routeObj.wrapper || null;
    const { auth } = find(routes, function (i) {
      return getMatchPath(location.pathname, i.path);
    });
    // console.log(auth, getMatchPath(location.pathname, paths));
    if (!Wrapper) return <Layout>{children}</Layout>;

    return (
      <Wrapper
        routes={routes}
        paths={paths}
        routeAllowedRoles={
          typeof auth === "string" ? [auth] : isArray(auth) ? auth : []
        }
        matchProp={getMatchPath(location.pathname, paths)}
      >
        <Layout>{children}</Layout>
      </Wrapper>
    );
  }

  // If the page is not wrapped by any layout or is not existed
  return <Fragment>{children}</Fragment>;
};

export default Layout;
