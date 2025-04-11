const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');
const File = require('../models/File');
const Notification = require('../models/Notification');

// Change to handle both DELETE and POST requests
router.route('/delete-project-data')
  .delete(handleDeleteProject)
  .post(handleDeleteProject);

// Change to handle both DELETE and POST requests
router.route('/delete-org-data')
  .delete(handleDeleteOrg)
  .post(handleDeleteOrg)
  .get((req, res) => {
    res.status(400).json({ 
      error: "This endpoint requires a POST or DELETE request with a JSON body containing org_id",
      example: { "org_id": "org789" }
    });
  });

// Extract handler function for project deletion
async function handleDeleteProject(req, res) {
  const { org_id, projectId } = req.body;

  if (!org_id || !projectId) {
    return res.status(400).json({ error: 'org_id and projectId are required' });
  }

  console.log(`Attempting to delete data for project: ${projectId} in org: ${org_id}`);
  
  try {
    // First check if we can find the project directly
    const project = await Project.findOne({ org_id, jid: projectId });
    console.log('Project found:', project);
    
    // Try a more flexible query to see what's in the database
    const allProjects = await Project.find({});
    console.log('All projects in database:', allProjects);
    
    // Check if the fields might be different than expected
    const projectsByOrgId = await Project.find({ org_id });
    console.log(`Projects with org_id ${org_id}:`, projectsByOrgId);
    
    // Now proceed with deletion
    const deletionResults = {
      users: (await User.deleteMany({ org_id, jid: projectId })).deletedCount,
      projects: (await Project.deleteMany({ org_id, jid: projectId })).deletedCount,
      tasks: (await Task.deleteMany({ org_id, jid: projectId })).deletedCount,
      files: (await File.deleteMany({ org_id, jid: projectId })).deletedCount,
      notifications: (await Notification.deleteMany({ org_id, jid: projectId })).deletedCount,
    };

    res.json({
      message: `Data for project ID: ${projectId} in org: ${org_id} deleted successfully.`,
      deletedCounts: deletionResults
    });
  } catch (err) {
    console.error('Error deleting project data:', err);
    res.status(500).json({ error: err.message });
  }
}

// Extract handler function for org deletion
async function handleDeleteOrg(req, res) {
  const { org_id } = req.body;

  if (!org_id) {
    return res.status(400).json({ error: 'org_id is required' });
  }

  try {
    const deletionResults = {
      users: (await User.deleteMany({ org_id })).deletedCount,
      projects: (await Project.deleteMany({ org_id })).deletedCount,
      tasks: (await Task.deleteMany({ org_id })).deletedCount,
      files: (await File.deleteMany({ org_id })).deletedCount,
      notifications: (await Notification.deleteMany({ org_id })).deletedCount,
    };

    res.json({
      message: `All data for org: ${org_id} deleted successfully.`,
      deletedCounts: deletionResults
    });
  } catch (err) {
    console.error('Error deleting org data:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = router;