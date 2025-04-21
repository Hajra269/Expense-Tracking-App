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
  FormControl,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const defaultCategories = [
  'Food',
  'Housing',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Income',
  'Uncategorized',
];

const AddExpense = ({ onSuccess }) => {
  const initialState = {
    amount: '',
    category: '',
    date: '',
    description: '',
  };

  const [expense, setExpense] = useState(initialState);
  const [newCategory, setNewCategory] = useState(''); 
  const [categories, setCategories] = useState(defaultCategories);

  const { amount, category, date, description } = expense;

  const onChangeInput = (event) => {
    setExpense({ ...expense, [event.target.name]: event.target.value });
  };

  const onAddCategory = () => {
    if (newCategory.trim() === '') {
      alert('Please enter a category name');
      return;
    }

    if (categories.includes(newCategory)) {
      alert('This category already exists');
      return;
    }

    setCategories([...categories, newCategory]);
    setNewCategory('');
  };

  const onDeleteCategory = (categoryToDelete) => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const hasAssociatedExpenses = savedExpenses.some(exp => exp.category === categoryToDelete);
  
    if (!hasAssociatedExpenses) {
      setCategories(categories.filter((cat) => cat !== categoryToDelete));
      return;
    }
  
    const action = window.prompt(
      `There are expenses associated with "${categoryToDelete}". Choose an action:\n\n` +
      `1 - Move expenses to "Uncategorized"\n` +
      `2 - Delete expenses associated with this category\n` +
      `3 - Cancel`
    );
  
    if (action === '1') {
      const updatedExpenses = savedExpenses.map(exp => 
        exp.category === categoryToDelete ? { ...exp, category: 'Uncategorized' } : exp
      );
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      setCategories(categories.filter((cat) => cat !== categoryToDelete));
    } else if (action === '2') {
      const updatedExpenses = savedExpenses.filter(exp => exp.category !== categoryToDelete);
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      setCategories(categories.filter((cat) => cat !== categoryToDelete));
    } else {
      //do nothing
    }
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

          {/* Display Category dropdown and Add Category input */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={category}
                onChange={onChangeInput}
                label="Category"
              >
              {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <Typography variant="body2">{cat}</Typography>
                  <IconButton 
                    color="error" 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCategory(cat);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </MenuItem>
            ))}
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mr: 1 }}
              />
              <IconButton color="primary" onClick={onAddCategory} sx={{ padding: '10px' }}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

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
