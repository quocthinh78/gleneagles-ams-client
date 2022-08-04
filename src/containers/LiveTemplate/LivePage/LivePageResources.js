import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUser from "../../../hooks/useUser";
import {
  actAddEventMessages,
  actFetchEventMessages,
  actFetchEventMessagesError,
  actToggleStatusMessage,
} from "../../../redux/actions/event/message";
import {
  actGetGroupInfo,
  actToggleEventChat,
  actToggleEventNetworking,
  actUpdatePauseAndPinMessages,
} from "../../../redux/actions/user/event";
import socket from "../../../services/socket";

const LivePageResourcesWrapper = ({ children }) => {
  const eventData = useSelector((state) => state.userReducer.eventData);
  const dispatch = useDispatch();
  const user = useUser();

  useEffect(() => {
    if (user.data.group_id) {
      socket.emit(`room`, user.data.group_id);
    }

    // Listen for toggle chat (on/off)
    socket.on(`toggle-chat-${eventData.id}`, (pause_chat) => {
      dispatch(actToggleEventChat(pause_chat));
    });

    // Listen for new message
    socket.on(`sendback-${eventData.id}`, (message) => {
      dispatch(actAddEventMessages(message));
    });

    // Listen for networking changes
    socket.on(`event-networking:${user.data.id}`, (res) => {
      dispatch(actToggleEventNetworking(res));
    });
    socket.on("event-networking-no-group", (res) => {
      dispatch(actToggleEventNetworking(res));
    });

    // Listen for Pause chat and Pin message changes
    socket.on("event-change-info", (messages) => {
      dispatch(actUpdatePauseAndPinMessages(messages));
    });

    // change status
    socket.on(
      `change-message-status-${eventData.id}`,
      ({ message_id, status }) => {
        console.log({ id: message_id, status: status });
        dispatch(actToggleStatusMessage({ id: message_id, status: status }));
      }
    );

    // Fetch list of messages
    dispatch(
      actFetchEventMessages(user.data.id, eventData.id, user.data.group_id)
    );

    // Fetch getGroupInfo for networkingData (zoomUrl, zoomPassword, announcement)
    dispatch(actGetGroupInfo(user.data.id, eventData.id));

    return () => {
      dispatch(actFetchEventMessagesError(null));
      socket.removeAllListeners(`sendback-${eventData.id}`);
      socket.removeAllListeners(`event-networking:${user.data.id}`);
      socket.removeAllListeners("event-change-info");
      socket.removeAllListeners(`change-message-status-${eventData.id}`);
    };
    // eslint-disable-next-line
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default LivePageResourcesWrapper;
