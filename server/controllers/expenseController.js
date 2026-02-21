const db = require('../config/db');

exports.createExpense = (req, res) => {
    const { business_id, category, amount, date, note } = req.body;

    db.query(
        `
        INSERT INTO expenses (business_id, category, amount, date, note)
        SELECT ?, ?, ?, ?, ?
        FROM businesses
        WHERE id = ? AND user_id = ?
        `,
        [
            business_id,
            category,
            amount,
            date,
            note,
            business_id,
            req.user.id
        ],
        (err, result) => {
            if (err) return res.status(500).json({"message": "Failed to create expense"});

            if (result.affectedRows === 0)
                return res.status(403).json({"message": "Unauthorized business access"});

            res.status(201).json({"message": "Expense added successfully"});
        }
    );
};

exports.getExpenses = (req, res) => {
  const { business_id } = req.query;

  db.query(
    `
    SELECT e.*
    FROM expenses e
    JOIN businesses b ON e.business_id = b.id
    WHERE b.user_id = ? AND b.id = ?
    ORDER BY e.date DESC
    `,
    [req.user.id, business_id],
    (err, expenses) => {
      if (err) return res.status(500).json({"message": "Failed to fetch expenses"});
      res.json(expenses);
    }
  );
};

exports.updateExpense = (req, res) => {
    const { id } = req.params;
    const { category, amount, date, note } = req.body;

    db.query(
        `
        UPDATE expenses e
        JOIN businesses b ON e.business_id = b.id
        SET e.category = ?, e.amount = ?, e.date = ?, e.note = ?
        WHERE e.id = ? AND b.user_id = ?
        `,
        [category, amount, date, note, id, req.user.id],
        (err, result) => {
            if (err) return res.status(500).json("Failed to update expense");
            if (!result.affectedRows) return res.status(404).json({"message": "Expense not found"});

            res.json({"message": "Expense updated successfully"});
        }
    );
}

exports.deleteExpense = (req, res) => {
    const { id } = req.params;

    db.query(
        `
        DELETE e FROM expenses e
        JOIN businesses b ON e.business_id = b.id
        WHERE e.id=? AND b.user_id = ?
        `,
        [id, req.user.id],
        (err, result) => {
            if (err) return res.status(500).json({"message": "Failed to delete expense"});
            if (!result.affectedRows) return res.status(404).json({"message": "Expense not found"});

            res.json({"message": "Expense deleted successfully"});
        }
    );
};