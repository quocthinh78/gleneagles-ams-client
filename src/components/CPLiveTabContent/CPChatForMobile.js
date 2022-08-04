import React from "react";
import styled, { css } from "styled-components";
import send from "../../assets/images/send.png";
import emojiIcon from "../../assets/images/emoji.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { handleChatSubmit } from "../../function/HandleChatSubmit";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { useRef } from "react";
import useMessage from "../../hooks/useMessage";
import { usePrevious } from "react-use";
import { isAtBottom, isFeedAtTop } from "../../helpers/chatUtil";
import Ticker from "react-ticker";
import useEventData from "../../hooks/useEventData";
import { Link } from "react-router-dom";
import { DownCircleFilled } from "@ant-design/icons";

export default function CPChatForMobile({ activeTab }) {
  const userData = useSelector((state) => state.userReducer.data);
  const eventData = useSelector((state) => state.userReducer.eventData);
  const checkroom = useSelector((state) => state.userReducer.networkingData);

  const { fetchNextMessages, hasNext, messages, isLoading } = useMessage();
  const prevMessagesLength = usePrevious(messages.length);

  const [isChatAtBottom, setIsChatAtBottom] = useState(true);

  const [chatInput, setChatInput] = useState("");
  const [emoji, setEmoji] = useState(false);
  const listMessageRef = useRef(null);
  const loadingElement = useRef(null);
  const messagesEndRef = useRef(null);
  const prevScrollHeight = useRef(0);

  const {
    pauseMessageId,
    pinMessageId,
    isNetworking,
    groupId,
    videoToken,
    announcement,
  } = useEventData();

  useEffect(() => {
    if (isLoading) {
      prevScrollHeight.current = listMessageRef.current?.scrollHeight || 0;
      loadingElement.current?.scrollIntoView();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isChatAtBottom || prevMessagesLength === 0)
      messagesEndRef.current?.scrollIntoView();
    setIsChatAtBottom(isAtBottom(listMessageRef.current));

    if (
      prevMessagesLength !== 0 &&
      !isChatAtBottom &&
      listMessageRef.current?.scrollHeight > prevScrollHeight.current
    ) {
      listMessageRef.current.scrollTop =
        listMessageRef.current.scrollHeight - prevScrollHeight.current;
    }

    setIsChatAtBottom(isAtBottom(listMessageRef.current));
    // eslint-disable-next-line
  }, [messages.length]);

  const onEmojiClick = (_, emojiObject) => {
    setChatInput(chatInput + emojiObject.emoji);
  };

  const handleEmojiPicker = () => {
    setEmoji(!emoji);
  };

  const isPin = pinMessageId > 0 ? true : false;

  // console.log(isPin)

  const handleOnScroll = (e) => {
    // check if user is at the bottom of the list of messages
    setIsChatAtBottom(isAtBottom(listMessageRef.current));

    // scroll to top of the message list -> fetch more messages
    if (isFeedAtTop(e.target.scrollTop) && hasNext() && !isLoading) {
      fetchNextMessages();
    }
  };

  const handleSubmitChatContent = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    handleChatSubmit(userData.id, chatInput, eventData.id, userData.group_id);

    setChatInput("");
    setEmoji(false);
    messagesEndRef.current?.scrollIntoView();
    // console.log("click", userData.id, chatInput, eventData.id, userData.group_id)
  };

  const ScrollBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  if (!activeTab) return <div style={{ display: "none" }}></div>;

  return (
    <Container>
      {pauseMessageId > 0 && (
        <div
          className="pause_chat"
          style={{
            height: "100%",
            margin: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 10px",
            color: "#fff",
          }}
        >
          {eventData[`pause_message_${pauseMessageId}`] || ""}
        </div>
      )}

      {isNetworking === true && (
        <>
          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
              color: "#fff",
              fontWeight: "bold",
            }}
            className={
              checkroom.groupId === 0 ||
              checkroom.groupId === null ||
              checkroom.groupId === undefined
                ? ""
                : "hidden"
            }
          >
            You do not belong to any groups
          </div>

          <div
            className={
              checkroom.groupId === 0 ||
              checkroom.groupId === null ||
              checkroom.groupId === undefined
                ? "hidden"
                : "networking"
            }
          >
            <div style={{ marginBottom: "10px", color: "#fff" }}>
              {" "}
              {announcement}
            </div>

            <TwillioButton
              rel="noopener noreferrer"
              to={{
                pathname: `/networking/${groupId}`,
                state: {
                  videoToken: videoToken,
                },
              }}
            >
              Go to chat room
            </TwillioButton>
          </div>
        </>
      )}

      <ChatBox
        className={
          pauseMessageId > 0 || isNetworking === true ? "pausechat_mobile" : ""
        }
      >
        {pinMessageId > 0 && (
          <div className="pin_ticker">
            <Ticker mode="await" speed={10}>
              {() => (
                <p
                  style={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "#fff",
                  }}
                >
                  {eventData[`pin_message_${pinMessageId}`] || ""}
                </p>
              )}
            </Ticker>
          </div>
        )}

        <ListMessage
          id="messages"
          onScroll={handleOnScroll}
          ref={listMessageRef}
          isPin={isPin}
        >
          {isLoading && (
            <MessBox ref={loadingElement}>
              <MessItem>
                <p>Processing...</p>
              </MessItem>
            </MessBox>
          )}

          {messages
            ?.filter((mess) => mess.status === true)
            .map((item) => {
              return (
                <MessBox
                  key={item.id + "--message-" + item.user_id}
                  isOwnMes={Number(item.user_id) === userData.id}
                >
                  <MessItem>
                    <Username>
                      {item.first_name || item.email}
                      <span> : </span>
                    </Username>
                    <Content>{item.content}</Content>
                  </MessItem>
                </MessBox>
              );
            })}
          <div ref={messagesEndRef} />
        </ListMessage>

        <ContentIcon onClick={ScrollBottom} isChatAtBottom={isChatAtBottom}>
          <DownCircleFilled style={{ fontSize: 40 }} />
        </ContentIcon>
      </ChatBox>

      <ChatForm
        className={
          pauseMessageId > 0 || isNetworking === true ? "pausechat_destop" : ""
        }
        onSubmit={handleSubmitChatContent}
      >
        <input
          type="text"
          name="message"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type your message"
        />
        {emoji && (
          <Picker
            onEmojiClick={onEmojiClick}
            skinTone={SKIN_TONE_MEDIUM_DARK}
          />
        )}
        <ChatSubmit>
          <ChatEmoji onClick={handleEmojiPicker}>
            <img src={emojiIcon} alt="icon" />
          </ChatEmoji>
          <SendButton type="submit" id="send_btn">
            <img src={send} alt="send" />
          </SendButton>
        </ChatSubmit>
      </ChatForm>
    </Container>
  );
}

const Container = styled.div`
  background: #008080e0;
  font-family: "GoThicI";
  color: #000;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .pin_ticker {
    width: 100% !important;
    height: 30px !important;
  }
  .networking {
    height: 100%;
    text-align: center;
    padding-top: 20px;
  }
`;
const ChatBox = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  position: relative;
`;
const ContentIcon = styled.div`
  opacity: ${({ isChatAtBottom }) => (isChatAtBottom ? 0 : 1)};
  transition: opacity 0.5s;
  cursor: pointer;
  position: absolute;
  right: 25px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  color: white;
  background: teal;
`;
const ListMessage = styled.ul`
  list-style: none;
  height: ${({ isPin }) => (isPin ? "calc(100% - 30px)" : "100%")};
  overflow-y: auto;
  padding: 0px 10px;
`;
const MessBox = styled.li`
  user-select: text;
  padding: 10px 0px;
  display: flex;
  flex-direction: row;
  ${({ isOwnMes }) =>
    isOwnMes &&
    css`
      justify-content: flex-end;
      > div {
        background: #dcf8c6 !important;
        div:first-child {
          display: none;
        }
      }
    `}
`;
const MessItem = styled.div`
  border-radius: 7px;
  padding: 6px 7px 7px 9px;
  background: #f5f5f5;
  max-width: 75%;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
`;
const Username = styled.div`
  display: inline-block;
  font-weight: bold;
  color: teal;
`;
const Content = styled.div`
  display: inline-block;
`;
const ChatForm = styled.form`
  background: #0080808c;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  column-gap: 10px;
  margin: auto;
  input {
    width: 100% !important;
    height: 30px;
    border-radius: 20px;
    border: none;
    padding: 0px 20px;
    :focus {
      outline: none;
    }
  }
`;

const ChatSubmit = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const ChatEmoji = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
  }
`;
const SendButton = styled.button`
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
  }
`;

const TwillioButton = styled(Link)`
  display: inline-block;
  font-size: 15px;
  color: teal;
  background: white;
  padding: 8px;
  border-radius: 6px;
  -webkit-transition: color 0.2s ease;
  transition: color 0.2s ease;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
`;
