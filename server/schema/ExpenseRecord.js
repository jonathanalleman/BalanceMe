const mongoose = require("mongoose");

const expenseRecordSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
});

const ExpenseRecordModel = mongoose.model('ExpenseRecord', expenseRecordSchema);

module.exports = ExpenseRecordModel;
