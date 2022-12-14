const express = require('express')

const {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal
} = require('../controllers/goalController')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/').get(protect, getGoals).post(protect, addGoal)
// router.get('/', getGoals)
// router.post('/', addGoal)

router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router
