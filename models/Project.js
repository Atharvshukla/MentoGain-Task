const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['Active', 'Completed', 'On Hold'] },
  org_id: String,
  jid: String,
  startDate: Date,
  endDate: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', projectSchema);
