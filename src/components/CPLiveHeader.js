import { useContext } from "react";
import styled from "styled-components";
import CPLogoutIcon from "../assets/icons/CPLogoutIcon";
import Logo from "../assets/images/login-bg-right.jpg";
import { AuthContext } from "../context/AuthProvider";
import useUser from "../hooks/useUser";

export default function CPLiveHeader() {
  const user = useUser();
  const { logout } = useContext(AuthContext);

  const handleSignOut = () => {
    logout();
  };

  return (
    <Header>
      <Title>
        <img src={Logo} alt="Logo" />
      </Title>
      <UserInfo>
        <p>{user.data.user_name}</p>
        <button onClick={handleSignOut} title="Logout">
          <CPLogoutIcon height="20px" width="20px" marginRight="0" />
        </button>
      </UserInfo>
    </Header>
  );
}

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  -webkit-box-shadow: 0 0 35px 0 rgb(154 161 171 / 25%);
  -moz-box-shadow: 0 0 35px 0 rgb(154 161 171 / 25%);
  box-shadow: 0 0 35px 0 rgb(154 161 171 / 25%);
`;

const Title = styled.div`
  color: teal;
  font-size: 14px;
  img {
    height: 80px;
  }
  ${({ theme }) => theme.breakpoints.m} {
    font-size: 18px;
  }
  ${({ theme }) => theme.breakpoints.l} {
    font-size: 22px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    font-weight: bold;
    font-size: 14px;
    margin-right: 0.5rem;
  }
  button {
    background-color: transparent;
    border: 2px solid teal;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    &:hover {
      color: #fff;
      background-color: teal;
    }
  }

  ${({ theme }) => theme.breakpoints.m} {
    p {
      font-size: 16px;
    }
    button {
      font-size: 16px;
    }
  }
  ${({ theme }) => theme.breakpoints.l} {
    p {
      font-size: 18px;
    }
    button {
      font-size: 18px;
    }
  }
`;
