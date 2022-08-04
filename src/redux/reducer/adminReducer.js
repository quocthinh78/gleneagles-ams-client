import {
  ADMIN_GET_EVENTS_SUCCESS,
  ADMIN_GET_USERS_SUCCESS,
  ADMIN_GET_EVENTS_FAIL,
  ADMIN_GET_USERS_FAIL,
  ADMIN_GET_EVENTS_LOADING,
  ADMIN_GET_USERS_LOADING,
  WIPE_OFF_ADMIN_REDUCER,
} from "../constant";

const initialState = {
  listEvents: [],
  errEvents: null,
  loadingEvents: false,
  listUsers: [],
  errUser: null,
  loadingUsers: false,
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADMIN_GET_EVENTS_SUCCESS:
      state.listEvents = payload;
      state.errEvents = null;
      state.loadingEvents = false;
      return { ...state };

    case ADMIN_GET_EVENTS_FAIL:
      state.loadingEvents = false;
      state.listEvents = [];
      state.errEvents = payload;
      return { ...state };

    case ADMIN_GET_EVENTS_LOADING:
      state.loadingEvents = true;
      state.listEvents = [];
      state.errEvents = null;
      return { ...state };

    case ADMIN_GET_USERS_SUCCESS:
      state.listUsers = payload;
      state.errUser = null;
      state.loadingUsers = false;
      return { ...state };

    case ADMIN_GET_USERS_FAIL:
      state.listUsers = [];
      state.errUser = payload;
      state.loadingUsers = false;
      return { ...state };

    case ADMIN_GET_USERS_LOADING:
      state.loadingUsers = true;
      state.listUsers = [];
      state.errUser = null;
      return { ...state };

    case WIPE_OFF_ADMIN_REDUCER:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default adminReducer;
