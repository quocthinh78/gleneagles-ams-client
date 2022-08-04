import { SendOutlined } from "@ant-design/icons";
import React, { useEffect, useReducer, useState, memo } from "react";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import apiInstance from "../../services";
import ReactWordcloud from "react-wordcloud";
import socket from "../../services/socket";
import { findIndex } from "lodash";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const GET_INQUIRY = "GET_INQUIRY";
const NEW_INQUIRY = "NEW_INQUIRY";
const UPDATE_INQUIRY_STATUS = "UPDATE_INQUIRY_STATUS";
const ADD_INQUIRY_ANSWER = "ADD_INQUIRY_ANSWER";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case GET_INQUIRY:
      return { inquiry: { ...payload } };
    case NEW_INQUIRY:
      return { inquiry: { ...payload, hasAnswered: false } };
    case UPDATE_INQUIRY_STATUS:
      return {
        inquiry: { ...payload, hasAnswered: state.inquiry?.hasAnswered },
      };
    case ADD_INQUIRY_ANSWER:
      // answer: "hi"
      // created_at: "2021-12-06T05:37:45.990Z"
      // id: 14
      // inquiry_id: 9
      // updated_at: "2021-12-06T05:37:45.990Z"
      // user_id: 19
      // hasAnswered: true
      if (!state.inquiry || state.inquiry.id !== payload.inquiry_id)
        return { ...state };

      const foundedAnswer = findIndex(state.inquiry.answers, {
        text: payload.answer,
      });

      const newAnswers =
        foundedAnswer !== -1
          ? state.inquiry.answers.map((a, idx) => {
              if (idx === foundedAnswer) return { ...a, value: a.value++ };
              else return a;
            })
          : [
              ...state.inquiry.answers,
              {
                inquiry_id: payload.inquiry_id,
                text: payload.answer,
                value: 1,
              },
            ];

      return {
        inquiry: {
          ...state.inquiry,
          hasAnswered: payload.hasAnswered,
          answers: newAnswers,
        },
      };

    default:
      return state;
  }
};
const options = {
  rotations: 3,
  rotationAngles: [0, 45],
  padding: 2,
  fontSizes: [16, 60],
  scale: "sqrt",
  fontFamily: "impact",
};

const CPInquiryContent = ({ activeTab }) => {
  const [input, setInput] = useState("");
  const [{ inquiry }, dispatch] = useReducer(reducer, { inquiry: null });
  const user = useUser();

  // console.log(inquiry);

  useEffect(() => {
    const getInqueries = async () => {
      try {
        const { data } = await apiInstance.get(
          `inquiry/get-latest-inquiry/${user.eventData.id}`
        );
        dispatch({ type: GET_INQUIRY, payload: data });
      } catch (error) {
        console.log(error);
      }
    };

    getInqueries();

    socket.on("change-inquiry", (data) => {
      dispatch({ type: UPDATE_INQUIRY_STATUS, payload: data.inquiry });
    });
    socket.on(`get-new-inquiry-${user.eventData.id}`, (data) => {
      dispatch({ type: NEW_INQUIRY, payload: data });
    });
    socket.on(`get-new-answer-${user.eventData.id}`, (data) => {
      dispatch({
        type: ADD_INQUIRY_ANSWER,
        payload: { ...data, hasAnswered: data.user_id === user.data.id },
      });
    });

    return () => {
      socket.removeAllListeners("change-inquiry");
      socket.removeAllListeners(`get-new-inquiry-${user.eventData.id}`);
      socket.removeAllListeners(`get-new-answer-${user.eventData.id}`);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inquiry || inquiry?.hasAnswered || !input || inquiry?.status !== 2)
      return;

    console.log(input.trim());
    socket.emit("answer-inquiry", {
      answer: input.trim(),
      inquiryId: inquiry.id,
    });
    setInput("");
  };

  return (
    <Container active={activeTab}>
      <Question>
        {inquiry?.status === 2 || inquiry?.status === 1
          ? inquiry?.content
          : "No questions asked"}
      </Question>
      <InputBox onSubmit={handleSubmit}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={
            inquiry?.hasAnswered ||
            inquiry?.status === 1 ||
            inquiry?.status === 0
          }
          placeholder={
            inquiry?.status === 1
              ? "Inquiry has been paused"
              : inquiry?.status === 0
              ? "Inquiry has been ended"
              : inquiry?.hasAnswered
              ? "You already answered this question."
              : "Type something..."
          }
        />
        <span>
          <Submit
            type="submit"
            disabled={
              input === "" ||
              inquiry?.hasAnswered ||
              inquiry?.status === 1 ||
              inquiry?.status === 0
            }
          >
            <SendOutlined />
          </Submit>
        </span>
      </InputBox>
      <Wordcloud
        answers={inquiry?.answers || []}
        wordCloudStatus={inquiry?.status}
      />
    </Container>
  );
};

export default CPInquiryContent;

const Wordcloud = memo(({ answers, wordCloudStatus }) => {
  return (
    <WordCloudWrapper>
      {wordCloudStatus && (wordCloudStatus === 2 || wordCloudStatus === 1) ? (
        <ReactWordcloud words={answers} options={options} maxWords={100} />
      ) : null}
      {!wordCloudStatus || wordCloudStatus === 0 ? (
        <div>There are no inquiry</div>
      ) : null}
    </WordCloudWrapper>
  );
});

const Container = styled.div`
  position: relative;
  padding: 15px;
  display: ${({ active }) => (active ? "flex" : "none")};
  flex-direction: column;
  gap: 10px;
  height: 100%;
  width: 100%;
`;
const Question = styled.div`
  padding: 0 10px;
  font-size: 15px;
  font-weight: bold;
`;
const InputBox = styled.form`
  flex-direction: row;
  display: flex;
  align-items: center;
  background: #f1f3f4;
  border-radius: 25px;
  min-height: 36px;
`;
const Input = styled.input`
  display: inline-block;
  flex-grow: 1;
  margin: 0 0 0 15px;
  border: none;
  outline: none;
  background-color: inherit;
  line-height: 24px;
  color: #202124;
  font-size: 15px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-y: visible;
  overflow-x: hidden;
`;
const Submit = styled.button`
  color: ${({ disabled }) =>
    disabled ? "rgba(60, 64, 67, 0.38)" : "#0095ff9e"};
  font-size: 24px;
  width: 48px;
  height: 48px;
  padding: 12px;
  display: flex;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;
const WordCloudWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
