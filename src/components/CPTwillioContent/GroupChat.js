import { SendOutlined } from "@ant-design/icons";
import moment from "moment";
import React, { useEffect, useReducer, useState, useRef } from "react";
import styled from "styled-components";
import { isAtBottom } from "../../helpers/chatUtil";
import socket from "../../services/socket";

const ADD_MESSAGE = "ADD_MESSAGE";

function reducer(state, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        messages: [...state.messages, { ...action.payload, time: Date.now() }],
      };
    default:
      return { ...state };
  }
}

const GroupChat = ({ active, user }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatAtBottom, setIsChatAtBottom] = useState(false);
  const [{ messages }, dispatch] = useReducer(reducer, { messages: [] });
  const listMesRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.on("message-group", (mesObj) => {
      dispatch({ type: ADD_MESSAGE, payload: mesObj });
      if (mesObj.userId === user.id) {
        setInput("");
        setLoading(false);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    });

    return () => {
      socket.removeAllListeners("message-group");
    };
  }, []);

  useEffect(() => {
    if (isChatAtBottom)
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (loading) return;

    socket.emit("message-group", {
      groupId: user.group_id,
      username: user.first_name,
      userId: user.id,
      content: input,
    });
    setLoading(true);
  };

  const handleOnScroll = () => {
    setIsChatAtBottom(isAtBottom(listMesRef.current));
  };

  return (
    <ContainerChat $loading={loading} active={active}>
      <Title>
        <div>Group chat</div>
      </Title>
      <MessContainer>
        <Notice>
          The message will only be visible to the meeting participants and will
          be deleted when the meeting ends.
        </Notice>
        <MainContain>
          <ListMessWrapper>
            <ListMessages ref={listMesRef} onScroll={handleOnScroll}>
              {messages.map((item) => (
                <ObjMessage key={"message" + item.userId + "-" + item.time}>
                  <div>
                    <MessAuthor>{item.username}</MessAuthor>
                    <SentTime>{moment(item.time).format("HH:mm")}</SentTime>
                  </div>
                  <Message>{item.content}</Message>
                </ObjMessage>
              ))}
              <div ref={bottomRef} />
            </ListMessages>
          </ListMessWrapper>
        </MainContain>

        <InputBox onSubmit={handleSubmitMessage}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message to everyone"
          />
          <span>
            <Submit type="submit" disabled={input === ""}>
              <SendOutlined />
            </Submit>
          </span>
        </InputBox>
      </MessContainer>
    </ContainerChat>
  );
};

export default GroupChat;

const ContainerChat = styled.div`
  border-radius: 8px;
  background: white;
  height: 100%;
  border: 1px solid #f1f3f4;
  display: ${({ active }) => (active ? "flex" : "none")};
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
  cursor: ${({ $loading }) => ($loading ? "progress" : "default")};
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

const MessContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Notice = styled.div`
  line-height: 1rem;
  background: #f1f3f4;
  border-radius: 8px;
  margin: 12px;
  padding: 12px;
  text-align: center;
`;
const InputBox = styled.form`
  flex-direction: row;
  display: flex;
  align-items: center;
  background: #f1f3f4;
  border-radius: 25px;
  min-height: 36px;
  margin: 15px;
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
  font-size: 13px;
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

const MainContain = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  position: relative;
`;

const ListMessWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-bottom: 22px;
  padding-top: 14px;
`;
const ListMessages = styled.div`
  display: block;
  user-select: text;
  overflow-y: auto;
  height: 100%;
`;
const ObjMessage = styled.div`
  display: block;
  padding: 0 24px;
  margin-bottom: 10px;
`;
const MessAuthor = styled.div`
  color: #202124;
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  line-height: 19px;
  padding-right: 8px;
  word-wrap: break-word;
`;
const SentTime = styled.div`
  color: #5f6368;
  display: inline-block;
  font-size: 12px;
`;
const Message = styled.div`
  color: #202124;
  font-size: 13px;
  line-height: 20px;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 100%;
`;
