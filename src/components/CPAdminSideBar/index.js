import { memo, useEffect, useState } from "react";
import * as s from "./AdminSideBar.styles";
import loginBgRight from "../../assets/images/logo_gleneagles.png";
import { CSSTransition } from "react-transition-group";
import { actTouchSidenav } from "../../redux/actions/actRootReducer";
import CPCollapseIcon from "../../assets/icons/CPCollapseIcon";
import CPDashboardIcon from "../../assets/icons/CPDashboardIcon";
import CPUsersIcon from "../../assets/icons/CPUsersIcon";
import CPPollsIcon from "../../assets/icons/CPPollsIcon";
import CPQuestions from "../../assets/icons/CPQuestions";
import CPStreamIcon from "../../assets/icons/CPStreamIcon";
import CPSiteMapIcon from "../../assets/icons/CPSiteMapIcon";
import CPUserCogIcon from "../../assets/icons/CPUserCogIcon";
import CPUserChalkBoard from "../../assets/icons/CPUserChalkBoard";
import { useDispatch, useSelector } from "react-redux";
import CPSideBarNavLink from "./CPSideBarNavLink";
import CPMessage from "../../assets/icons/CPMessageIcon";
import CPLiveDownloadIcon from "../../assets/icons/CPLiveDownloadIcon";
import {
  ADMIN_DASHBOARD_PAGE,
  ADMIN_DOWNLOAD_PAGE,
  ADMIN_EVENTS_PAGE,
  ADMIN_GROUPS_PAGE,
  ADMIN_MESSAGES_PAGE,
  ADMIN_MODERATORS_PAGE,
  ADMIN_POLLS_PAGE,
  ADMIN_PRESENTERS_PAGE,
  ADMIN_QUESTIONS_PAGE,
  ADMIN_RESOLUTION_PAGE,
  ADMIN_WORDCLOUD_PAGE,
  ADMIN_USERS_PAGE,
} from "../../routes/constant";
import CPAnnotationIcon from "../../assets/icons/CPAnnotationIcon";
import CPAlphabetIcon from "../../assets/icons/CPAlphabetIcon";

const widthWillCollapse = 1128;

function CPAdminSideBar() {
  const userTouched = useSelector((state) => state.rootReducer.sidenavTouched);
  const dispatch = useDispatch();
  const [isExpensed, setIsExpensed] = useState(false);

  useEffect(() => {
    if (window.innerWidth < widthWillCollapse && !userTouched) {
      setIsExpensed(false);
    }
    if (window.innerWidth >= widthWillCollapse && !userTouched) {
      setIsExpensed(true);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const updateWindowWidth = () => {
      if (window.innerWidth < widthWillCollapse && isExpensed && !userTouched) {
        setIsExpensed(false);
      }
      if (
        window.innerWidth >= widthWillCollapse &&
        !isExpensed &&
        !userTouched
      ) {
        setIsExpensed(true);
      }
    };
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
    // eslint-disable-next-line
  }, [isExpensed]);

  return (
    <s.Container $expanse={isExpensed} $userToggled={userTouched}>
      <s.LogoContainer to={ADMIN_USERS_PAGE}>
        <s.Image src={loginBgRight} height={100} width={180} alt="logo" />
      </s.LogoContainer>

      <s.Navbar>
        <s.PanelBtn $expanse={isExpensed} $userToggled={userTouched}>
          <CSSTransition
            in={isExpensed}
            timeout={300}
            classNames="navbar-slide-"
          >
            <s.PanelTitle $expanse={isExpensed} $userToggled={userTouched}>
              ADMIN PANEL
            </s.PanelTitle>
          </CSSTransition>
          <s.CollapseBtn
            onClick={() => {
              setIsExpensed(!isExpensed);
              dispatch(actTouchSidenav(!userTouched));
            }}
            $expanse={isExpensed}
            $userToggled={userTouched}
          >
            <s.BtnIcon>
              <CPCollapseIcon />
            </s.BtnIcon>
          </s.CollapseBtn>
        </s.PanelBtn>

        {/* List of page links */}
        <CPSideBarNavLink
          isExpensed={isExpensed}
          userTouched={userTouched}
          path={ADMIN_DASHBOARD_PAGE}
          name="Dashboard"
          icon={<CPDashboardIcon />}
        />
        <CPSideBarNavLink
          isExpensed={isExpensed}
          userTouched={userTouched}
          path={ADMIN_USERS_PAGE}
          name="Audiences"
          icon={<CPUsersIcon />}
        />
        <CPSideBarNavLink
          isExpensed={isExpensed}
          userTouched={userTouched}
          path={ADMIN_POLLS_PAGE}
          name="Polls"
          icon={<CPPollsIcon />}
        />
        <CPSideBarNavLink
          isExpensed={isExpensed}
          userTouched={userTouched}
          path={ADMIN_RESOLUTION_PAGE}
          name="Resolution"
          icon={<CPAnnotationIcon />}
        />
        <CPSideBarNavLink
          isExpensed={isExpensed}
          userTouched={userTouched}
          path={ADMIN_WORDCLOUD_PAGE}
          name="Word Cloud"
          icon={<CPAlphabetIcon />}
        />
        <CPSideBarNavLink
          isExpensed={isExpensed}
          userTouched={userTouched}
          path={ADMIN_QUESTIONS_PAGE}
          name="Questions"
          icon={<CPQuestions />}
        />
        <CPSideBarNavLink
          isExpensed={isExpensed}
          userTouched={userTouched}
          path={ADMIN_MESSAGES_PAGE}
          name="Messages"
          icon={<CPMessage />}
        />
        <CPSideBarNavLink
          isExpensed={isExpensed}
          userTouched={userTouched}
          path={ADMIN_EVENTS_PAGE}
          name="Events"
          icon={<CPStreamIcon />}
        />
        <CPSideBarNavLink
          isExpensed={isExpensed}
          userTouched={userTouched}
          path={ADMIN_GROUPS_PAGE}
          name="Groups"
          icon={<CPSiteMapIcon />}
        />
        <CPSideBarNavLink
          isExpensed={isExpensed}
          userTouched={userTouched}
          path={ADMIN_MODERATORS_PAGE}
          name="Moderators"
          icon={<CPUserCogIcon />}
        />
        <CPSideBarNavLink
          isExpensed={isExpensed}
          userTouched={userTouched}
          path={ADMIN_PRESENTERS_PAGE}
          name="Presenters"
          icon={<CPUserChalkBoard />}
        />
        <CPSideBarNavLink
          isExpensed={isExpensed}
          userTouched={userTouched}
          path={ADMIN_DOWNLOAD_PAGE}
          name="Download"
          icon={<CPLiveDownloadIcon />}
        />

        {/* End list */}
      </s.Navbar>
    </s.Container>
  );
}

export default memo(CPAdminSideBar);
