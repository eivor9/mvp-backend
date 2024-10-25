const assignments = require("../controllers/assignmentsController.js");
const db = require("../db/dbConfig.js");

const getAllAssignments = async (connectionId) => {
  try {
    const allAssignments = await db.any("SELECT * FROM assignments WHERE connection_id=$1", [connectionId]);
    return allAssignments;
  } catch (error) {
    return error;
  }
};

// GET ASSIGNMENTS BY CONNECTION ID AND METRIC ID
const getAssignmentsByConnectionIdAndMetricId = async(connectionId, metricId) => {
  try {
    const allAssignments = await db.any('SELECT * FROM assignments WHERE connection_id=$1 AND metric_id=$2',[connectionId, metricId])
    return allAssignments;
  } catch (error) {
    return error;
  }
};

const getOneAssignment = async (id) => {
  try {
    const assignment = await db.one("SELECT * FROM assignments WHERE id=$1", [id]);
    return assignment;
  } catch (error) {
    return error;
  }
};

// CREATE
const createAssignment = async (assignment) => {
  try {
    const newAssignment = await db.one("INSERT INTO assignments (name, body, metric_id, due_date, is_completed, connection_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
            assignment.name,
            assignment.body,
            assignment.metric_id,
            assignment.due_date,
            assignment.is_completed,
            assignment.connection_id
        ]
        );
        return newAssignment;
  } catch (error) {
    return error;
  }
};

/*(
  id SERIAL PRIMARY KEY, 
  name TEXT,
  body TEXT,
  metric_id INTEGER REFERENCES metrics(id) ON DELETE CASCADE,
  target_date TIMESTAMP,
  is_submitted BOOLEAN,
  submission TEXT,
  rating INTEGER CHECK (rating >= 0 AND rating <= 100),
  connection_id INTEGER REFERENCES connections(id) ON DELETE CASCADE
); */

const deleteAssignment = async (id) => {
  try {
      const deletedAssignment = await db.one("DELETE FROM assignments WHERE id=$1 RETURNING *", [id]);
      return deletedAssignment;
  } catch (error) {
    return error;
  }
};

const updateAssignment = async (id, assignment) => {
  try {
      const updatedAssignment = await db.one("UPDATE assignments SET name=$1, body=$2, metric_id=$3, due_date=$4, is_completed=$5, connection_id=$6 WHERE id=$7 RETURNING *",
        [
          assignment.name,
          assignment.body,
          assignment.metric_id,
          assignment.due_date,
          assignment.is_completed,
          assignment.connection_id,
          id
        ]
        );
        return updatedAssignment;
  } catch (error) {
    return error;
  }
};

module.exports = { 
  getAllAssignments,
  getOneAssignment,
  createAssignment,
  deleteAssignment,
  updateAssignment,
  getAssignmentsByConnectionIdAndMetricId
};