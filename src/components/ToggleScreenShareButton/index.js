import { FundProjectionScreenOutlined } from "@ant-design/icons";
import { Button, createStyles, makeStyles, Tooltip } from "@material-ui/core";
import useScreenShareParticipant from "../../hooks/useScreenShareParticipant";
import useVideoContext from "../../hooks/useVideoContext";
import { Btn } from "../MenuBar";

export const SCREEN_SHARE_TEXT = "Share Screen";
export const STOP_SCREEN_SHARE_TEXT = "Stop Sharing Screen";
export const SHARE_IN_PROGRESS_TEXT =
  "Cannot share screen when another user is sharing";
export const SHARE_NOT_SUPPORTED_TEXT =
  "Screen sharing is not supported with this browser";

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      "&[disabled]": {
        color: "#bbb",
        "& svg *": {
          fill: "#bbb",
        },
      },
    },
  })
);

export default function ToggleScreenShareButton({ disabled, hideLabel }) {
  const classes = useStyles();
  const screenShareParticipant = useScreenShareParticipant();
  const { toggleScreenShare, isSharingScreen, room } = useVideoContext();
  const localParticipant = room.localParticipant;
  const disableScreenShareButton =
    screenShareParticipant && screenShareParticipant !== localParticipant;
  const isScreenShareSupported =
    navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
  const isDisabled =
    disabled || disableScreenShareButton || !isScreenShareSupported;

  let tooltipMessage = "";

  if (disableScreenShareButton) {
    tooltipMessage = SHARE_IN_PROGRESS_TEXT;
  }

  if (!isScreenShareSupported) {
    tooltipMessage = SHARE_NOT_SUPPORTED_TEXT;
  }

  return (
    <Tooltip
      title={tooltipMessage}
      placement="top"
      PopperProps={{ disablePortal: true }}
      style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
    >
      <span>
        {/* The span element is needed because a disabled button will not emit hover events and we want to display
          a tooltip when screen sharing is disabled */}
        {!hideLabel ? (
          <Button
            className={classes.button}
            onClick={toggleScreenShare}
            disabled={isDisabled}
            startIcon={<FundProjectionScreenOutlined />}
            data-cy-share-screen
          >
            {SCREEN_SHARE_TEXT}
          </Button>
        ) : (
          <Btn
            size="large"
            type="primary"
            shape="round"
            danger={isSharingScreen}
            disabled={isDisabled}
            icon={<FundProjectionScreenOutlined />}
            onClick={toggleScreenShare}
          />
        )}
      </span>
    </Tooltip>
  );
}
