import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import CPVoteByShare from "./ChildCP/CPVoteByShare";
import CPVoteByHand from "./ChildCP/CPVoteByHand";
// import CPVoteResultShareHand from "./ChildCP/CPVoteResultShareHand";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import {
  actGetShareHand,
  actUpdateShareHand,
  actAddMoreShareHand,
} from "../../redux/actions/event/sharehand";
import socket from "../../services/socket";

SwiperCore.use([Navigation]);
const CPPollVoteShareHand = ({ activeTab }) => {
  const dispatch = useDispatch();
  const eventData = useSelector((state) => state.userReducer.eventData);
  const userData = useSelector((state) => state.userReducer.data);
  const listVote = useSelector((state) => state.eventReducer.listShareHand);

  useEffect(() => {
    dispatch(actGetShareHand(userData.id, eventData.id));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("change-reso-status", (res) => {
      // console.log(res);
      dispatch(actUpdateShareHand(res));
    });

    socket.on("new-reso", (res) => {
      // console.log(res);
      dispatch(actAddMoreShareHand(res.newReso));
    });

    return () => {
      socket.removeAllListeners("change-reso-status");
      socket.removeAllListeners("new-reso");
    };
    // eslint-disable-next-line
  }, []);

  // const foundedShareHandIndex = _.findIndex(listVote, (sharehand) => {
  //   return sharehand.id === 65;
  // });

  // console.log(foundedShareHandIndex)

  if (!activeTab) return <div style={{ display: "none" }}></div>;

  return (
    <Container>
      <Swiper navigation slidesPerView={1}>
        {listVote
          .filter((item) => item.status !== 0)
          .map((vote, index) => {
            return (
              <SwiperSlide key={index}>
                <Title>{"Resolution: " + vote.number}</Title>
                <Question>{vote.content}</Question>

                {vote.method === 1 && (
                  <CPVoteByHand
                    active={vote.status}
                    id={vote.id}
                    agreeVal={vote.agree}
                    againstVal={vote.against}
                    abstainVal={vote.abstain}
                    agree_total={vote.agree_total}
                    against_total={vote.against_total}
                    abstain_total={vote.abstain_total}
                  />
                )}

                {vote.method === 0 && (
                  <CPVoteByShare
                    active={vote.status}
                    id={vote.id}
                    noshare={userData?.share_holding}
                    agreeVal={vote.agree}
                    againstVal={vote.against}
                    abstainVal={vote.abstain}
                    agree_total={vote.agree_total}
                    against_total={vote.against_total}
                    abstain_total={vote.abstain_total}
                  />
                )}
              </SwiperSlide>
            );
          })}
      </Swiper>
    </Container>
  );
};

export default CPPollVoteShareHand;

const Container = styled.div`
  padding: 10px 0px;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  font-size: 22px;
  font-family: "GoThicI";

  .stop_vote {
    display: none;
  }

  ${({ theme }) => theme.breakpoints.l} {
    height: 100%;
    padding: 10px 20px;
  }
`;

// const Number = styled.div`
//   text-align: center;
//   margin-bottom: 15px;
//   font-size: 18px;
// `;

const Title = styled.div`
  margin-bottom: 15px;
  font-weight: bold;
  padding: 10px;
`;
const Question = styled.div`
  margin-bottom: 30px;
  padding: 10px;
  font-size: 20px;
  text-align: center;
`;
