// helper queries

const db = require("../db/dbConfig.js");


// get assignments associated with user_id (limited to 3) and sorted by submission_date
const getRecentAssignmentsByUserId = async (id) => {
    try {
      const recentAssignments = await db.any ("SELECT assignments.id AS assignment_id, assignments.name AS assignment_name, assignments.body AS assignment_body,subcategories.name AS subcategory_name,assignments.submission_date,assignments.target_date,connections.mentor_id,connections.mentee_id FROM connections JOIN assignments ON connections.id = assignments.connection_id JOIN users ON connections.mentor_id = users.id OR connections.mentee_id = users.id JOIN subcategories ON connections.subcategory_id = subcategories.id WHERE users.id = $1 ORDER BY assignments.submission_date DESC LIMIT 3", [id])
      return recentAssignments;
    } catch(error) {
      return error;
    }
  }

  module.exports = { getRecentAssignmentsByUserId };