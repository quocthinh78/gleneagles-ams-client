import React, { Fragment } from "react";
import { Redirect } from "react-router";
import useUser from "../../hooks/useUser";
import { LOGIN_PAGE } from "../../routes/constant";
import PageNotFound from "../HomeTemplate/PageNotFound";

// This template serves only for authenticated routes
// This logic is written based on that
const AdminTemplateWrapper = ({ children, routeAllowedRoles }) => {
  const user = useUser();

  // User not logged in
  if (!user.data) return <Redirect to={LOGIN_PAGE} />;

  // If user navigate unallowed page
  if (!user.isRoleAccepted(routeAllowedRoles)) return <PageNotFound />;

  return <Fragment>{children}</Fragment>;
};

export default AdminTemplateWrapper;
