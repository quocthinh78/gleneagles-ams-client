import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { useDispatch, useSelector } from "react-redux";
import {
  actAddMorePoll,
  actEventPollsUpdateVoteOption,
  actFetchEventPolls,
  actFetchEventPollsError,
  actUpdateEventPolls,
} from "../../redux/actions/event/polls";
import socket from "../../services/socket";
import CPPollVoteOption from "./ChildCP/CPPollVoteOption";

SwiperCore.use([Navigation]);

/*
  poll status: 0-end; 1-pause; 2-play
*/

function CPPollContent({ activeTab }) {
  const dispatch = useDispatch();
  const listPolls = useSelector((state) => state.eventReducer.listPolls);
  const eventData = useSelector((state) => state.userReducer.eventData);
  const userData = useSelector((state) => state.userReducer.data);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    dispatch(actFetchEventPolls(eventData.id, userData.id));

    socket.on(`get-vote-result-${eventData.id}`, (res) => {
      console.log(res);
      // check user_id để thêm biến isVoted vào payload trước khi dispatch lên redux
      res["isVoted"] = res.user_id === userData.id;
      if (res.user_id === userData.id) setPending(false);
      dispatch(actEventPollsUpdateVoteOption(res));
    });

    // Listen to admin actions
    socket.on(`get-poll-start-${eventData.id}`, (res) => {
      dispatch(actUpdateEventPolls(res));
    });
    socket.on(`get-poll-end-${eventData.id}`, (res) => {
      dispatch(actUpdateEventPolls(res));
    });
    socket.on(`get-poll-pause-${eventData.id}`, (res) => {
      dispatch(actUpdateEventPolls(res));
    });
    socket.on(`get-new-poll-${eventData.id}`, (res) => {
      dispatch(actAddMorePoll(res));
    });

    return () => {
      dispatch(actFetchEventPollsError(null));
      socket.removeAllListeners(`get-vote-result-${eventData.id}`);
      socket.removeAllListeners(`get-poll-start-${eventData.id}`);
      socket.removeAllListeners(`get-poll-end-${eventData.id}`);
      socket.removeAllListeners(`get-poll-pause-${eventData.id}`);
      socket.removeAllListeners(`get-new-poll-${eventData.id}`);
    };

    // eslint-disable-next-line
  }, []);

  // if listPolls is loaded then check if there any poll is started (status 1 or 2)
  if (
    activeTab &&
    listPolls &&
    (listPolls.length === 0 ||
      listPolls.filter((item) => item.status !== 0).length === 0)
  )
    return (
      <Container>
        <Inactive>Poll is not active</Inactive>
      </Container>
    );

  if (!activeTab) return <div style={{ display: "none" }}></div>;
  return (
    <Container>
      <Swiper navigation slidesPerView={1}>
        {listPolls
          .filter((item) => item.status !== 0)
          .map((poll) => (
            <SwiperSlide key={"poll-" + poll.id}>
              <PollContent>
                <Question>{poll.topic}</Question>
                {!poll.isDirty && poll.status === 2 ? (
                  <CPPollVoteOption
                    pending={pending}
                    setPending={(state) => setPending(state)}
                    poll={poll}
                  />
                ) : (
                  <Options>
                    {poll.vote_options.map((option) => {
                      const voteRate =
                        poll.totalVote === 0
                          ? 0
                          : (option.vote / poll.totalVote) * 100;
                      return (
                        <OptChart
                          key={option.id + "OptChart"}
                          title={option.isVoted ? "Your vote" : "Other vote"}
                          isChosen={option.isVoted}
                        >
                          <RateBG
                            voteRate={voteRate}
                            isChosen={option.isVoted}
                          />
                          <OptSpan>
                            <span>{option.title}</span>
                            <span style={{ color: "#000000" }}>
                              {voteRate.toFixed(1)}%{/* {parseInt(voteRate)} */}
                            </span>
                          </OptSpan>
                        </OptChart>
                      );
                    })}
                  </Options>
                )}
              </PollContent>
            </SwiperSlide>
          ))}
      </Swiper>
    </Container>
  );
}

export default CPPollContent;

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;

  .swiper-container {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: transparent;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;

    ${({ theme }) => theme.breakpoints.l} {
      align-items: center !important;
    }
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const PollContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  ${({ theme }) => theme.breakpoints.l} {
    width: 90%;
  }
`;

//// const Content = styled.p`
//   width: 90%;
//   text-align: start;
//   margin: 0;
// `;

const Question = styled.h4`
  margin-top: 0;
  font-size: 18px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  width: 90%;
  ${({ theme }) => theme.breakpoints.m} {
    font-size: 24px;
  }
  ${({ theme }) => theme.breakpoints.l} {
    font-size: 22px;
  }
`;
const Options = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  scrollbar-width: none; /* Firefox 64 */
  ::-webkit-scrollbar {
    display: none;
  }
  ${({ theme }) => theme.breakpoints.l} {
    width: 90%;
    overflow-y: scroll;
    height: 80vh;
    /* padding-top: 200px; */
  }
`;

// #D68B13
const OptChart = styled.div`
  color: ${(props) => (props.isChosen ? "#fff" : "#000000")};
  font-weight: ${(props) => (props.isChosen ? "bold" : "normal")};
  margin-bottom: 12px;
  padding: 13px;
  border-radius: 9px;
  background: transparent;
  border: 1px solid teal;
  cursor: default;
  font-size: 14px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.breakpoints.m} {
    font-size: 16px;
  }
  ${({ theme }) => theme.breakpoints.l} {
    font-size: 18px;
  }
`;

// #FF69B4
const RateBG = styled.div`
  position: absolute;
  border-radius: 7px;
  top: 0;
  left: 0;
  height: 100%;
  z-index: -1;
  width: ${(props) => props.voteRate}%;
  background: ${(props) => (props.isChosen ? "teal" : "teal")};
  transition: width 0.4s ease-out;
`;

const OptSpan = styled.div`
  border-radius: 7px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  span:first-child {
    flex: 1;
    text-align: start;
    padding-right: 15px;
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }
`;

const Inactive = styled.h3`
  text-align: center;
  font-size: 30px;
`;
