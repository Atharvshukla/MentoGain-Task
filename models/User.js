const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ['Admin', 'Manager', 'Developer'] },
  org_id: String,
  jid: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
