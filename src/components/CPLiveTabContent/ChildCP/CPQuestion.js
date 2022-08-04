import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import CPvoteIcon from "../../../assets/images/avpd_vote.svg";
import CPvotedIcon from "../../../assets/images/avpd_voted.svg";
import { actUpdateQuestionIsVote } from "../../../redux/actions/event/questions";
import socket from "../../../services/socket";

function CPQuestion({
  userId,
  content,
  isVoted = false,
  cached_votes_total = 0,
  // asked_by,
  id,
}) {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const clickWait = useRef(false);

  useEffect(() => {
    // chỉ cho người dùng emit tối đa 1 lần/0.4s
    if (clickWait.current) setTimeout(() => (clickWait.current = false), 400);
  }, [pending]);

  const handleVoteQuestion = () => {
    if (clickWait.current || pending) return;

    clickWait.current = true;
    setPending(true);

    socket.emit(
      "vote-question",
      {
        question_id: id,
        user_id: userId,
      },
      (dataReturned) => {
        if (userId === dataReturned.user_id) {
          dispatch(
            actUpdateQuestionIsVote({ id, isVoted: dataReturned.isVoted })
          );
          setPending(false);
        }
      }
    );
  };

  return (
    <Question>
      <Flex>
        <QuestionContent>{content}</QuestionContent>
      </Flex>
      <QuestionVote isLiked={isVoted}>
        <p>
          {cached_votes_total || 0} <br /> votes
        </p>
        <Btn onClick={() => handleVoteQuestion()} pending={pending}>
          {isVoted ? (
            <img src={CPvotedIcon} alt="icon" />
          ) : (
            <img src={CPvoteIcon} alt="icon" />
          )}
        </Btn>
      </QuestionVote>
    </Question>
  );
}

export default memo(CPQuestion);

const Question = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #d4d0d0;
  gap: 30px;
  font-family: MuseoSansRounded;
  font-weight: 400;
`;

const Flex = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const QuestionContent = styled.p`
  margin: 0;
  font-size: 14px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  ${({ theme }) => theme.breakpoints.m} {
    font-size: 16px;
  }
`;

const QuestionVote = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  p {
    text-align: center;
    margin: 0;
    font-size: 14px;
    margin-left: 10px;
    font-weight: 400;
  }
  svg {
    height: 25px;
    width: 25px;
    color: ${(props) => (props.isLiked ? "teal" : "#d4d0d0")};
  }
  ${({ theme }) => theme.breakpoints.m} {
    p {
      font-size: 16px;
    }
    svg {
      height: 30px;
      width: 30px;
    }
  }
  ${({ theme }) => theme.breakpoints.l} {
    p {
      font-size: 18px;
    }
    svg {
      height: 35px;
      width: 35px;
    }
  }
`;

const Btn = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  width: 35px;
  cursor: ${({ pending }) => (pending ? "progress" : "pointer")};
  img {
    width: 100%;
  }

  ${({ theme }) => theme.breakpoints.m} {
    width: 40px;
  }
`;
