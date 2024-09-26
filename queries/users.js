const db = require("../db/dbConfig.js");

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    return error;
  }
};

const getUser = async (id) => {
  try {
    const user = await db.one("SELECT * FROM users WHERE id=$1", id);
    return user;
  } catch (error) {
    return error;
  }
};

// CREATE
const createUser = async (user) => {
  try {
    const newUser = await db.one(
      "INSERT INTO users (first_name, last_name, email, password, job_title, is_mentee, is_mentor, signup_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [user.first_name, user.last_name, user.email, user.password, user.job_title, user.is_mentee, user.is_mentor, user.signup_date]
    );
    return newUser;
  } catch (error) {
    return error;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await db.one("DELETE FROM users WHERE id = $1 RETURNING *", id);
    return deletedUser;
  } catch (error) {
    return error;
  }
};

const updateUser = async (user, id) => {
  try {
    const updatedUser = await db.one(
      "UPDATE users SET first_name=$1, last_name=$2, email=$3, password=$4, job_title=$5, is_mentee=$6, is_mentor=$7, signup_date=$8 WHERE id=$9 RETURNING *",
      [user.first_name, user.last_name, user.email, user.password, user.job_title, user.is_mentee, user.is_mentor, user.signup_date, id]
    );
    return updatedUser;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllUsers, getUser, createUser, deleteUser, updateUser };