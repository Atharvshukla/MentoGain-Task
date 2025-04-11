const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');
const File = require('./models/File');
const Notification = require('./models/Notification');

dotenv.config();

const org_id = 'org789';

const projectIds = ['proj001', 'proj002', 'proj003', 'proj004', 'proj005'];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB for Seeding');

  // Clear existing data
  await Promise.all([
    User.deleteMany({ org_id }),
    Project.deleteMany({ org_id }),
    Task.deleteMany({ org_id }),
    File.deleteMany({ org_id }),
    Notification.deleteMany({ org_id }),
  ]);

  for (let i = 0; i < projectIds.length; i++) {
    const jid = projectIds[i];

    await Project.create({
      title: `Project ${i + 1}`,
      description: `Description for Project ${i + 1}`,
      status: ['Active', 'Completed', 'On Hold'][i % 3],
      org_id,
      jid,
      startDate: new Date(`2023-0${i + 1}-01`),
      endDate: new Date(`2023-0${i + 1}-28`)
    });

    await User.insertMany([
      {
        name: `Alice P${i + 1}`,
        email: `alice${i + 1}@example.com`,
        role: 'Admin',
        org_id,
        jid
      },
      {
        name: `Bob P${i + 1}`,
        email: `bob${i + 1}@example.com`,
        role: 'Developer',
        org_id,
        jid
      }
    ]);

    await Task.insertMany([
      {
        task_name: `Task A for P${i + 1}`,
        description: `Work A for project ${jid}`,
        assigned_to: `alice${i + 1}@example.com`,
        due_date: new Date(`2024-04-${10 + i}`),
        status: 'Pending',
        org_id,
        jid
      },
      {
        task_name: `Task B for P${i + 1}`,
        description: `Work B for project ${jid}`,
        assigned_to: `bob${i + 1}@example.com`,
        due_date: new Date(`2024-04-${15 + i}`),
        status: 'In Progress',
        org_id,
        jid
      }
    ]);

    await File.insertMany([
      {
        file_name: `fileA_P${i + 1}.pdf`,
        file_url: `https://fileserver.com/fileA_P${i + 1}.pdf`,
        uploaded_by: `alice${i + 1}@example.com`,
        org_id,
        jid
      },
      {
        file_name: `fileB_P${i + 1}.docx`,
        file_url: `https://fileserver.com/fileB_P${i + 1}.docx`,
        uploaded_by: `bob${i + 1}@example.com`,
        org_id,
        jid
      }
    ]);

    await Notification.insertMany([
      {
        message: `Project ${jid} initialized`,
        type: 'Project',
        recipient: `alice${i + 1}@example.com`,
        org_id,
        jid
      },
      {
        message: `Task A is due for project ${jid}`,
        type: 'Task',
        recipient: `bob${i + 1}@example.com`,
        org_id,
        jid
      }
    ]);
  }

  console.log('✅ Seeded 5 full project records successfully');
  mongoose.disconnect();
}
//ass
seed().catch((err) => {
  console.error('❌ Seeding error:', err);
  mongoose.disconnect();
});
