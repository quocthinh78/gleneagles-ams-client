import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import socket from "../../../services/socket";

function CPPollVoteOption({ pending, setPending, poll }) {
  const [pollOptionChosen, setPollOptionChosen] = useState(null);
  const eventData = useSelector((state) => state.userReducer.eventData);
  const userData = useSelector((state) => state.userReducer.data);

  const handleVotePoll = (vote_option_id, isDirty, status) => {
    if (vote_option_id === null || pending || isDirty || status !== 2) return;
    console.log("object");
    socket.emit("vote-poll", {
      vote_option_id,
      user_id: userData.id,
      event_id: eventData.id,
    });
    setPending(true);
    console.log(pollOptionChosen, poll.isDirty, poll.status, pending);
  };

  return (
    <Fragment>
      <Options>
        {poll.vote_options.map((option) => (
          <Opt
            key={"pollOption-" + option.id}
            onClick={() => {
              if (pollOptionChosen === option.id) setPollOptionChosen(null);
              else setPollOptionChosen(option.id);
            }}
            isChosen={option.id === pollOptionChosen}
            title={option.title}
          >
            {option.title}
          </Opt>
        ))}
        <Submit
          onClick={() =>
            handleVotePoll(pollOptionChosen, poll.isDirty, poll.status)
          }
          disabled={pollOptionChosen === null}
          title="Submit your vote"
        >
          Submit
        </Submit>
      </Options>
    </Fragment>
  );
}

export default CPPollVoteOption;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 20vh);
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox 64 */
  ::-webkit-scrollbar {
    display: none;
  }
  ${({ theme }) => theme.breakpoints.l} {
    width: 90%;
    scrollbar-width: none; /* Firefox 64 */
    height: calc(100vh - 30vh);
    overflow-y: auto;
  }
`;

const Opt = styled.button`
  color: "#000";
  margin-bottom: 12px;
  padding: 13px;
  border-radius: 9px;
  background: transparent;
  border: 1px solid rgb(237 119 84);
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  :hover {
    background: #b9e0e0;
  }
  ${(props) =>
    props.isChosen &&
    css`
      background: rgb(237 119 84) !important;
      color: white !important;
    `}
  ${({ theme }) => theme.breakpoints.m} {
    font-size: 16px;
  }
  ${({ theme }) => theme.breakpoints.l} {
    font-size: 18px;
  }
`;

const Submit = styled.button`
  margin-top: 12px;
  background: teal;
  border-radius: 9px;
  font-size: 18px;
  width: 100%;
  border: 1px solid teal;
  padding: 13px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  :disabled {
    background: teal;
    cursor: default;
  }
`;

//// const LineBreak = styled.div`
////   margin: auto;
////   border: 1px solid #e8e8e8;
////   width: 90%;
//// `;
