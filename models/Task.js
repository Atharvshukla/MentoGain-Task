const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task_name: String,
  description: String,
  assigned_to: String,
  due_date: Date,
  status: { type: String, enum: ['Pending', 'In Progress', 'Done'] },
  org_id: String,
  jid: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);
