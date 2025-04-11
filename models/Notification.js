const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: String,
  type: { type: String, enum: ['Task', 'Project', 'System'] },
  recipient: String,
  org_id: String,
  jid: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
