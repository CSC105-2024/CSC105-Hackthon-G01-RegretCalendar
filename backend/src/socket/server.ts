import { Server as SocketIOServer, Socket } from "socket.io";
import { authSocket } from "../middleware/authSocket.ts";
import { db } from "../index.ts";
export const setupSocketIO = (io: SocketIOServer) => {
  authSocket(io);

  io.on("connection", (socket) => {
    const user = socket.user;
    console.log("🟢 Connected:", socket.id);
    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.id);
    });
  });
};
