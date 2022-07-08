import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    let data = new FormData(event.target);

    const email = data.get('email');
    const password = data.get('password');

    if (email.length === 0 || password.length === 0) {
      console.log('Invalid input');
      return;
    }

    try {
      let response = await Axios.post(
        'http://localhost:5555/api/v1/user/login',
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        navigate('/profile/' + response.data.user._id);
      } else if (response.status === 400 || response.status === 500) {
        console.log({ code: response.status, message: response.data.message });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ marginTop: '50px', textAlign: 'center' }}
        >
          Login
        </Typography>
        <Box sx={{ maxWidth: '300px' }}>
          <form onSubmit={onSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(value) => setEmail(value.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(value) => setPassword(value.target.value)}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ marginTop: '10px' }}
            >
              LOGIN
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
