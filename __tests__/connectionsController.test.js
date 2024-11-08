// tests/connectionsController.test.js

// Mock pg-promise before any other imports
jest.mock('pg-promise', () => {
    return () => {
        return () => ({
            // Mock database methods used in tests
            one: jest.fn(),
            any: jest.fn(),
            none: jest.fn()
        });
    };
});

const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const connectionsController = require('../controllers/connectionsController');
const { getConnections, getOneConnection, createConnection, updateConnection, deleteConnection } = require('../queries/connections');
const { createMetric } = require('../queries/metrics');

// Mock user for authentication
const mockUser = { id: 1 };

// Mock the queries
jest.mock('../queries/connections');
jest.mock('../queries/metrics');

// Mock the auth middleware
jest.mock('../auth/auth', () => ({
    authenticateToken: (req, res, next) => {
        req.user = mockUser;
        req.params.user_id = mockUser.id;
        next();
    }
}));

const app = express();
app.use(express.json());
app.use('/connections', connectionsController);

describe('Connections Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.setTimeout(30000); // Increase timeout to 30 seconds
    });

    describe('GET /', () => {
        it('should return all connections for a user', async () => {
            const mockConnections = [
                { id: 1, mentor_id: 1, mentee_id: 2 },
                { id: 2, mentor_id: 1, mentee_id: 3 }
            ];
            getConnections.mockResolvedValue(mockConnections);

            const response = await request(app).get('/connections');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockConnections);
            expect(getConnections).toHaveBeenCalledWith(mockUser.id);
        });

        it('should return empty array when no connections found', async () => {
            getConnections.mockResolvedValue([]);

            const response = await request(app).get('/connections');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });

    describe('GET /:id', () => {
        it('should return a specific connection', async () => {
            const mockConnection = { id: 1, mentor_id: 1, mentee_id: 2 };
            getOneConnection.mockResolvedValue(mockConnection);

            const response = await request(app).get('/connections/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockConnection);
        });

        it('should handle connection not found', async () => {
            getOneConnection.mockResolvedValue({});

            const response = await request(app).get('/connections/999');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'server error' });
        });
    });

    describe('POST /', () => {
        it('should create a new connection with metrics', async () => {
            const newConnection = {
                mentor_id: 1,
                mentee_id: 2,
                skill_id: 1
            };
            const mockCreatedConnection = { id: 1, ...newConnection };
            createConnection.mockResolvedValue(mockCreatedConnection);
            createMetric.mockResolvedValue({ id: 1, name: 'Test Metric' });

            const response = await request(app)
                .post('/connections')
                .send(newConnection);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCreatedConnection);
            expect(createMetric).toHaveBeenCalledTimes(3);
        });

        it('should handle validation errors', async () => {
            const response = await request(app)
                .post('/connections')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('PUT /:id', () => {
        it('should update a connection', async () => {
            const updatedConnection = {
                mentor_id: 1,
                mentee_id: 2,
                skill_id: 1
            };
            const mockUpdatedConnection = { id: 1, ...updatedConnection };
            updateConnection.mockResolvedValue(mockUpdatedConnection);

            const response = await request(app)
                .put('/connections/1')
                .send(updatedConnection);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUpdatedConnection);
        });

        it('should handle validation errors', async () => {
            const response = await request(app)
                .put('/connections/1')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('DELETE /:id', () => {
        it('should delete a connection', async () => {
            const mockDeletedConnection = { id: 1, mentor_id: 1, mentee_id: 2 };
            deleteConnection.mockResolvedValue(mockDeletedConnection);

            const response = await request(app)
                .delete('/connections/1');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Connection successfully deleted');
        });

        it('should handle connection not found', async () => {
            deleteConnection.mockResolvedValue({});

            const response = await request(app)
                .delete('/connections/999');

            expect(response.status).toBe(404);
            expect(response.body).toBe('Connection not found');
        });
    });
});
