import { Typography } from "@material-ui/core";
import AvatarIcon from "../../assets/icons/AvatarIcon";

import useIsTrackSwitchedOff from "../../hooks/useIsTrackSwitchedOff";
import useParticipantIsReconnecting from "../../hooks/useParticipantIsReconnecting";
import usePublications from "../../hooks/usePublications";
import useTrack from "../../hooks/useTrack";
import useVideoContext from "../../hooks/useVideoContext";

import AudioLevelIndicator from "../AudioLevelIndicator";
import { SHARE_SCREEN_TRACK_NAME } from "../../constants";
import NetworkQualityLevel from "../NetworkQualityLevel";
import styled from "styled-components";

export default function MainParticipantInfo({ participant, children }) {
  const { room } = useVideoContext();
  const localParticipant = room.localParticipant;
  const isLocal = localParticipant === participant;

  const publications = usePublications(participant);
  const videoPublication = publications.find(
    (p) => !p.trackName.includes(SHARE_SCREEN_TRACK_NAME) && p.kind === "video"
  );
  const screenSharePublication = publications.find((p) =>
    p.trackName.includes(SHARE_SCREEN_TRACK_NAME)
  );

  const videoTrack = useTrack(screenSharePublication || videoPublication);
  const isVideoEnabled = Boolean(videoTrack);

  const audioPublication = publications.find((p) => p.kind === "audio");
  const audioTrack = useTrack(audioPublication);

  const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);
  const isParticipantReconnecting = useParticipantIsReconnecting(participant);

  return (
    <Screens
      data-cy-main-participant
      data-cy-participant={participant.identity}
    >
      <ParticipantContent>
        <InfoContainer>
          <Identity>
            <AudioLevelIndicator audioTrack={audioTrack} />
            <Typography variant="body1" color="inherit">
              {participant.identity}
              {isLocal && " (You)"}
              {screenSharePublication && " - Screen"}
            </Typography>
          </Identity>
          <NetworkQualityLevel participant={participant} />
        </InfoContainer>
        {(!isVideoEnabled || isVideoSwitchedOff) && (
          <AvatarContainer>
            <AvatarIcon />
          </AvatarContainer>
        )}
        {isParticipantReconnecting && (
          <ReconnectingContainer>
            <Typography variant="body1" style={{ color: "white" }}>
              Reconnecting...
            </Typography>
          </ReconnectingContainer>
        )}
        {children}
      </ParticipantContent>
    </Screens>
  );
}

const Screens = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  transition: all 0.5s;
  padding: 0 10px;
  position: relative;

  ${({ theme }) => theme.breakpoints.l} {
    flex: 1;
    height: 100%;
  }
`;

const ParticipantContent = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  outline: ${({ dominant }) => (dominant ? "3px solid red" : "none")};
`;

const InfoContainer = styled.div`
  color: white;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1.5px;
  border-radius: 4px;
  background: #808080bf;
  padding: 8px;
  bottom: 10px;
  left: 10px;
  z-index: 1;
  position: absolute;
  max-width: 80%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
`;

const Identity = styled.div`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.1em 0.3em 0.1em 0;
  display: inline-flex;
  & svg {
    margin-left: 0.3em;
  }
  margin-right: 0.4em;
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
