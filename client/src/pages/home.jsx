import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const onProfile = () => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <Container>
      {!user ? (
        <Box>
          <Typography
            component="h1"
            variant="h4"
            sx={{ marginTop: '50px', textAlign: 'center' }}
          >
            Welcome
          </Typography>
          <Typography
            component="h3"
            variant="body"
            sx={{ marginTop: '50px', textAlign: 'center' }}
          >
            Please login or signup
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={onProfile}
            variant="contained"
            sx={{ width: '100px' }}
          >
            Profile
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Home;
