import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const Header = () => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate('/');
  };
  const onLogin = () => {
    navigate('/login');
  };
  const onLogout = () => {
    navigate('/logout');
  };
  const onRegister = () => {
    navigate('/register');
  };
  return (
    <Box sx={{ marginTop: '20px' }}>
      <Button onClick={onBack} variant="contained" sx={{ width: '100px' }}>
        Home
      </Button>
      <Button
        onClick={onLogin}
        style={{ marginLeft: '10px' }}
        variant="contained"
        sx={{ width: '100px' }}
      >
        Login
      </Button>
      <Button
        onClick={onLogout}
        style={{ marginLeft: '10px' }}
        variant="contained"
        sx={{ width: '100px' }}
      >
        Logout
      </Button>
      <Button
        onClick={onRegister}
        style={{ marginLeft: '10px' }}
        variant="contained"
        sx={{ width: '100px' }}
      >
        Register
      </Button>
    </Box>
  );
};

export default Header;
