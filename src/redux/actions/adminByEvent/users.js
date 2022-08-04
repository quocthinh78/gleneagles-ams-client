import { toast } from "react-toastify";
import apiInstance from "../../../services";
import {
  DELETE_USER_SUCCESS,
  GET_USERS_BY_EVENT_SUCCESS,
  UPDATE_USER_SUCCESS,
  USERS_BY_EVENT_FAILED,
  USERS_BY_EVENT_LOADING,
  USERS_BY_EVENT_RESET,
  WIPE_OFF_ADMIN_BY_EVENT_REDUCER,
} from "../../constant";

// Get list of user
export const actGetUsersByEvent =
  (page, pagesize, event_id, search) => async (dispatch) => {
    try {
      dispatch(actUsersByEventLoading());
      const { data } = await apiInstance({
        url: "user/searchUsers",
        method: "GET",
        params: {
          event: event_id,
          page: page,
          size: pagesize,
          search: search,
        },
      });
      dispatch(actGetUsersByEventSuccess(data));
    } catch (error) {
      dispatch(actUsersByEventFail(error));
    }
  };

// Delete a user in the list
export const actDeleteUser = (user_id) => async (dispatch, getState) => {
  try {
    dispatch(actUsersByEventLoading());
    await apiInstance({
      url: `user/deleteUser/${user_id}`,
      method: "DELETE",
    });

    const { adminByEventReducer } = getState();
    const newUserList = adminByEventReducer.users.data.filter(
      (user) => user.id !== user_id
    );
    toast.success("Delete Success");
    dispatch(actDeleteUserSuccess(newUserList));
  } catch (error) {
    toast.error(error.message);
    dispatch(actUsersByEventFail(error));
  }
};

// Delete a user in the list
export const actBlockAndUnblockUser =
  (user_id) => async (dispatch, getState) => {
    try {
      dispatch(actUsersByEventLoading());
      const { data: updatedUser } = await apiInstance({
        url: `user/blockUser/${user_id}`,
        method: "PATCH",
      });

      const { adminByEventReducer } = getState();
      const newUserList = adminByEventReducer.users.data.map((user) =>
        user.id === user_id ? { ...user, active: !user.active } : user
      );

      if (updatedUser.active) {
        toast.success("Unblock Success");
      } else {
        toast.success("Block Success");
      }

      dispatch(actUpdateUserSuccess(newUserList));
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      dispatch(actUsersByEventFail(error));
    }
  };

/////////////////////////////

export const actGetUsersByEventSuccess = (payload) => ({
  type: GET_USERS_BY_EVENT_SUCCESS,
  payload,
});

export const actDeleteUserSuccess = (payload) => ({
  type: DELETE_USER_SUCCESS,
  payload,
});

export const actUpdateUserSuccess = (payload) => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});

// Shared actions
export const actUsersByEventFail = (payload) => ({
  type: USERS_BY_EVENT_FAILED,
  payload,
});

export const actUsersByEventLoading = () => ({
  type: USERS_BY_EVENT_LOADING,
});

export const actUsersByEventReset = () => ({
  type: USERS_BY_EVENT_RESET,
});

export const actWipeOffAdminByEvent = () => ({
  type: WIPE_OFF_ADMIN_BY_EVENT_REDUCER,
});
