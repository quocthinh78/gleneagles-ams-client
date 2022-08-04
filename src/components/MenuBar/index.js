import {
  Tooltip,
  Menu as MenuContainer,
  MenuItem,
  Typography,
} from "@material-ui/core";
import {
  LogoutOutlined,
  MessageOutlined,
  MoreOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import { Fragment, useRef, useState } from "react";
import styled from "styled-components";
import useRoomState from "../../hooks/useRoomState";
import ToggleAudioButton from "../Buttons/ToggleAudioButton";
import ToggleVideoButton from "../Buttons/ToggleVideoButton";
import ToggleScreenShareButton from "../ToggleScreenShareButton";
import { isMobile } from "react-device-detect";
import {
  BACKGROUND_SELECT_TAB,
  GROUP_CHAT_TAB,
  PARTICIPARTS_TAB,
} from "../CPVipVideoChat";
import BackgroundIcon from "../../assets/icons/BackgroundIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import { isSupported } from "@twilio/video-processors";
import useFlipCameraToggle from "../../hooks/useFlipCameraToggle";
import FlipCameraIcon from "../../assets/icons/FlipCameraIcon";
import InfoIconOutlined from "../../assets/icons/InfoIconOutlined";
import AboutDialog from "../AboutDialog";
import DeviceSelectionDialog from "../DeviceSelectionDialog";

export default function MenuBar({
  toggleSlideTab = () => {},
  leaveRoom = () => {},
  // activeSlideTab,
}) {
  const roomState = useRoomState();
  const isReconnecting = roomState === "reconnecting";

  const [aboutOpen, setAboutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const anchorRef = useRef(null);
  const { flipCameraDisabled, toggleFacingMode, flipCameraSupported } =
    useFlipCameraToggle();

  return (
    <Fragment>
      <Toolbar>
        <Space
          size="middle"
          style={{
            height: "100%",
            overflowX: "auto",
            padding: 10,
          }}
        >
          <ToggleAudioButton disabled={isReconnecting} hideLabel />
          <ToggleVideoButton disabled={isReconnecting} hideLabel />
          {!isMobile && (
            <ToggleScreenShareButton disabled={isReconnecting} hideLabel />
          )}
          {/* <Tooltip title="Chat with everyone">
            <Btn
              size="large"
              type="primary"
              shape="round"
              danger={activeSlideTab === GROUP_CHAT_TAB}
              icon={<MessageOutlined />}
              onClick={() => toggleSlideTab(GROUP_CHAT_TAB)}
            ></Btn>
          </Tooltip> */}
          {/* <Tooltip title="Show everyone">
            <Btn
              size="large"
              type="primary"
              shape="round"
              danger={activeSlideTab === PARTICIPARTS_TAB}
              icon={<TeamOutlined />}
              onClick={() => toggleSlideTab(PARTICIPARTS_TAB)}
            ></Btn>
          </Tooltip> */}
          {/* <Tooltip title="Background">
            <Btn
              size="large"
              type="primary"
              shape="round"
              danger={activeSlideTab === BACKGROUND_SELECT_TAB}
              icon={<BackgroundIcon />}
              onClick={() => toggleSlideTab(BACKGROUND_SELECT_TAB)}
            ></Btn>
          </Tooltip> */}
          <Tooltip title="Exit Call">
            <Btn
              danger
              size="large"
              type="primary"
              shape="round"
              icon={<LogoutOutlined />}
              onClick={leaveRoom}
            ></Btn>
          </Tooltip>
          <Tooltip title="More">
            <Btn
              size="large"
              type="primary"
              shape="round"
              danger={menuOpen}
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
              ref={anchorRef}
              data-cy-more-button
              icon={<MoreOutlined />}
            />
          </Tooltip>
          <MenuContainer
            open={menuOpen}
            onClose={() => setMenuOpen((isOpen) => !isOpen)}
            anchorEl={anchorRef.current}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <MenuItem onClick={() => setSettingsOpen(true)}>
              <IconContainer>
                <SettingsIcon />
              </IconContainer>
              <Typography variant="body1">Audio and Video Settings</Typography>
            </MenuItem>

            {isSupported && (
              <MenuItem
                onClick={() => {
                  toggleSlideTab(BACKGROUND_SELECT_TAB);
                  setMenuOpen(false);
                }}
              >
                <IconContainer>
                  <BackgroundIcon />
                </IconContainer>
                <Typography variant="body1">Backgrounds</Typography>
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                toggleSlideTab(GROUP_CHAT_TAB);
                setMenuOpen(false);
              }}
            >
              <IconContainer>
                <MessageOutlined style={{ color: "rgb(96, 107, 133)" }} />
              </IconContainer>
              <Typography variant="body1">Chat with everyone</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                toggleSlideTab(PARTICIPARTS_TAB);
                setMenuOpen(false);
              }}
            >
              <IconContainer>
                <TeamOutlined style={{ color: "rgb(96, 107, 133)" }} />
              </IconContainer>
              <Typography variant="body1">Show everyone</Typography>
            </MenuItem>
            {flipCameraSupported && (
              <MenuItem
                disabled={flipCameraDisabled}
                onClick={toggleFacingMode}
              >
                <IconContainer>
                  <FlipCameraIcon />
                </IconContainer>
                <Typography variant="body1">Flip Camera</Typography>
              </MenuItem>
            )}

            <MenuItem onClick={() => setAboutOpen(true)}>
              <IconContainer>
                <InfoIconOutlined />
              </IconContainer>
              <Typography variant="body1">About</Typography>
            </MenuItem>
          </MenuContainer>
        </Space>
      </Toolbar>

      <AboutDialog
        open={aboutOpen}
        onClose={() => {
          setAboutOpen(false);
          setMenuOpen(false);
        }}
      />
      <DeviceSelectionDialog
        open={settingsOpen}
        onClose={() => {
          setSettingsOpen(false);
          setMenuOpen(false);
        }}
      />
    </Fragment>
  );
}

const Toolbar = styled.div`
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #202124;
  box-shadow: 0 -4px 16px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow-x: auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Btn = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px !important;
  width: 40px !important;
  border-radius: 9999px !important;
  background-color: #3c4043;
  border-color: transparent;
  padding: 8px !important;
  &:hover,
  &:focus {
    background-color: #44474a;
    border-color: transparent;
  }
`;

export const IconContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "1.5em",
  marginRight: "0.3em",
});
