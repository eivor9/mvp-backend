// DEPENDENCIES
const express = require("express");
const users = express.Router();
const connections = express.Router({ mergeParams: true });

// ASSIGNMENTS
const assignmentsController = require("./assignmentsController.js");
connections.use("/:connection_id/assignments", assignmentsController);

// METRICS
const metricsController = require("./metricsController.js");
connections.use("/:connection_id/metrics", metricsController);

// CONVERSATIONS
const conversationsController = require("./conversationsController.js");
connections.use("/:connection_id/conversations", conversationsController);

// INDEX
connections.get("/", async (req, res) => {

});

// SHOW
connections.get("/:id", async (req, res) => {
    
});

// CREATE
connections.post("/", async (req, res) => {
    
});

// DELETE
connections.delete("/:id", async (req, res) => {

});

module.exports = users;