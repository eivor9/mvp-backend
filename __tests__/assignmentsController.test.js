const request = require('supertest');
const app = require('../app'); // Ensure this path is correct to import your Express app
jest.mock('../queries/assignments');
const { getAllAssignments, deleteAssignment, getOneAssignment, updateAssignment, createAssignment } = require('../queries/assignments');

describe('Assignments Controller', () => {
  describe('GET /users/:user_id/connections/:connection_id/assignments', () => {
    it('should return all assignments for a connection', async () => {
      getAllAssignments.mockImplementation(() => Promise.resolve([{ id: 1, name: 'Assignment 1' }]));
      const response = await request(app).get('/users/1/connections/1/assignments');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    it('should handle server errors', async () => {
      getAllAssignments.mockImplementation(() => Promise.reject(new Error('Database error')));
      const response = await request(app).get('/users/1/connections/1/assignments');
      expect(response.status).toBe(500);
    });
  });

  describe('GET /users/:user_id/connections/:connection_id/assignments/metric/:metric_id', () => {
    it('should return assignments filtered by metric_id', async () => {
      const { getAssignmentsByConnectionIdAndMetricId } = require('../queries/assignments');
      getAssignmentsByConnectionIdAndMetricId.mockImplementation(() => Promise.resolve([
        { id: 1, name: 'Assignment 1', connection_id: 1, metric_id: 2 },
        { id: 2, name: 'Assignment 2', connection_id: 1, metric_id: 2 }
      ]));

      const response = await request(app).get('/users/1/connections/1/assignments/metric/2');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0); 
    });
  });

  describe('POST /users/:user_id/connections/:connection_id/assignments', () => {
    it('should create a new assignment', async () => {
      createAssignment.mockImplementation(() => Promise.resolve({ id: 1, name: 'New Assignment' }));
      const newAssignment = {
        name: 'New Assignment',
        connection_id: 1,
        metric_id: 2
      };
      const response = await request(app)
        .post('/users/1/connections/1/assignments')
        .send(newAssignment);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('DELETE /users/:user_id/connections/:connection_id/assignments/:id', () => {
    it('should delete an assignment', async () => {
      deleteAssignment.mockImplementation(() => Promise.resolve({ id: 3 }));
      const response = await request(app).delete('/users/1/connections/1/assignments/3');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('GET /users/:user_id/connections/:connection_id/assignments/:id', () => {
    it('should return a single assignment', async () => {
      getOneAssignment.mockImplementation(() => Promise.resolve({ id: 1, name: 'Assignment 1' }));
      const response = await request(app).get('/users/1/connections/1/assignments/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('assignment');
    });

    it('should handle not found for single assignment', async () => {
      getOneAssignment.mockImplementation(() => Promise.resolve(null));
      const response = await request(app).get('/users/1/connections/1/assignments/999');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /users/:user_id/connections/:connection_id/assignments/:id', () => {
    it('should update an assignment', async () => {
      updateAssignment.mockImplementation(() => Promise.resolve({ id: 1, name: 'Updated Assignment' }));
      const updatedAssignment = {
        name: 'Updated Assignment',
        connection_id: 1,
        metric_id: 2
      };
      const response = await request(app)
        .put('/users/1/connections/1/assignments/1')
        .send(updatedAssignment);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });

    it('should handle not found on update', async () => {
      updateAssignment.mockImplementation(() => Promise.resolve(null));
      const updatedAssignment = {
        name: 'Nonexistent Assignment',
        connection_id: 1,
        metric_id: 2
      };
      const response = await request(app)
        .put('/users/1/connections/1/assignments/999')
        .send(updatedAssignment);
      expect(response.status).toBe(404);
    });
  });
});
