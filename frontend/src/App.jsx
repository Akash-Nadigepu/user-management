// src/App.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Grid, CircularProgress, Button } from '@mui/material';
import AddUserForm from './components/AddUserForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
      setUsers(response.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <AddUserForm onUserAdded={handleUserAdded} />
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          User List
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 1 }}>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="body2">{user.position}</Typography>
                  <Typography variant="body2">{user.email}</Typography>
                  <Typography variant="body2">{user.phone}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default App;
