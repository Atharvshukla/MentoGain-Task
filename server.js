const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const deleteRoute = require('./routes/delete');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Error:', err));

app.use('/api', deleteRoute);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
