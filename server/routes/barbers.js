import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get all barbers
router.get('/', (req, res) => {
  try {
    const barbers = db.prepare(`
      SELECT 
        b.*,
        u.name,
        u.email,
        u.profile_image
      FROM barbers b
      JOIN users u ON b.user_id = u.id
      WHERE u.role = 'barber'
    `).all();

    res.json(barbers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get barber availability
router.get('/:id/availability', (req, res) => {
  try {
    const { date } = req.query;
    const slots = db.prepare(`
      SELECT * FROM time_slots
      WHERE barber_id = ?
      AND DATE(start_time) = DATE(?)
      AND is_available = 1
      ORDER BY start_time
    `).all(req.params.id, date);

    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get barber schedule
router.get('/:id/schedule', (req, res) => {
  try {
    const schedule = db.prepare(`
      SELECT * FROM barber_schedule
      WHERE barber_id = ?
      ORDER BY day_of_week
    `).all(req.params.id);

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update barber availability
router.put('/:id/availability', (req, res) => {
  try {
    const { is_available } = req.body;
    
    db.prepare(`
      UPDATE barbers
      SET is_available = ?
      WHERE id = ?
    `).run(is_available, req.params.id);

    res.json({ message: 'Availability updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;