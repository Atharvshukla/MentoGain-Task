const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  file_name: String,
  file_url: String,
  uploaded_by: String,
  org_id: String,
  jid: String,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
