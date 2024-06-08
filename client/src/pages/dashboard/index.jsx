import React from 'react'
import { useUser } from '@clerk/clerk-react'
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { useExpenseRecords } from '../../contexts/expenseContext';
import { useMemo } from 'react';


function Dashboard() {
const {user} = useUser();
const { records } = useExpenseRecords(); //get records from context

//Calculate totals
const totalMonthly = useMemo(() => {
  let totalAmount = 0;
  records.forEach((record) => {
    totalAmount += record.amount; //sum up all amounts on all records
  });

  return totalAmount; 
}, [records]); //return total amount and recalculate on change

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Welcome {user?.firstName}! Here are your finances:</h1>
    <ExpenseForm />
    <div className={`text-3xl font-bold mt-4 ${totalMonthly >= 0 ? 'text-primary' : 'text-red-700'}`}>
      Total Monthly: ${totalMonthly.toFixed(2)} 
    </div>
        <ExpenseList/>
    </div>
  )
}

export default Dashboard