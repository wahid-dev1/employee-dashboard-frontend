import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'; // Ensure you have this installed
import api from '../services/api'; // Replace with your API service


// Async thunk for logging in
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/login', credentials); // Adjust endpoint as needed
      console.log('Login Response:', response.data);
      return response.data.token; // Return the token from the API response
    } catch (error) {
      console.error('Login Error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to login'
      );
    }
  }
);

// Rehydrate initial state from localStorage
const token = localStorage.getItem('token');
let decodedUser = null;

if (token) {
  try {
    decodedUser = jwtDecode(token); // Decode the token to get user info
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('token'); // Remove invalid token
  }
}

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token || null,
    user: decodedUser,
    isAuthenticated: !!decodedUser,
    loading: false,
    error: null,
  },
  reducers: {
    // Logout action
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token'); // Clear the token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Pending
      .addCase(loginUser.pending, (state) => {
        console.log('Login Pending...');
        state.loading = true;
        state.error = null;
      })
      // Login Fulfilled
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Login Fulfilled:', action.payload);
        const token = action.payload; // Extract token from the response
        state.loading = false;
        state.token = token;
        state.user = jwtDecode(token); // Decode the token to get user info
        state.isAuthenticated = true;

        // Save token to localStorage
        localStorage.setItem('token', token);
        console.log('Token saved to localStorage:', localStorage.getItem('token'));
      })
      // Login Rejected
      .addCase(loginUser.rejected, (state, action) => {
        console.log('Login Rejected:', action.payload);
        state.loading = false;
        state.error = action.payload; // Set error message
      });
  },
});

// Export the logout action
export const { logout } = authSlice.actions;

// Export the reducer to be used in the Redux store
export default authSlice.reducer;