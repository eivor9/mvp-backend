// DEPENDENCIES
const express = require("express");
const metrics = express.Router({ mergeParams: true });

// INDEX
metrics.get("/", async (req, res) => {

});

// SHOW
metrics.get("/:id", async (req, res) => {
    
});

// CREATE
metrics.post("/", async (req, res) => {
    
});

// DELETE
metrics.delete("/:id", async (req, res) => {

});

// UPDATE
metrics.put("/:id", async (req, res) => {
    
});

module.exports = metrics;