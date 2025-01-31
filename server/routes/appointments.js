// routes/appointments.js
import express from 'express';
import { sequelize } from '../database/db.js'; // Importando corretamente o sequelize

const router = express.Router();

// Get all appointments for a user
router.get('/', (req, res) => {
  try {
    const appointments = db.prepare(`
      SELECT 
        a.*,
        s.name as service_name,
        s.price as service_price,
        b.name as barber_name
      FROM appointments a
      JOIN services s ON a.service_id = s.id
      JOIN barbers b ON a.barber_id = b.id
      WHERE a.client_id = ?
      ORDER BY a.appointment_date DESC
    `).all(req.user.id);

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new appointment
router.post('/', (req, res) => {
  try {
    const { service_id, barber_id, appointment_date } = req.body;

    const result = db.prepare(`
      INSERT INTO appointments (client_id, service_id, barber_id, appointment_date)
      VALUES (?, ?, ?, ?)
    `).run(req.user.id, service_id, barber_id, appointment_date);

    // Add loyalty points
    const service = db.prepare('SELECT points_earned FROM services WHERE id = ?').get(service_id);
    if (service?.points_earned) {
      db.prepare(`
        INSERT INTO loyalty_points (user_id, points, transaction_type, description)
        VALUES (?, ?, 'earned', 'Points from appointment')
      `).run(req.user.id, service.points_earned);
    }

    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel appointment
router.post('/:id/cancel', (req, res) => {
  try {
    const result = db.prepare(`
      UPDATE appointments
      SET status = 'cancelled'
      WHERE id = ? AND client_id = ?
    `).run(req.params.id, req.user.id);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
