import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_VIDEO_CONSTRAINTS,
  SHARE_SCREEN_TRACK_NAME,
} from "../constants";
import useDevices from "./useDevices";
import useMediaStreamTrack from "./useMediaStreamTrack";
import useVideoContext from "./useVideoContext";

export default function useFlipCameraToggle() {
  const { localTracks } = useVideoContext();
  const [supportsFacingMode, setSupportsFacingMode] = useState(false);
  const videoTrack = localTracks.find(
    (track) =>
      !track.name.includes(SHARE_SCREEN_TRACK_NAME) && track.kind === "video"
  );
  const mediaStreamTrack = useMediaStreamTrack(videoTrack);
  const { videoInputDevices } = useDevices();

  useEffect(() => {
    // The 'supportsFacingMode' variable determines if this component is rendered
    // If 'facingMode' exists, we will set supportsFacingMode to true.
    // However, if facingMode is ever undefined again (when the user unpublishes video), we
    // won't set 'supportsFacingMode' to false. This prevents the icon from briefly
    // disappearing when the user switches their front/rear camera.
    const currentFacingMode = mediaStreamTrack?.getSettings().facingMode;
    if (currentFacingMode && supportsFacingMode === false) {
      setSupportsFacingMode(true);
    }
  }, [mediaStreamTrack, supportsFacingMode]);

  const toggleFacingMode = useCallback(() => {
    const newFacingMode =
      mediaStreamTrack?.getSettings().facingMode === "user"
        ? "environment"
        : "user";
    videoTrack?.restart({
      ...DEFAULT_VIDEO_CONSTRAINTS,
      facingMode: newFacingMode,
    });
  }, [mediaStreamTrack, videoTrack]);

  return {
    flipCameraDisabled: !videoTrack,
    toggleFacingMode,
    flipCameraSupported: supportsFacingMode && videoInputDevices.length > 1,
  };
}
