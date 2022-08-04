import _, { sortBy } from "lodash";
import {
  EVENT_MESSAGE_ADD_MORE,
  EVENT_MESSAGE_SUCCESS,
  EVENT_MESSAGE_STATUS,
  EVENT_MESSAGE_ERROR,
  EVENT_MESSAGE_LOADING,
  QUESTION_HIGHLIGHT_SUCCESS,
  QUESTION_HIGHLIGHT_ERROR,
  QUESTION_HIGHLIGHT_UPDATE,
  QUESTION_HIGHLIGHT_ADD_MORE,
  POLL_SUCCESS,
  POLL_UPDATE,
  POLL_ERROR,
  POLL_ADD_MORE,
  POLL_VOTE_OPTIONS_UPDATE,
  WIPE_OFF_EVENT_REDUCER,
  QUESTION_HIGHLIGHT_RESET_ALL,
  QUESTION_UPDATE_IS_VOTE,
  SHAREHAND_SUCCESS,
  SHAREHAND_ERROR,
  SHAREHAND_UPDATE,
  SHAREHAND_ADD_MORE,
  SHAREHAND_SUBMIT_UPDATE,
} from "../constant";

const initialState = {
  objectMessage: {
    lastestMessageId: null,
    messages: [],
  },
  listQuestions: [],
  listPolls: [],
  listShareHand: [],
  mesLoading: false,
  mesError: null,
  questionError: null,
  pollError: null,
  sharehandError: null,
};

const checkPollIsVoted = (poll_arr = []) => {
  // Add isDirty property to each poll for later check
  return poll_arr.map((item) => {
    let isDirty = false;
    item.vote_options.forEach((opt) => {
      if (opt.isVoted) isDirty = true;
    });
    return { ...item, isDirty };
  });
};

const countPollTotalVote = (vote_options_arr = []) => {
  let total = 0;
  vote_options_arr.forEach((item) => {
    total += item.vote;
  });
  return total;
};

const performObj = (obj = {}) => {
  obj.agree = null;
  obj.against = null;
  obj.abstain = null;

  return obj;
};

// const performListShareHand = (arr = []) => {
//   arr.map(option => {
//     const newPropObject = {
//       agree_total: null,
//       against_total: null,
//       abstain_total: null
//     }
//     return Object.assign(option, newPropObject)
//   })
//   return arr
// }
// const sortDescQuestion = (arr, iteratees = "cached_votes_total") => {
//   return _.sortBy(arr, [iteratees]).reverse();
// };

const eventReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // Message
    case EVENT_MESSAGE_SUCCESS:
      state.objectMessage = {
        ...payload,
        lastestMessageId: !state.objectMessage.lastestMessageId
          ? payload.messages[0].id + 1
          : state.objectMessage.lastestMessageId,
        messages: [
          ...payload.messages.reverse(),
          ...state.objectMessage.messages,
        ],
      };
      state.mesError = null;
      return { ...state };

    case EVENT_MESSAGE_STATUS:
      const foundedMessIndex = _.findIndex(
        state.objectMessage.messages,
        (mess) => {
          return mess.id === payload.id;
        }
      );
      state.objectMessage.messages[foundedMessIndex].status = payload.status
      state.objectMessage = {
        ...state.objectMessage,
        messages: [...state.objectMessage.messages]
      }
      return { ...state }

    case EVENT_MESSAGE_ADD_MORE:
      state.objectMessage.messages = [...state.objectMessage.messages, payload];
      state.mesError = null;
      return { ...state };

    case EVENT_MESSAGE_ERROR:
      state.objectMessage = {
        ...state.objectMessage,
        messages: [],
        lastestMessageId: null,
      };
      state.mesError = payload;
      return { ...state };

    case EVENT_MESSAGE_LOADING:
      state.mesLoading = payload;
      return { ...state };

    // Question
    case QUESTION_HIGHLIGHT_SUCCESS:
      state.listQuestions = [
        ...state.listQuestions,
        ...payload.map((qs) => {
          if (qs.cached_votes_total === null) qs["cached_votes_total"] = 0;
          if (typeof qs.isVoted === "undefined") qs["isVoted"] = false;
          return qs;
        }),
      ];
      state.mesError = null;
      return { ...state };

    case QUESTION_HIGHLIGHT_ERROR:
      state.listQuestions = [];
      state.questionError = payload;
      return { ...state };

    case QUESTION_HIGHLIGHT_UPDATE:
      // Nên có thêm 1 hàm sort theo số lượt like (giảm dần)
      state.listQuestions = state.listQuestions.map((item) => {
        if (item.id === payload.id)
          return {
            ...item,
            cached_votes_total: payload.cached_votes_total,
            cached_votes_up: payload.cached_votes_up,
            cached_votes_down: payload.cached_votes_down,
          };
        return item;
      });
      return { ...state };

    case QUESTION_HIGHLIGHT_ADD_MORE:
      const foundedQuestion = _.findIndex(state.listQuestions, (qs) => {
        return qs.id === payload.id;
      });
      if (foundedQuestion === -1)
        state.listQuestions = [
          ...state.listQuestions,
          { ...payload, isVoted: false },
        ];
      else {
        state.listQuestions[foundedQuestion] = {
          ...state.listQuestions[foundedQuestion],
          ...payload,
        };
        state.listQuestions = [...state.listQuestions];
      }

      return { ...state };

    case QUESTION_HIGHLIGHT_RESET_ALL:
      state.listQuestions = [];
      state.questionError = null;
      return { ...state };

    case QUESTION_UPDATE_IS_VOTE:
      state.listQuestions = state.listQuestions.map((item) => {
        if (item.id === payload.id)
          return {
            ...item,
            isVoted: payload.isVoted,
          };
        return item;
      });
      return { ...state };

    // Poll
    case POLL_SUCCESS:
      state.listPolls = sortBy(
        [...checkPollIsVoted(payload), ...state.listPolls],
        ["id"]
      );
      state.pollError = null;
      return { ...state };

    case POLL_UPDATE:
      const foundedPollIndex = _.findIndex(state.listPolls, (poll) => {
        return poll.id === payload.id;
      });
      if (foundedPollIndex === -1) {
        // do something when this is a completely new poll
        const newPollVoteOptions = payload.vote_options.map((option) => ({
          ...option,
          isVoted: option.isVoted || false,
          vote: option.vote || 0,
        }));

        state.listPolls = sortBy(
          [
            ...state.listPolls,
            { ...payload, vote_options: newPollVoteOptions, isDirty: false },
          ],
          ["id"]
        );
      } else {
        state.listPolls = state.listPolls.map((poll) => {
          // If poll (payload) already exist in listPolls
          if (poll.id === payload.id) {
            // * Check vote_options if there are some changes in vote_options
            let newPollVoteOptions = payload.vote_options.map((option) => {
              const foundedOption = _.find(poll.vote_options, function (o) {
                return o.id === option.id;
              });
              // If option already exist in old listpoll
              if (typeof foundedOption !== "undefined")
                return {
                  ...foundedOption,
                  title: option.title,
                  updatedAt: option.updatedAt,
                  isVoted: option.isVoted || foundedOption.isVoted || false,
                  vote: option.vote || foundedOption.vote || 0,
                };
              // If option not in old listpoll options
              else
                return {
                  ...option,
                  isVoted: option.isVoted || false,
                  vote: option.vote || 0,
                };
            });
            // Remove old poll_option which is not having the same poll_option in payload
            newPollVoteOptions = newPollVoteOptions.filter((op) => {
              return (
                _.findIndex(poll.vote_options, (option_vote) => {
                  return option_vote.id === op.id;
                }) !== -1
              );
            });
            const isDirty =
              typeof _.find(newPollVoteOptions, function (opt) {
                return opt.isVoted === true;
              }) !== "undefined";

            // Create new poll object to overwrite the old one
            return {
              ...poll,
              topic: payload.topic,
              status: payload.status,
              updatedAt: payload.updatedAt,
              vote_options: newPollVoteOptions,
              isDirty,
            };
          }

          // If poll (payload) was not in listPolls before then do nothing
          return poll;
        });
      }

      return { ...state };

    case POLL_ERROR:
      state.listPolls = [];
      state.pollError = payload;
      return { ...state };

    case POLL_VOTE_OPTIONS_UPDATE:
      state.listPolls = state.listPolls.map((poll) => {
        if (poll.id === Number(payload.poll_id)) {
          // * Lưu ý logic check isDirty này chỉ đúng nếu người dùng chỉ đc phép vote
          // và ko có quyền thu hồi lại vote của mình
          let newIsDirty = poll.isDirty;
          // Check xem user đã vote hay chưa
          const newVoteOptions = poll.vote_options.map((option) => {
            if (option.id === payload.id) {
              if (payload.isVoted) newIsDirty = true;
              return {
                ...option,
                vote: payload.totalVote,
                isVoted: payload.isVoted || option.isVoted,
              };
            } else return option;
          });

          return {
            ...poll,
            totalVote: countPollTotalVote(newVoteOptions),
            vote_options: newVoteOptions,
            isDirty: newIsDirty,
          };
        } else return poll;
      });
      return { ...state };

    case POLL_ADD_MORE:
      state.listPolls = sortBy([payload, ...state.listPolls], ["id"]);
      return { ...state };

    // share hand
    case SHAREHAND_SUCCESS:
      state.listShareHand = payload;
      state.sharehandError = null;
      return { ...state };

    case SHAREHAND_UPDATE:
      const foundedShareHandIndex = _.findIndex(
        state.listShareHand,
        (sharehand) => {
          return sharehand.id === payload.id;
        }
      );
      state.listShareHand[foundedShareHandIndex].status = payload.status;
      state.listShareHand[foundedShareHandIndex].agree_total =
        payload.agree_total;
      state.listShareHand[foundedShareHandIndex].against_total =
        payload.against_total;
      state.listShareHand[foundedShareHandIndex].abstain_total =
        payload.abstain_total;
      return { ...state, listShareHand: [...state.listShareHand] };

    case SHAREHAND_ADD_MORE:
      state.listShareHand = [performObj(payload), ...state.listShareHand];
      return { ...state };

    case SHAREHAND_SUBMIT_UPDATE:
      const foundedById = _.findIndex(state.listShareHand, (item) => {
        return item.id === payload.resolution_id;
      });
      state.listShareHand[foundedById].agree = payload.agree;
      state.listShareHand[foundedById].against = payload.against;
      state.listShareHand[foundedById].abstain = payload.abstain;
      return { ...state, listShareHand: [...state.listShareHand] };

    case SHAREHAND_ERROR:
      state.listShareHand = [];
      state.sharehandError = payload;
      return { ...state };

    // case SHAREHAND_UPDATE:
    //   const foundItem = listVote.filter((obj => obj.id === payload.id));

    // Others
    case WIPE_OFF_EVENT_REDUCER:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default eventReducer;
