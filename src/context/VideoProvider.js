import React, { useCallback, useState } from "react";
import ErrorDialog from "../components/ErrorDialog";
import AttachVisibilityHandler from "../components/VideoProvider/AttachVisibilityHandler";
import useBackgroundSettings from "../components/VideoProvider/useBackgroundSettings";
import useHandleRoomDisconnection from "../components/VideoProvider/useHandleRoomDisconnection";
import useHandleTrackPublicationFailed from "../components/VideoProvider/useHandleTrackPublicationFailed";
import useLocalTracks from "../components/VideoProvider/useLocalTracks";
import useRestartAudioTrackOnDeviceChange from "../components/VideoProvider/useRestartAudioTrackOnDeviceChange";
import useRoom from "../components/VideoProvider/useRoom";
import useScreenShareToggle from "../components/VideoProvider/useScreenShareToggle";
import { SelectedParticipantProvider } from "../components/VideoProvider/useSelectedParticipant";
import { SHARE_SCREEN_TRACK_NAME } from "../constants";
import useConnectionOptions from "../utils/useConnectionOptions";
import { useTwilioState } from "./TwilioVideoProvider";

export const VideoContext = React.createContext(null);

export function VideoProvider({ options, children, onError = () => {} }) {
  const onErrorCallback = useCallback(
    (error) => {
      console.log(`ERROR: ${error.message}`, error);
      onError(error);
    },
    [onError]
  );

  const {
    localTracks,
    getLocalVideoTrack,
    getLocalAudioTrack,
    isAcquiringLocalTracks,
    removeLocalAudioTrack,
    removeLocalVideoTrack,
    getAudioAndVideoTracks,
  } = useLocalTracks();
  const { room, isConnecting, connect } = useRoom(
    localTracks,
    onErrorCallback,
    options
  );

  const [isSharingScreen, toggleScreenShare] = useScreenShareToggle(
    room,
    onError
  );

  // Register callback functions to be called on room disconnect.
  useHandleRoomDisconnection(
    room,
    onError,
    removeLocalAudioTrack,
    removeLocalVideoTrack,
    isSharingScreen,
    toggleScreenShare
  );
  useHandleTrackPublicationFailed(room, onError);
  useRestartAudioTrackOnDeviceChange(localTracks);

  const videoTrack = localTracks.find(
    (track) =>
      !track.name.includes(SHARE_SCREEN_TRACK_NAME) && track.kind === "video"
  );
  const [backgroundSettings, setBackgroundSettings] = useBackgroundSettings(
    videoTrack,
    room
  );

  return (
    <VideoContext.Provider
      value={{
        room,
        localTracks,
        isConnecting,
        onError: onErrorCallback,
        getLocalVideoTrack,
        getLocalAudioTrack,
        connect,
        isAcquiringLocalTracks,
        removeLocalVideoTrack,
        isSharingScreen,
        toggleScreenShare,
        getAudioAndVideoTracks,
        backgroundSettings,
        setBackgroundSettings,
      }}
    >
      <SelectedParticipantProvider room={room}>
        {children}
      </SelectedParticipantProvider>
      {/* 
        The AttachVisibilityHandler component is using the useLocalVideoToggle hook
        which must be used within the VideoContext Provider.
      */}
      <AttachVisibilityHandler />
    </VideoContext.Provider>
  );
}

export const VideoApp = ({ children }) => {
  const { error, setError } = useTwilioState();
  const connectionOptions = useConnectionOptions();

  console.log("error: ", error);

  return (
    <VideoProvider options={connectionOptions} onError={setError}>
      <ErrorDialog dismissError={() => setError(null)} error={error} />
      {children}
    </VideoProvider>
  );
};
