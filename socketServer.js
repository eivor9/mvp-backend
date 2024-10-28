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

        socket.on("joinRoom", (connection_id) => {
            socket.join(connection_id);
            console.log(`User joined room with connection ID ${connection_id}`);
        });

        socket.on("sendMessage", (messageData, callback) => { 
            const { connection_id, body, sender_id, recipient_id } = messageData;

            const message = {
                body,
                sender_id,
                recipient_id,
                connection_id,
                time_sent: new Date().toISOString(),
            };

            io.to(connection_id).emit("receiveMessage", message);
            console.log(`Message sent to ${connection_id}:`, message);

            callback({ status: 'success', message });
        });

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });

    return io;
};

module.exports = { initializeSocket };
