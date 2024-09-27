// controllers/assignmentsController.js

// DEPENDENCIES
const express = require("express");
const assignments = express.Router({ mergeParams: true });


//Queries
const { getOneConnection } = require('../queries/connections');

const {
    getAllAssignments,
    getOneAssignment,
    createAssignment,
    deleteAssignment,
    updateAssignment
} = require('../queries/assignments')

// INDEX - get all assignments associated with a connection by connection_id
assignments.get("/", async (req, res) => {
    const { connection_id } = req.params;

    try {
        const assignments = await getAllAssignments(connection_id);
        const connection = await getOneConnection(connection_id);

        if (connection.id) {
            res.status(200).json({ ...connection, assignments });
        } else {
            res.status(500).json({ error: "Connection not found"});
        }
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
    
});

// SHOW - get one assignment by assignment id
assignments.get("/:id", async (req, res) => {

    const { connection_id, id } = req.params;

    try {
        const assignment = await getOneAssignment(id);
        const connection = await getOneConnection(connection_id);

        if (assignment) {
            res.status(200).json({ ...connection, assignment });
        } else {
            res.status(404).json({ error: "Assignment not found"});
        }
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
    
});

// CREATE - create an assignment for a connection using connection_id
assignments.post("/", async (req, res) => {
    const { connection_id } = req.params;
    const body = req.body;

    try{
        const assignment = await createAssignment({ ...body, connection_id});
        res.status(201).json(assignment);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// DELETE - delete an assignment by id
assignments.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAssignment = await deleteAssignment(id);
        
        if (deletedAssignment.id) {
            res.status(200).json(deletedAssignment);
        } else {
            res.status(404).json("Assignment not found");
        }
    } catch (error) {
        res.status(500).json({ error: "server error" })
    }
    
});

// UPDATE - update an assignment
assignments.put("/:id", async (req, res) => {

    const { id } = req.params;
    const body = req.body;

    try {
        const updatedAssignment = await updateAssignment(id, { ...body });
        
        if (updatedAssignment) {
            res.status(200).json(updatedAssignment);
        } else {
            res.status(404).json({ error: "Assignment not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = assignments;