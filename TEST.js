// require('dotenv').config();
// const express = require('express');
// const app = express();
// const router = express.Router();
// const sql = require('mssql');
// const bodyParser = require('body-parser');
// var cors = require('cors');
// const bcrypt = require('bcrypt');

// app.use(cors());
// app.use(bodyParser.json());

// // Define MSSQL connection configuration
// const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: process.env.DB_SERVER,
//   database: process.env.DB_DATABASE,
//   options: {
//     trustServerCertificate: true,
//     trustedConnection: false,
//     enableArithAbort: true,
//     encrypt: true,
//     instancename: process.env.DB_INSTANCE,
//   },
//   port: parseInt(process.env.DB_PORT),
// };

// // Function to check database connection
// async function checkDatabaseConnection() {
//   try {
//     const pool = await sql.connect(config);
//     console.log('Database connected successfully');
//   } catch (err) {
//     console.error('Failed to connect to database:', err);
//   }
// }

// // Start the server and check database connection
// const PORT = 3000;
// app.listen(PORT, () => {
//   checkDatabaseConnection();
//   console.log(`Server is running on port ${PORT}`);
// });

// // Endpoints

// // POST
// app.post('/habits', async (req, res) => {
//   try {
//     const { title, color, repeatMode, reminder } = req.body;

//     // Connect to the database
//     let pool = await sql.connect(config);

//     // Insert the new habit
//     const result = await pool.request()
//       .input('title', sql.VarChar, title)
//       .input('color', sql.VarChar, color)
//       .input('repeatMode', sql.VarChar, repeatMode)
//       .input('reminder', sql.Bit, reminder)
//       .query(`
//         INSERT INTO Habits (title, color, repeatMode, reminder)
//         OUTPUT inserted.*
//         VALUES (@title, @color, @repeatMode, @reminder)
//       `);

//     // Return the newly created habit
//     res.status(200).json(result.recordset[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error });
//   }
// });

// // GET
// app.get('/habits', async (req, res) => {
//   try {
//     let pool = await sql.connect(config);
//     const result = await pool.request().query(`SELECT * FROM Habits`);
//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error });
//   }
// });

// // DELETE
// app.delete('/habits/:habitId', async (req, res) => {
//   try {
//     const { habitId } = req.params;

//     // Connect to the database
//     await sql.connect(config);

//     // Delete the habit
//     const result = await sql.query`DELETE FROM Habits WHERE id = ${habitId}`;

//     if (result.rowsAffected[0] > 0) {
//       res.status(200).json({ message: 'Habit deleted successfully' });
//     } else {
//       res.status(404).json({ error: 'Habit not found' });
//     }
//   } catch (error) {
//     console.error('Error deleting habit', error);
//     res.status(500).json({ error: 'Unable to delete the habit' });
//   }
// });

// // PUT
// app.put('/habits/:id/completed', async (req, res) => {
//   const habitId = req.params.id;
//   const { completed } = req.body;

//   try {
//     // Connect to the database
//     let pool = await sql.connect(config);

//     // Update the completed field in the database
//     const updateQuery = `UPDATE Habits SET completed = @completed WHERE id = @habitId`;

//     await pool.request()
//       .input('completed', sql.NVarChar(sql.MAX), JSON.stringify(completed))
//       .input('habitId', sql.Int, habitId)
//       .query(updateQuery);

//     res.status(200).send({ message: 'Habit completion status updated successfully' });
//   } catch (error) {
//     console.error('Error updating habit completion status:', error);
//     res.status(500).send({ message: 'Error updating habit completion status', error });
//   }
// });

// // Authentication
// // LOGIN
// app.post('/auth/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const result = await sql.query`SELECT * FROM users WHERE username = ${username}`;
//     const user = result.recordset[0];

//     if (!user) {
//       return res.status(401).json({ success: false, message: 'Invalid username or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password_hash);

//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: 'Invalid username or password' });
//     }

//     return res.json({ success: true });
//   } catch (error) {
//     console.error('Database query error:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // REGISTER
// app.post('/auth/register', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await sql.query`INSERT INTO users (username, password_hash) VALUES (${username}, ${hashedPassword})`;

//     return res.json({ success: true });
//   } catch (error) {
//     console.error('Database insertion error:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });
