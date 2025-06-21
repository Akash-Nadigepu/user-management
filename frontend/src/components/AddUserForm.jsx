// src/components/AddUserForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const AddUserForm = ({ onUserAdded }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users`, user);
      onUserAdded(response.data);
      setUser({ name: '', email: '', phone: '', position: '' });
    } catch (err) {
      setError('Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Add New User
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={user.name}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={user.email}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Phone"
        name="phone"
        value={user.phone}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Position"
        name="position"
        value={user.position}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
        {loading ? 'Adding...' : 'Add User'}
      </Button>
    </Box>
  );
};

export default AddUserForm;
