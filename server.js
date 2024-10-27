// server.js

// DEPENDENCIES
const http = require('http');
const app = require("./app.js");
const { initializeSocket } = require('./socketServer.js');

// CONFIGURATION
require("dotenv").config();

const PORT = process.env.PORT;

// Create Http server and integrate socket.io
const httpServer = http.createServer(app);
const io = initializeSocket(httpServer);

// LISTEN
httpServer.listen(PORT, () => {
  console.log(`🎧 Listening on port ${PORT} 🎧 `);
});
