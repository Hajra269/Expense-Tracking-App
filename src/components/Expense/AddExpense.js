"use client";
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';

const defaultCategories = [
  'Food',
  'Housing',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Income'
];

const AddExpense = ({ onSuccess }) => {
  const initialState = {
    amount: '',
    category: '',
    date: '',
    description: '',
  };

  const [expense, setExpense] = useState(initialState);
  const { amount, category, date, description } = expense;

  const onChangeInput = (event) => {
    setExpense({ ...expense, [event.target.name]: event.target.value });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (!amount || !category || !date || !description) {
      alert('All fields are required');
      return;
    }

    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const newExpenses = [...savedExpenses, expense];
    localStorage.setItem('expenses', JSON.stringify(newExpenses));

    alert('Expense added successfully!');
    setExpense(initialState);
    if (onSuccess) onSuccess();
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ p: 4, mt: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Expense
        </Typography>

        <form onSubmit={onFormSubmit}>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            inputProps={{ min: 1, step: "0.01" }}
            value={amount}
            onChange={onChangeInput}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={category}
              onChange={onChangeInput}
              label="Category"
            >
              {defaultCategories.map((cat, index) => (
                <MenuItem key={index} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={date}
            onChange={onChangeInput}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={description}
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
            Add Expense
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddExpense;
