const db = require("../db/dbConfig.js");

const getConnections = async () => {
  try {
    const connections = await db.any("SELECT * FROM connections");
    return connections;
  } catch (error) {
    return error;
  }
};

const getOneConnection = async (id) => {
  try {
    const connection = await db.one("SELECT * FROM connections WHERE id=$1", id);
    return connection;
  } catch (error) {
    return error;
  }
};

// CREATE
const createConnection = async (connection) => {
  try {
    const newConnection = await db.one(
      "INSERT INTO connections (mentor_id, mentee_id, category_id, subcategory_id, metric_one, metric_two, metric_three, metric_four, metric_five) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [connection.mentor_id, connection.mentee_id, connection.category_id, connection.subcategory_id, connection.metric_one, connection.metric_two, connection.metric_three, connection.metric_four, connection.metric_five]
    );
    return newConnection;
  } catch (error) {
    return error;
  }
};

const deleteConnection = async (id) => {
  try {
    const deletedConnection = await db.one("DELETE FROM connections WHERE id=$1 RETURNING *", id);
    return deletedConnection;
  } catch (error) {
    return error;
  }
};

module.exports = { getConnections, getOneConnection, createConnection, deleteConnection };