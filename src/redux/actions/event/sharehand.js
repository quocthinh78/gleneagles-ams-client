import {
  SHAREHAND_SUCCESS,
  SHAREHAND_ERROR,
  SHAREHAND_UPDATE,
  SHAREHAND_ADD_MORE,
  SHAREHAND_SUBMIT_UPDATE,
} from "../../constant/index";
import apiInstance from "../../../services/index";

export const actGetShareHand = (user_id, event_id) => async (dispatch) => {
  try {
    const { data } = await apiInstance({
      url: `resolution/get-by-user-event/${user_id}/${event_id}`,
      method: "GET",
    });
    dispatch(actFetchShareHandSuccess(data.resolutions));
  } catch (error) {
    dispatch(actFetchShareHandError(error));
  }
};

export const actFetchShareHandSuccess = (payload) => {
  return {
    type: SHAREHAND_SUCCESS,
    payload,
  };
};
export const actFetchShareHandError = (payload) => {
  return {
    type: SHAREHAND_ERROR,
    payload,
  };
};

export const actUpdateShareHand = (payload) => {
  return {
    type: SHAREHAND_UPDATE,
    payload,
  };
};

export const actAddMoreShareHand = (payload) => {
  return {
    type: SHAREHAND_ADD_MORE,
    payload,
  };
};

export const actUpdateSubmitShareHand = (payload) => {
  return {
    type: SHAREHAND_SUBMIT_UPDATE,
    payload,
  };
};
