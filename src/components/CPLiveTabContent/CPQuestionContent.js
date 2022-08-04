import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  actAddQuestionHighlight,
  actFetchQuestionHighlight,
  actUpdateQuestionHighlight,
  actFetchQuestionHighlightError,
} from "../../redux/actions/event/questions";
import socket from "../../services/socket";
import CPQuestion from "./ChildCP/CPQuestion";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  questionInput: {
    position: "relative",
    fontFamily: "MuseoSansRounded",
    fontWeight: 300,
    display: "flex",

    "& input": {
      lineHeight: "19px",
      padding: 16,
      flex: 1,
      border: "1px solid black",
      "&:focus": {
        outline: "none",
      },
    },
  },
  submitBtn: {
    fontSize: 14,
    backgroundColor: "#787878",
    color: "#ffffff",
    fontWeight: 700,
    border: "none",
    paddingRight: 20,
    paddingLeft: 20,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#8a8c8e",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.3rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.5rem",
    },
  },
}));

function CPQuestionContent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const eventData = useSelector((state) => state.userReducer.eventData);
  const questions = useSelector((state) => state.eventReducer.listQuestions);
  const user = useSelector((state) => state.userReducer.data);
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(actFetchQuestionHighlight(eventData.id, user.id));

    // listen if admin add more question highlight to the question list
    socket.on("showQuestionToUser", (newQuestionHighline) => {
      if (newQuestionHighline.cached_votes_total === null)
        newQuestionHighline.cached_votes_total = 0;
      dispatch(actAddQuestionHighlight({ ...newQuestionHighline }));
    });

    // update totalVote when someone vote successfully
    socket.on(`showVoteQuestion-${eventData.id}`, (res) => {
      dispatch(actUpdateQuestionHighlight(res));
    });

    return () => {
      dispatch(actFetchQuestionHighlightError(null));
      socket.removeAllListeners("showQuestionToUser");
      socket.removeAllListeners("showVoteQuestion");
    };
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    const questionData = {
      user_id: user.id,
      content: input,
      event_id: eventData.id,
    };
    socket.emit("send-question", questionData);
    setInput("");
    toast.success("Your question have been sent.", {
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
    });
  };

  return (
    <Container>
      <Main>
        <form className={classes.questionInput} onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            id="user_message"
            placeholder="Type your question"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className={classes.submitBtn}>Send</button>
        </form>
        <QuestionBox>
          <ListQuestions>
            {/* Nếu highlight === true thì mới hiện ra cho user thấy */}
            {questions
              .filter((question) => question.highlight)
              .map((qs, idx) => (
                <CPQuestion
                  key={qs.id + "-" + idx}
                  userId={user.id}
                  content={qs.content}
                  isVoted={qs.isVoted}
                  cached_votes_total={qs.cached_votes_total}
                  asked_by={qs.asked_by}
                  id={qs.id}
                />
              ))}
          </ListQuestions>
        </QuestionBox>
        <ToastContainer />
      </Main>
    </Container>
  );
}

export default CPQuestionContent;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
  ${({ theme }) => theme.breakpoints.l} {
    padding-top: 65%;
  }
  ${({ theme }) => theme.breakpoints.xl} {
    padding-top: 55%;
  }
  ${({ theme }) => theme.breakpoints.sl} {
    padding-top: 45%;
  }
  ${({ theme }) => theme.breakpoints.xsl} {
    padding-top: 35%;
  }
`;

const Main = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const QuestionBox = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 0 20px;
  flex: 1;
  scrollbar-width: none; /* Firefox 64 */
  background: white;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }
  ::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, 0.1);
  }
  ${({ theme }) => theme.breakpoints.m} {
    padding: 0 30px;
  }
`;

const ListQuestions = styled.ul`
  list-style-type: none;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
