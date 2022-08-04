import { Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MicIcon from "../../../assets/icons/MicIcon";
import MicOffIcon from "../../../assets/icons/MicOffIcon";
import useLocalAudioToggle from "../../../hooks/useLocalAudioToggle";
import useVideoContext from "../../../hooks/useVideoContext";
import { AudioMutedOutlined, AudioOutlined } from "@ant-design/icons";
import { Btn } from "../../MenuBar";

export default function ToggleAudioButton({ disabled, className, hideLabel }) {
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
  const { localTracks } = useVideoContext();
  const hasAudioTrack = localTracks.some((track) => track.kind === "audio");

  return (
    <Tooltip
      title={
        !hasAudioTrack
          ? "No Audio"
          : isAudioEnabled
          ? "Turn off Microphone"
          : "Turn on Microphone"
      }
    >
      {!hideLabel ? (
        <Button
          className={className}
          onClick={toggleAudioEnabled}
          disabled={!hasAudioTrack || disabled}
          startIcon={isAudioEnabled ? <MicIcon /> : <MicOffIcon />}
          data-cy-audio-toggle
        >
          {!hasAudioTrack ? "No Audio" : isAudioEnabled ? "Mute" : "Unmute"}
        </Button>
      ) : (
        <Btn
          size="large"
          type="primary"
          shape="round"
          danger={!isAudioEnabled}
          disabled={!hasAudioTrack || disabled}
          icon={isAudioEnabled ? <AudioOutlined /> : <AudioMutedOutlined />}
          onClick={toggleAudioEnabled}
        />
      )}
    </Tooltip>
  );
}
