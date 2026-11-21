const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// GET all admin notifications (with unread count)
router.get('/', authenticateToken, requireAdmin, (req, res) => {
  try {
    const notifications = db.getNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;
    res.json({
      notifications,
      unreadCount
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve notifications.' });
  }
});

// PATCH mark all notifications as read
router.patch('/mark-all-read', authenticateToken, requireAdmin, (req, res) => {
  try {
    const notifications = db.markAllNotificationsRead();
    res.json({
      message: 'All notifications marked as read.',
      notifications,
      unreadCount: 0
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update notifications.' });
  }
});

// PATCH mark a specific notification as read
router.patch('/:id/read', authenticateToken, requireAdmin, (req, res) => {
  try {
    const notif = db.markNotificationRead(req.params.id);
    if (!notif) return res.status(404).json({ message: 'Notification not found.' });
    const notifications = db.getNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;
    res.json({ message: 'Notification marked as read.', notif, unreadCount });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update notification.' });
  }
});

// DELETE clear all notifications
router.delete('/clear-all', authenticateToken, requireAdmin, (req, res) => {
  try {
    db.clearAllNotifications();
    res.json({ message: 'All notifications cleared.', notifications: [], unreadCount: 0 });
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear notifications.' });
  }
});

// DELETE a notification
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    const removed = db.deleteNotification(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Notification not found.' });
    res.json({ message: 'Notification dismissed.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete notification.' });
  }
});

module.exports = router;
