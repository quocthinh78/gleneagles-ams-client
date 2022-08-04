import useMainParticipant from "../../hooks/useMainParticipant";
import useParticipants from "../../hooks/useParticipants";
import useScreenShareParticipant from "../../hooks/useScreenShareParticipant";
import useVideoContext from "../../hooks/useVideoContext";
import useSelectedParticipant from "../VideoProvider/useSelectedParticipant";
import Participant from "../Participant";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

export default function ParticipantList({ mainShowing }) {
  const { room } = useVideoContext();
  const localParticipant = room.localParticipant;
  const participants = useParticipants();
  const [selectedParticipant, setSelectedParticipant] =
    useSelectedParticipant();
  const screenShareParticipant = useScreenShareParticipant();
  const mainParticipant = useMainParticipant();
  const [participantItemWidth, setParticipantItemWidth] = useState("31.5%");

  useEffect(() => {
    adjustParticipantItemWidth(participants.length);
  }, [participants.length]);

  const adjustParticipantItemWidth = (participantCount) => {
    let participantItemWidth = "31.5%";

    if (participantCount === 0) {
      participantItemWidth = "60%";
    }

    if (participantCount === 1) {
      participantItemWidth = "45%";
    }

    if (participantCount >= 6) {
      participantItemWidth = "25%";
    }

    setParticipantItemWidth(participantItemWidth);
  };

  return (
    <Container mainShowing={mainShowing}>
      <ParticipantWrapper
        mainShowing={mainShowing}
        participantItemWidth={participantItemWidth}
      >
        <Participant participant={localParticipant} isLocalParticipant={true} />
      </ParticipantWrapper>
      {participants.map((participant) => {
        const isSelected = participant === selectedParticipant;
        // const hideParticipant =
        //   participant === mainParticipant &&
        //   participant !== screenShareParticipant &&
        //   !isSelected;
        return (
          <ParticipantWrapper
            mainShowing={mainShowing}
            key={participant.sid}
            // hideParticipant={hideParticipant}
            participantItemWidth={participantItemWidth}
          >
            <Participant
              participant={participant}
              isSelected={isSelected}
              onClick={() => setSelectedParticipant(participant)}
            />
          </ParticipantWrapper>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: auto;
  transition: all 0.5s;

  ${(props) =>
    props.mainShowing &&
    css`
      flex: 1;
      width: 100%;
      height: 100%;
      flex-wrap: nowrap;
      flex-direction: column;
      justify-content: flex-start;
      border-radius: 8px;

      ${({ theme }) => theme.breakpoints.l} {
        flex-wrap: nowrap;
        flex: 0 18%;
        background: #3c4043;
        width: auto;
        min-width: 345px;
      }
    `}
`;

const ParticipantWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 10px;
  ${({ hideParticipant }) =>
    hideParticipant &&
    css`
      display: none;
    `}
  ${({ theme }) => theme.breakpoints.l} {
    width: ${(props) =>
      props.mainShowing ? "100%" : props.participantItemWidth};
  }
`;
