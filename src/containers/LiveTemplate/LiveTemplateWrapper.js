import React, { Fragment } from "react";
import { Redirect } from "react-router";
import { isStarted } from "../../helpers/checkStartedDate";
import useUser from "../../hooks/useUser";
import {
  ADMIN_MODERATORS_PAGE,
  ADMIN_PRESENTERS_PAGE,
  ADMIN_USERS_PAGE,
  HOLDING_PAGE,
  LIVE_DETAIL_PAGE,
  LIVE_PAGE,
  LOGIN_PAGE,
  PHONE_VERIFY_PAGE,
} from "../../routes/constant";
import PageNotFound from "../HomeTemplate/PageNotFound";

// This template serves only for authenticated routes
// This logic is written based on that
const LiveTemplateWrapper = ({ children, routeAllowedRoles, matchProp }) => {
  const user = useUser();

  // User not logged in
  if (!user.data) return <Redirect to={LOGIN_PAGE} />;

  // If user is a super user
  if (user.data.admin) return <Redirect to={ADMIN_USERS_PAGE} />;
  if (user.data.is_moderator) return <Redirect to={ADMIN_MODERATORS_PAGE} />;
  if (user.data.is_presenter) return <Redirect to={ADMIN_PRESENTERS_PAGE} />;

  // If user navigate unallowed page
  if (!user.isRoleAccepted(routeAllowedRoles)) return <PageNotFound />;

  // User not verify phone number yet.
  if (!user.data.phone_verified) return <Redirect to={PHONE_VERIFY_PAGE} />;

  // If event is not started and user try to navigate other pages
  // which is not holdingPage
  if (
    !user.eventData ||
    !user.eventData.state ||
    !isStarted(user.eventData.start_at)
  )
    return <Redirect to={HOLDING_PAGE} />;

  // If user logged in and event is started
  if (
    user.eventData &&
    user.eventData.state &&
    isStarted(user.eventData.start_at) &&
    matchProp.path !== LIVE_DETAIL_PAGE
  )
    return <Redirect to={`${LIVE_PAGE}/${user.eventData.id}`} />;

  return <Fragment>{children}</Fragment>;
};

export default LiveTemplateWrapper;
