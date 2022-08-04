/*
 *  The object model for the Room object (found here: https://www.twilio.com/docs/video/migrating-1x-2x#object-model) shows
 *  that Participant objects have TrackPublications, and TrackPublication objects have Tracks.
 *
 *  The React components in this application follow the same pattern. This ParticipantTracks component renders Publications,
 *  and the Publication component renders Tracks.
 */

import { SHARE_SCREEN_TRACK_NAME } from "../../constants";
import usePublications from "../../hooks/usePublications";
import Publication from "../Publication";

export default function ParticipantTracks({
  participant,
  videoOnly,
  enableScreenShare,
  videoPriority,
  isLocalParticipant,
}) {
  const publications = usePublications(participant);

  let filteredPublications;

  if (
    enableScreenShare &&
    publications.some((p) => p.trackName.includes(SHARE_SCREEN_TRACK_NAME))
  ) {
    // When displaying a screenshare track is allowed, and a screen share track exists,
    // remove all video tracks without the name 'screen'.
    filteredPublications = publications.filter(
      (p) => p.trackName.includes(SHARE_SCREEN_TRACK_NAME) || p.kind !== "video"
    );
  } else {
    // Else, remove all screenshare tracks
    filteredPublications = publications.filter(
      (p) => !p.trackName.includes(SHARE_SCREEN_TRACK_NAME)
    );
  }

  return (
    <>
      {filteredPublications.map((publication) => (
        <Publication
          key={publication.kind}
          publication={publication}
          participant={participant}
          isLocalParticipant={isLocalParticipant}
          videoOnly={videoOnly}
          videoPriority={videoPriority}
        />
      ))}
    </>
  );
}
