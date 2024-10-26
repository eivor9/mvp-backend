// server.js

// DEPENDENCIES
const http = require('http');
const app = require("./app.js");
const { initializeSocket } = require('./socketServer.js');

// CONFIGURATION
require("dotenv").config();

const PORT = process.env.PORT;

// LISTEN
app.listen(PORT, () => {
  console.log(`🎧 Listening on port ${PORT} 🎧 `);
});
