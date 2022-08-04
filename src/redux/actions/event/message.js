import apiInstance from "../../../services";
import {
  EVENT_MESSAGE_ADD_MORE,
  EVENT_MESSAGE_ERROR,
  EVENT_MESSAGE_LOADING,
  EVENT_MESSAGE_SUCCESS,
  EVENT_MESSAGE_STATUS
} from "../../constant";

export const actFetchEventMessages =
  (
    user_id,
    event_id,
    group_id = null,
    page = 1,
    pagesize = 20,
    message_id = null,
    callback = () => { }
  ) =>
    async (dispatch) => {
      try {
        dispatch(actFetchEventMessagesLoading(true));
        const { data } = await apiInstance({
          url: `message/getMessageInEvent/${event_id}`,
          method: "GET",
          params: {
            page,
            size: pagesize,
            message_id,
            // user_id: null,
            // group_id: null,
          },
        });
        dispatch(actFetchEventMessagesLoading(false));
        dispatch(actFetchEventMessagesSuccess(data));
        if (callback) callback(data);
      } catch (error) {
        dispatch(actFetchEventMessagesLoading(false));
        dispatch(actFetchEventMessagesError(error));
      }
    };

export const actFetchEventMessagesLoading = (payload) => ({
  type: EVENT_MESSAGE_LOADING,
  payload,
});

export const actFetchEventMessagesSuccess = (payload) => ({
  type: EVENT_MESSAGE_SUCCESS,
  payload,
});

export const actFetchEventMessagesError = (payload) => ({
  type: EVENT_MESSAGE_ERROR,
  payload,
});

export const actAddEventMessages = (payload) => ({
  type: EVENT_MESSAGE_ADD_MORE,
  payload,
});

export const actToggleStatusMessage = (payload) => ({
  type: EVENT_MESSAGE_STATUS,
  payload
})
