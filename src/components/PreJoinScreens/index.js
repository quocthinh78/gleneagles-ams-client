import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import useVideoContext from "../../hooks/useVideoContext";
import IntroContainer from "../IntroContainer";
import DeviceSelectionScreen from "./DeviceSelectionScreen";
import MediaErrorSnackbar from "./MediaErrorSnackbar";

export default function PreJoinScreens() {
  const { data: user } = useUser();
  const { getAudioAndVideoTracks } = useVideoContext();
  const [mediaError, setMediaError] = useState();

  useEffect(() => {
    if (!mediaError) {
      getAudioAndVideoTracks().catch((error) => {
        console.log("Error acquiring local media:");
        console.dir(error);
        setMediaError(error);
      });
    }
  }, [getAudioAndVideoTracks, mediaError]);

  return (
    <IntroContainer>
      <MediaErrorSnackbar error={mediaError} />
      <DeviceSelectionScreen
        name={user.first_name}
        roomName={"Room"}
        videoToken={user.video_token}
      />
    </IntroContainer>
  );
}
