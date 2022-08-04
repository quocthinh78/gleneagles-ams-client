// NOTE: local participant's tracks do not have 'sid'. Instead, it has 'id' (which not
// exists in remote participant), its 'id' will be the same as its 'name'.
// IMPORTANT:   'id' !== 'sid'

import {
  AudioMutedOutlined,
  AudioOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { find, findIndex } from "lodash";
import React, { Fragment, memo, useEffect, useReducer } from "react";
import * as s from "./Participant.styles";
import { SHARE_SCREEN_TRACK_NAME } from "../../constants";
import Track from "./Track";

const SET_TRACKS = "SET_TRACKS";
const ADD_TRACK = "ADD_TRACK";
const REMOVE_TRACK = "REMOVE_TRACK";
const SET_AUDIO_STATUS = "SET_AUDIO_STATUS";
const SET_VIDEO_STATUS = "SET_VIDEO_STATUS";

function reducer(state, action) {
  switch (action.type) {
    case SET_TRACKS:
      const audio = find(action.payload, (o) => {
        return o.kind === "audio" && o.isEnabled === true;
      });
      const camera = find(action.payload, (o) => {
        return (
          o.kind === "video" &&
          o.isEnabled === true &&
          o.name !== SHARE_SCREEN_TRACK_NAME
        );
      });
      return { tracks: action.payload, isAudioOn: !!audio, isCamOn: !!camera };

    case ADD_TRACK:
      return { ...state, tracks: [...state.tracks, action.payload] };

    case REMOVE_TRACK:
      return {
        ...state,
        tracks: state.tracks.filter(
          (track) => track.sid !== action.payload.sid
        ),
      };

    case SET_AUDIO_STATUS:
      return {
        ...state,
        isAudioOn: find(state.tracks, (o) => {
          return o.sid === action.payload.sid;
        })
          ? action.payload.isEnabled
          : state.isAudioOn,
      };

    case SET_VIDEO_STATUS:
      return {
        ...state,
        isCamOn: find(state.tracks, (o) => {
          return o.sid === action.payload.sid;
        })
          ? action.payload.isEnabled
          : state.isCamOn,
      };

    default:
      return { ...state };
  }
}

export default memo(function Participant({
  participant,
  onConnectedScreenTrack,
  onDisconnectedScreenTrack,
  screenSharing,
  dominant,
}) {
  const [{ tracks, isAudioOn, isCamOn }, dispatch] = useReducer(reducer, {
    tracks: [],
    isAudioOn: false,
    isCamOn: false,
  });

  useEffect(() => {
    const tempTracks = trackPublicationsToTracks(participant.tracks);
    dispatch({
      type: SET_TRACKS,
      payload: tempTracks,
    });

    participant.on("trackSubscribed", (a) => {
      // console.log("trackSubscribed ", a);
      addTrack(a);
    });
    participant.on("trackUnsubscribed", (a) => {
      // console.log("trackUnsubscribed ", a);
      removeTrack(a);
    });
    participant.on("trackPublished", (publication) => {
      // console.log("trackPublished ", publication);
      if (publication.track) {
        addTrack(publication.track);
      }
    });
    participant.on("trackUnpublished", (publication) => {
      // console.log("trackUnpublished ", publication);
      if (publication.track) {
        removeTrack(publication.track);
      }
    });

    participant.on("trackDisabled", (a) => {
      // console.log("trackDisabled ", a);
      if (typeof a.trackSid !== undefined) updateTrackStatus(a);
    });
    participant.on("trackEnabled", (a) => {
      // console.log("trackEnabled ", a);
      if (typeof a.trackSid !== undefined) updateTrackStatus(a);
    });

    return () => {
      participant.removeAllListeners();
    };
    // eslint-disable-next-line
  }, []);

  const trackPublicationsToTracks = (trackMap) => {
    return Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);
  };

  const addTrack = (addedTrack) => {
    if (addedTrack.name === SHARE_SCREEN_TRACK_NAME) {
      // console.log(addedTrack);
      onConnectedScreenTrack(addedTrack, false);
    } else {
      dispatch({ type: ADD_TRACK, payload: addedTrack });
      if (addedTrack.kind === "audio")
        dispatch({
          type: SET_AUDIO_STATUS,
          payload: { isEnabled: addedTrack.isEnabled, sid: addedTrack.sid },
        });
      if (addedTrack.kind === "video")
        dispatch({
          type: SET_VIDEO_STATUS,
          payload: { isEnabled: addedTrack.isEnabled, sid: addedTrack.sid },
        });
    }
  };

  const removeTrack = (removedTrack) => {
    if (removedTrack.name === SHARE_SCREEN_TRACK_NAME) {
      // console.log(removedTrack);
      onDisconnectedScreenTrack(removedTrack, false);
    } else {
      dispatch({ type: REMOVE_TRACK, payload: removedTrack });
      if (removedTrack.kind === "audio")
        dispatch({
          type: SET_AUDIO_STATUS,
          payload: { isEnabled: removedTrack.isEnabled, sid: removedTrack.sid },
        });
      if (removedTrack.kind === "video")
        dispatch({
          type: SET_VIDEO_STATUS,
          payload: { isEnabled: removedTrack.isEnabled, sid: removedTrack.sid },
        });
    }
  };

  const updateTrackStatus = (a) => {
    // receive event from remote track
    if (a.kind === "audio")
      dispatch({
        type: SET_AUDIO_STATUS,
        payload: { isEnabled: a.isTrackEnabled, sid: a.trackSid },
      });
    if (a.kind === "video" && a.trackName !== SHARE_SCREEN_TRACK_NAME)
      dispatch({
        type: SET_VIDEO_STATUS,
        payload: { isEnabled: a.isTrackEnabled, sid: a.trackSid },
      });
  };

  const renderTracks = () => {
    const audioIndex = findIndex(tracks, (o) => o.kind === "audio");
    const cameraIndex = findIndex(tracks, (o) => o.kind === "video");

    return (
      <Fragment>
        {audioIndex !== -1 && (
          <Track
            identity={participant.identity}
            track={tracks[audioIndex]}
            screenSharing={screenSharing}
            isEnabled={isAudioOn}
          />
        )}
        {cameraIndex !== -1 && (
          <Track
            identity={participant.identity}
            track={tracks[cameraIndex]}
            screenSharing={screenSharing}
            isEnabled={isCamOn}
          />
        )}
        {cameraIndex === -1 && (
          <Track
            identity={participant.identity}
            track={{ kind: "video", name: "noCam" }}
            screenSharing={screenSharing}
            isEnabled={isCamOn}
          />
        )}
      </Fragment>
    );
  };

  return (
    <s.ParticipantContent dominant={dominant}>
      <Tooltip title={participant.identity}>
        <s.Indentity>
          {participant.identity}&nbsp;
          {dominant ? <SoundOutlined /> : null}
        </s.Indentity>
      </Tooltip>
      <s.Audio>
        {isAudioOn ? <AudioOutlined /> : <AudioMutedOutlined />}
      </s.Audio>
      {renderTracks()}
    </s.ParticipantContent>
  );
});
