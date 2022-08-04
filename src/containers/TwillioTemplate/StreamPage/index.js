import React, { useEffect } from "react";
import { Player } from "@twilio/live-player-sdk";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import apiInstance from "../../../services";

function StreamPage() {
  const userData = useSelector((state) => state.userReducer.data);
  const eventData = useSelector((state) => state.userReducer.eventData);
  const handleVideoStream = async () => {
    try {
      const player = await Player.connect(`${userData.live_token}`, {
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
            const container = document.querySelector("div#live_stream");
            container.appendChild(player.videoElement);
            break;
          default:
            console.log("Twillio Stream");
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Opps!! ",
        text: error.message,
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const handleRefreshToken = async () => {
    try {
      await apiInstance({
        url: `user/live-token/${eventData.id}`,
        method: "GET",
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        title: "Opps!! ",
        text: error.message,
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };
  useEffect(() => {
    handleVideoStream();
  }, []);
  return (
    <Room>
      <RefreshToken onClick={handleRefreshToken}>
        Refresh Twillio Token
      </RefreshToken>
      <StreamContainer>
        <div id="live_stream"></div>
      </StreamContainer>
    </Room>
  );
}

export default StreamPage;
const Room = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #f3f4f5;
  width: 100%;
  min-height: 100vh;
`;

const StreamContainer = styled.div`
  margin: 1rem;
  width: 900px;
  height: 450px;
`;
const RefreshToken = styled.button`
  color: teal;
  font-weight: bold;
  font-size: 24px;
  background: transparent;
  border: 2px solid teal;
  cursor: pointer;
  padding: 5px 10px;
  transition: background 0.3s ease-in-out;
  :hover {
    color: white;
    background: teal;
  }
`;
