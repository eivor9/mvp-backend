// DEPENDENCIES
const express = require("express");
const users = express.Router();

// CONNECTIONS
const connectionsController = require("./connectionsController.js");
users.use("/:user_id/connections", connectionsController);

// INDEX
users.get("/", async (req, res) => {

});

// SHOW
users.get("/:id", async (req, res) => {
    
});

// CREATE
users.post("/", async (req, res) => {
    
});

// DELETE
users.delete("/:id", async (req, res) => {

});

// UPDATE
users.put("/:id", async (req, res) => {
    
});

module.exports = users;