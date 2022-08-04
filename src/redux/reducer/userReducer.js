import {
  TOGGLE_EVENT_CHAT,
  USER_EVENT_ERROR,
  USER_EVENT_LOADING,
  USER_EVENT_SUCCESS,
  USER_EVENT_UPDATE_STATE,
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOADING,
  WIPE_OFF_USER_REDUCER,
  TOGGLE_EVENT_NETWORKING,
  UPDATE_EVENT_NETWORKING_DATA,
  PAUSE_CHAT_AND_PIN_MESSAGES_UPDATE,
} from "../constant";

const initialState = {
  loading: false,
  data: null,
  error: null,
  eventData: null,
  eventErr: null,
  networkingData: {
    zoomUrl: "",
    passcode: "",
    announcement: "",
  },
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      state.data = payload;
      state.error = null;
      return { ...state };

    case USER_LOGIN_FAIL:
      state.data = null;
      state.error = payload;
      return { ...state };

    case USER_LOGIN_LOADING:
      state.loading = payload;
      return { ...state };

    case USER_EVENT_LOADING:
      state.eventData = null;
      state.eventErr = null;
      return { ...state };

    case USER_EVENT_SUCCESS:
      state.eventData = payload;
      state.eventErr = null;
      return { ...state };

    case USER_EVENT_ERROR:
      state.eventData = null;
      state.eventErr = payload;
      return { ...state };

    case USER_EVENT_UPDATE_STATE:
      state.eventData = { ...state.eventData, state: payload };
      return { ...state };

    case TOGGLE_EVENT_CHAT:
      state.eventData = { ...state.eventData, pause_chat: payload };
      return { ...state };

    case TOGGLE_EVENT_NETWORKING:
      state.eventData = {
        ...state.eventData,
        is_networking: payload.isNetworking,
      };
      state.networkingData = {
        zoomUrl: payload.zoomUrl || "",
        zoomPassword: payload.zoomPassword || "",
        announcement: payload.announcement || "",
        groupId: payload.groupId || 0,
      };
      state.data = {
        ...state.data,
        video_token: payload.videoToken || "",
      };
      return { ...state };

    case UPDATE_EVENT_NETWORKING_DATA:
      state.networkingData = {
        zoomUrl: payload.zoomUrl || "",
        zoomPassword: payload.zoomPassword || "",
        announcement: payload.announcement || "",
        groupId: payload.groupId || 0,
      };
      return { ...state };

    case PAUSE_CHAT_AND_PIN_MESSAGES_UPDATE:
      state.eventData = {
        ...state.eventData,
        selected_pause_message: payload.selected_pause_message,
        selected_pin_message: payload.selected_pin_message,
      };
      return { ...state };

    case WIPE_OFF_USER_REDUCER:
      return {
        ...state,
        ...initialState,
        data: null,
      };

    default:
      return state;
  }
};

export default userReducer;
