const { getAllMetrics, getMetric, createMetric, deleteMetric, updateMetric, getMetricsByConnectionAndSkillId } = require('../queries/metrics');

// Mock the database configuration
jest.mock('../db/dbConfig.js', () => ({
  one: jest.fn(),
  any: jest.fn()
}));

const db = require('../db/dbConfig.js');

describe('Metrics Queries', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllMetrics', () => {
    it('should return all metrics for a connection', async () => {
      const mockMetrics = [
        { id: 1, name: 'Metric 1', progress: 80 },
        { id: 2, name: 'Metric 2', progress: 60 }
      ];
      
      db.any.mockResolvedValue(mockMetrics);
      
      const result = await getAllMetrics(1);
      expect(result).toEqual(mockMetrics);
      expect(db.any).toHaveBeenCalledWith('SELECT * FROM metrics WHERE connection_id=$1', [1]);
    });

    it('should handle errors when getting all metrics', async () => {
      const error = new Error('Database error');
      db.any.mockRejectedValue(error);
      
      const result = await getAllMetrics(1);
      expect(result).toEqual(error);
    });
  });

  describe('getMetricsByConnectionAndSkillId', () => {
    it('should return metrics filtered by connection_id and skill_id', async () => {
      const mockMetrics = [
        { id: 1, name: 'Metric 1', progress: 80, connection_id: 1, skill_id: 1 }
      ];
      
      db.any.mockResolvedValue(mockMetrics);
      
      const result = await getMetricsByConnectionAndSkillId(1, 1);
      expect(result).toEqual(mockMetrics);
      expect(db.any).toHaveBeenCalledWith(
        'SELECT * FROM metrics WHERE connection_id=$1 AND skill_id=$2',
        [1, 1]
      );
    });
  });

  describe('getMetric', () => {
    it('should return a single metric by id', async () => {
      const mockMetric = { id: 1, name: 'Metric 1', progress: 80 };
      db.one.mockResolvedValue(mockMetric);
      
      const result = await getMetric(1);
      expect(result).toEqual(mockMetric);
      expect(db.one).toHaveBeenCalledWith('SELECT * FROM metrics WHERE id=$1', 1);
    });
  });

  describe('createMetric', () => {
    it('should create a new metric', async () => {
      const newMetric = {
        name: 'New Metric',
        progress: 0,
        skill_id: 1,
        connection_id: 1
      };
      
      const mockCreatedMetric = { id: 1, ...newMetric };
      db.one.mockResolvedValue(mockCreatedMetric);
      
      const result = await createMetric(newMetric);
      expect(result).toEqual(mockCreatedMetric);
      expect(db.one).toHaveBeenCalledWith(
        'INSERT INTO metrics (name, progress, skill_id, connection_id) VALUES($1, $2, $3, $4) RETURNING *',
        [newMetric.name, newMetric.progress, newMetric.skill_id, newMetric.connection_id]
      );
    });
  });

  describe('deleteMetric', () => {
    it('should delete a metric', async () => {
      const mockDeletedMetric = { id: 1, name: 'Deleted Metric' };
      db.one.mockResolvedValue(mockDeletedMetric);
      
      const result = await deleteMetric(1);
      expect(result).toEqual(mockDeletedMetric);
      expect(db.one).toHaveBeenCalledWith('DELETE FROM metrics WHERE id=$1 RETURNING *', 1);
    });
  });

  describe('updateMetric', () => {
    it('should update a metric', async () => {
      const updatedData = {
        name: 'Updated Metric',
        progress: 90
      };
      
      const mockUpdatedMetric = { id: 1, ...updatedData };
      db.one.mockResolvedValue(mockUpdatedMetric);
      
      const result = await updateMetric(1, updatedData);
      expect(result).toEqual(mockUpdatedMetric);
      expect(db.one).toHaveBeenCalledWith(
        'UPDATE metrics SET name=$1, progress=$2 WHERE id=$3 RETURNING *',
        [updatedData.name, updatedData.progress, 1]
      );
    });
  });
}); 