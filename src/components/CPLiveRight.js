import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import CPLiveTabContent from "./CPLiveTabContent";
import { useSelector } from "react-redux";
import useUser from "../hooks/useUser";
import useEventData from "../hooks/useEventData";
import { AuthContext } from "../context/AuthProvider";
import {
  CheckCircleOutlined,
  DownloadOutlined,
  LikeOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

function CPLiveRight() {
  const user = useUser();
  const { logout } = useContext(AuthContext);
  const is_question = useSelector(
    (state) => state.userReducer.eventData.is_question
  );
  const is_resolution = useSelector(
    (state) => state.userReducer.eventData.is_resolution
  );
  const { isNetworking } = useEventData();
  const pauseChat =
    useSelector((state) => state.userReducer.eventData.pause_chat) || false;
  const [activeTab, setActiveTab] = useState(pauseChat ? "agenda" : "chat");
  // const is_poll = useSelector((state) => state.userReducer.eventData.is_poll);

  useEffect(() => {
    if (isNetworking && activeTab !== "chat") setActiveTab("chat");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNetworking]);

  const handeLogOut = () => {
    logout();
  };

  return (
    <Container>
      <Wrapper>
        <FlexGroup>
          <Tab>
            <Tooltip title="Chat">
              <Item
                id="chat"
                title="Chat"
                isActive={activeTab === "chat"}
                onClick={() => {
                  setActiveTab("chat");
                }}
              >
                <MessageOutlined
                  style={{
                    fontSize: 25,
                  }}
                />
              </Item>
            </Tooltip>
            <Tooltip title="Agenda">
              <Item
                id="agenda"
                title="Agenda"
                isActive={activeTab === "agenda"}
                onClick={() => {
                  setActiveTab("agenda");
                }}
              >
                <CheckCircleOutlined
                  style={{
                    fontSize: 25,
                  }}
                />
              </Item>
            </Tooltip>

            {is_question && (
              <Tooltip title="QnA">
                <Item
                  id="qna"
                  title="QnA"
                  isActive={activeTab === "qna"}
                  onClick={() => {
                    setActiveTab("qna");
                  }}
                >
                  <QuestionCircleOutlined
                    style={{
                      fontSize: 25,
                    }}
                  />
                </Item>
              </Tooltip>
            )}

            {is_resolution && (
              <Tooltip title="Voting">
                <Item
                  id="vote"
                  title="Voting"
                  isActive={activeTab === "vote"}
                  onClick={() => {
                    setActiveTab("vote");
                  }}
                >
                  <LikeOutlined
                    style={{
                      fontSize: 25,
                    }}
                  />
                </Item>
              </Tooltip>
            )}
            <Tooltip title="Download">
              <Item
                id="download"
                title="Download"
                isActive={activeTab === "download"}
                onClick={() => {
                  setActiveTab("download");
                }}
              >
                <DownloadOutlined
                  style={{
                    fontSize: 25,
                  }}
                />
              </Item>
            </Tooltip>
          </Tab>
          <Group>
            <UserName>{user.data.first_name}</UserName>

            <Tooltip title="Logout">
              <LogoutButton onClick={handeLogOut}>LOG OUT</LogoutButton>
            </Tooltip>
          </Group>
        </FlexGroup>

        <CPLiveTabContent activeTab={activeTab} pause_chat={pauseChat} />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  overflow: hidden;
  @media only screen and (min-device-width: 320px) and (max-device-width: 991px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: none;
  }
  ${({ theme }) => theme.breakpoints.l} {
    width: 40%;
    height: 100%;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FlexGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: teal;
  padding: 0px 10px;
  /* overflow-x: scroll;
  overflow-y: hidden; */
  column-gap: 10px;
  height: 8vh;
  ${({ theme }) => theme.breakpoints.l} {
    height: 10vh;
  }
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`;
const UserName = styled.div`
  color: #fff;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;
const LogoutButton = styled.button`
  background-color: rgb(237 119 84);
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  padding: 10px 10px;
`;

const Tab = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  column-gap: 10px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.li`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: #00000029;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.breakpoints.l} {
    margin-right: 30px;
  }
  .chat {
    ${({ theme }) => theme.breakpoints.l} {
      /* display: none; */
    }
  }

  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
  svg {
    height: 100%;
    color: ${({ isActive }) => (isActive ? "#e57d22" : "#ffffff")};
  }
`;

export default CPLiveRight;
