import { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    let data = new FormData(event.target);

    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const email = data.get('email');
    const password = data.get('password');

    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      password.length === 0
    ) {
      console.log('Invalid input');
    }

    try {
      let response = await Axios.post(
        'http://localhost:5555/api/v1/user/register',
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }
      );

      if (response.status === 201) {
        console.log(response.data.message);
        navigate('/login');
      } else if (response.status === 400 || response.status === 500) {
        console.log(response.data.message);
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
          Register
        </Typography>
        <Box onSubmit={onSubmit} sx={{ maxWidth: '300px' }}>
          <form>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
              value={firstName}
              onChange={(value) => setFirstName(value.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoFocus
              value={lastName}
              onChange={(value) => setLastName(value.target.value)}
            />
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
            <Button fullWidth type="submit" variant="contained">
              REGISTER
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
