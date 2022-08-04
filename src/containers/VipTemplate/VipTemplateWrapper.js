import React, { Fragment } from "react";
import { Redirect } from "react-router";
import useUser from "../../hooks/useUser";
import PageNotFound from "../HomeTemplate/PageNotFound";
import { LOGIN_PAGE } from "../../routes/constant";

// This template serves only for authenticated routes
// This logic is written based on that
const VipTemplateWrapper = ({ children, routeAllowedRoles }) => {
  const user = useUser();

  // User not logged in
  if (!user.data) return <Redirect to={LOGIN_PAGE} />;

  // If user navigate unallowed page
  if (!user.isRoleAccepted(routeAllowedRoles)) return <PageNotFound />;

  return <Fragment>{children}</Fragment>;
};

export default VipTemplateWrapper;
