const db = require('../db/dbConfig.js');
const {
  getAllAssignments,
  getAssignmentsByConnectionIdAndMetricId,
  getOneAssignment,
  createAssignment,
  deleteAssignment,
  updateAssignment,
} = require('../queries/assignments');

jest.mock('../db/dbConfig.js');

describe('Assignments Queries', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllAssignments', () => {
    it('should return all assignments for a given connection ID', async () => {
      const mockAssignments = [{ id: 1, name: 'Assignment 1' }];
      db.any.mockResolvedValue(mockAssignments);

      const result = await getAllAssignments(1);
      expect(result).toEqual(mockAssignments);
      expect(db.any).toHaveBeenCalledWith("SELECT * FROM assignments WHERE connection_id=$1", [1]);
    });

    it('should handle errors', async () => {
      db.any.mockRejectedValue(new Error('Database error'));

      const result = await getAllAssignments(1);
      expect(result).toEqual(new Error('Database error'));
    });
  });

  describe('getAssignmentsByConnectionIdAndMetricId', () => {
    it('should return assignments filtered by connection ID and metric ID', async () => {
      const mockAssignments = [{ id: 1, name: 'Assignment 1' }];
      db.any.mockResolvedValue(mockAssignments);

      const result = await getAssignmentsByConnectionIdAndMetricId(1, 2);
      expect(result).toEqual(mockAssignments);
      expect(db.any).toHaveBeenCalledWith('SELECT * FROM assignments WHERE connection_id=$1 AND metric_id=$2', [1, 2]);
    });

    it('should handle errors', async () => {
      db.any.mockRejectedValue(new Error('Database error'));

      const result = await getAssignmentsByConnectionIdAndMetricId(1, 2);
      expect(result).toEqual(new Error('Database error'));
    });
  });

  describe('getOneAssignment', () => {
    it('should return a single assignment by ID', async () => {
      const mockAssignment = { id: 1, name: 'Assignment 1' };
      db.one.mockResolvedValue(mockAssignment);

      const result = await getOneAssignment(1);
      expect(result).toEqual(mockAssignment);
      expect(db.one).toHaveBeenCalledWith("SELECT * FROM assignments WHERE id=$1", [1]);
    });

    it('should handle errors', async () => {
      db.one.mockRejectedValue(new Error('Database error'));

      const result = await getOneAssignment(1);
      expect(result).toEqual(new Error('Database error'));
    });
  });

  describe('createAssignment', () => {
    it('should create a new assignment', async () => {
      const newAssignment = { name: 'New Assignment', body: 'Description', metric_id: 1, due_date: '2023-12-31', is_completed: false, connection_id: 1 };
      const mockCreatedAssignment = { id: 1, ...newAssignment };
      db.one.mockResolvedValue(mockCreatedAssignment);

      const result = await createAssignment(newAssignment);
      expect(result).toEqual(mockCreatedAssignment);
      expect(db.one).toHaveBeenCalledWith("INSERT INTO assignments (name, body, metric_id, due_date, is_completed, connection_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [newAssignment.name, newAssignment.body, newAssignment.metric_id, newAssignment.due_date, newAssignment.is_completed, newAssignment.connection_id]);
    });

    it('should handle errors', async () => {
      db.one.mockRejectedValue(new Error('Database error'));

      const result = await createAssignment({});
      expect(result).toEqual(new Error('Database error'));
    });
  });

  describe('deleteAssignment', () => {
    it('should delete an assignment by ID', async () => {
      const mockDeletedAssignment = { id: 1, name: 'Deleted Assignment' };
      db.one.mockResolvedValue(mockDeletedAssignment);

      const result = await deleteAssignment(1);
      expect(result).toEqual(mockDeletedAssignment);
      expect(db.one).toHaveBeenCalledWith("DELETE FROM assignments WHERE id=$1 RETURNING *", [1]);
    });

    it('should handle errors', async () => {
      db.one.mockRejectedValue(new Error('Database error'));

      const result = await deleteAssignment(1);
      expect(result).toEqual(new Error('Database error'));
    });
  });

  describe('updateAssignment', () => {
    it('should update an assignment by ID', async () => {
      const updatedAssignment = { name: 'Updated Assignment', body: 'Updated Description', metric_id: 1, due_date: '2023-12-31', is_completed: true, connection_id: 1 };
      const mockUpdatedAssignment = { id: 1, ...updatedAssignment };
      db.one.mockResolvedValue(mockUpdatedAssignment);

      const result = await updateAssignment(1, updatedAssignment);
      expect(result).toEqual(mockUpdatedAssignment);
      expect(db.one).toHaveBeenCalledWith("UPDATE assignments SET name=$1, body=$2, metric_id=$3, due_date=$4, is_completed=$5, connection_id=$6 WHERE id=$7 RETURNING *", [updatedAssignment.name, updatedAssignment.body, updatedAssignment.metric_id, updatedAssignment.due_date, updatedAssignment.is_completed, updatedAssignment.connection_id, 1]);
    });

    it('should handle errors', async () => {
      db.one.mockRejectedValue(new Error('Database error'));

      const result = await updateAssignment(1, {});
      expect(result).toEqual(new Error('Database error'));
    });
  });
});
