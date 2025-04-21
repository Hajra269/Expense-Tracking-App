"use client";
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import { useRouter } from 'next/navigation';


const Navbar = () => {
    // const router = useRouter();
    
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side: Logo + Nav links */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" component="div">
            Expense Management System
          </Typography>
        </Box>

        {/* <Button
        variant="contained"
        color="inherit"
        onClick={() => router.push('/add-expense')}
        sx={{ backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: '#f0f0f0' } }}
        >
        Add Expense
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
