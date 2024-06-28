const { sql, config } = require('../config/db');

const createHabit = async ({ title, color, repeatMode, reminder }) => {
  let pool = await sql.connect(config);
  const result = await pool.request()
    .input('title', sql.VarChar, title)
    .input('color', sql.VarChar, color)
    .input('repeatMode', sql.VarChar, repeatMode)
    .input('reminder', sql.Bit, reminder)
    .query(`
      INSERT INTO Habits (title, color, repeatMode, reminder)
      OUTPUT inserted.*
      VALUES (@title, @color, @repeatMode, @reminder)
    `);
  return result.recordset[0];
};

const getHabits = async () => {
  let pool = await sql.connect(config);
  const result = await pool.request().query(`SELECT * FROM Habits`);
  return result.recordset;
};

const deleteHabit = async (habitId) => {
  await sql.connect(config);
  const result = await sql.query`DELETE FROM Habits WHERE id = ${habitId}`;
  if (result.rowsAffected[0] > 0) {
    return { status: 200, message: { message: 'Habit deleted successfully' } };
  } else {
    return { status: 404, message: { error: 'Habit not found' } };
  }
};

const updateHabitCompletion = async (habitId, completed) => {
  let pool = await sql.connect(config);
  const updateQuery = `UPDATE Habits SET completed = @completed WHERE id = @habitId`;
  await pool.request()
    .input('completed', sql.NVarChar(sql.MAX), JSON.stringify(completed))
    .input('habitId', sql.Int, habitId)
    .query(updateQuery);
  return { status: 200, message: { message: 'Habit completion status updated successfully' } };
};

module.exports = {
  createHabit,
  getHabits,
  deleteHabit,
  updateHabitCompletion
};
