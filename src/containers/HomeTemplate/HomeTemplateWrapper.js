import React, { Fragment } from "react";
import { Redirect } from "react-router";
import useUser from "../../hooks/useUser";
import { isStarted } from "../../helpers/checkStartedDate";
import {
  ADMIN_MODERATORS_PAGE,
  ADMIN_PRESENTERS_PAGE,
  ADMIN_USERS_PAGE,
  CHANGE_PHONE_NUMBER_PAGE,
  // HOLDING_PAGE,
  // LIVE_DETAIL_PAGE,
  LIVE_PAGE,
  LOGIN_PAGE,
  PHONE_VERIFY_PAGE,
  REGISTRATION_PAGE,
  VIP_PAGE,
} from "../../routes/constant";
import PageNotFound from "./PageNotFound";

// This template serves for both authenticated and unauthenticated routes
// This logic is written based on that
const HomeTemplateWrapper = ({ children, routeAllowedRoles, matchProp }) => {
  const user = useUser();

  // User not logged in but navigate protected page
  if (routeAllowedRoles.length > 0 && !user.data)
    return <Redirect to={LOGIN_PAGE} />;

  // If user is a super user
  if (user.data && user.data.vip) return <Redirect to={VIP_PAGE} />;
  if (user.data && user.data.admin) return <Redirect to={ADMIN_USERS_PAGE} />;
  if (user.data && user.data.is_moderator)
    return <Redirect to={ADMIN_MODERATORS_PAGE} />;
  if (user.data && user.data.is_presenter)
    return <Redirect to={ADMIN_PRESENTERS_PAGE} />;

  // If user navigate unallowed page
  if (!user.isRoleAccepted(routeAllowedRoles)) return <PageNotFound />;

  // User logged in but not verify phone number yet.
  if (
    user.data &&
    !user.data.phone_verified &&
    matchProp.path !== PHONE_VERIFY_PAGE &&
    matchProp.path !== CHANGE_PHONE_NUMBER_PAGE
  )
    return <Redirect to={PHONE_VERIFY_PAGE} />;

  // If event is not started and user try to navigate other pages
  // which is not holdingPage
  // if (
  //   user.data &&
  //   user.data.phone_verified &&
  //   (!user.eventData ||
  //     !user.eventData.state ||
  //     !isStarted(user.eventData.start_at)) &&
  //   matchProp.path !== HOLDING_PAGE
  // )
  //   return <Redirect to={HOLDING_PAGE} />;

  // If user logged in and event is started
  // if (
  //   user.data &&
  //   user.data.phone_verified &&
  //   user.eventData &&
  //   user.eventData.state &&
  //   isStarted(user.eventData.start_at) &&
  //   matchProp.path !== LIVE_DETAIL_PAGE
  // )
  //   return <Redirect to={`${LIVE_PAGE}/${user.eventData.id}`} />;

  // If user logged in and navigate LoginPage/RegisterPage (this one is added for AVPD project)
  if (
    user.data &&
    user.data.phone_verified &&
    user.eventData?.state &&
    isStarted(user.eventData.start_at) &&
    (matchProp.path === LOGIN_PAGE || matchProp.path === REGISTRATION_PAGE)
  )
    return <Redirect to={`${LIVE_PAGE}/${user.eventData.id}`} />;

  return <Fragment>{children}</Fragment>;
};

export default HomeTemplateWrapper;
