// helper queries

const db = require("../db/dbConfig.js");


// get assignments associated with user_id (limited to 3) and sorted by submission_date
const getRecentAssignmentsByUserId = async (id) => {
    try {
      const recentAssignments = await db.any ("SELECT a.* FROM assignments a JOIN connections c ON a.connection_id = c.id WHERE c.mentee_id = $1 OR c.mentor_id = $1", [id])
      return recentAssignments;
    } catch(error) {
      return error;
    }
  }

  module.exports = { getRecentAssignmentsByUserId };