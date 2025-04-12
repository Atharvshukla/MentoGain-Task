const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Mentorgain',
  password: 'atharv', 
  port: 5432,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");

    // Step 1: Create Tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        org_id TEXT,
        project_id TEXT
      );

      CREATE TABLE IF NOT EXISTS Projects (
        id SERIAL PRIMARY KEY,
        title TEXT,
        org_id TEXT,
        project_id TEXT
      );

      CREATE TABLE IF NOT EXISTS Tasks (
        id SERIAL PRIMARY KEY,
        title TEXT,
        org_id TEXT,
        project_id TEXT
      );

      CREATE TABLE IF NOT EXISTS Files (
        id SERIAL PRIMARY KEY,
        filename TEXT,
        org_id TEXT,
        project_id TEXT
      );

      CREATE TABLE IF NOT EXISTS Notifications (
        id SERIAL PRIMARY KEY,
        message TEXT,
        org_id TEXT,
        project_id TEXT
      );
    `);
    console.log("✅ Tables created or already exist.");

    // Step 2: Seed Dummy Data
    await client.query(`
      DELETE FROM Users; DELETE FROM Projects; DELETE FROM Tasks;
      DELETE FROM Files; DELETE FROM Notifications;

      INSERT INTO Users (name, email, org_id, project_id) VALUES
      ('Atharv', 'a@a.com', 'org123', 'proj001'),
      ('User2', 'b@b.com', 'org123', 'proj002'),
      ('User3', 'c@c.com', 'org789', 'proj004');

      INSERT INTO Projects (title, org_id, project_id) VALUES
      ('Proj 1', 'org123', 'proj001'),
      ('Proj 2', 'org123', 'proj002'),
      ('Proj 3', 'org789', 'proj004');

      INSERT INTO Tasks (title, org_id, project_id) VALUES
      ('Task A', 'org123', 'proj001'),
      ('Task B', 'org123', 'proj002'),
      ('Task C', 'org789', 'proj004');

      INSERT INTO Files (filename, org_id, project_id) VALUES
      ('file1.pdf', 'org123', 'proj001'),
      ('file2.pdf', 'org123', 'proj002'),
      ('file3.pdf', 'org789', 'proj004');

      INSERT INTO Notifications (message, org_id, project_id) VALUES
      ('Msg A', 'org123', 'proj001'),
      ('Msg B', 'org123', 'proj002'),
      ('Msg C', 'org789', 'proj004');
    `);
    console.log("✅ Dummy data inserted.");

    // Step 3: Delete Data
    const org_id = 'org789';
    const project_id = 'proj004';
    const deleteProjectOnly = true;

    const tables = ['Users', 'Projects', 'Tasks', 'Files', 'Notifications'];
    const deleteCounts = {};

    console.log("\n=== Deletion Process Started ===");
    for (const table of tables) {
      let res;
      if (deleteProjectOnly) {
        res = await client.query(
          `DELETE FROM ${table} WHERE org_id = $1 AND project_id = $2`,
          [org_id, project_id]
        );
      } else {
        res = await client.query(
          `DELETE FROM ${table} WHERE org_id = $1`,
          [org_id]
        );
      }
      deleteCounts[table] = res.rowCount;
      console.log(`Deleted ${res.rowCount} row(s) from ${table}`);
    }

    console.log("\n=== Deletion Summary ===");
    console.table(deleteCounts);

    console.log("✅ Data deletion completed successfully.");

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await client.end();
    console.log("🔌 Connection closed.");
  }
}

run();
