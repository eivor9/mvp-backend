// DEPENDENCIES
const express = require("express");
const conversations = express.Router({ mergeParams: true });

// MESSAGES 
const messagesController = require("./messagesController.js");
conversations.use("/:conversation_id/messages", messagesController);


// SHOW
conversations.get("/", async (req, res) => {
    
});

// CREATE
conversations.post("/", async (req, res) => {
    
});

// DELETE
conversations.delete("/:id", async (req, res) => {

});

module.exports = conversations;