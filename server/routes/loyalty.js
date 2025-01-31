import express from 'express';
// services.js
import { sequelize } from '../database/db.js';  // Importando corretamente o sequelize

const router = express.Router();

// Get user's loyalty points
router.get('/points', (req, res) => {
  try {
    const points = db.prepare(`
      SELECT SUM(points) as total_points
      FROM loyalty_points
      WHERE user_id = ?
    `).get(req.user.id);

    res.json({ points: points.total_points || 0 });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get points history
router.get('/history', (req, res) => {
  try {
    const history = db.prepare(`
      SELECT *
      FROM loyalty_points
      WHERE user_id = ?
      ORDER BY created_at DESC
    `).all(req.user.id);

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update loyalty level
router.put('/level', (req, res) => {
  try {
    const { level } = req.body;
    
    db.prepare(`
      UPDATE users
      SET loyalty_level = ?
      WHERE id = ?
    `).run(level, req.user.id);

    res.json({ message: 'Loyalty level updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;