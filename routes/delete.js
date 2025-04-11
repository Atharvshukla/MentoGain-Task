const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');
const File = require('../models/File');
const Notification = require('../models/Notification');

router.post('/delete-project-data', async (req, res) => {
  const { org_id, projectId } = req.body;

  try {
    await Promise.all([
      User.deleteMany({ org_id, jid: projectId }),
      Project.deleteMany({ org_id, jid: projectId }),
      Task.deleteMany({ org_id, jid: projectId }),
      File.deleteMany({ org_id, jid: projectId }),
      Notification.deleteMany({ org_id, jid: projectId }),
    ]);

    res.json({ message: `Data for project ID: ${projectId} in org: ${org_id} deleted successfully.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
