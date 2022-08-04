import useSelectedParticipant from "../components/VideoProvider/useSelectedParticipant";
import useDominantSpeaker from "./useDominantSpeaker";
import useParticipants from "./useParticipants";
import useScreenShareParticipant from "./useScreenShareParticipant";
import useVideoContext from "./useVideoContext";

export default function useMainParticipant() {
  const [selectedParticipant] = useSelectedParticipant();
  const screenShareParticipant = useScreenShareParticipant();
  const dominantSpeaker = useDominantSpeaker();
  const participants = useParticipants();
  const { room } = useVideoContext();
  const localParticipant = room?.localParticipant;

  // The participant that is returned is displayed in the main video area. Changing the order of the following
  // variables will change the how the main speaker is determined.
  return (
    selectedParticipant ||
    screenShareParticipant ||
    dominantSpeaker ||
    participants[0] ||
    localParticipant
  );
}
