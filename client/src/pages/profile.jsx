import { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const userId = params.id;
  const token = localStorage.getItem('token');

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
      return;
    }

    try {
      let response = await Axios.put(
        `http://localhost:5555/api/v1/user/update/${userId}`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem('user', response.data.user);
        console.log(response.data.message);
        navigate('/profile/' + response.data.user._id);
      } else if (response.status === 400 || response.status === 500) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log('Error updating user');
    }
  };

  useEffect(() => {
    const getUser = async (userId) => {
      try {
        let response = await Axios.get(
          `http://localhost:5555/api/v1/user/get-user/${userId}`,
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );

        if (response.status === 200) {
          return response.data.user;
        } else if (response.status === 400 || response.status === 500) {
          console.log('Error getting user');
        }
      } catch (error) {
        console.log('Error getting user');
      }
    };

    getUser(userId).then((user) => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    });
  }, [token, userId]);

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
          Edit Profile
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{ maxWidth: '300px' }}
        >
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
            UPDATE
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
