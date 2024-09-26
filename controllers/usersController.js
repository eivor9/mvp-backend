// controllers/usersController.js

// DEPENDENCIES
const express = require('express');
const users = express.Router();

// QUERIES
const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../queries/users.js');

// CONNECTIONS
const connectionsController = require('./connectionsController.js');
users.use('/:user_id/connections', connectionsController);

// INDEX
users.get('/', async (req, res) => {
  const allUsers = await getAllUsers();
  if (allUsers.length) {
    res.status(200).json(allUsers);
  } else {
    res.status(404).json({ error: 'server error' });
  }
});

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

// CREATE
users.post('/', async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).json({ error: 'user not created' });
  }
});

// DELETE
users.delete('/:id', async (req, res) => {
  const { id } = req.params;
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
users.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await updateUser(req.body, id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

module.exports = users;
