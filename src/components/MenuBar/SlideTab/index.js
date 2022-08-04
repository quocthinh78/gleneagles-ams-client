import { isMobile } from "react-device-detect";
import styled, { css } from "styled-components";
import { CloseOutlined } from "@ant-design/icons";
import BackgroundSelectionDialog from "../../BackgroundSelectionDialog";
import GroupChat from "../../CPTwillioContent/GroupChat";
import CPVipParticipants from "../../CPVipParticipants";
import {
  BACKGROUND_SELECT_TAB,
  GROUP_CHAT_TAB,
  PARTICIPARTS_TAB,
} from "../../CPVipVideoChat";

export default function SlideTab({
  activeSlideTab,
  user,
  eventData,
  onClose = () => {},
}) {
  return (
    <Container openTab={!!activeSlideTab} isMobile={isMobile}>
      <CloseBtn onClick={onClose}>
        <CloseOutlined />
      </CloseBtn>
      <GroupChat active={activeSlideTab === GROUP_CHAT_TAB} user={user} />
      <CPVipParticipants
        active={activeSlideTab === PARTICIPARTS_TAB}
        eventId={eventData.id}
      />
      <BackgroundSelectionDialog
        active={activeSlideTab === BACKGROUND_SELECT_TAB}
      />
    </Container>
  );
}

const Container = styled.div`
  z-index: 10;
  position: ${({ isMobile }) => (isMobile ? "absolute" : "relative")};
  top: 0;
  right: -100%;
  height: 100%;
  width: 0;
  min-width: 0;
  max-width: 100vw;
  padding-bottom: 75px;
  padding-top: 10px;
  transition: all 0.5s;

  ${({ openTab }) =>
    openTab &&
    css`
      right: 0;
      width: 20%;
      min-width: 350px;
    `}
`;

const CloseBtn = styled.button`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 25px;
  right: 15px;
  z-index: 1;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: background 0.5s;
  :hover {
    background: #ebebeb;
  }
`;
