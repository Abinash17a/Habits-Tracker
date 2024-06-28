const habitsService = require('../services/habitsService');

const createHabit = async (req, res) => {
  try {
    const habit = await habitsService.createHabit(req.body);
    res.status(200).json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const getHabits = async (req, res) => {
  try {
    const habits = await habitsService.getHabits();
    console.log("logging habits from get habits",habits);
    res.status(200).json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const deleteHabit = async (req, res) => {
  try {
    const result = await habitsService.deleteHabit(req.params.habitId);
    res.status(result.status).json(result.message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const updateHabitCompletion = async (req, res) => {
  try {
    const result = await habitsService.updateHabitCompletion(req.params.id, req.body.completed);
    res.status(result.status).json(result.message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  createHabit,
  getHabits,
  deleteHabit,
  updateHabitCompletion
};
