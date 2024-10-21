// queries/users.js

const db = require('../db/dbConfig.js');
const bcrypt = require('bcrypt')

const { getAllSkills } = require ('../queries/skills.js')

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

// Check if email exists
const checkEmailExists = async (email) => {
  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE email=$1', [email]);
    return user !== null; // Return true if user exists, false otherwise
  } catch (error) {
    return false; // Return false on error
  }
};

// CREATE
const createUser = async (user) => {
  try {
    const emailExists = await checkEmailExists(user.email);
    if (emailExists) {
      throw new Error('Email already exists'); // Throw an error if email exists
    }

    const { name, email, password_hash } = user;
    const salt = 10;
    const hash = await bcrypt.hash(password_hash, salt);
    const newUser = await db.one(
      'INSERT INTO users (name, bio, is_mentor, job_title, skills, background_color, email, password_hash, signup_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        user.name,
        user.bio,
        user.is_mentor,
        user.job_title,
        user.skills,
        user.background_color,
        user.email,
        hash,
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
      'UPDATE users SET name=$1, bio=$2, is_mentor=$3, job_title=$4, skills=$5, background_color=$6, email=$7, password_hash=$8, signup_date=$9 WHERE id=$10 RETURNING *',
      [
        user.name,
        user.bio,
        user.is_mentor,
        user.job_title,
        user.skills,
        user.background_color,
        user.email,
        user.password_hash,
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

const getUserByEmail = async (email) => {
  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE email=$1', [email]);
    return user; // Returns user if found, otherwise null
  } catch (error) {
    return error;
  }
};

const getUsersBySkill = async (skillId) => {
    const skills = {
      1: 'JavaScript',
      2: 'HTML',
      3: 'CSS',
      4: 'SQL',
      5: 'Web Development',
      6: 'Technical Interview Prep',
      7: 'Behavioral Interview Prep'
    }

   const skillName = skills[skillId];
  try {
    const users = await db.any ('SELECT * FROM users WHERE skills @> ARRAY[$1]', [skillName])
    return users;
  } catch (error) {
    return error;
  }
}


const getConnectedMenteeDetailsByMentorId = async (userId) => {
  try{
    const connections = await db.any(`SELECT users.*, c.id AS connection_id, c.skill_id, c.status FROM connections c JOIN users ON users.id = c.mentee_id JOIN skills ON skills.id = c.skill_id WHERE c.mentor_id = $1`, [userId]);
    return connections;
  } catch (error) {
    return error;
  }
}

const getConnectionDetailsByUserId = async (userId) => {
  try {
    const connections = await db.any ('SELECT users.*, c.id AS connection_id, skills.name AS skill_name, c.status FROM connections c JOIN users ON users.id = c.mentee_id OR users.id = c.mentor_id JOIN skills ON skills.id = c.skill_id WHERE c.mentor_id = $1 OR c.mentee_id = $1',[userId])
    const filteredConnections = connections.filter(connection => connection.id != userId)
    return filteredConnections;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  logInUser,
  getUserByEmail, // Export the new function
  getUsersBySkill,
  getConnectedMenteeDetailsByMentorId,
  getConnectionDetailsByUserId
};
