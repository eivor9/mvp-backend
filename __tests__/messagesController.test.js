const request = require('supertest');
const express = require('express');
const messagesController = require('../controllers/messagesController');
const { getAllMessages, getOneMessage, createMessage, updateMessage, deleteMessage } = require('../queries/messages');

// Mock the queries
jest.mock('../queries/messages');

// Mock socket.io
const mockIo = {
    to: jest.fn().mockReturnThis(),
    emit: jest.fn()
};

// Add these mocks at the top with other mocks
jest.mock('../validations/messagesValidations.js', () => ({
    checkBody: (req, res, next) => {
        if (!req.body.body) {
            return res.status(400).json({ error: 'body is required' });
        }
        next();
    },
    checkSenderId: (req, res, next) => {
        if (!req.body.sender_id) {
            return res.status(400).json({ error: 'sender_id is required' });
        }
        next();
    },
    checkRecipientId: (req, res, next) => {
        if (!req.body.recipient_id) {
            return res.status(400).json({ error: 'recipient_id is required' });
        }
        next();
    },
    checkConnectionId: (req, res, next) => {
        if (!req.body.connection_id) {
            return res.status(400).json({ error: 'connection_id is required' });
        }
        next();
    }
}));

const app = express();
app.use(express.json());
// Mock socket.io middleware
app.set('io', mockIo);
app.use('/connections/:connection_id/messages', messagesController);

describe('Messages Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /', () => {
        it('should return all messages for a connection', async () => {
            const mockMessages = [
                { id: 1, body: 'Test message', sender_id: 1, recipient_id: 2 }
            ];
            getAllMessages.mockResolvedValue(mockMessages);

            const response = await request(app)
                .get('/connections/1/messages');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockMessages);
            expect(getAllMessages).toHaveBeenCalledWith('1');
        });

        it('should handle no messages found', async () => {
            getAllMessages.mockResolvedValue(null);

            const response = await request(app)
                .get('/connections/1/messages');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'No messages found' });
        });

        it('should handle server errors', async () => {
            getAllMessages.mockRejectedValue(new Error('Server error'));

            const response = await request(app)
                .get('/connections/1/messages');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'server error' });
        });
    });

    describe('GET /:id', () => {
        it('should return a specific message', async () => {
            const mockMessage = { id: 1, body: 'Test message' };
            getOneMessage.mockResolvedValue(mockMessage);

            const response = await request(app)
                .get('/connections/1/messages/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockMessage);
        });

        it('should handle message not found', async () => {
            getOneMessage.mockResolvedValue({});

            const response = await request(app)
                .get('/connections/1/messages/999');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Message not found' });
        });
    });

    describe('POST /', () => {
        it('should create a new message and emit socket event', async () => {
            const newMessage = {
                body: 'New message',
                sender_id: 1,
                recipient_id: 2,
                connection_id: '1'
            };
            const mockCreatedMessage = { id: 1, ...newMessage };
            createMessage.mockResolvedValue(mockCreatedMessage);

            const response = await request(app)
                .post('/connections/1/messages')
                .send(newMessage);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockCreatedMessage);
            expect(mockIo.to).toHaveBeenCalledWith('1');
            expect(mockIo.emit).toHaveBeenCalledWith('receiveMessage', mockCreatedMessage);
        });

        it('should handle validation errors', async () => {
            const response = await request(app)
                .post('/connections/1/messages')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('PUT /:id', () => {
        const updatedMessage = {
            body: 'Updated message',
            connection_id: '1'
        };

        it('should update a message and emit socket event', async () => {
            const mockUpdatedMessage = { id: 1, ...updatedMessage };
            updateMessage.mockResolvedValue(mockUpdatedMessage);

            const response = await request(app)
                .put('/connections/1/messages/1')
                .send(updatedMessage);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUpdatedMessage);
            expect(mockIo.to).toHaveBeenCalledWith(updatedMessage.connection_id);
            expect(mockIo.emit).toHaveBeenCalledWith('receiveMessage', mockUpdatedMessage);
        });

        it('should handle validation errors', async () => {
            const response = await request(app)
                .put('/connections/1/messages/1')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('DELETE /:id', () => {
        it('should delete a message', async () => {
            const mockDeletedMessage = { id: 1, body: 'Deleted message' };
            deleteMessage.mockResolvedValue(mockDeletedMessage);

            const response = await request(app)
                .delete('/connections/1/messages/1');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Message successfully deleted');
        });

        it('should handle message not found', async () => {
            deleteMessage.mockResolvedValue({});

            const response = await request(app)
                .delete('/connections/1/messages/999');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Message not found' });
        });
    });
}); 