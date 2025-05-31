import { Server as SocketIOServer, Socket } from "socket.io";
import { authSocket } from "../middleware/authSocket.ts";
import { db } from "../index.ts";
export const setupSocketIO = (io: SocketIOServer) => {

 authSocket(io)

 io.on("connection", (socket) => {
  const user = socket.user;
  console.log("🟢 Connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("🔴 Disconnected:", socket.id);
  });

  

  socket.on("sendMessage", async ({ message }) => {
    if(message === ""){
      console.log("Message is empty");
      return
    }
    const user = socket.user;
    try{
      const id = user.id;
      const savedMessage = await db.dailyLog.create({
        data : {
          reflection : message,
          userId : id
        },
        include: {
          user: true
        }
      })
      io.emit("receiveMessage", {
        message,
        user,
        timestamp: Date.now(),
      });
    }
    catch(err){
      console.error('Error saving message:', err);
    }
  });
});

};
