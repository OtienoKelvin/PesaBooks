const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const expense = require('../controllers/expenseController');
const validateExpense = require('../middleware/validateexpenseMiddleware');

router.post('/', auth, validateExpense, expense.createExpense);
router.get('/', auth, expense.getExpenses);
router.put('/:id', auth, validateExpense, expense.updateExpense);
router.delete('/:id', auth, expense.deleteExpense);

module.exports = router;