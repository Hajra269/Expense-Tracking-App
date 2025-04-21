'use client';
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c', '#d0ed57', '#8884d8'];

const ExpenseSummary = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(data);
  }, []);

  const categoryTotals = expenses.reduce((acc, exp) => {
    if (exp.category !== 'Income') {
      acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount);
    }
    return acc;
  }, {});

  const categoryData = Object.entries(categoryTotals).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Expense Summary
      </Typography>

      <Divider sx={{ my: 3 }} />
      <Box sx={{ height: 300, mt: 4 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={100}
              dataKey="value"
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
};

export default ExpenseSummary;
