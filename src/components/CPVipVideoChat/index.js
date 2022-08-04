import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";
import socket from "../../services/socket";
import { actToggleEventNetworking } from "../../redux/actions/user/event";
import useUser from "../../hooks/useUser";
import ReconnectingNotification from "../ReconnectingNotification";
import useVideoContext from "../../hooks/useVideoContext";
import MenuBar from "../MenuBar";
import SlideTab from "../MenuBar/SlideTab";
import MainParticipant from "../MainParticipant";
import ParticipantList from "../ParticipantList";
import useScreenShareParticipant from "../../hooks/useScreenShareParticipant";
import useSelectedParticipant from "../VideoProvider/useSelectedParticipant";

export const GROUP_CHAT_TAB = "GROUP_CHAT_TAB";
export const PARTICIPARTS_TAB = "PARTICIPARTS_TAB";
export const BACKGROUND_SELECT_TAB = "BACKGROUND_SELECT_TAB";

export default function RoomsPage() {
  const { data: userData, eventData } = useUser();
  const { room } = useVideoContext();
  const screenShareParticipant = useScreenShareParticipant();
  const [selectedParticipant] = useSelectedParticipant();
  const isShowingMainParticipant = !!(
    screenShareParticipant || selectedParticipant
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [openSlideTab, setOpenSlideTab] = useState("");

  useEffect(() => {
    socket.on(`event-networking:${userData.id}`, (res) => {
      dispatch(actToggleEventNetworking(res));
      if (!res.isNetworking) {
        leaveRoom({ byManually: true });
      }
    });
    socket.emit("join-group", { groupId: userData.group_id });

    return () => {
      leaveRoom({ byManually: false });
      socket.removeAllListeners(`event-networking:${userData.id}`);
    };
    // eslint-disable-next-line
  }, []);

  const leaveRoom = (options = {}) => {
    if (room) {
      room.disconnect();
    }
    if (options.byManually) {
      history.replace("/");
    }
  };

  const toggleSlideTab = (tab) => {
    if (!!openSlideTab && openSlideTab === tab) setOpenSlideTab("");
    else setOpenSlideTab(tab);
  };

  return (
    <Room>
      <ReconnectingNotification />
      <Content
        mainShowing={isShowingMainParticipant}
        openTab={openSlideTab && !isMobile}
      >
        {isShowingMainParticipant && <MainParticipant />}

        <ParticipantList mainShowing={isShowingMainParticipant} />
      </Content>
      <MenuBar
        leaveRoom={() => leaveRoom({ byManually: true })}
        toggleSlideTab={toggleSlideTab}
        activeSlideTab={openSlideTab}
      />
      <SlideTab
        activeSlideTab={openSlideTab}
        user={userData}
        eventData={eventData}
        onClose={() => toggleSlideTab("")}
      />
    </Room>
  );
}

const Room = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
  background: #202124;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
const Content = styled.div`
  width: ${({ openTab }) => (openTab ? "80%" : "100%")};
  padding-bottom: 75px;
  padding-top: 10px;
  position: relative;
  transition: width 0.5s;
  ${(props) =>
    props.mainShowing &&
    css`
      display: flex;
      gap: 10px;
      height: 100%;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      ${({ theme }) => theme.breakpoints.l} {
        flex-direction: row;
      }
    `}
`;
