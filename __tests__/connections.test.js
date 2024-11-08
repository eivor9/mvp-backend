const db = require('../db/dbConfig.js');
const {
  getConnections,
  getOneConnection,
  createConnection,
  updateConnection,
  deleteConnection,
} = require('../queries/connections');

jest.mock('../db/dbConfig.js');

describe('Connections Queries', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getConnections', () => {
    it('should return all connections for a given user ID', async () => {
      const mockConnections = [{ id: 1, mentor_id: 1, mentee_id: 2 }];
      db.any.mockResolvedValue(mockConnections);

      const result = await getConnections(1);
      expect(result).toEqual(mockConnections);
      expect(db.any).toHaveBeenCalledWith('SELECT * FROM connections WHERE mentor_id=$1 OR mentee_id=$1', [1]);
    });

    it('should handle errors', async () => {
      db.any.mockRejectedValue(new Error('Database error'));

      const result = await getConnections(1);
      expect(result).toEqual(new Error('Database error'));
    });
  });

  describe('getOneConnection', () => {
    it('should return a single connection by ID and user ID', async () => {
      const mockConnection = { id: 1, mentor_id: 1, mentee_id: 2 };
      db.one.mockResolvedValue(mockConnection);

      const result = await getOneConnection(1, 1);
      expect(result).toEqual(mockConnection);
      expect(db.one).toHaveBeenCalledWith('SELECT * FROM connections WHERE id=$1 AND (mentor_id=$2 Or mentee_id=$2)', [1, 1]);
    });

    it('should handle errors', async () => {
      db.one.mockRejectedValue(new Error('Database error'));

      const result = await getOneConnection(1, 1);
      expect(result).toEqual(new Error('Database error'));
    });
  });

  describe('createConnection', () => {
    it('should create a new connection', async () => {
      const newConnection = { mentor_id: 1, mentee_id: 2, skill_id: 1, status: 'pending' };
      const mockCreatedConnection = { id: 1, ...newConnection };
      db.one.mockResolvedValue(mockCreatedConnection);

      const result = await createConnection(newConnection);
      expect(result).toEqual(mockCreatedConnection);
      expect(db.one).toHaveBeenCalledWith('INSERT INTO connections (mentor_id, mentee_id, skill_id, status) VALUES($1, $2, $3, $4) RETURNING *', [newConnection.mentor_id, newConnection.mentee_id, newConnection.skill_id, newConnection.status]);
    });

    it('should handle errors', async () => {
      db.one.mockRejectedValue(new Error('Database error'));

      const result = await createConnection({});
      expect(result).toEqual(new Error('Database error'));
    });
  });

  describe('updateConnection', () => {
    it('should update a connection by ID', async () => {
      const updatedConnection = { mentor_id: 1, mentee_id: 2, skill_id: 1, status: 'active', zoom: 'link' };
      const mockUpdatedConnection = { id: 1, ...updatedConnection };
      db.one.mockResolvedValue(mockUpdatedConnection);

      const result = await updateConnection(1, updatedConnection);
      expect(result).toEqual(mockUpdatedConnection);
      expect(db.one).toHaveBeenCalledWith(
        "UPDATE connections SET  mentor_id=$1, mentee_id=$2, skill_id=$3, status=$4, zoom=$5 WHERE id=$6 RETURNING *",
        [updatedConnection.mentor_id, updatedConnection.mentee_id, updatedConnection.skill_id, updatedConnection.status, updatedConnection.zoom, 1]
      );
    });

    it('should handle errors', async () => {
      db.one.mockRejectedValue(new Error('Database error'));

      const result = await updateConnection(1, {});
      expect(result).toEqual(new Error('Database error'));
    });
  });

  describe('deleteConnection', () => {
    it('should delete a connection by ID', async () => {
      const mockDeletedConnection = { id: 1, mentor_id: 1, mentee_id: 2 };
      db.one.mockResolvedValue(mockDeletedConnection);

      const result = await deleteConnection(1);
      expect(result).toEqual(mockDeletedConnection);
      expect(db.one).toHaveBeenCalledWith('DELETE FROM connections WHERE id=$1 RETURNING *', 1);
    });

    it('should handle errors', async () => {
      db.one.mockRejectedValue(new Error('Database error'));

      const result = await deleteConnection(1);
      expect(result).toEqual(new Error('Database error'));
    });
  });
}); 