'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const EditExpense = ({ index ,onSuccess}) => {

  const [expense, setExpense] = useState({
    amount: '',
    category: '',
    date: '',
    description: '',
  });

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    if (storedExpenses[index]) {
      setExpense(storedExpenses[index]);
    }
  }, [index]);

  const onChangeInput = (event) => {
    setExpense({ ...expense, [event.target.name]: event.target.value });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (!expense.amount || !expense.category || !expense.date || !expense.description) {
      alert('All fields are required');
      return;
    }

    const updatedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    updatedExpenses[index] = expense;
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    alert('Expense updated successfully!');
    if (onSuccess) onSuccess();
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ p: 4, mt: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Expense
        </Typography>

        <form onSubmit={onFormSubmit}>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={expense.amount}
            onChange={onChangeInput}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Category"
            name="category"
            value={expense.category}
            onChange={onChangeInput}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={expense.date}
            onChange={onChangeInput}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={expense.description}
            onChange={onChangeInput}
            margin="normal"
            multiline
            rows={3}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Update Expense
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditExpense;
