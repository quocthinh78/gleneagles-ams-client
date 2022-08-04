import {
  USER_TOUCHED_SIDENAV,
  VIDEO_HEIGHT,
  WIPE_OFF_EVENT_REDUCER,
  WIPE_OFF_USER_REDUCER,
} from "../constant";

export const actTouchSidenav = (payload) => {
  return {
    type: USER_TOUCHED_SIDENAV,
    payload,
  };
};

export const actUpdateVideoHeight = (payload) => {
  return {
    type: VIDEO_HEIGHT,
    payload,
  };
};

export const actWipeOffEventReducer = () => ({
  type: WIPE_OFF_EVENT_REDUCER,
});

export const actWipeOffUserReducer = () => ({
  type: WIPE_OFF_USER_REDUCER,
});
