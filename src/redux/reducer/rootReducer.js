import { USER_TOUCHED_SIDENAV, VIDEO_HEIGHT } from "../constant";

const initialState = {
  sidenavTouched: false,
  videoHeight: 0,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_TOUCHED_SIDENAV:
      state.sidenavTouched = payload;
      return { ...state };
    case VIDEO_HEIGHT:
      state.videoHeight = (payload * 9) / 16;
      return { ...state };

    default:
      return state;
  }
};

export default rootReducer;
