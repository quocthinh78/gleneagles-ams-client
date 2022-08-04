import { useDispatch, useSelector } from "react-redux";
import { actFetchEventMessages } from "../redux/actions/event/message";

/**
 * @typedef MessageProperties
 * @type {object}
 * @property {array} messages - Messages get from API.
 * @property {(object|null)} error - Messages error when fetching.
 * @property {boolean} isLoading - Messages is in login process or not.
 * @property {number} maxPage - Max page
 * @property {number} count - Total messages
 * @property {number} currentPage - Current page of messages
 * @property {number} smallestMessageId - Smallest message id
 * @property {function} hasNext - To check if there are any message left.
 * @property {function} fetchNextMessages - Fetch next page messages.
 */

/**
 * All about message utilities
 *
 * @returns {MessageProperties} Object message, include data, error, maxPage, fetchNextMessages(), etc...
 */
const useMessage = () => {
  const dispatch = useDispatch();
  const eventData = useSelector((state) => state.userReducer.eventData);
  const userData = useSelector((state) => state.userReducer.data);
  const mesLoading = useSelector((state) => state.eventReducer.mesLoading);
  const mesError = useSelector((state) => state.eventReducer.mesError);
  const lastestMessageId = useSelector(
    (state) => state.eventReducer.objectMessage.lastestMessageId
  );
  const messages = useSelector(
    (state) => state.eventReducer.objectMessage.messages
  );
  const maxPage = useSelector(
    (state) => state.eventReducer.objectMessage.maxPage
  );
  const count = useSelector((state) => state.eventReducer.objectMessage.count);
  const currentPage = useSelector(
    (state) => state.eventReducer.objectMessage.currentPage
  );

  const hasNext = () => {
    return !(currentPage === maxPage);
  };

  const fetchNextMessages = (page = currentPage + 1, pageSize = 20) => {
    dispatch(
      actFetchEventMessages(
        userData.id,
        eventData.id,
        userData.group_id,
        page,
        pageSize,
        lastestMessageId
      )
    );
  };

  return {
    messages,
    isLoading: mesLoading,
    error: mesError,
    maxPage,
    count,
    currentPage,
    lastestMessageId,
    hasNext,
    fetchNextMessages,
  };
};

export default useMessage;
