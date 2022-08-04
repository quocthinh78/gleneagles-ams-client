import {
  DELETE_USER_SUCCESS,
  GET_USERS_BY_EVENT_SUCCESS,
  UPDATE_USER_SUCCESS,
  USERS_BY_EVENT_FAILED,
  USERS_BY_EVENT_LOADING,
  USERS_BY_EVENT_RESET,
  WIPE_OFF_ADMIN_BY_EVENT_REDUCER,
} from "../constant";

const initialState = {
  users: {
    data: [],
    error: null,
    loading: false,
    totalPage: 0,
    totalCount: 0,
  },
};

const adminByEventReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_BY_EVENT_SUCCESS:
      state.users.data = [...payload.users];
      state.users.loading = false;
      state.users.totalPage = payload.maxPage;
      state.users.totalCount = payload.totalUsers;
      return { ...state };

    case USERS_BY_EVENT_FAILED:
      state.users.error = payload;
      state.users.loading = false;
      return { ...state };

    case USERS_BY_EVENT_LOADING:
      state.users.loading = true;
      return { ...state };

    case USERS_BY_EVENT_RESET:
      state.users.data = [];
      state.users.error = null;
      state.users.loading = false;
      state.users.totalPage = 0;
      state.users.totalCount = 0;
      return { ...state };

    case DELETE_USER_SUCCESS:
      state.users.data = payload;
      state.users.loading = false;
      return { ...state };

    case UPDATE_USER_SUCCESS:
      state.users.data = payload;
      state.users.loading = false;
      return { ...state };

    case WIPE_OFF_ADMIN_BY_EVENT_REDUCER:
      return {
        users: {
          data: [],
          error: null,
          loading: false,
          totalPage: 0,
          totalCount: 0,
        },
      };

    default:
      return state;
  }
};

export default adminByEventReducer;
