import { useLocation } from "react-router";
import { CSSTransition } from "react-transition-group";
import * as s from "./AdminSideBar.styles";

function CPSideBarNavLink({ isExpensed, userTouched, path, name, icon }) {
  const location = useLocation();

  return (
    <s.NavLink active={location.pathname === path}>
      <s.LinkBox
        $expanse={isExpensed}
        $active={location.pathname === path}
        $userToggled={userTouched}
        to={path}
      >
        <s.Icon $expanse={isExpensed} $userToggled={userTouched}>
          {icon}
        </s.Icon>
        <CSSTransition in={isExpensed} classNames="navbar-slide-" timeout={300}>
          <s.LinkSpan $expanse={isExpensed} $userToggled={userTouched}>
            {name}
          </s.LinkSpan>
        </CSSTransition>
      </s.LinkBox>
    </s.NavLink>
  );
}

export default CPSideBarNavLink;
