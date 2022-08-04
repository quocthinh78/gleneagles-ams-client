import apiInstance from "../../../services";
import {
  QUESTION_HIGHLIGHT_ADD_MORE,
  QUESTION_HIGHLIGHT_ERROR,
  QUESTION_HIGHLIGHT_RESET_ALL,
  QUESTION_HIGHLIGHT_SUCCESS,
  QUESTION_HIGHLIGHT_UPDATE,
  QUESTION_UPDATE_IS_VOTE,
} from "../../constant";

export const actFetchQuestionHighlight =
  (event_id, user_id, callback = () => {}) =>
  async (dispatch) => {
    try {
      const { data } = await apiInstance({
        url: `question/getAllQuestionHighLight/${event_id}/${user_id}`,
        method: "GET",
      });
      // console.log(data);
      dispatch(actFetchQuestionHighlightSuccess(data));
      callback();
    } catch (error) {
      dispatch(actFetchQuestionHighlightError(error));
    }
  };

export const actFetchQuestionHighlightSuccess = (payload) => ({
  type: QUESTION_HIGHLIGHT_SUCCESS,
  payload,
});

export const actFetchQuestionHighlightError = (payload) => ({
  type: QUESTION_HIGHLIGHT_ERROR,
  payload,
});

export const actUpdateQuestionHighlight = (payload) => ({
  type: QUESTION_HIGHLIGHT_UPDATE,
  payload,
});

export const actAddQuestionHighlight = (payload) => ({
  type: QUESTION_HIGHLIGHT_ADD_MORE,
  payload,
});

export const actResetAllQuestions = () => ({
  type: QUESTION_HIGHLIGHT_RESET_ALL,
});

export const actUpdateQuestionIsVote = (payload) => ({
  type: QUESTION_UPDATE_IS_VOTE,
  payload,
});
