require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { checkDatabaseConnection } = require('./config/db');
const habitsRoutes = require('./routes/habits');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/json; charset=utf-8' }));

const PORT = 3000;

app.use('/habits', habitsRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  checkDatabaseConnection();
  console.log(`Server is running on port ${PORT}`);
});
