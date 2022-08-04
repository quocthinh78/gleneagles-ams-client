import { useCallback, useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../../context/AuthProvider";
import useUser from "../../../hooks/useUser";
import useVideoContext from "../../../hooks/useVideoContext";
import { VIP_PAGE } from "../../../routes/constant";

const LobbyPage = () => {
  const { logout } = useContext(AuthContext);
  const { localTracks } = useVideoContext();
  const user = useUser();
  const history = useHistory();

  const handleLogout = useCallback(() => {
    localTracks.forEach((track) => track.stop());
    logout();
  }, [localTracks, logout]);

  const handleGoToRoom = () => {
    history.push(`${VIP_PAGE}/${user.data.group_id}`);
  };

  if (!user.data.video_token)
    return (
      <div style={{ textAlign: "center" }}>
        😅
        <br />
        There are currently no rooms available for you.
        <br />
        Please wait until the room is available.
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
    );

  return (
    <div style={{ textAlign: "center" }}>
      <p>😅 Everyone is waiting.</p>
      <br />
      <button onClick={handleGoToRoom}>Go to Room</button>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LobbyPage;
