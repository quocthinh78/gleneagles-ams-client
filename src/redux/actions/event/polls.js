import apiInstance from "../../../services";
import {
  POLL_ADD_MORE,
  POLL_ERROR,
  POLL_SUCCESS,
  POLL_UPDATE,
  POLL_VOTE_OPTIONS_UPDATE,
} from "../../constant";

export const actFetchEventPolls = (event_id, user_id) => async (dispatch) => {
  try {
    const { data } = await apiInstance({
      url: `poll/get-active-poll-by-event/${event_id}/${user_id}`,
      method: "GET",
    });
    dispatch(actFetchEventPollsSuccess(data));
  } catch (error) {
    dispatch(actFetchEventPollsError(error));
  }
};

export const actFetchEventPollsSuccess = (payload) => ({
  type: POLL_SUCCESS,
  payload,
});

export const actFetchEventPollsError = (payload) => ({
  type: POLL_ERROR,
  payload,
});

export const actUpdateEventPolls = (payload) => ({
  type: POLL_UPDATE,
  payload,
});

export const actAddMorePoll = (payload) => (dispatch, getState, api) => {
  // Lưu ý là phải điền đầy đủ dispatch và
  // getState thì mới ko báo lỗi
  // Gắn thêm event_title cho poll mới, để đồng bộ với listpoll cũ
  const { userReducer } = getState();

  payload["event_title"] = userReducer.eventData.title;
  payload["isDirty"] = false;

  payload.vote_options.forEach((option) => {
    option["isVoted"] = false;
  });

  return {
    type: POLL_ADD_MORE,
    payload,
  };
};

export const actEventPollsUpdateVoteOption = (payload) => ({
  type: POLL_VOTE_OPTIONS_UPDATE,
  payload,
});
