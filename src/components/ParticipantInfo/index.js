import styled from "styled-components";
import { Typography } from "@material-ui/core";

import { SHARE_SCREEN_TRACK_NAME } from "../../constants";
import useIsTrackSwitchedOff from "../../hooks/useIsTrackSwitchedOff";
import useParticipantIsReconnecting from "../../hooks/useParticipantIsReconnecting";
import usePublications from "../../hooks/usePublications";
import useTrack from "../../hooks/useTrack";

import AudioLevelIndicator from "../AudioLevelIndicator";
import AvatarIcon from "../../assets/icons/AvatarIcon";
import PinIcon from "./PinIcon";
import ScreenShareIcon from "../../assets/icons/ScreenShareIcon";
import NetworkQualityLevel from "../NetworkQualityLevel";

export default function ParticipantInfo({
  participant,
  onClick,
  isSelected,
  children,
  isLocalParticipant,
}) {
  const publications = usePublications(participant);

  const audioPublication = publications.find((p) => p.kind === "audio");
  const videoPublication = publications.find(
    (p) => !p.trackName.includes(SHARE_SCREEN_TRACK_NAME) && p.kind === "video"
  );

  const isVideoEnabled = Boolean(videoPublication);
  const isScreenShareEnabled = publications.find((p) =>
    p.trackName.includes(SHARE_SCREEN_TRACK_NAME)
  );

  const videoTrack = useTrack(videoPublication);
  const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);

  const audioTrack = useTrack(audioPublication);
  const isParticipantReconnecting = useParticipantIsReconnecting(participant);

  return (
    <Container
      style={{ cursor: Boolean(onClick) ? "pointer" : "default" }}
      onClick={onClick}
      data-cy-participant={participant.identity}
    >
      <ParticipantContent>
        <InfoContainer>
          <NetworkQualityLevel participant={participant} />
          <InfoRowBottom>
            {isScreenShareEnabled && (
              <ScreenShareIconContainer>
                <ScreenShareIcon />
              </ScreenShareIconContainer>
            )}
            <Identity>
              <AudioLevelIndicator audioTrack={audioTrack} />
              <Typ variant="body1" component="span">
                {participant.identity}
                {isLocalParticipant && " (You)"}
              </Typ>
            </Identity>
          </InfoRowBottom>
          <div>{isSelected && <PinIcon />}</div>
        </InfoContainer>
        {(!isVideoEnabled || isVideoSwitchedOff) && (
          <AvatarContainer>
            <AvatarIcon />
          </AvatarContainer>
        )}
        {isParticipantReconnecting && (
          <ReconnectingContainer>
            <Typ variant="body1">Reconnecting...</Typ>
          </ReconnectingContainer>
        )}
        {children}
      </ParticipantContent>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  transition: all 0.5s;
  /* padding: 0 10px; */
  position: relative;
  & video {
    filter: none;
    object-fit: contain !important;
    position: absolute;
    top: 0;
    left: 0;
  }
  ${({ theme }) => theme.breakpoints.l} {
    flex: 1;
    height: 100%;
  }
`;

const ParticipantContent = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 */
  text-align: center;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  outline: ${({ dominant }) => (dominant ? "3px solid red" : "none")};
`;

const InfoContainer = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  background: transparent;
  top: 0;
  left: 0;
`;

const InfoRowBottom = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Identity = styled.div`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.18em 0.3em;
  display: flex;
  margin: 0;
  align-items: center;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  & svg: {
    transform: scale(2);
  }
`;

const ReconnectingContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(40, 42, 43, 0.75);
  z-index: 1;
`;

const ScreenShareIconContainer = styled.span`
  background: rgba(0, 0, 0, 0.5);
  padding: 0.18em 0.3em;
  margin-right: 0.3em;
  display: flex;
  & path: {
    fill: white;
  }
`;

const Typ = styled(Typography)`
  color: white;
  ${({ theme }) => theme.breakpoints.m} {
    font-size: 0.75rem;
  } ;
`;
