// controllers/usersController.js

// DEPENDENCIES
const express = require('express');
const users = express.Router();
require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

// QUERIES
const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  logInUser,
  getUserByEmail,
  getUsersBySkill,
  getConnectedMenteeDetailsByMentorId,
  getConnectionDetailsByUserId
} = require('../queries/users.js');

// validations
const {
  checkName,
  validateEmail,
} = require('../validations/userValidations.js');

// AUTHENTICATION
const {
  authenticateToken
} = require('../auth/auth.js')

// helper queries for fetching user's recent assignments
const {
  getRecentAssignmentsByUserId
} = require('../queries/helperQueries.js')

// CONNECTIONS
const connectionsController = require('./connectionsController.js');
users.use('/:user_id/connections', connectionsController);

// INDEX
users.get('/', async (req, res) => {
  const allUsers = await getAllUsers();
  if (allUsers) {
    res.status(200).json(allUsers);
  } else {
    res.status(404).json({ error: 'server error' });
  }
});

//get user's recent assignments
users.get('/:id/recent-assignments', async(req, res) => {
  const { id } = req.params;
  const recentAssignments = await getRecentAssignmentsByUserId(id);
  if(recentAssignments) {
    res.status(200).json(recentAssignments);
  } else {
    res.status(404).json({ error: "server error"})
  }
})

// GET ALL CONNECTION DETAILS BY USER ID
users.get('/:id/connection-details', async (req, res) => {
  const { id } = req.params;
  try {
    const connections = await getConnectionDetailsByUserId(id)
    if(connections.length > 0) {
      res.status(200).json(connections)
    } else {
      res.status(200).json([])
    }
  } catch (error) {
      res.status(404).json({ error: "server error"})
  }
})

// GET CONNECTED MENTEES BY MENTOR/USER ID
users.get('/:id/mentees', async (req, res) => {
  const { id } = req.params;
  const mentees = await getConnectedMenteeDetailsByMentorId(id);
  if(mentees) {
    res.status(200).json(mentees)
  } else {
    res.status(400).json({error: "server error"})
  }
})

// SHOW
users.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await getUser(id);
  if (user.id) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'user not found' });
  }
});

// GET MENTORS BY SKILL ID
users.get('/mentors/:skillId', async (req, res) => {
  const { skillId } = req.params;
  try {
     const mentors = await getUsersBySkill(skillId);
    if(mentors.length > 0) {
      res.status(200).json(mentors);
    } else {
      res.status(200).json([])
    }
  } catch {
      res.status(404).json({ error: 'no mentors found'})
  }
 
})

// CREATE
users.post('/', checkName, validateEmail, async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    const token = jwt.sign({ id: newUser.id, email:newUser.email }, secret);
    
    //separate password from the return object to avoid sending
    const { password_hash, ...userWithoutPassword } = newUser;

    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ error: 'user not created' });
  }
});

//LOG IN ROUTE
users.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const user = await logInUser(req.body);
    if(!user) {
      res.status(401).json({ error: "Invalid email or password" })
      return
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secret)

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        job_title: user.job_title,
        is_mentee: user.is_mentee,
        is_mentor: user.is_mentor,
        signup_date: user.signup_date,
      },
      token
    })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

// DELETE
users.delete('/:id', /*authenticateToken,*/ async (req, res) => {
  const { id } = req.params;

  if (req.user.id !== id) {
    return res.status(403).json({ error: 'Unauthorized access' });
 }

  const deletedUser = await deleteUser(id);
  if (deletedUser.id) {
    res
      .status(200)
      .json({ message: 'user successfully deleted', ...deletedUser });
  } else {
    res.status(404).json('User not found');
  }
});

// UPDATE
users.put('/:id', /*authenticateToken,*/ checkName, validateEmail, async (req, res) => {
  const { id } = req.params;

  if (req.body.id !== id) {
    return res.status(403).json({ error: 'Unauthorized access' });
 }
 
  try {
    const updatedUser = await updateUser(req.body, id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// Add these imports at the top
const {
  getUserLinks,
  createUserLink,
  deleteUserLink,
} = require('../queries/userLinks.js');

// Get user links
users.get('/:id/links', async (req, res) => {
  const { id } = req.params;
  const links = await getUserLinks(id);
  if (links) {
    res.status(200).json(links);
  } else {
    res.status(404).json({ error: 'No links found for this user' });
  }
});

// Create a new user link
users.post('/:id/links', async (req, res) => {
  const { id } = req.params;
  const { link } = req.body;
  try {
    const newLink = await createUserLink(id, link);
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create link' });
  }
});

// Delete a user link
users.delete('/:id/links/:linkId', async (req, res) => {
  const { id, linkId } = req.params;
  try {
    const deletedLink = await deleteUserLink(linkId);
    res.status(200).json({ message: 'Link deleted successfully', deletedLink });
  } catch (error) {
    res.status(404).json({ error: 'Link not found' });
  }
});

// Check if email exists
users.post('/check-email', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await getUserByEmail(email); // Call the function to check email
    if (user) {
      return res.status(200).json({ exists: true }); // Email exists
    }
    return res.status(404).json({ exists: false }); // Email does not exist
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = users;
