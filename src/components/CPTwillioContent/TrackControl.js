import React from "react";
import styled, { css } from "styled-components";
import { AudioOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function TrackControl({
  onTrackToggle,
  trackKind,
  trackDisabled,
  screenSharing,
}) {
  const iconStyle = { color: trackDisabled ? "#ffffff" : "#1890ff" };
  const buttonStyle = { background: trackDisabled ? "#ff4d4f" : "#ffffff" };

  let icon;
  switch (trackKind) {
    case "video":
      icon = <VideoCameraOutlined style={iconStyle} />;
      break;
    case "audio":
      icon = <AudioOutlined style={iconStyle} />;
      break;
    default:
      icon = null;
  }
  return (
    <TrackControlContent trackKind={trackKind} screenSharing={screenSharing}>
      <Button
        shape="circle"
        size="large"
        icon={icon}
        style={buttonStyle}
        onClick={onTrackToggle}
      />
    </TrackControlContent>
  );
}

const TrackControlContent = styled.div`
  position: absolute;
  left: 10px;
  z-index: 1;
  top: ${({ trackKind }) => (trackKind === "video" ? 54 : 104)}px;

  ${(props) =>
    props.screenSharing &&
    css`
      width: 30px;
      height: 30px;
      min-width: 30px;
      font-size: 15px;
    `}
`;
