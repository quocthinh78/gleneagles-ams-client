import React from "react";
import { flattenDeep } from "lodash";
import { matchPath } from "react-router";
import AdminLayout from "../containers/AdminTemplate/";
import AdminTemplateWrapper from "../containers/AdminTemplate/AdminTemplateWrapper";
import HomeLayout from "../containers/HomeTemplate/";
import HomeTemplateWrapper from "../containers/HomeTemplate/HomeTemplateWrapper";
import LiveLayout from "../containers/LiveTemplate/";
import LiveTemplateWrapper from "../containers/LiveTemplate/LiveTemplateWrapper";
import TwillioLayout from "../containers/TwillioTemplate";
import {
  ADMIN_ROLE,
  MODERATOR_ROLE,
  PRESENTER_ROLE,
  USER_ROLE,
  VIP_USER_ROLE,
} from "../services/auth";
import * as routePath from "./constant";
import TwillioTemplateWrapper from "../containers/TwillioTemplate/TwillioTemplateWrapper";
import VipLayout from "../containers/VipTemplate";
import VipTemplateWrapper from "../containers/VipTemplate/VipTemplateWrapper";

export const getListPathsByRole = (routeCollection = [], role = "") => {
  const allowedRoutesPerLayout = routeCollection.map((layoutObj) => {
    const listAllowedRoutes = layoutObj.routes.filter((route) => {
      if (!route.auth) return true;
      if (!role) return false;
      return route.auth.indexOf(role) !== -1;
    });
    return listAllowedRoutes.map((i) => i.path);
  });

  return flattenDeep(allowedRoutesPerLayout);
};

export const getMatchPath = (
  pathname = "",
  path = "",
  exact = true,
  strict = false
) => {
  return matchPath(pathname, {
    path,
    exact,
    strict,
  });
};

const appRoutes = [
  {
    layout: AdminLayout,
    wrapper: AdminTemplateWrapper,
    routes: [
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/Admin")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_USERS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/UsersPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_CREATE_USERS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/UsersPage/UserCreatePage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_IMPORT_USERS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/UsersPage/UserImportPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_USER_DETAIL_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/UsersPage/UserDetailPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_EDIT_USER_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/UsersPage/UserEditPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_DASHBOARD_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/DashboardPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_POLLS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/PollsPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_CREATE_POLLS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/PollsPage/CreatePollPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_EDIT_POLLS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/PollsPage/EditPollPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_QUESTIONS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/QuestionsPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_QUESTIONS_UPVOTE_DETAIL_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/QuestionsPage/UpvoteDetailPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_MESSAGES_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/MessagesPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_EVENTS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/EventsPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_CREATE_EVENTS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/EventsPage/CreateEventPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_EDIT_EVENTS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/EventsPage/EditEventPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_IMPORT_EVENTS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/EventsPage/ImportUserPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_GROUPS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/GroupsPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_CREATE_GROUPS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/GroupsPage/CreateGroupPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_EDIT_GROUPS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/GroupsPage/EditGroupPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_GROUP_SLIDES_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/GroupsPage/GroupSlidesPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_DOWNLOAD_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/DownloadPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE, MODERATOR_ROLE],
        path: routePath.ADMIN_MODERATORS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/Moderators")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE, MODERATOR_ROLE],
        path: routePath.ADMIN_MODERATOR_DETAIL_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/Moderators/DetailModerator")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE, MODERATOR_ROLE],
        path: routePath.ADMIN_CREATE_MODERATORS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/Moderators/CreateModerator")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE, MODERATOR_ROLE],
        path: routePath.ADMIN_EDIT_MODERATORS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/Moderators/EditModerator")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE, PRESENTER_ROLE],
        path: routePath.ADMIN_PRESENTERS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/Presenters")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE, PRESENTER_ROLE],
        path: routePath.ADMIN_PRESENTER_DETAIL_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/Presenters/DetailPresenter")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE, PRESENTER_ROLE],
        path: routePath.ADMIN_CREATE_PRESENTERS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/Presenters/CreatePresenter")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE, PRESENTER_ROLE],
        path: routePath.ADMIN_EDIT_PRESENTERS_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/Presenters/EditPresenter")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_RESOLUTION_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/ResolutionPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_CREATE_RESOLUTION_PAGE,
        component: React.lazy(() =>
          import(
            "../containers/AdminTemplate/ResolutionPage/CreateResolutionPage"
          )
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_EDIT_RESOLUTION_PAGE,
        component: React.lazy(() =>
          import(
            "../containers/AdminTemplate/ResolutionPage/EditResolutionPage"
          )
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_WORDCLOUD_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/WordCloudPage")
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_CREATE_WORDCLOUD_PAGE,
        component: React.lazy(() =>
          import(
            "../containers/AdminTemplate/WordCloudPage/CreateWordCloudPage"
          )
        ),
      },
      {
        exact: true,
        auth: [ADMIN_ROLE],
        path: routePath.ADMIN_EDIT_WORDCLOUD_PAGE,
        component: React.lazy(() =>
          import("../containers/AdminTemplate/WordCloudPage/EditWordCloudPage")
        ),
      },
    ],
  },
  {
    layout: LiveLayout,
    wrapper: LiveTemplateWrapper,
    routes: [
      {
        exact: true,
        auth: [USER_ROLE],
        path: routePath.LIVE_DETAIL_PAGE,
        component: React.lazy(() =>
          import("../containers/LiveTemplate/LivePage")
        ),
      },
    ],
  },
  {
    layout: HomeLayout,
    wrapper: HomeTemplateWrapper,
    routes: [
      {
        exact: true,
        auth: null,
        path: routePath.LOGIN_PAGE,
        component: React.lazy(() =>
          import("../containers/HomeTemplate/LoginPage")
        ),
      },
      {
        exact: true,
        auth: null,
        path: routePath.PROGRAM_PAGE,
        component: React.lazy(() =>
          import("../containers/HomeTemplate/ProgramPage")
        ),
      },
      {
        exact: true,
        auth: null,
        path: routePath.REGISTRATION_PAGE,
        component: React.lazy(() =>
          import("../containers/HomeTemplate/RegisterPage")
        ),
      },
      {
        exact: true,
        auth: null,
        path: routePath.REGISTRATION_PAGE_WAITING,
        component: React.lazy(() =>
          import("../containers/HomeTemplate/RegisterPageWaiting")
        ),
      },
      {
        exact: true,
        auth: null,
        path: routePath.REGISTRATION_PAGE_EXPIRED,
        component: React.lazy(() =>
          import("../containers/HomeTemplate/RegisterPageExpired")
        ),
      },
      {
        exact: true,
        auth: null,
        path: routePath.THANK_YOU_PAGE,
        component: React.lazy(() =>
          import("../containers/HomeTemplate/ThankyouPage")
        ),
      },
      {
        exact: true,
        auth: null,
        path: routePath.VERIFICATION_PAGE,
        component: React.lazy(() =>
          import("../containers/HomeTemplate/VerificationPage")
        ),
      },
      {
        exact: true,
        auth: null,
        path: routePath.FORGET_PASSWORD_PAGE,
        component: React.lazy(() =>
          import("../containers/HomeTemplate/ForgetPasswordPage")
        ),
      },
      {
        exact: true,
        auth: null,
        path: routePath.RESET_PASSWORD_PAGE,
        component: React.lazy(() =>
          import("../containers/HomeTemplate/ForgetPasswordPage/NewPassword")
        ),
      },
      {
        exact: true,
        auth: [USER_ROLE],
        path: routePath.HOLDING_PAGE,
        component: React.lazy(() =>
          import("../containers/HomeTemplate/HoldingPage")
        ),
      },
      {
        exact: true,
        auth: [USER_ROLE],
        path: routePath.PHONE_VERIFY_PAGE,
        component: React.lazy(() =>
          import("../containers/HomeTemplate/PhoneVerificationPage")
        ),
      },
      {
        exact: true,
        auth: [USER_ROLE],
        path: routePath.CHANGE_PHONE_NUMBER_PAGE,
        component: React.lazy(() =>
          import("../containers/HomeTemplate/ChangePhoneNumber")
        ),
      },
      {
        exact: true,
        auth: null,
        path: routePath.HOME_PAGE,
        component: React.lazy(() =>
          import("../containers/HomeTemplate/HomePage")
        ),
      },
      {
        exact: true,
        auth: null,
        path: routePath.ABOUT_PAGE,
        component: React.lazy(() =>
          import("../containers/HomeTemplate/AboutPage")
        ),
      },
      {
        exact: true,
        auth: null,
        path: routePath.MESSAGE_PAGE,
        component: React.lazy(() =>
          import("../containers/HomeTemplate/MessagePage")
        ),
      },
    ],
  },
  {
    layout: TwillioLayout,
    wrapper: TwillioTemplateWrapper,
    routes: [
      {
        exact: true,
        auth: [USER_ROLE],
        path: routePath.NETWORKING_VIDEO_CHAT_PAGE,
        component: React.lazy(() =>
          import("../containers/TwillioTemplate/RoomsPage")
        ),
      },
      {
        exact: true,
        auth: [USER_ROLE],
        path: routePath.TWILLIO_STREAM,
        component: React.lazy(() =>
          import("../containers/TwillioTemplate/StreamPage")
        ),
      },
      // {
      //   exact: true,
      //   auth: [USER_ROLE],
      //   path: routePath.NETWORKING_SLIDES_PAGE,
      //   component: React.lazy(() =>
      //     import("../containers/TwillioTemplate/SlidesPage")
      //   ),
      // },
    ],
  },
  {
    layout: VipLayout,
    wrapper: VipTemplateWrapper,
    routes: [
      {
        exact: true,
        auth: [VIP_USER_ROLE, USER_ROLE],
        path: routePath.VIP_PAGE,
        component: React.lazy(() =>
          import("../containers/VipTemplate/LobbyPage")
        ),
      },
      {
        exact: true,
        auth: [VIP_USER_ROLE, USER_ROLE],
        path: routePath.VIP_VIDEO_CHAT_PAGE,
        component: React.lazy(() =>
          import("../containers/VipTemplate/VipRoomPage")
        ),
      },
    ],
  },
];
export default appRoutes;

export const appRouteWithPaths = appRoutes.map(
  ({ layout, wrapper, routes }) => ({
    layout,
    wrapper,
    routes: routes.map((item) => ({
      auth: item.auth || null,
      path: item.path,
    })),
    paths: routes.map((route) => route.path),
  })
);
