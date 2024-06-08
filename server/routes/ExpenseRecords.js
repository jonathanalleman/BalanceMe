const express = require("express");
const ExpenseRecordModel = require("../schema/ExpenseRecord")

const router = express.Router();


//Get Expense Records by user ID
router.get("/getAllByUserID/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const records = await ExpenseRecordModel.find({ userId: userId });
    if (records.length === 0) {
      return res.status(404).send("No records found for the user.");
    }
    res.status(200).send(records);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Create new expense record
router.post("/", async (req, res) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new ExpenseRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();

    res.status(200).send(savedRecord);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Update existing record
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await ExpenseRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );

    if (!record) return res.status(404).send();

    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete expense record
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const record = await ExpenseRecordModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send();
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
