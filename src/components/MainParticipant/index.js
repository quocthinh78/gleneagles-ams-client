import useMainParticipant from "../../hooks/useMainParticipant";
import useScreenShareParticipant from "../../hooks/useScreenShareParticipant";
import useVideoContext from "../../hooks/useVideoContext";
import MainParticipantInfo from "../MainParticipantInfo";
import ParticipantTracks from "../ParticipantTracks";
import useSelectedParticipant from "../VideoProvider/useSelectedParticipant";

export default function MainParticipant() {
  const mainParticipant = useMainParticipant();
  const { room } = useVideoContext();
  const localParticipant = room.localParticipant;
  const [selectedParticipant] = useSelectedParticipant();
  const screenShareParticipant = useScreenShareParticipant();

  const videoPriority =
    mainParticipant === selectedParticipant ||
    mainParticipant === screenShareParticipant
      ? "high"
      : null;

  return (
    /* audio is disabled for this participant component because this participant's audio 
       is already being rendered in the <ParticipantStrip /> component.  */
    <MainParticipantInfo participant={mainParticipant}>
      <ParticipantTracks
        participant={mainParticipant}
        videoOnly
        enableScreenShare
        videoPriority={videoPriority}
        isLocalParticipant={mainParticipant === localParticipant}
      />
    </MainParticipantInfo>
  );
}
