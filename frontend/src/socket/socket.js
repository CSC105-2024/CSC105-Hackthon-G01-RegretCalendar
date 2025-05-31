import { io } from "socket.io-client";

const socket =io("http://localhost:4002", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

export default socket;