import { useEffect, useReducer } from "react";
import styled from "styled-components";
import apiInstance from "../../services";
import socket from "../../services/socket";

const ADD_LIST_PARTICIPANTS = "ADD_LIST_PARTICIPANTS";
const ADD_A_PARTICIPANT = "ADD_A_PARTICIPANT";

function reducer(state, action) {
  switch (action.type) {
    case ADD_LIST_PARTICIPANTS:
      return {
        participants: [...state.participants, ...action.payload],
      };
    case ADD_A_PARTICIPANT:
      return {
        participants: [...state.participants, { ...action.payload }],
      };
    default:
      return { ...state };
  }
}

const CPVipParticipants = ({ active, eventId }) => {
  const [{ participants }, dispatch] = useReducer(reducer, {
    participants: [],
  });

  // console.log(participants);

  useEffect(() => {
    const getListParticipants = async () => {
      try {
        const { data } = await apiInstance.get(
          `event/get-live-participant/${eventId}`
        );
        dispatch({ type: ADD_LIST_PARTICIPANTS, payload: data });
      } catch (error) {
        console.error(error);
      }
    };

    getListParticipants();

    socket.on("update-live-participant", (info) => {
      console.log("info", info);
      dispatch({ type: ADD_A_PARTICIPANT, payload: info });
    });

    return () => {
      socket.removeAllListeners("update-live-participant");
    };
    // eslint-ignore-next-line
  }, []);

  return (
    <Container active={active}>
      <Title>People ({participants.length})</Title>
      <Body>
        {participants.map((p) => (
          <UserObj key={p.email}>
            <UserName title={p.first_name + " " + p.last_name}>
              {p.first_name + " " + p.last_name}
            </UserName>
            <UserEmail title={p.email}>{p.email}</UserEmail>
          </UserObj>
        ))}
      </Body>
    </Container>
  );
};

export default CPVipParticipants;

const Container = styled.div`
  position: relative;
  border-radius: 8px;
  background: white;
  height: 100%;
  border: 1px solid #f1f3f4;
  display: ${({ active }) => (active ? "flex" : "none")};
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.div`
  height: 64px;
  min-height: 64px;
  padding-left: 24px;
  align-items: center;
  display: flex;

  font-size: 1.125rem;
  font-weight: 600;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px 0;
  overflow-y: scroll;
`;

const UserObj = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  margin-bottom: 15px;
`;

const UserName = styled.div`
  color: #202124;
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  line-height: 19px;
  padding-right: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const UserEmail = styled.div`
  color: #5f6368;
  display: block;
  font-size: 12px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;
