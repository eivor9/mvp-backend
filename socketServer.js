const { Server } = require("socket.io");

const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
        },
      });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinRoom", (connectionId) => {
        socket.join(connectionId);
        console.log(`User joined room with connection ID ${connectionId}`);
    });

    socket.on("sendMessage", (messageData) => {
        const { connectionId, message } = messageData;
        
        io.to(connectionId).emit("receiveMessage", message);
    });


    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

  });

  return io;
};

module.exports = { initializeSocket };
