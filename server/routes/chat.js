import express from 'express';
// services.js
import { sequelize } from '../database/db.js';  // Importando corretamente o sequelize
import { createNotification } from './notifications.js';

const router = express.Router();

// Get user's chat history
router.get('/history', (req, res) => {
  try {
    const messages = db.prepare(`
      SELECT m.*,
             CASE 
               WHEN m.sender_id = ? THEN 'sent'
               ELSE 'received'
             END as message_type,
             u.name as sender_name,
             u.profile_image as sender_image
      FROM chat_messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.sender_id = ? OR m.receiver_id = ?
      ORDER BY m.created_at DESC
      LIMIT 100
    `).all(req.user.id, req.user.id, req.user.id);

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get chat messages with specific user
router.get('/messages/:userId', (req, res) => {
  try {
    const messages = db.prepare(`
      SELECT m.*,
             CASE 
               WHEN m.sender_id = ? THEN 'sent'
               ELSE 'received'
             END as message_type,
             u.name as sender_name,
             u.profile_image as sender_image
      FROM chat_messages m
      JOIN users u ON m.sender_id = u.id
      WHERE (m.sender_id = ? AND m.receiver_id = ?)
         OR (m.sender_id = ? AND m.receiver_id = ?)
      ORDER BY m.created_at DESC
      LIMIT 50
    `).all(req.user.id, req.user.id, req.params.userId, req.params.userId, req.user.id);

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Send message
router.post('/send', (req, res) => {
  try {
    const { receiver_id, message } = req.body;

    const result = db.prepare(`
      INSERT INTO chat_messages (sender_id, receiver_id, message)
      VALUES (?, ?, ?)
    `).run(req.user.id, receiver_id, message);

    const newMessage = db.prepare(`
      SELECT m.*,
             u.name as sender_name,
             u.profile_image as sender_image
      FROM chat_messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.id = ?
    `).get(result.lastInsertRowid);

    // Create notification for receiver
    createNotification(
      receiver_id,
      'New Message',
      `You have a new message from ${req.user.name}`,
      'chat',
      `/chat/${req.user.id}`
    );

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark messages as read
router.put('/read/:senderId', (req, res) => {
  try {
    db.prepare(`
      UPDATE chat_messages
      SET is_read = 1
      WHERE sender_id = ? AND receiver_id = ? AND is_read = 0
    `).run(req.params.senderId, req.user.id);

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get unread message count
router.get('/unread', (req, res) => {
  try {
    const result = db.prepare(`
      SELECT COUNT(*) as count
      FROM chat_messages
      WHERE receiver_id = ? AND is_read = 0
    `).get(req.user.id);

    res.json({ count: result.count });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;