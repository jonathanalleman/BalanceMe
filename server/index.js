// PWD: cG7pX5qDA5qa3AQw

const express = require("express");
const mongoose = require("mongoose");
const ExpenseRecordsRouter = require("./routes/ExpenseRecords")
const cors = require('cors');

const app = express()
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI =
"mongodb+srv://balancemeplz:cG7pX5qDA5qa3AQw@budgettracker.qqynsl6.mongodb.net/"

mongoose.connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

  app.use("/ExpenseRecords", ExpenseRecordsRouter);

  app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
  });