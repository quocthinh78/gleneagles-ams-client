import * as s from "./AdminMainContent.styles";
import CPLogoutIcon from "../../assets/icons/CPLogoutIcon";
import Breadcrumb from "../../hooks/useBreadcrumb";
import useUser from "../../hooks/useUser";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

function CPAdminMainContent({ children }) {
  const user = useUser();
  const { logout } = useContext(AuthContext);

  const handleSignOut = () => {
    logout();
  };

  return (
    <s.MainContent>
      <s.Header>
        <s.BCWrapper>
          {/* <Breadcrumb disablePath="[id]" /> */}
          <Breadcrumb disablePath={user.data.admin ? "" : "admin"} />
        </s.BCWrapper>
        <s.Box>
          <s.LogoutBtn onClick={handleSignOut}>
            <CPLogoutIcon />
            Logout
          </s.LogoutBtn>
        </s.Box>
      </s.Header>
      <s.Middle>{children}</s.Middle>
      <s.Footer>
        <div>2021 © MEETZ</div>
        <div className="right">
          <button>About</button>
          <button>Support</button>
          <button>Contact Us</button>
        </div>
      </s.Footer>
    </s.MainContent>
  );
}

export default CPAdminMainContent;
