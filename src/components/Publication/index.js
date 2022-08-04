import { SHARE_SCREEN_TRACK_NAME } from "../../constants";
import useTrack from "../../hooks/useTrack";
import AudioTrack from "../AudioTrack";
import VideoTrack from "../VideoTrack";

export default function Publication({
  publication,
  isLocalParticipant,
  videoOnly,
  videoPriority,
}) {
  const track = useTrack(publication);

  if (!track) return null;

  switch (track.kind) {
    case "video":
      return (
        <VideoTrack
          track={track}
          priority={videoPriority}
          isLocal={
            !track.name.includes(SHARE_SCREEN_TRACK_NAME) && isLocalParticipant
          }
        />
      );
    case "audio":
      return videoOnly ? null : <AudioTrack track={track} />;
    default:
      return null;
  }
}
