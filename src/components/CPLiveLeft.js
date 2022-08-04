import styled from "styled-components";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Player } from "@twilio/live-player-sdk";
import socket from "../services/socket";
import apiInstance from "../services";

// import CPLiveChatContent from "./CPLiveChatContent";

function CPLiveLeft() {
  const userData = useSelector((state) => state.userReducer.data);
  const eventData = useSelector((state) => state.userReducer.eventData);
  const videoRef = useRef();

  useEffect(() => {
    const videoEl = videoRef.current;

    if (!eventData.is_livestream) {
      getVideo(videoEl);
    } else {
      getStream(videoEl);
    }
    socket.on(`start-live-stream-${eventData.id}`, () => {
      getStream(videoEl);
    });
    socket.on(`stop-live-stream-${eventData.id}`, () => {
      getVideo(videoEl);
    });

    return () => {
      socket.removeAllListeners(`start-live-stream-${eventData.id}`);
      socket.removeAllListeners(`stop-live-stream-${eventData.id}`);
    };
    // eslint-disable-next-line
  }, []);

  const getVideo = (el) => {
    if (
      eventData.video_type === "Vimeo" ||
      eventData.video_type === "Millicast"
    ) {
      getIframeVideo(el);
    } else {
      getScriptVideo(el);
    }
  };

  const getStream = async (el) => {
    if (!userData.live_token) {
      await getLiveToken(el);
    } else {
      await handleVideoStream(userData.live_token, el);
    }
  };

  const getIframeVideo = (el) => {
    const iframe = document.createElement("iframe");
    iframe.src = eventData.video_url;
    iframe.className = "vimeo";
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    el.innerHTML = "";
    el.appendChild(iframe);
    el.appendChild(script);
  };
  const getScriptVideo = (el) => {
    const script = document.createElement("script");
    script.src = `https://player.dacast.com/js/player.js?contentId=${eventData.video_url}`;
    script.id = eventData.video_url;
    script.className = "dacast-video";
    el.innerHTML = "";
    el.appendChild(script);
  };

  const getLiveToken = async (el) => {
    try {
      const { data } = await apiInstance({
        url: `user/live-token/${eventData.id}`,
        method: "GET",
      });
      await handleVideoStream(data, el);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVideoStream = async (dataToken, el) => {
    try {
      const player = await Player.connect(`${dataToken}`, {
        playerWasmAssetsPath: "../twillio",
      });
      player.on(Player.Event.StateChanged, (state) => {
        switch (state) {
          case Player.State.Buffering:
            console.log("Player is buffering");
            break;
          case Player.State.Ended:
            console.log("Stream ended");
            break;
          case Player.State.Idle:
            /**
             * The player has successfully authenticated and is loading the stream. This
             * state is also reached as a result of calling player.pause().
             */ break;
          case Player.State.Playing:
            console.log("Stream is playling");
            break;
          case Player.State.Ready:
            player.play();
            el.innerHTML = "";
            el.appendChild(player.videoElement);
            break;
          default:
            console.log("Twillio Stream");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Video>
      <Wrapper id="video-wrapper" ref={videoRef}></Wrapper>
    </Video>
  );
}

export default CPLiveLeft;

const Video = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  width: 100%;
  @media only screen and (min-device-width: 320px) and (max-device-width: 991px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    height: 100vh;
    padding-bottom: 0;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  .dc-video-player-wrapper {
    width: 100%;
  }
  video {
    height: 100%;
    width: 100%;
  }
`;
