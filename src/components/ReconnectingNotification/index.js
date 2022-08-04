import useRoomState from "../../hooks/useRoomState";
import Snackbar from "../Snackbar";

export default function ReconnectingNotification() {
  const roomState = useRoomState();

  return (
    <Snackbar
      variant="error"
      headline="Connection Lost:"
      message="Reconnecting to room..."
      open={roomState === "reconnecting"}
    />
  );
}
