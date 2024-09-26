// DEPENDENCIES
const express = require("express");
const assignments = express.Router({ mergeParams: true });

// INDEX
assignments.get("/", async (req, res) => {

});

// SHOW
assignments.get("/:id", async (req, res) => {
    
});

// CREATE
assignments.post("/", async (req, res) => {
    
});

// DELETE
assignments.delete("/:id", async (req, res) => {

});

// UPDATE
assignments.put("/:id", async (req, res) => {
    
});

module.exports = assignments;