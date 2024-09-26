// DEPENDENCIES
const express = require("express");
const messages = express.Router({ mergeParams: true });

// INDEX
messages.get("/", async (req, res) => {

});

// SHOW
messages.get("/:id", async (req, res) => {
    
});

// CREATE
messages.post("/", async (req, res) => {
    
});

// DELETE
messages.delete("/:id", async (req, res) => {
    
});

// UPDATE
messages.put("/:id", async (req, res) => {
    
});

module.exports = messages;