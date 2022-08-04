import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useUser from "../hooks/useUser";
import {
  actWipeOffEventReducer,
  actWipeOffUserReducer,
} from "../redux/actions/actRootReducer";
import { actWipeOffAdmin } from "../redux/actions/admin/users";
import { actWipeOffAdminByEvent } from "../redux/actions/adminByEvent/users";
import { actGetUserDetail } from "../redux/actions/user/login";
import { setAPIHeader } from "../services/auth";
import socket from "../services/socket";

export const AuthContext = React.createContext();

const clearItem = (key) => {
  localStorage.removeItem(key);
};

const isValidToken = () => {
  const token = localStorage.getItem("token");

  if (token) {
    setAPIHeader(token);
    return true;
  }
  return false;
};

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(isValidToken());
  const { data: user, error } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    // socket.on("connect", () => {});

    if (loggedIn && !user) {
      dispatch(actGetUserDetail(localStorage.getItem("token")));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      setLoggedIn(false);
      clearItem("token");
    }
    if (user && !loggedIn) {
      setLoggedIn(true);
    }
    // eslint-disable-next-line
  }, [error, user]);

  const logout = () => {
    clearItem("token");
    dispatch(actWipeOffEventReducer());
    dispatch(actWipeOffUserReducer());
    dispatch(actWipeOffAdminByEvent());
    dispatch(actWipeOffAdmin());
    setLoggedIn(false);
    socket.removeAllListeners();
    socket.disconnect();
  };

  if (loggedIn && !user)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Progressing...
      </div>
    );

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, logout }}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
