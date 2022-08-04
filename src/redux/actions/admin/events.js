import apiInstance from "../../../services";
import {
  ADMIN_GET_EVENTS_FAIL,
  ADMIN_GET_EVENTS_SUCCESS,
  ADMIN_GET_EVENTS_LOADING,
} from "../../constant";
import _ from "lodash";

export const actAdminGetEvents = () => async (dispatch) => {
  try {
    dispatch(actGetEventsLoading());
    const { data } = await apiInstance({
      url: "event/get-all-event",
      method: "GET",
    });
    if (_.isArray(data)) {
      const eventOptions = data.map((e) => ({
        value: e.id,
        label: e.title,
      }));
      dispatch(
        actGetEventsSucess([{ value: 0, label: "All Events" }, ...eventOptions])
      );
    } else dispatch(actGetEventsFail(data));
  } catch (error) {
    dispatch(actGetEventsFail(error));
  }
};

export const actGetEventsSucess = (payload) => ({
  type: ADMIN_GET_EVENTS_SUCCESS,
  payload,
});

export const actGetEventsFail = (payload) => ({
  type: ADMIN_GET_EVENTS_FAIL,
  payload,
});

export const actGetEventsLoading = () => ({
  type: ADMIN_GET_EVENTS_LOADING,
});
