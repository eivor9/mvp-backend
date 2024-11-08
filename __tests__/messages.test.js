const db = require('../db/dbConfig.js');
const {
  getAllMessages,
  getOneMessage,
  createMessage,
  deleteMessage,
  updateMessage,
} = require('../queries/messages');

// Mock the database
jest.mock('../db/dbConfig.js');

describe('Messages Queries', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllMessages', () => {
    it('should return all messages for a connection', async () => {
      const mockMessages = [
        { id: 1, body: 'Hello', sender_id: 1, recipient_id: 2, connection_id: 1 },
        { id: 2, body: 'Hi', sender_id: 2, recipient_id: 1, connection_id: 1 }
      ];
      db.any.mockResolvedValue(mockMessages);

      const result = await getAllMessages(1);
      expect(result).toEqual(mockMessages);
      expect(db.any).toHaveBeenCalledWith(
        'SELECT * FROM messages WHERE connection_id=$1 ORDER BY time_sent',
        1
      );
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      db.any.mockRejectedValue(error);

      const result = await getAllMessages(1);
      expect(result).toEqual(error);
    });
  });

  describe('getOneMessage', () => {
    it('should return a specific message', async () => {
      const mockMessage = { 
        id: 1, 
        body: 'Hello', 
        sender_id: 1, 
        recipient_id: 2, 
        connection_id: 1 
      };
      db.one.mockResolvedValue(mockMessage);

      const result = await getOneMessage(1);
      expect(result).toEqual(mockMessage);
      expect(db.one).toHaveBeenCalledWith(
        'SELECT * FROM messages WHERE id=$1',
        1
      );
    });

    it('should handle errors', async () => {
      const error = new Error('Message not found');
      db.one.mockRejectedValue(error);

      const result = await getOneMessage(999);
      expect(result).toEqual(error);
    });
  });

  describe('createMessage', () => {
    it('should create a new message', async () => {
      const newMessage = {
        body: 'New message',
        sender_id: 1,
        recipient_id: 2,
        connection_id: 1
      };
      const mockCreatedMessage = { id: 1, ...newMessage };
      db.one.mockResolvedValue(mockCreatedMessage);

      const result = await createMessage(newMessage);
      expect(result).toEqual(mockCreatedMessage);
      expect(db.one).toHaveBeenCalledWith(
        'INSERT INTO messages (body, sender_id, recipient_id, connection_id) VALUES($1, $2, $3, $4) RETURNING *',
        [newMessage.body, newMessage.sender_id, newMessage.recipient_id, newMessage.connection_id]
      );
    });

    it('should handle errors', async () => {
      const error = new Error('Invalid message data');
      db.one.mockRejectedValue(error);

      const result = await createMessage({});
      expect(result).toEqual(error);
    });
  });

  describe('updateMessage', () => {
    it('should update a message', async () => {
      const updatedMessage = { body: 'Updated message' };
      const mockUpdatedMessage = { id: 1, ...updatedMessage };
      db.one.mockResolvedValue(mockUpdatedMessage);

      const result = await updateMessage(1, updatedMessage);
      expect(result).toEqual(mockUpdatedMessage);
      expect(db.one).toHaveBeenCalledWith(
        'UPDATE messages SET body=$1 WHERE id=$2 RETURNING *',
        [updatedMessage.body, 1]
      );
    });

    it('should handle errors', async () => {
      const error = new Error('Message not found');
      db.one.mockRejectedValue(error);

      const result = await updateMessage(999, { body: 'test' });
      expect(result).toEqual(error);
    });
  });
}); 