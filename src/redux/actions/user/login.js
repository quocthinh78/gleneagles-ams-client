import apiInstance from "../../../services";
import { setAPIHeader } from "../../../services/auth";
import {
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOADING,
} from "../../constant";
import { actAdminGetEvents } from "../admin/events";
import { actAdminGetUsers } from "../admin/users";
import { actGetUserEventSuccess } from "./event";
import socket from "../../../services/socket";
import publicIp from "public-ip";
import { isSuperUser } from "../../../helpers/checkSuperUser";

export const actUserLogin = (payload) => {
  return async (dispatch) => {
    dispatch(actLoginLoading(true));
    try {
      const { data } = await apiInstance({
        url: "user/login",
        method: "POST",
        data: { email: payload.email, password: payload.password },
      });
      dispatch(actGetUserDetail(data.token));
    } catch (err) {
      const errRes = err.response.data;
      if (errRes.statusCode) {
        dispatch(
          actLoggingFail({
            error_code: errRes.statusCode,
            message: errRes.message,
          })
        );
      } else {
        dispatch(
          actLoggingFail({
            error_code: 999,
            message: "Something went wrong, please try again later",
          })
        );
      }
      console.log(err);
    }
    dispatch(actLoginLoading(false));
  };
};

export const actUserLoginByEmail = (payload) => {
  return async (dispatch) => {
    dispatch(actLoginLoading(true));
    try {
      const { data } = await apiInstance({
        url: "user/login-by-email",
        method: "POST",
        data: { email: payload.email },
      });
      dispatch(actGetUserDetail(data.token));
    } catch (err) {
      const errRes = err.response.data;
      if (errRes.statusCode) {
        dispatch(
          actLoggingFail({
            error_code: errRes.statusCode,
            message: errRes.message,
          })
        );
      } else {
        dispatch(
          actLoggingFail({
            error_code: 999,
            message: "Something went wrong, please try again later",
          })
        );
      }
      console.log(err);
    }
    dispatch(actLoginLoading(false));
  };
};

export const actUserLoginByEmailAndUsername = (payload) => {
  return async (dispatch) => {
    dispatch(actLoginLoading(true));
    try {
      const { data } = await apiInstance({
        url: "user/authenticate-demo",
        method: "POST",
        data: { email: payload.email, first_name: payload.first_name },
      });
      dispatch(actGetUserDetail(data.token));
    } catch (err) {
      const errRes = err.response.data;
      if (errRes.statusCode) {
        dispatch(
          actLoggingFail({
            error_code: errRes.statusCode,
            message: errRes.message,
          })
        );
      } else {
        dispatch(
          actLoggingFail({
            error_code: 999,
            message: "Something went wrong, please try again later",
          })
        );
      }
      console.log(err);
    }
    dispatch(actLoginLoading(false));
  };
};

export const actGetUserDetail = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await apiInstance({
        url: `user/getUserByToken/${token}`,
        method: "GET",
      });
      if (!data.user.active) {
        dispatch(
          actLoggingFail({
            message: "You are not able to login right now",
            error_code: 451,
          })
        );
        dispatch(actLoginLoading(false));
        return;
      }
      const userIP = await publicIp.v4();
      console.log(data);
      socket.auth = {
        userId: data.user.id,
        IP: userIP,
        eventId: data.event?.id,
      };
      socket.connect();
      socket.on("still-alive", (userId) => {
        socket.emit("still-alive", userId);
      });
      setAPIHeader(data.token);
      localStorage.setItem("token", data.token);
      dispatch(actGetUserEventSuccess(data.event));
      dispatch(actLoggingSuccess(data.user));

      if (isSuperUser(data.user)) {
        dispatch(actAdminGetEvents());
      }
      if (data.user.admin) {
        dispatch(actAdminGetUsers());
      }
    } catch (err) {
      dispatch(
        actTokenError({
          error_code: 999,
          message: "Something went wrong, please try again later",
        })
      );
      console.log(err);
    }
  };
};

export const actLoggingSuccess = (payload) => {
  return {
    type: USER_LOGIN,
    payload,
  };
};

export const actLoggingFail = (payload) => {
  return {
    type: USER_LOGIN_FAIL,
    payload,
  };
};

export const actLoginLoading = (payload) => ({
  type: USER_LOGIN_LOADING,
  payload,
});

export const actTokenError = (payload) => ({
  type: USER_LOGIN_FAIL,
  payload,
});
