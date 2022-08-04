import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { CAMERA_TRACK_NAME, SHARE_SCREEN_TRACK_NAME } from "../../constants";

export default function Track({
  track,
  identity = "",
  screenSharing = false,
  isEnabled,
}) {
  const trackContainer = useRef(null);
  const isScreenTrack =
    track && track.kind === "video" && track.name === SHARE_SCREEN_TRACK_NAME;
  const isCameraTrack =
    track && track.kind === "video" && track.name !== SHARE_SCREEN_TRACK_NAME;

  useEffect(() => {
    if (
      !track ||
      track.kind === "data" ||
      (track.kind === "video" && track.name === "noCam")
    ) {
      return;
    }
    const attachment = track.attach();
    trackContainer.current.appendChild(attachment);

    return () => {
      if (!track || track.name === "noCam") return;
      if (track.stop) track.stop();
      track.detach().forEach((element) => element.remove());
    };
    // eslint-disable-next-line
  }, []);

  return (
    <TrackContent
      ref={trackContainer}
      screenSharing={screenSharing}
      id={
        isScreenTrack
          ? SHARE_SCREEN_TRACK_NAME
          : isCameraTrack
          ? CAMERA_TRACK_NAME
          : null
      }
    >
      {isCameraTrack && !isEnabled && (
        <OffCamBg>
          <Logo>{identity[0]}</Logo>
        </OffCamBg>
      )}
    </TrackContent>
  );
}

const TrackContent = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #000000;
  height: auto;

  video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &#${CAMERA_TRACK_NAME} {
    height: 0;
    padding-bottom: 56.25%; /* 16:9 */

    video {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &#${SHARE_SCREEN_TRACK_NAME} {
    height: 100%;
    background: transparent;
    & > video {
      object-fit: contain;
    }
  }
`;

const OffCamBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

const Logo = styled.div`
  width: 75px;
  height: 75px;
  padding: 20px;
  background: #8080806b;
  border-radius: 50%;
`;
