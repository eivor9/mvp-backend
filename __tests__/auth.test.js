const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../auth/auth');

const app = express();
app.use(express.json());

app.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'You are authenticated' });
});

describe('Authentication Middleware', () => {
  it('should deny access if no token provided', async () => {
    const response = await request(app).get('/protected');
    expect(response.status).toBe(401);
    expect(response.body.error).toBe(
      'Access Denied. No token provided'
    );
  });

  it('should deny access if invalid token provided', async () => {
    const token = jwt.sign({ user: 'fakeuser' }, 'wrongsecret');
    const response = await request(app)
      .get('/protected')
      .set('Authorization', token);

    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Invalid token.');
  });

  it('should allow access if valid token provided', async () => {
    const user = { id: 1, name: 'Test User' };
    const token = jwt.sign(user, process.env.SECRET);
    const response = await request(app)
      .get('/protected')
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('You are authenticated');
  });
});
