import apiInstance from "../../../services";
import {
  ADMIN_GET_USERS_FAIL,
  ADMIN_GET_USERS_LOADING,
  ADMIN_GET_USERS_SUCCESS,
  WIPE_OFF_ADMIN_REDUCER,
} from "../../constant";
import _ from "lodash";

export const actAdminGetUsers = () => async (dispatch) => {
  try {
    dispatch(actGetUsersLoading());
    const { data } = await apiInstance({
      url: "user/getAllUser",
      method: "GET",
    });
    if (_.isArray(data)) {
      const userOptions = data.map((u) => ({
        value: u.id,
        label: u.email,
      }));
      dispatch(actGetUsersSuccess(userOptions));
    } else dispatch(actGetUsersFail(data));
  } catch (error) {
    dispatch(actGetUsersFail(error));
  }
};

export const actGetUsersSuccess = (payload) => ({
  type: ADMIN_GET_USERS_SUCCESS,
  payload,
});

export const actGetUsersFail = (payload) => ({
  type: ADMIN_GET_USERS_FAIL,
  payload,
});

export const actGetUsersLoading = () => ({
  type: ADMIN_GET_USERS_LOADING,
});

export const actWipeOffAdmin = () => ({
  type: WIPE_OFF_ADMIN_REDUCER,
});
