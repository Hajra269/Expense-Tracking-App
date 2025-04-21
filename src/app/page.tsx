'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Button } from '@mui/material';

//lazy loading
const AddExpense = dynamic(() => import('@/components/Expense/AddExpense'), { ssr: false });
const ViewExpenses = dynamic(() => import('@/components/Expense/ViewExpenses'), { ssr: false });
const EditExpense = dynamic(() => import('@/components/Expense/EditExpense'), { ssr: false });
const ExpenseSummary = dynamic(() => import('@/components/Expense/ExpenseSummary'), { ssr: false });

export default function Home() {
  const [view, setView] = useState<'add' | 'view' | 'summary'| 'edit' | 'home'>('home');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setView('edit');
  };
  const handleAddSuccess = () => {
    setView('view');
  };

  const renderComponent = () => {
    switch (view) {
      case 'add':
        return <AddExpense onSuccess={handleAddSuccess} />;
        case 'view':
        return <ViewExpenses onEdit={handleEdit}/>;
        case 'summary':
        return <ExpenseSummary/>;
        case 'edit':
          return editIndex !== null ? <EditExpense index={editIndex} onSuccess={handleAddSuccess}  /> : null;
      default:
        return (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <h1>Welcome to Expense App</h1>
            <p>Choose an action below to begin</p>
          </Box>
        );
    }
  };

  return (
    <Box className="w-full p-4">
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4 }}>
        <Button variant="contained" onClick={() => setView('add')}>Add Expense</Button>
        <Button variant="contained" onClick={() => setView('view')}>View Expenses</Button>
        <Button variant="contained" onClick={() => setView('summary')}>Expense Summary</Button>
      </Box>
      {renderComponent()}
    </Box>
  );
}
