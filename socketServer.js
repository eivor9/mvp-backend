const { Server } = require("socket.io");

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

  });

  return io;
};

module.exports = { initializeSocket };
