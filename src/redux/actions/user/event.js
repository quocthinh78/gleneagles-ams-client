import apiInstance from "../../../services";
import {
  TOGGLE_EVENT_CHAT,
  USER_EVENT_ERROR,
  USER_EVENT_LOADING,
  USER_EVENT_SUCCESS,
  USER_EVENT_UPDATE_STATE,
  TOGGLE_EVENT_NETWORKING,
  UPDATE_EVENT_NETWORKING_DATA,
  PAUSE_CHAT_AND_PIN_MESSAGES_UPDATE,
} from "../../constant";

export const actGetUserEvent = (payload) => async (dispatch) => {
  try {
    dispatch(actGetUserEventLoading());
    const { data } = await apiInstance({
      url: `event/get-event-user/${payload}`,
      method: "GET",
    });
    dispatch(actGetUserEventSuccess(data[0]));
  } catch (error) {
    dispatch(actGetUserEventError(error));
  }
};

export const actGetGroupInfo = (userId, eventId) => async (dispatch) => {
  try {
    const { data } = await apiInstance({
      url: `group/group-info/${eventId}/${userId}`,
      method: "GET",
    });

    if (data) {
      dispatch(
        actUpdateEventNetWorkingData({
          zoomUrl: data.zoom_url,
          zoomPassword: data.zoom_password,
          announcement: data.announcement,
          groupId: data.id,
        })
      );
    }
  } catch (error) {
    // ignore error
    console.log(error);
  }
};

export const actGetUserEventLoading = () => {
  return {
    type: USER_EVENT_LOADING,
  };
};
export const actGetUserEventSuccess = (payload) => {
  return {
    type: USER_EVENT_SUCCESS,
    payload,
  };
};
export const actGetUserEventError = (payload) => {
  return {
    type: USER_EVENT_ERROR,
    payload,
  };
};

export const actToggleEventUpdateState = (payload) => ({
  type: USER_EVENT_UPDATE_STATE,
  payload,
});

export const actToggleEventChat = (payload) => {
  return {
    type: TOGGLE_EVENT_CHAT,
    payload,
  };
};

export const actToggleEventNetworking = (payload) => {
  return {
    type: TOGGLE_EVENT_NETWORKING,
    payload,
  };
};

export const actUpdatePauseAndPinMessages = (payload) => ({
  type: PAUSE_CHAT_AND_PIN_MESSAGES_UPDATE,
  payload,
});

export const actUpdateEventNetWorkingData = (payload) => ({
  type: UPDATE_EVENT_NETWORKING_DATA,
  payload,
});
