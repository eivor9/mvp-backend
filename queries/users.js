// queries/users.js

const db = require('../db/dbConfig.js');
const bcrypt = require('bcrypt')

const getAllUsers = async () => {
  try {
    const allUsers = await db.any('SELECT * FROM users');
    return allUsers;
  } catch (error) {
    return error;
  }
};

const getUser = async (id) => {
  try {
    const user = await db.one('SELECT * FROM users WHERE id=$1', id);
    return user;
  } catch (error) {
    return error;
  }
};

// CREATE
const createUser = async (user) => {
  try {

    const { username, email, password_hash } = user
    const salt = 10
    const hash = await bcrypt.hash(password_hash, salt)
    const newUser = await db.one(
      'INSERT INTO users (first_name, last_name, email, password_hash, job_title, is_mentee, is_mentor, signup_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        user.first_name,
        user.last_name,
        user.email,
        hash,
        user.job_title,
        user.is_mentee,
        user.is_mentor,
        user.signup_date,
      ]
    );
    return newUser;
  } catch (error) {
    return error;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await db.one(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      id
    );
    return deletedUser;
  } catch (error) {
    return error;
  }
};

const updateUser = async (user, id) => {
  try {
    const updatedUser = await db.one(
      'UPDATE users SET first_name=$1, last_name=$2, email=$3, password_hash=$4, job_title=$5, is_mentee=$6, is_mentor=$7, signup_date=$8 WHERE id=$9 RETURNING *',
      [
        user.first_name,
        user.last_name,
        user.email,
        user.password_hash,
        user.job_title,
        user.is_mentee,
        user.is_mentor,
        user.signup_date,
        id,
      ]
    );
    return updatedUser;
  } catch (error) {
    return error;
  }
};

const logInUser = async (user) => {
  try {
    const loggedInUser = await db.oneOrNone("SELECT * FROM users WHERE email=$1", [user.email])
    //console.log(loggedInUser)
    if(!loggedInUser){
      return false
    }

    const passwordMatch = await bcrypt.compare(user.password_hash, loggedInUser.password_hash)

    if(!passwordMatch) {
      return false
    }
    return loggedInUser
  } catch (error) {
    return error
  }
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  logInUser
};
