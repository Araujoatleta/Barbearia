import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get all active promotions
router.get('/', (req, res) => {
  try {
    const promotions = db.prepare(`
      SELECT *
      FROM promotions
      WHERE is_active = 1
        AND start_date <= date('now')
        AND end_date >= date('now')
        AND (min_loyalty_level IS NULL OR min_loyalty_level <= ?)
      ORDER BY end_date ASC
    `).all(req.user.loyalty_level);

    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create promotion (admin only)
router.post('/', (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const {
      name,
      description,
      discount_type,
      discount_value,
      start_date,
      end_date,
      min_loyalty_level
    } = req.body;

    const result = db.prepare(`
      INSERT INTO promotions (
        name, description, discount_type, discount_value,
        start_date, end_date, min_loyalty_level
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      name,
      description,
      discount_type,
      discount_value,
      start_date,
      end_date,
      min_loyalty_level
    );

    const newPromotion = db.prepare('SELECT * FROM promotions WHERE id = ?')
      .get(result.lastInsertRowid);

    res.status(201).json(newPromotion);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update promotion (admin only)
router.put('/:id', (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const {
      name,
      description,
      discount_type,
      discount_value,
      start_date,
      end_date,
      min_loyalty_level,
      is_active
    } = req.body;

    db.prepare(`
      UPDATE promotions
      SET name = ?, description = ?, discount_type = ?,
          discount_value = ?, start_date = ?, end_date = ?,
          min_loyalty_level = ?, is_active = ?
      WHERE id = ?
    `).run(
      name,
      description,
      discount_type,
      discount_value,
      start_date,
      end_date,
      min_loyalty_level,
      is_active,
      req.params.id
    );

    const updatedPromotion = db.prepare('SELECT * FROM promotions WHERE id = ?')
      .get(req.params.id);

    res.json(updatedPromotion);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete promotion (admin only)
router.delete('/:id', (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    db.prepare('UPDATE promotions SET is_active = 0 WHERE id = ?')
      .run(req.params.id);

    res.json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;