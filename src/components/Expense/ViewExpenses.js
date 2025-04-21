'use client';
import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, MenuItem, Select, FormControl, InputLabel, Box, TextField, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ViewExpenses = ({ onEdit }) => {
  const [expenses, setExpenses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(stored);
    setFiltered(stored);
  }, []);

  useEffect(() => {
    let result = [...expenses];

    // Filter by category
    if (categoryFilter) {
      result = result.filter(exp => exp.category === categoryFilter);
    }

    // Filter by date range
    if (dateRange.from && dateRange.to) {
      result = result.filter(exp => exp.date >= dateRange.from && exp.date <= dateRange.to);
    }

    // Sort
    if (sortField) {
      result.sort((a, b) => {
        const valueA = sortField === 'amount' ? Number(a[sortField]) : new Date(a[sortField]);
        const valueB = sortField === 'amount' ? Number(b[sortField]) : new Date(b[sortField]);
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      });
    }

    setFiltered(result);
  }, [categoryFilter, dateRange, sortField, sortOrder, expenses]);

  const handleDelete = (indexToDelete) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
    if (!confirmDelete) return;

    const updated = expenses.filter((_, index) => index !== indexToDelete);
    setExpenses(updated);
    localStorage.setItem('expenses', JSON.stringify(updated));
  };

  const uniqueCategories = [...new Set(expenses.map(exp => exp.category))];

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>View Expenses</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            label="Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueCategories.map((cat, idx) => (
              <MenuItem key={idx} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="From Date"
          type="date"
          value={dateRange.from}
          onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="To Date"
          type="date"
          value={dateRange.to}
          onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortField}
            label="Sort By"
            onChange={(e) => setSortField(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="amount">Amount</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Order</InputLabel>
          <Select
            value={sortOrder}
            label="Order"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" onClick={() => {
          setCategoryFilter('');
          setSortField('');
          setSortOrder('asc');
          setDateRange({ from: '', to: '' });
        }}>
          Reset
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((exp, index) => (
              <TableRow key={index}>
                <TableCell>{exp.amount}</TableCell>
                <TableCell>{exp.category}</TableCell>
                <TableCell>{exp.date}</TableCell>
                <TableCell>{exp.description}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => onEdit(index)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(index)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No expenses found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewExpenses;
