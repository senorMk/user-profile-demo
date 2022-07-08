import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Logout from './pages/logout.jsx';
import Signup from './pages/register.jsx';
import Profile from './pages/profile.jsx';

const UserRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/logout" element={<Logout />} />
      <Route exact path="/register" element={<Signup />} />
      <Route exact path="/profile/:id" element={<Profile />} />
    </Routes>
  );
};

export default UserRoutes;
