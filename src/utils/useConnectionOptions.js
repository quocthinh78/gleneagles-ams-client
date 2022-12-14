import { isMobile } from "react-device-detect";
import { removeUndefineds } from ".";
import { useTwilioState } from "../context/TwilioVideoProvider";
import useUser from "../hooks/useUser";

export default function useConnectionOptions() {
  const { settings } = useTwilioState();
  const { data } = useUser();

  // See: https://sdk.twilio.com/js/video/releases/2.0.0/docs/global.html#ConnectOptions
  // for available connection options.
  const connectionOptions = {
    // Bandwidth Profile, Dominant Speaker, and Network Quality
    // features are only available in Small Group or Group Rooms.
    bandwidthProfile: {
      video: {
        mode: settings.bandwidthProfileMode,
        dominantSpeakerPriority: settings.dominantSpeakerPriority,
        trackSwitchOffMode: settings.trackSwitchOffMode,
        contentPreferencesMode: settings.contentPreferencesMode,
        clientTrackSwitchOffControl: settings.clientTrackSwitchOffControl,
      },
    },
    dominantSpeaker: true,
    networkQuality: { local: 1, remote: 1 },

    // Comment this line if you are playing music.
    maxAudioBitrate: Number(settings.maxAudioBitrate),

    //@ts-ignore - Internal use only. This property is not exposed in type definitions.
    environment: process.env.REACT_APP_TWILIO_ENVIRONMENT,

    name: `group-id-${data.group_id}`,
  };

  // For mobile browsers, limit the maximum incoming video bitrate to 2.5 Mbps.
  if (isMobile && connectionOptions?.bandwidthProfile?.video) {
    connectionOptions.bandwidthProfile.video.maxSubscriptionBitrate = 2500000;
  }

  if (process.env.REACT_APP_TWILIO_ENVIRONMENT === "dev") {
    //@ts-ignore - Internal use only. This property is not exposed in type definitions.
    connectionOptions.wsServer = "wss://us2.vss.dev.twilio.com/signaling";
  }

  // Here we remove any 'undefined' values. The twilio-video SDK will only use defaults
  // when no value is passed for an option. It will throw an error when 'undefined' is passed.
  return removeUndefineds(connectionOptions);
}
