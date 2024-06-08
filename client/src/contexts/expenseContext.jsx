import { useUser } from "@clerk/clerk-react"; // Import useUser hook from Clerk for user authentication
import { createContext, useContext, useEffect, useState } from "react"; // Import necessary hooks from React

// Create a context for expense records
export const ExpenseRecordsContext = createContext(undefined);

// Define the provider component for the expense records context
export const ExpenseRecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]); // State to store expense records
  const { user } = useUser(); // Get the current user from Clerk

  // Function to fetch expense records from the server
  const fetchRecords = async () => {
    if (!user) return; // If no user is logged in, do nothing
    const response = await fetch(
      `http://localhost:3001/ExpenseRecords/getAllByUserID/${user.id}` // Fetch records for the logged-in user
    );

    if (response.ok) { // If the response is okay, parse the records
      const records = await response.json();
      console.log(records); // Log the records to the console for debugging
      setRecords(records); // Update the state with the fetched records
    }
  };

  // useEffect to fetch records when the component mounts or the user changes
  useEffect(() => {
    fetchRecords(); // Fetch records
  }, [user]); // Dependency array includes user, so it runs when the user changes

  // Function to add a new expense record
  const addRecord = async (record) => {
    const response = await fetch("http://localhost:3001/ExpenseRecords", {
      method: "POST", // Use POST method to create a new record
      body: JSON.stringify(record), // Convert record to JSON string
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
    });

    try {
      if (response.ok) { // If the response is okay, parse the new record
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]); // Update the state with the new record
      }
    } catch (err) {
      console.error(err); // Log any errors to the console
    }
  };

  // Function to update an existing expense record
  const updateRecord = async (id, newRecord) => {
    const response = await fetch(
      `http://localhost:3001/ExpenseRecords/${id}`, // Update the record with the specified ID
      {
        method: "PUT", // Use PUT method to update the record
        body: JSON.stringify(newRecord), // Convert new record to JSON string
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
      }
    );

    try {
      if (response.ok) { // If the response is okay, parse the updated record
        const updatedRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => {
            if (record._id === id) { // If the record ID matches, replace it with the updated record
              return updatedRecord;
            } else {
              return record; // Otherwise, return the original record
            }
          })
        );
      }
    } catch (err) {
      console.error(err); // Log any errors to the console
    }
  };

  // Function to delete an expense record
  const deleteRecord = async (id) => {
    const response = await fetch(
      `http://localhost:3001/ExpenseRecords/${id}`, // Delete the record with the specified ID
      {
        method: "DELETE", // Use DELETE method to delete the record
      }
    );

    try {
      if (response.ok) { // If the response is okay, parse the deleted record
        const deletedRecord = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deletedRecord._id) // Remove the deleted record from the state
        );
      }
    } catch (err) {
      console.error(err); // Log any errors to the console
    }
  };

  // Provide the expense records context to the children components
  return (
    <ExpenseRecordsContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }} // Context value includes records and CRUD functions
    >
      {children}
    </ExpenseRecordsContext.Provider>
  );
};

// Custom hook to use the expense records context
export const useExpenseRecords = () => {
  const context = useContext(ExpenseRecordsContext); // Get the context

  if (!context) { // If the context is not found, throw an error
    throw new Error(
      "useExpsenseRecords must be used within a ExpenseRecordsProvider"
    );
  }

  return context; // Return the context value
};
