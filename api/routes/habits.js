const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habitsController');

router.post('/', habitsController.createHabit);
router.get('/', habitsController.getHabits);
router.delete('/:habitId', habitsController.deleteHabit);
router.put('/:id/completed', habitsController.updateHabitCompletion);

module.exports = router;
