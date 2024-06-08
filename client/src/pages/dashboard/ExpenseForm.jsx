import React, { useState } from 'react'; 
import { useUser } from '@clerk/clerk-react'; 
import { useExpenseRecords } from '../../contexts/expenseContext'; 

// Define the ExpenseForm component
function ExpenseForm() {
  const [description, setDescription] = useState(""); // State to manage the different inputs
  const [amount, setAmount] = useState(""); 
  const [category, setCategory] = useState(""); 
  const { addRecord } = useExpenseRecords(); // Get the addRecord function from the expense records context
  const { user } = useUser(); // Get the current user from Clerk

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); 

    // Create a new expense record object
    const newRecord = {
      userId: user?.id ?? "", 
      date: new Date(), 
      description: description, 
      amount: parseFloat(amount), 
      category: category, 
    };

    addRecord(newRecord); // Add the new record using the addRecord function
    setDescription(""); // Reset forms after submission
    setAmount(""); 
    setCategory(""); 
  };

  // Form wtih Tailwind CSS
  return (
    <div className="max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <input 
            type="text" 
            required 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Amount: (Positive for Income/Negative for Expense)</label>
          <input 
            type="number" 
            required 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category: (Can customize other in Table)</label>
          <select 
            required 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a Category</option>
            <option value="Food">Food</option>
            <option value="Housing">Housing</option>
            <option value="Income">Income</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            className="bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Expense/Income
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm; 
