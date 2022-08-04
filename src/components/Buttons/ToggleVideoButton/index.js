import { useCallback, useRef } from "react";
import Button from "@material-ui/core/Button";
import VideoOffIcon from "../../../assets/icons/VideoOffIcon";
import VideoOnIcon from "../../../assets/icons/VideoOnIcon";
import useDevices from "../../../hooks/useDevices";
import useLocalVideoToggle from "../../../hooks/useLocalVideoToggle";
import { Tooltip } from "@material-ui/core";
import { Btn } from "../../MenuBar";
import { VideoCameraOutlined } from "@ant-design/icons";

export default function ToggleVideoButton({ disabled, className, hideLabel }) {
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
  const lastClickTimeRef = useRef(0);
  const { hasVideoInputDevices } = useDevices();

  const toggleVideo = useCallback(() => {
    if (Date.now() - lastClickTimeRef.current > 500) {
      lastClickTimeRef.current = Date.now();
      toggleVideoEnabled();
    }
  }, [toggleVideoEnabled]);

  return (
    <Tooltip
      title={
        !hasVideoInputDevices
          ? "No Camera"
          : isVideoEnabled
          ? "Turn off Camera"
          : "Turn on Camera"
      }
    >
      {!hideLabel ? (
        <Button
          className={className}
          onClick={toggleVideo}
          disabled={!hasVideoInputDevices || disabled}
          startIcon={isVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
        >
          {!hasVideoInputDevices
            ? "No Video"
            : isVideoEnabled
            ? "Stop Video"
            : "Start Video"}
        </Button>
      ) : (
        <Btn
          size="large"
          type="primary"
          shape="round"
          danger={!isVideoEnabled}
          disabled={!hasVideoInputDevices || disabled}
          icon={<VideoCameraOutlined />}
          onClick={toggleVideo}
        />
      )}
    </Tooltip>
  );
}
