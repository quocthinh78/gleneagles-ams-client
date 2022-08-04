import { useEffect, useRef } from "react";
import styled from "styled-components";
import { SHARE_SCREEN_TRACK_NAME } from "../../constants";
import useMediaStreamTrack from "../../hooks/useMediaStreamTrack";
import useVideoTrackDimensions from "../../hooks/useVideoTrackDimensions";

const Video = styled("video")({
  width: "100%",
  height: "100%",
});

export default function VideoTrack({ track, isLocal, priority }) {
  const ref = useRef(null);
  const mediaStreamTrack = useMediaStreamTrack(track);
  const dimensions = useVideoTrackDimensions(track);
  const isPortrait = (dimensions?.height ?? 0) > (dimensions?.width ?? 0);

  useEffect(() => {
    const el = ref.current;
    el.muted = true;
    if (track.setPriority && priority) {
      track.setPriority(priority);
    }
    track.attach(el);
    return () => {
      track.detach(el);

      // This addresses a Chrome issue where the number of WebMediaPlayers is limited.
      // See: https://github.com/twilio/twilio-video.js/issues/1528
      el.srcObject = null;

      if (track.setPriority && priority) {
        // Passing `null` to setPriority will set the track's priority to that which it was published with.
        track.setPriority(null);
      }
    };
  }, [track, priority]);

  // The local video track is mirrored if it is not facing the environment.
  const isFrontFacing =
    mediaStreamTrack?.getSettings().facingMode !== "environment";
  const style = {
    transform: isLocal && isFrontFacing ? "rotateY(180deg)" : "",
    objectFit:
      isPortrait || track.name.includes(SHARE_SCREEN_TRACK_NAME)
        ? "contain"
        : "cover",
  };

  return <Video ref={ref} style={style} />;
}
