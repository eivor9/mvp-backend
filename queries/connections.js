// queries/connections.js

const db = require('../db/dbConfig.js');

const getConnections = async (userId) => {
  try {
    const connections = await db.any('SELECT * FROM connections WHERE mentor_id=$1 OR mentee_id=$1', [userId]);
    return connections;
  } catch (error) {
    return error;
  }
};

const getOneConnection = async (id, user_id) => {
  try {
    const connection = await db.one(
      'SELECT * FROM connections WHERE id=$1 AND (mentor_id=$2 Or mentee_id=$2)',
      [
        id,
        user_id
      ]
    );
    return connection;
  } catch (error) {
    return error;
  }
};

// CREATE
const createConnection = async (connection) => {
  try {
    const status = connection.status || "pending"
    const newConnection = await db.one(
      'INSERT INTO connections (mentor_id, mentee_id, skill_id, status) VALUES($1, $2, $3, $4) RETURNING *',
      [
        connection.mentor_id,
        connection.mentee_id,
        connection.skill_id,
        status
      ]
    );
    return newConnection;
  } catch (error) {
    return error;
  }
};

const updateConnection = async (id, connection) => {
  try {
    const { mentor_id,mentee_id, skill_id, status} = connection
    const updatedConnection = await db.one("UPDATE connections SET  mentor_id=$1, mentee_id=$2, skill_id=$3,  status=$4 WHERE id=$5 RETURNING *",
    [
      mentor_id,
      mentee_id,
      skill_id,
      status,
      id
    ])
    return updatedConnection;
  } catch (error) {
    return error
  }
}

const deleteConnection = async (id) => {
  try {
    const deletedConnection = await db.one(
      'DELETE FROM connections WHERE id=$1 RETURNING *',
      id
    );
    return deletedConnection;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getConnections,
  getOneConnection,
  createConnection,
  deleteConnection,
  updateConnection
};
