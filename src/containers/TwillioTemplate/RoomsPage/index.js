import { Redirect } from "react-router-dom";
import NetworkingRoom from "../../../components/NetworkingRoom";
import PreJoinScreens from "../../../components/PreJoinScreens";
import useRoomState from "../../../hooks/useRoomState";
import useUser from "../../../hooks/useUser";

const RoomsPage = () => {
  const user = useUser();
  const roomState = useRoomState();

  if (!user.data.video_token) return <Redirect to="/" />;

  return roomState === "disconnected" ? <PreJoinScreens /> : <NetworkingRoom />;
};

export default RoomsPage;
