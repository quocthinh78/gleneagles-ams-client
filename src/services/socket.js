import socketIOClient from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_API_SECRET;
const socket = socketIOClient(ENDPOINT, {
  auth: { token: localStorage.getItem("token") },
  autoConnect: false,
  transports: ['websocket']
});

export default socket;
